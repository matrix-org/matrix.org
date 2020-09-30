# Error handling

All requests made by clients/widgets over the Widget API should have a timeout of about 10 seconds.
If after 10 seconds no response was received, the application should either try again or give up.

Errors related to executing a request should be sent as a `response` looking like the following:

```json
{
    "api": "fromWidget",
    "requestId": "generated-id-1234",
    "widgetId": "20200827_WidgetExample",
    "action": "com.example.say_hello",
    "data": {
        "request-param": "value"
    },
    "response": {
        "error": {
            "message": "Failed to process request: Server returned 500 error"
        }
    }
}
```
