+++
title = "Type coverage for Sydent: motivation"
path = "/blog/2021/12/03/type-coverage-for-sydent-motivation"

[taxonomies]
author = ["David Robertson"]
category = ["Tech"]
+++

_This is the first of three posts on improving type coverage in Sydent. Join us next Friday for the [second part](https://matrix.org/blog/2021/12/10/type-coverage-for-sydent-annotation)!_

[Sydent](https://github.com/matrix-org/sydent) is the reference Matrix Identity server. It provides a [lookup service](https://matrix.org/docs/spec/identity_service/r0.3.0), so that you can find a Matrix user via their email address or phone number (if they've chosen to share it).

We recently worked on [improving Sydent's type coverage](https://github.com/matrix-org/sydent/issues/414): the proportion of its source code with explicit annotations denoting the kind of data that each variable, expression and return value is expected to hold. These annotations are optional, but if present, they allow tools like [mypy](https://mypy.readthedocs.io/en/stable/) to analyze your programs and spot entire classes of bugs _before_ you ship them! In this instance, we aimed to make Sydent pass `mypy --strict`, which [it now does](https://github.com/matrix-org/sydent/commit/7bdaac2774840e1f9697d30515f367c5c8c16866). Here's what the process looked like:

![Coverage as measured by mypy. Precision and the number of typed expressions increase over the latter half of 2021.](/blog/img/TWGXKTFpjYxlbnHRkZFAzljQ.png)

Two lines show two different measures of how well-typed the project is. The grey region covers our two-week sprint towards improving coverage; the earliest data point is from just before previous efforts to improve typing earlier in the year.

In a series of posts, I'd like to reflect on this sprint and share what we've learned. In particular, I aim to:

- explain why we wanted to improve type coverage _now_;
- work through examples to see how (if?) mypy could have spotted bugs;
- describe the annotation process;
- illustrate common patterns I learned along the way;
- discuss the checks that `mypy` provides; and finally
- reflect on the state of Python's typing ecosystem.

In this first part, we'll concentrate on the first two topics; the [second](https://matrix.org/blog/2021/12/10/type-coverage-for-sydent-annotation) covers the middle two; and the [third](https://matrix.org/blog/2021/12/17/type-coverage-for-sydent-evaluation) the last two.

## Why do this now?

It took us a long time (too long) to notice that the Sydent instance serving `matrix.org` [was failing to send SMS messages for verification](https://github.com/vector-im/element-web/issues/19317). We suspected that something was going wrong with our [API call to OpenMarket](https://github.com/matrix-org/sydent/blob/main/sydent/sms/openmarket.py). Our first step was to [improve logging](https://github.com/matrix-org/sydent/issues/410), so we could start to deduce what was going wrong and why. Whilst trawling through logs, we spotted [one problem](https://github.com/matrix-org/sydent/pull/413#pullrequestreview-775154313) which meant we weren't actually sending off the API request in the first place. Further investigation revealed a [strings-versus-bytes confusion](https://github.com/matrix-org/sydent/pull/415) which meant that we would always (incorrectly) interpret the API response as having failed.

All in all, phone number verification was unknowingly broken in the 2.4.0 release, to be fixed in 2.4.6 a month later. How could we do better? Better test coverage is (as ever) one answer. But [it struck me](https://github.com/matrix-org/sydent/pull/413#pullrequestreview-775154313) that the two bugs we'd encountered might be ripe for automatic detection:

- we created an [Awaitable](https://docs.python.org/3/library/typing.html#typing.Awaitable) but didn't `await` it or use it in any way, and
- we tried to look up a `str` key in a dictionary which mapped `bytes` to `bytes`.

Could a static analysis tool like `mypy` detect these? How much work would it take to do so? Are there other bugs and problems we could spot with it? I was curious to answer these questions and learn more about the tools that Python's typing ecosystem provides.

## Could typing have spotted these problems?

Let's start with the first of question: what can `mypy` detect?

### The missing `await`

Instead of writing `x = await foo()`, we simply had `x = foo()` and didn't then go on to `await x`. Mypy doesn't have means to detect this at present. There was interest in [this issue](https://github.com/python/mypy/issues/2499) on such a feature, with related threads [here](https://github.com/python/mypy/issues/5597) and [here](https://github.com/python/mypy/issues/5650).

Are there other opportunities to spot the error? Here's the relevant bit of source code from [before the fix](https://github.com/matrix-org/sydent/blob/2e3b7576b17e92080319e08c0c0ebf566935636c/sydent/http/servlets/msisdnservlet.py#L93-L98).

```python
            sid = self.sydent.validators.msisdn.requestToken(
                phone_number_object, clientSecret, sendAttempt, brand
            )
            resp = {
                "success": True,
                "sid": str(sid),
                "msisdn": msisdn,
                "intl_fmt": intl_fmt,
            }
```

The call to `requestToken` produces a value of type `Awaitable[int]`. If we tried to assign that to an expression of type `int` we'd get an error that mypy can spot.

```python
$ cat example.py
async def foo() -> int:
    return 1

async def bar():
    x = foo()      # no error
    y: int = foo() # error: rhs is Awaitable[int], but lhs expects int

$ mypy --check-untyped-defs example.py
example.py:6: error: Incompatible types in assignment (expression has type "Coroutine[Any, Any, int]", variable has type "int")
Found 1 error in 1 file (checked 1 source file)
```

Note that we have to specifically ask mypy to typecheck the body of `bar` by passing [--check-untyped-defs](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-check-untyped-defs); by default, `mypy` will only typecheck annotated code.

We might also have been able to detect the error by looking at how we used `sid`. Unfortunately, the only use of was in a conversion `str(sid)`, which is a perfectly type-safe call for both `sid: int` and `sid: Awaitable[int]`. But let's put that aside for a second—suppose we added `"sid": sid` directly into the `resp` dictionary. Could mypy have spotted there was a problem with _that_?

Unfortunately not. Because `resp` has no annotation, we have to rely on how it's used to spot any type inconsistencies. There's only one use of `resp`: as the return value from its enclosing function, `render_POST`. Mypy's only chance to spot a type problem would be to compare the mypy's inferred type for `resp` to the return type of `render_POST`. What are those types? We can use `reveal_type` to see the former is `Dict[str, object]`. For the latter:

```python
    @jsonwrap
    def render_POST(self, request: Request) -> JsonDict:
```

The return type is `JsonDict`, which is an [alias](https://github.com/matrix-org/sydent/blob/2e3b7576b17e92080319e08c0c0ebf566935636c/sydent/types.py#L17) for `Dict[str, Any]`. This is bad news, because `Dict[str, object]` and `Dict[str, Any]` are compatible. Digging a level deeper, this is because `sid: Any` holds true for both `sid: int` and `sid: Awaitable[int]`—so there's no error to spot here. The `Any` type is compatible with any other type whatsoever! Mypy uses `Any` as a way to [defer all type checking to runtime](https://mypy.readthedocs.io/en/stable/kinds_of_types.html#the-any-type); mypy won't (and can't!) statically analyse the usage of an expression of type `Any`. Indeed, mypy's reports will tell you how many `Any`s you're working with, and offer a variety of options to [warn or error on usages of `Any`](https://mypy.readthedocs.io/en/stable/command_line.html#disallow-dynamic-typing).

If we were inserting `sid` directly into a dictionary, we could do better by annotating the dictionary (or the function's return type) as a [TypedDict](https://docs.python.org/3/library/typing.html#typing.TypedDict). This is a way to specify a dictionary with a fixed set of keys, each with a fixed type. It comes in really handy for Sydent, Sygnal and Synapse—all of [the Matrix APIs](https://matrix.org/docs/spec/) exchange JSON dictionaries, so anything we can do to teach mypy about their shape and types is gold dust.

In short, there were options for detecting this with some code changes, but no magic wand that would have spotted the error in the code as written.

### The strings/bytes confusion

Our [error](https://github.com/matrix-org/sydent/pull/415/files#diff-4b3e0551612818927c87fe0100262ec230e0342def9d3f09214b93dea3efacb8L103-R107) was here:

```python
        headers = dict(resp.headers.getAllRawHeaders())
        request_id = None
        if "X-Request-Id" in headers:
            request_id = headers["X-Request-Id"][0]
```

In this sample, `resp.headers` is a [twisted.web.http_headers.Headers](https://twistedmatrix.com/documents/current/api/twisted.web.http_headers.Headers.html) instance. `getAllRawHeaders` is [documented](https://twistedmatrix.com/documents/current/api/twisted.web.http_headers.Headers.html#getAllRawHeaders) as returning an iterable of `(bytes, Sequence[bytes])` pairs. Even better, mypy can see this because `getAllRawHeaders` is [annotated](https://github.com/twisted/twisted/blob/5c24e99e671c4082a1ddc8dbeb869402294bd0dc/src/twisted/web/http_headers.py#L261) (many thanks to the twisted authors for this). Mypy should be able to deduce that we build a dictionary `headers: Dict[bytes, Sequence[bytes]`. We can check this using [`reveal_type`](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html#when-you-re-puzzled-or-when-things-are-complicated):

```python
        headers = dict(resp.headers.getAllRawHeaders())
        reveal_type(headers)
```

```txt
$ mypy
sydent/sms/openmarket.py:110: note: Revealed type is "builtins.dict[builtins.bytes*, typing.Sequence*[builtins.bytes]]"
```

(The `*` in `builtins.bytes*` here means mypy has [inferred](https://stackoverflow.com/a/50499509/5252017) that the dictionary's keys are bytes, rather than being told explicitly that they must be bytes.)

That's all fine and dandy. But why didn't we spot this before if the annotations were all in place in twisted? Let's put aside the fact that, erm, we weren't running mypy in Sydent's CI [until the recent sprint](https://github.com/matrix-org/sydent/pull/416), unlike our [other](https://github.com/matrix-org/synapse/blob/5640992d176a499204a0756b1677c9b1575b0a49/.github/workflows/tests.yml#L21) [projects](https://github.com/matrix-org/sygnal/blob/4a7367e84476a4b1054b1fe20e9e06f9f66e27f8/.github/workflows/pipeline.yml#L18-L26). Checking out the problematic version, we can run mypy on the file we know to contain the bug.

```txt
$ git checkout v2.4.0
$ mypy --strict sydent/sms/openmarket.py
sydent/sms/openmarket.py:82: error: Dict entry 0 has incompatible type "str": "int"; expected "str": "str"  [dict-item]
```

Huh. Mypy spots something, but not the error we were hoping for. What's going on here? We can ask mypy to show its working with `reveal_type` again.

```python
        resp = await self.http_cli.post_json_get_nothing(
            API_BASE_URL, send_body, {"headers": req_headers}
        )
        reveal_type(resp)
        headers = dict(resp.headers.getAllRawHeaders())
        reveal_type(resp.headers)
        reveal_type(resp.headers.getAllwRawHeaders())
        reveal_type(headers)
```

This yields:

```txt
$ mypy sydent/sms/openmarket.py
sydent/sms/openmarket.py:82: error: Dict entry 0 has incompatible type "str": "int"; expected "str": "str"  [dict-item]
sydent/sms/openmarket.py:102: note: Revealed type is "twisted.web.iweb.IResponse*"
sydent/sms/openmarket.py:104: note: Revealed type is "Any"
sydent/sms/openmarket.py:105: note: Revealed type is "Any"
sydent/sms/openmarket.py:106: note: Revealed type is "builtins.dict[Any, Any]"
Found 1 error in 1 file (checked 1 source file)
```

Ahh, the `Any` type. As mentioned above, this represents a value whose type can't be statically determined. We're left to runtime checks to detect the problem. But we won't detect it at runtime, because dictionaries don't enforce any kind of type requirements on their keys and values.

The problem here is that mypy can't see that `resp.headers` is a twisted `Headers` object. If we could inform it of this, mypy would spot our bug:

```python
        import twisted.web.http_headers
        raw_headers: twisted.web.http_headers.Headers = resp.headers
        reveal_type(resp)
        headers = dict(raw_headers.getAllRawHeaders())
        reveal_type(raw_headers)
        reveal_type(raw_headers.getAllRawHeaders())
        reveal_type(headers)
```

```txt
$ mypy sydent/sms/openmarket.py
sydent/sms/openmarket.py:82: error: Dict entry 0 has incompatible type "str": "int"; expected "str": "str"  [dict-item]
sydent/sms/openmarket.py:104: note: Revealed type is "twisted.web.iweb.IResponse*"
sydent/sms/openmarket.py:106: note: Revealed type is "twisted.web.http_headers.Headers"
sydent/sms/openmarket.py:107: note: Revealed type is "typing.Iterator[Tuple[builtins.bytes, typing.Sequence[builtins.bytes]]]"
sydent/sms/openmarket.py:108: note: Revealed type is "builtins.dict[builtins.bytes*, typing.Sequence*[builtins.bytes]]"
sydent/sms/openmarket.py:114: error: Invalid index type "str" for "Dict[bytes, Sequence[bytes]]"; expected type "bytes"  [index]
sydent/sms/openmarket.py:114: error: Argument 1 to "split" of "bytes" has incompatible type "str"; expected "Optional[bytes]"  [arg-type]
Found 3 errors in 1 file (checked 1 source file)
```

There it is, on line 114: `Invalid index type "str" for "Dict[bytes, Sequence[bytes]]"; expected type "bytes"`.

Unfortunately it'd be a pain to annotate our application code to mark every use of `IResponse.headers` as a `Headers` object. We'll see a better way to do things in this [the next post](https://matrix.org/blog/2021/12/10/type-coverage-for-sydent-annotation), which discusses the nitty-gritty details of adding annotations file-by-file.

----

Many thanks for reading! If you've got any corrections, comments or queries, I'm available on Matrix at [@dmrobertson:matrix.org](https://matrix.to/#/@dmrobertson:matrix.org).
