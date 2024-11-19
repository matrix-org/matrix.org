+++
title = "Creating a simple read-only Matrix client"
aliases = ["/docs/guides/creating-a-simple-read-only-matrix-client"]
+++

I created [matrix-enact] as a fun way to render Matrix rooms - it
essentially "performs" the room history by progressively speaking each message
event in chronological order. In this way, [matrix-enact] is effectively a
simple, read-only Matrix client. Let's see how it was built.

This article will introduce two important concepts in Matrix, specifically in
the [Matrix Client-Server API]:

* guest access
* the `/context` endpoint, which gets messages before and after a given event

## Not using the matrix-js-sdk

Although written in JavaScript (and Reactjs), this project does not use the
[matrix-js-sdk], it makes direct HTTP calls to the [Matrix Client-Server API].
Because there are only three endpoints we need to hit, we can keep the project
very light by not including an SDK.

## Get Guest access_token

Matrix allows for [guest access](https://matrix.org/docs/spec/client_server/latest.html#guest-access) by
providing an interface to register a new guest user and be immediately given an
access token. To do this we call the `/register` endpoint with a query param
`kind` set to `guest`. In matrix-enact, this looks like:

```javascript
import axios from 'axios';
var url = "https://matrix.org/_matrix/client/r0/register?kind=guest";
const res = await axios.post(url, {});
const { data } = await res;
// data.access_token will contain the access token, we must store it
```

Once we have the access token, we use it in the same way as if logged in with a
normal user.

## Translate a Room Alias to a Room ID

In the UI, the user can enter either a room alias or a room ID. Whichever they
enter, to get message content from a room we need the ID. This means we need to
detect if an alias has been entered, and if so get the correct room ID for that
alias:

```javascript
// we know that if the first character is a '#', we have an alias not an id
if (this.state.roomEntry[0] === "#") {
    var getIdUrl = "https://matrix.org/_matrix/client/r0/directory/room/";
    getIdUrl += encodeURIComponent(this.state.roomEntry);
    const res = await axios.get(getIdUrl);
    const { data } = await res;
    // data.room_id contains the room id for the alias
}
```

## `/context` endpoint

We use the `/context` endpoint to get chronological history of a room timeline.

Looking at [this section of the Client-Server API][context] we see:

> This API returns a number of events that happened just before and after the
  specified event. This allows clients to get the context surrounding an
  event.

To get messages from this endpoint we need to provide a room id and the event id
we want context for. Check out the comments in the code below to follow along.

```javascript
async loadScriptFromEventId(startEventId) {
    // first we construct the url as per the CS API
    const url = `https://matrix.org/_matrix/client/r0/rooms/${encodeURIComponent(roomId)}/context/${encodeURIComponent(startEventId)}?limit=100&access_token=${this.state.accessToken}`;

    axios.get(url).then(res => {
        // make an array to store the events from the response
        var newEvents = [];

        // we only want the events that follow our start events
        newEvents = newEvents.concat(res.data.events_after);

        // and we only want events that contain a body field, i.e. that are messages
        newEvents = newEvents.filter(e => e.content.body);

        // finally, since we're using React for this app,
        // we store these messages in the state object
        this.setState({events: this.state.events.concat(newEvents)});
    });
}
```

## Loop until we have enough messages

Notice the previous URL we hit when calling `/context`. We specified a `limit`
value of `100`. In fact, `100` is usually the limit enforced by the homeserver.
This limit refers to the number of events, not the number of messages -
remember that we are filtering them in the code above.

If we say that we want our script to be 50 lines long, but after filtering we
are left with only 30 messages, what should we do? Get more events after the
latest one, and append the new events to our script. Knowing that we have taken
a value from the form to be stored in `state.messageCount`, and in the previous
section we inserted message events into `state.events`, we can compare these
two variables, and if needed, call `loadScriptFromEventId()` again with the
last known event.

```javascript
if (this.state.messageCount > this.state.events.length) {
    // get last known event
    var lastEvent = res.data.events_after[res.data.events_after.length - 1];
    this.loadScriptFromEventId(lastEvent.event_id);
} else {
    this.setState({events: this.state.events.slice(0, this.state.messageCount), statusMessage: "Done"});
}
```

## Using the Web Audio API

The [Web Audio API] is a massive topic, out of the scope of this article. We'll
cover just enough to be able to show the "happy path" of performing
Text-to-Speech (TTS) sequentially.

To deliver a line as audio, the fundamental code is as follows:

```javascript
var utterance = new SpeechSynthesisUtterance();
utterance.text = "some string";
var someVoice = window.speechSynthesis.getVoices()[0];
utterance.voice = someVoice;
window.speechSynthesis.speak(utterance);
```

To find out when an utterance ends, attach a function to the onend event:

```javascript
utterance.onend = function() {
    // do something when the line ends
};
```

Knowing that we can perform TTS on strings we provide, and that we can call a
function when a line ends, from here it's easy to see how we can use the list
of messages to "enact" the message history.

## Using the Web Audio API with React

We will:

* assign each user a random voice from TTS voices available in the current
  browser
* trigger each line sequentially and with the correct voice, thus giving the
  impression of a script being performed

Let's create a `nextLine()` function in our `App` component, and use this to
insert lines associated with "Parts", meaning that each part is a separate user
with an assigned voice.

```javascript
nextLine() {
    var line = this.state.line;
    if (! this.state.events[line]) return;
    var newPart = this.state.events[line].sender;
    if (! this.state.parts.find(p =>{return p.name === newPart;})) {
        this.setState({
        parts: this.state.parts.concat([{
            name: newPart,
            voice: voices[getRandomInt(0, voices.length)]
        }])
        })
    }
    this.setState({
        script: this.state.script.concat(this.state.events[line]),
        line: this.state.line + 1,
        nextText: "Continue"
    });
}
```

By incrementing the `line` counter, we progress through the script, adding a
line at a time to the correct `Part`.

During rendering, the App renders an array of `Part` Components, which in turn
render an array of lines, filtered for that particular Part:

```javascript
const lines = this.props.script.map((line, lineNumber) => {
    line.lineNumber = lineNumber;
    return line; 
}).filter(l => l.sender === part.name);
```

Knowing that in React, the `constructor` for a Component is called only once, we
perform the TTS process itself inside the constructor method:

```javascript
class Line extends Component {
  constructor(props) {
    super(props);
    var utterance = new SpeechSynthesisUtterance();
    var nextLine = this.props.nextLine;
    utterance.text = this.props.lineText;
    utterance.voice = this.props.part.voice;
    synth.speak(utterance);
  }
}
```

Finally, we'll use what we already learned about the `onend` event to insert the
next line:

```javascript
class Line extends Component {
  constructor(props) {
    super(props);
    var utterance = new SpeechSynthesisUtterance();
    var nextLine = this.props.nextLine;
    utterance.onend = function(a) {
      nextLine();
    };
    utterance.text = this.props.lineText;
    utterance.voice = this.props.part.voice;
    synth.speak(utterance);
  }
}
```

In this way, nextLine() is called in a loop, meaning that the lines are added to
React sequentially, and spoken aloud as they are added.

## Conclusion

This article covered a lot of ground:

* Matrix Guess access
* the [`/context/` API endpoint][context]
* filtering content from Matrix events
* passing these strings to the [Web Audio API]

To learn more about Matrix development, check out the
[Matrix Documentation](https://matrix.org/docs/).

[Matrix Client-Server API]: https://matrix.org/docs/spec/client_server/latest.html
[matrix-enact]: https://github.com/benparsons/matrix-enact
[context]: https://matrix.org/docs/spec/client_server/latest#get-matrix-client-r0-rooms-roomid-context-eventid
[Web Audio API]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
[matrix-js-sdk]: https://github.com/matrix-org/matrix-js-sdk
