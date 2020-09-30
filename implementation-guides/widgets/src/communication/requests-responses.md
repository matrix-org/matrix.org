# Requests/Responses

Requests are structured objects sent over `postMessage` to the other side, where they then
respond with responses. All requests must have a response, or time out.

An example request is:

```json
{
    "api": "fromWidget",
    "widgetId": "20200827_WidgetExample",
    "requestId": "generated-id-1234",
    "action": "com.example.say_hello",
    "data": {
        "request-param": "value"
    }
}
```

The `api` is either `fromWidget` or `toWidget` depending on where the request is originating from.
If it's from the widget, `fromWidget`. If it's from the client, `toWidget`.

The `widgetId` is the widget's ID and should be used to ensure requests are coming from a valid
source. The `requestId` is generated and should be unique within the session.

The `action` is what describes the request, and what `data` attributes to include. A full description
of all actions available can be found in the widget specification.

Responses are simply a copy of the request object with an added `response` field, where the attributes
are defined by the `action` being executed.
