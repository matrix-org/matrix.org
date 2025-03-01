+++
title = "Type coverage for Sydent: evaluation"
path = "/blog/2021/12/17/type-coverage-for-sydent-evaluation"

[taxonomies]
author = ["David Robertson"]
category = ["Tech"]
+++

This is the third in a series of three posts which discuss recent work to improve type annotations in [Sydent](https://github.com/matrix-org/sydent), the reference Matrix Identity server. [Last time](https://matrix.org/blog/2021/12/10/type-coverage-for-sydent-annotation) we discussed the mechanics of how we added type coverage. Now I want to reflect on how well we did. What information and guarantees did we gain from `mypy`? How could we track our progress and measure the effect of our work? And lastly, what other tools are out there apart from `mypy`?

## The best parts of `--strict`

While the primary goal was to improve Sydent's coverage and robustness, to some extent this was an experiment too. How much could we get out of typing and static analysis, if we _really_ invested in thorough annotations? Sydent is a small project that would make for a good testbed! I decided my goal would be to get Sydent passing mypy under [--strict mode](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-strict). This is a command line option which turns on a number of extra checks (though not everything); it feels similar to passing `-Wall -Wextra -Werror` to `gcc`. It's a little extreme, but Sydent is a small project and this would be a good chance to see how hard it would be. In my view, the most useful options implied by strict mode were as follows.

### [--check-untyped-defs](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-check-untyped-defs)

By default, mypy will only analyze the implementation of functions that are annotated. On the one hand, without annotations for inputs and the return type, it's going to be hard for mypy to thoroughly check the soundness of your function. On the other, it can still do good work with the type information it has from other sources. Mypy can

- infer the type of literals, e.g. deducing `x: str` from  `x = "hello"`;
- lookup the return types of standard library calls, via `typeshed`; and similarly
- lookup the return types of any annotated functions in your code or dependencies.

The information is already available for free: we may as well try to use it to spot problems.

### [--disallow-untyped-defs](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-disallow-untyped-defs) and [friends](https://mypy.readthedocs.io/en/stable/command_line.html#untyped-definitions-and-calls)

This flag forces you to fully annotate every function. There are less extreme versions available, e.g. `--disallow-incomplete-defs`; but I think this is a good option to ensure full coverage of your module. It means you can rely on mypy's error output as a to-do list.

One downside to this: sometimes I felt like I was writing obvious boilerplate annotations, e.g.

```python
    def __str__(self) -> str:
        ...
```

There was one particular example of this that crops up a lot. Mypy has a special exception for a class's `__init__` and `__init_subclass__` methods. If a return type annotation is missing, it will [assume these functions return None](https://github.com/python/mypy/issues/604#issuecomment-348525995) instead of `Any`. (See  here for [its implementation](https://github.com/python/mypy/pull/5677).) This is normally compatible with `--disallow-untyped-defs` and `--disallow-incomplete-defs`, with one exception. If your `__init__` function takes no arguments other than `self`, mypy won't consider it annotated, and you'll need to write `-> None` explicitly.

It's also worth mentioning [--disallow-untyped-calls](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-disallow-untyped-calls), which will cause an error if an annotated function calls an unannotated function. Again, it helps to ensure that mypy has a complete picture of the types in your function's implementation. It also helps to highlight dependencies—if you see errors from this, it might be more practical to annotate the functions and modules it's calling first.

### [--warn-return-any](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-warn-return-any)

If I've written a function and annotated it to return an `int`, mypy will rightly complain if its implementation actually goes on to return a `str`.

```python
def foo() -> int:
    # error: Incompatible return value type (got "str", expected "int")
    return "hello"
```

If mypy isn't sure what type I'm returning though, i.e. if I'm returning an expression of type `Any`, then by default mypy will trust that we've done the right thing.

```python
def i_promise_this_is_an_int():
    return "hello"

def bar() -> int:
    reveal_type(i_promise_this_is_an_int()) # Any
    return i_promise_this_is_an_int()
```

Enabling `--warn-return-any` will disable this behaviour; to make this error pass we'll have to prove to mypy that `i_promise_this_is_an_int()` really is an `int`. Sometimes that will be the case, and an extra annotation will provide the necessary proof. At other times (like in this example), investigation will prove that there really is a bug!

### [--strict-equality](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-strict-equality)

This is a bit like a limited form of gcc's [-Wtautological-compare](https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html). Mypy will report and reject equality tests between incompatible types. If mypy can spot that an equality is always `False`, there's a good chance of there being a bug in your program, or else an incorrect annotation.

I'm not sure how general this check is, since users can define their own types with their own rules for equality by overriding [__eq__](https://docs.python.org/3/reference/datamodel.html?highlight=__eq__#object.__eq__). Perhaps it only applies to built-in types?

## Quantifying coverage

It was important to have some way to numerically evaluate our efforts to improve type coverage. It's a fairly abstract piece of work: there's nothing user-visible about it, unless we happen to discover a bug and fix it.

The most obvious metric is the number of total errors reported by mypy. Before the recent sprint, we had roughly 600 errors total.

```txt
dmr on titan in sydent on  HEAD (3dde3ad) via 🐍 v3.9.7 (env)
2021-11-08 12:35:37 ✔  $ mypy --strict sydent
Found 635 errors in 59 files (checked 78 source files)
```

This is a decent way to measure your progress when working on a particular module or package, but it's not perfect, because the errors aren't independent. Fixing one could fix another ten or reveal another twenty—the numeric value can be erratic.

### Reports

I found mypy's various [reports](https://mypy.readthedocs.io/en/stable/command_line.html#report-generation) to be a better approach here. There were three reports I found particularly useful.

#### `--html-report`

This produces a main index page showing the "imprecision" of each module. At the bottom of the table is a total imprecision value across the entire project.

  ![HTML report, index page. A table showing each module's precision and number of lines of code.](/blog/img/2021-12-17-sydent-typing-html-report-index.png)

The precision for each module is broken down line-by-line and colour-coded accordingly, which is useful for getting an intuition for what makes a line imprecise. More on that shortly.

  ![HTML report, module page. Most lines of source code are highlighted green; a minority are highlighted red.](/blog/img/2021-12-17-sydent-typing-html-report-module.png)

#### `--txt-report`

This reproduces the index page from the `html` report as a plain text file. It's slightly easier to parse—that's how I got the data for the precision line graphs in [part one](https://matrix.org/blog/2021/12/03/type-coverage-for-sydent-motivation) of this series. That was a quick and dirty hack, though; a proper analysis of precision probably ought to read from the json or xml output formats. Here's a truncated sample:

```txt
+-----------------------------------+-------------------+----------+
| Module                            | Imprecision       | Lines    |
+-----------------------------------+-------------------+----------+
| sydent                            |   0.00% imprecise |    1 LOC |
| sydent.config                     |   0.00% imprecise |  266 LOC |
| sydent.config._base               |   0.00% imprecise |   31 LOC |
| sydent.config.crypto              |  15.94% imprecise |   69 LOC |
| ...                               |               ... |      ... |
| sydent.validators                 |   0.00% imprecise |   61 LOC |
| sydent.validators.common          |   7.35% imprecise |   68 LOC |
| sydent.validators.emailvalidator  |   1.30% imprecise |  154 LOC |
| sydent.validators.msisdnvalidator |   1.34% imprecise |  149 LOC |
+-----------------------------------+-------------------+----------+
| Total                             |   5.95% imprecise | 9707 LOC |
+-----------------------------------+-------------------+----------+
```

#### `--any-exprs-report`

Selecting this option generate two reports: `any-exprs.txt` and `types-of-anys.txt`. The latter is interesting to understand where the `Anys` come from, but the former is more useful for quantifying the progress of typing. Another sample:

```txt
                  Name   Anys   Exprs   Coverage
-------------------------------------------------
                sydent      0       2    100.00%
         sydent.config      0     185    100.00%
   sydent.config._base      0       3    100.00%
  sydent.config.crypto     34      80     57.50%
sydent.config.database      0       8    100.00%
   sydent.config.email      0      86    100.00%
                   ...    ...     ...        ...
-------------------------------------------------
                 Total    544   11366     95.21%
```

The breakdown in `types-of-anys.txt` has more gory detail. I found the "Unimported" column particularly interesting: it lets us see how exposed we are to a lack of typing in our dependencies.

```txt
                             Name   Unannotated   Explicit   Unimported   Omitted Generics   Error   Special Form   Implementation Artifact
-------------------------------------------------------------------------------------------------------------------------------------------
                           sydent             0          0            0                  0       0              0                         0
                    sydent.config             0          3            0                  0       0              0                         0
              sydent.config._base             0          0            0                  0       0              0                         0
                              ...           ...        ...          ...                ...     ...            ...                       ...
        sydent.util.versionstring             0         80            0                  0       0              0                         0
                sydent.validators             0          4            0                  0       0              0                         0
         sydent.validators.common             0         20            0                  0       0              0                         0
 sydent.validators.emailvalidator             0          8            0                  0       0              0                         0
sydent.validators.msisdnvalidator             0          8            0                  0       0              0                         0
-------------------------------------------------------------------------------------------------------------------------------------------
                            Total             9       1276          273                  0      37              0                        17

```

### The meaning of precision

There are two metrics I chose to focus on:

- the proportion of "imprecise" lines across the project; I also used the complement, `precision = 100% - imprecision`, and
- the proportion of expressions whose type is not `Any`.

These are plotted in the graph at the top of this writeup. I could see that precision and the proportion of typed expressions were correlated, but I didn't understand how they differed. I couldn't see an explanation in the mypy docs, so I went [digging](https://github.com/python/mypy/blob/d807e097d142a88a48af93314d15ad87e41d2f19/mypy/stats.py) into the mypy source code. My understanding is as follows.

1. There are [five kinds of precision](https://github.com/python/mypy/blob/d807e097d142a88a48af93314d15ad87e41d2f19/mypy/stats.py#L27-L31). Full details are visible in the `--lineprecision-report`.
2. Two kinds of precision, `EMPTY` and `UNANALYZED` convey no information, because there's nothing to analyze.
3. A line is marked as precise, imprecise or any based on the expressions it uses.
   - An expression that has type `Any` leads to precision `ANY`.
   - I _think_ an expression that [involves `Any` but is not `Any`](https://github.com/python/mypy/blob/2907a4dea939e20ff39ef7d9ff85ae1a199a0ee8/mypy/stats.py#L422-L423) counts as imprecise. For instance, `Dict[str, Any]`.
   - Remaining expressions have precision `PRECISE`.
4. A line's precision is the worst of all its expressions' precisions.
   - `ANY` is worse than `IMPRECISE`, which is worse than `PRECISE`.

The "imprecision" number reported by mypy counts the number of lines [classified as `IMPRECISE` or `ANY`](https://github.com/python/mypy/blob/3bdef9fe6d401f3d2e0cacf4964bd315550c3394/mypy/xml/mypy-txt.xslt#L77-L78).

On balance, my preferred metric is the line-level (im)precision percentage. There wasn't much difference between the two in my experience, but the colour-coded visualisation in the HTML report is a neat feature to have. Maybe in the future there could be a version of the HTML report that colour-codes each _expression_?

## The larger typing ecosystem

There are plenty of articles out there about the typing. As well as the [mypy blog itself](http://mypy-lang.blogspot.com/), see Daniele Varrazzo's [post on `psycopg3` (2020)](https://www.varrazzo.com/blog/2020/03/31/first-experience-mypy/), Dropbox's [blog post (2019)](https://dropbox.tech/application/our-journey-to-type-checking-4-million-lines-of-python), Zulip's [blog post (2016)](https://blog.zulip.com/2016/10/13/static-types-in-python-oh-mypy/), Glyph's [blog post on `Protocols` (2020)](https://glyph.twistedmatrix.com/2020/07/new-duck.html) and a follow-up [comparing them to `zope.interface` (2021)](https://glyph.twistedmatrix.com/2021/03/interfaces-and-protocols.html) and Nylas's [blog (2019)](https://www.nylas.com/blog/not-your-pie-mypy/). I'm sure there's plenty more out there.

It's worth highlighting the `typeshed` project, which maintains stubs for the standard library, plus popular third-party libraries. I [submitted a PR](https://github.com/python/typeshed/pull/6150) to add a single type hint—it was a very pleasant experience! Microsoft has an [incubator](https://github.com/microsoft/python-type-stubs) of sorts for stubs too.

### Other typecheckers

After the sprint to improve coverage, I spent a short amount of time trying the alternative type checkers out there. Mypy isn't the _only_ typechecker out there—other companies have built and open-sourced their own tools, with different strengths, weaknesses and goals. This is by no means an authoritative, exhaustive survey—just my quick notes.

#### [Pyre](https://pyre-check.org/) (Facebook)

- I couldn't work out how to configure paths to resolve import errors; in the end, I wasn't able to process much of Sydent's source code.
- Couldn't get it to process annotations like `syd: "Sydent"` where "Sydent" is an import guarded by [TYPE_CHECKING](https://docs.python.org/3/library/typing.html?highlight=type_checking#typing.TYPE_CHECKING).
- No plugin system that I could see. That said, it has a separate mode/program for running ["Taint Analysis"](https://pyre-check.org/docs/pysa-basics) to spot security issues.
- Seemed stricter by default compared to mypy: there was less inference of types.
- Also has its own strict mode.

#### [Pyright](https://github.com/microsoft/pyright) (Microsoft)

- Didn't seem to recognise `getLogger` as being imported from `logging`. Not sure what happened there—maybe something wrong with its bundled version of `typeshed`?
- In a few places, Sydent uses `urllib.parse.quote` but only imports `urllib`. We must be unintentionally relying on our dependencies to `import urllib.parse` somewhere! Mypy didn't complain about this; pyright did.
- Seemed to give a better explanations of why complex types were incompatible. For example:

  ```txt
  /home/dmr/workspace/sydent/sydent/replication/pusher.py
     /home/dmr/workspace/sydent/sydent/replication/pusher.py:77:16 - error: Expression of type "DeferredList" cannot be assigned to return type "Deferred[List[Tuple[bool, None]]]"
       TypeVar "_DeferredResultT@Deferred" is contravariant
         TypeVar "_T@list" is invariant
           Tuple entry 2 is incorrect type
             Type "None" cannot be assigned to type "_DeferredResultT@_DeferredListResultItemT" (reportGeneralTypeIssues)
   /home/dmr/workspace/sydent/sydent/sms/openmarket.py
     /home/dmr/workspace/sydent/sydent/sms/openmarket.py:93:13 - error: Argument of type "dict[_KT@dict, list[bytes]]" cannot be assigned to parameter "rawHeaders" of type "Mapping[AnyStr@__init__, Sequence[AnyStr@__init__]] | None" in function "__init__"
       Type "dict[_KT@dict, list[bytes]]" cannot be assigned to type "Mapping[AnyStr@__init__, Sequence[AnyStr@__init__]] | None"
         TypeVar "_KT@Mapping" is invariant
           Type "_KT@dict" is incompatible with constrained type variable "AnyStr"
         Type cannot be assigned to type "None" (reportGeneralTypeIssues)
  ```

  This would have been really helpful when interpreting mypy's error reports; I'd love to see something like it in mypy.
  Here's another example where I tried running against a Synapse file.

  ```txt
  /home/dmr/workspace/synapse/synapse/storage/databases/main/cache.py
  /home/dmr/workspace/synapse/synapse/storage/databases/main/cache.py:103:53 - error: Expression of type "list[tuple[Unknown, Tuple[Unknown, ...]]]" cannot be assigned to declared type "List[Tuple[int, _CacheData]]"
    TypeVar "_T@list" is invariant
      Tuple entry 2 is incorrect type
        Tuple size mismatch; expected 3 but received indeterminate number (reportGeneralTypeIssues)
  ```

  This is really valuable information. It's worth considering Pyright as an option to get a second opinion!
- It looks like Pyright's name for `Any` is `Unknown`. I think that does a better job of emphasising that `Unknown` won't be type checked. I'd certainly be more reluctant to type `x: Unknown` versus `x: Any`!
- Pyright is the machinery behind [Pylance](https://github.com/microsoft/pylance-release), which drives [VS Code's Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance). That alone probably makes it worthy of more eyes.
- Seemed like it was the best-placed alternative typechecker to challenge mypy (the de-facto standard).

#### [Pytype](https://github.com/google/pytype) (Google)

- Google internal? Seems to be maintained by one person semiregularly by "syncing" from Google.
- Apparently contains a script [merge-pyi](https://github.com/google/pytype/tree/master/pytype/tools/merge_pyi) to annotate a source file given a stub file.
- No support for TypedDict: as soon as it saw one in Sydent, it stopped all analysis.
- No Python 3.10 support (according to the README anyway).
- I think it might use a different kind of typing semantics; its [typing FAQ](https://google.github.io/pytype/typing_faq.html) speaks of "descriptive typing" and a more lenient approach.

#### [PyCharm](https://www.jetbrains.com/pycharm/)

PyCharm has its own means to typechecking code as you write it. It's definitely caught bugs before, and having the instant feedback as you type is really nice! I have seen it struggle with `zope.interface` and some uses of `Generic`s though.

### Runtime uses of annotations

When annotations [were first introduced](https://www.python.org/dev/peps/pep-3107/), they were a generic means to associate Python objects with parts of a program. (It was only later that the community agreed that we really want to use them to annotate _types_). These annotations are available at runtime in the `__annotations__` attribute. There's also a helper function in `typing` which will help resolve forward references.

```python
>>> from typing import get_type_hints
>>> def foo(x: int) -> str: pass
...
>>> get_type_hints(foo)
{'x': <class 'int'>, 'return': <class 'str'>}
```

Programs and libraries are free to use these annotations at runtime as they see fit. The most well-known examples are probably [dataclasses](https://docs.python.org/3/library/dataclasses.html), [attrs](https://www.attrs.org/en/stable/) with [auto_attribs=True](https://www.attrs.org/en/stable/types.html) and [Pydantic](https://pydantic-docs.helpmanual.io/). I'd be interested to learn if anyone else is consuming annotations at runtime!

## Summary

All in all, in a two-week sprint we were able to get Sydent's mypy coverage from a precision of 83% up to 94%. Our work would have spotted the [bytes-versus-strings bug](https://github.com/matrix-org/sydent/pull/415); we understand why [the missing await](https://github.com/matrix-org/sydent/pull/413) wasn't detected. We [fixed](https://github.com/matrix-org/sydent/issues/419) [other](https://github.com/matrix-org/sydent/issues/449) [small](https://github.com/matrix-org/sydent/issues/447) [bugs](https://github.com/matrix-org/sydent/issues/445) too as part of the process. As well as fix bugs, I've hopefully made the source code clearer for future readers (but that one is hard to quantify).

There's room to spin out contributions upstream too. I submitted [two](https://github.com/twisted/twisted/pull/1669) [PRs](https://github.com/twisted/twisted/pull/1668) to twisted upstream; have started to work on annotations for [pynacl](https://github.com/pyca/pynacl/pull/693) [in my](https://github.com/pyca/pynacl/pull/694) [spare time](https://github.com/pyca/pynacl/pull/695); and submitted a quick fix to [typeshed](https://github.com/python/typeshed/pull/6150).

Looking forward, I think we'd get a quick gain from ensuring that our smaller libraries ([signedjson](https://github.com/matrix-org/python-signedjson), [canonicaljson](https://github.com/matrix-org/python-canonicaljson)) are annotated. We'll be sticking with mypy for now—the `mypy-zope` plugin is crucial given our reliance on twisted. We're also working to improve Sygnal and Synapse—though not to the extreme standard of `--strict` across everything.

I'd say the biggest outstanding hole is our processing of JSON objects. There's too much `Dict[str, Any]` flying around. The ideal for me would be to define `dataclass` or `attr.s` class `C`, and be able to deserialise a JSON object to `C`, including automatic (deep) type checking. [Pydantic](https://pydantic-docs.helpmanual.io/) sounds really close to what we want, but I'm told it will by default gladly interpret the json string `"42"` as the Python integer `42`, which isn't what we'd like. More investigation needed there. There are other avenues to explore too, like [jsonschema-typed](https://github.com/erickpeirson/jsonschema-typed), [typedload](https://pypi.org/project/typedload/) or [attrs-strict](https://github.com/bloomberg/attrs-strict).

To end, I'd like to add a few personal thoughts. Having types available in the source code is definitely A Good Thing. But there is a part of me that wonders if it might have been worth writing our projects in a language which incorporates types from day one. There are always trade-offs, of course: runtime performance, build times, iteration speed, ease of onboarding new contributors, ease of deployment, availability of libraries, ability to shoot yourself in the foot... the list goes on.

On a more upbeat note, adding typing is a great way to get familiar with new source code. It involves a mixture of reading, cross-referencing, deduction, analysis, all across a wide variety of files. It'd be a _lot_ easier to type as you write from the get-go, but typing after the fact is still a worthy use of time and effort.

----

Many thanks for reading! If you've got any corrections, comments or queries, I'm available on Matrix at [@dmrobertson:matrix.org](https://matrix.to/#/@dmrobertson:matrix.org).
