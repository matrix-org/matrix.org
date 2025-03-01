+++
title = "Introducing Matrix Widgets - including Jitsi video conferencing!"
path = "/blog/2017/08/23/introducing-matrix-widgets"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

We've been working hard over the last few months on the brand new concept of Matrix "widgets” (sometimes called “apps”, but we'll call them “widgets” here to be marginally less ambiguous) - and we're super excited to see an initial implementation of them land today in Riot/Web 0.12 (alongside always-on Rich Text Editor - the culmination of huge amounts of work by Aviral Dasgupta in his GSoC 2016 project and Luke from the core Matrix team).  For user-focused details about Riot 0.12 you should probably head over to the <a href="https://medium.com/@RiotChat/riot-im-web-0-12-7c4ea84b180a">Riot blog</a>; meanwhile we'll focus here on widgets from the developer perspective.

Widgets are a deceptively simple idea: the ability to pin small form-factor webapps (called widgets) into a given Matrix room, letting admins build up a dashboard of functionality which is then in common and automatically available to everyone who views that room.  You can think of it as being similar to installing an app onto a smartphone, but instead pulling it into a Matrix conversation.  This could be a <a href="https://jitsi.org">Jitsi</a> video conference, or a collaborative document editor, or a <a href="https://grafana.com">Grafana</a> dashboard, or anything you can imagine really (assuming its security headers support embedding).  Here's an example of a room with an ongoing Jitsi conference coupled with a Grafana graph, as you might use for a devops war room:

<img class="aligncenter size-full wp-image-2745" src="/blog/wp-content/uploads/2017/08/widgets.png" alt="" width="929" height="605" />

The URLs of the widgets are stored in the state of the room with some high-level layout hints, and the idea is that any Matrix client will be able to expose the widgets for the current room to a user.  For a simple command-line client this could just be listing the URLs of the widgets so the user can open them in a browser; for a web client like Riot/Web they're embedded via iframes; for a native client like Riot/iOS they could be shown via a WebView - or there's always the chance of the native client recognising the URL being requested and swapping it out for an optimised local native implementation instead.  For now, widgets don't really have a way of communicating with the host Matrix client (other than by speaking Matrix to the homeserver!), although we're looking at adding a PostMessage API to improve this.

Now, in an ideal world we would have enough bandwidth to have formally added widgets to the Matrix spec, but unfortunately we are way behind on spec work currently, thanks in part to our current funding problems. (Remember, if you like Matrix, <a href="/blog/2017/07/07/a-call-to-arms-supporting-matrix/">please donate or get your company to donate</a> otherwise we are at real risk of hitting a very big funding wall).  Rather than formal spec, we've focused on rushing an initial implementation out the door in matrix-react-sdk (and thus riot-web) to see how they work first in reality.  Riot/iOS and Riot/Android are coming soon - although we've special-cased the Jitsi video conferencing widget in iOS to be implemented natively, which is actually available already on develop(!)

Right now the widgets supported by Riot are prefixed behind the <code>im.vector.modular.widgets</code> state event, whose format is something like:

```js
{
    type: "im.vector.modular.widgets",
    state_key: "widget1",
    content: {
        type: "grafana",
        url: "https://matrix.org/grafana/whatever",
        name: "matrix.org bridges dashboard"
    }
    room_id: "!foo:bar.com",
    sender: "@kegan:matrix.org"
}
```

Currently the only layout hint is that the order of the event determines the order in which the widget should be displayed on the page.  Riot/Web's initial implementation is very naive and shows only up to two widgets per page, although we're hoping to make this much more generic and flexible in future.  To add widgets in Riot/Web you can now hit the new widget manager button in the top right - and to show/hide existing ones in the room you can hit the show/hide app drawer button in the bottom right.

The UI for adding widgets to a room in Riot is currently via Modular - the new name for Riot's SaaS integration hosting platform, formally codenamed Scalar.  This is a separate webapp loaded in an iframe which guides you through choosing widgets to embed which are hosted by Modular, although in the near future we'll also add UI to let you specify widget URLs directly.  If you need this today, you'll need to manually inject a state event like the one above into the room to provision the widget.

This is very much the minimum viable implementation of widgets: the stuff left to do includes:
<ul>
  <li>Adding them to the spec, and getting clients other than Riot using them!</li>
  <li>Supporting better layouts (especially to allow for more screen real-estate) and more than 2 widgets</li>
  <li>Ability to add widgets directly, for situations where Modular isn't available</li>
  <li>Speccing APIs for widgets to interact directly with the host client - with the appropriate permissions model</li>
  <li>Adding lots more prepackaged widgets to the Modular store!</li>
</ul>
Modular comes with 6 widgets ready to go: Grafana, Jitsi, Etherpad, YouTube, Google Docs and Custom Widget (which lets you add any arbitrary URL into the room). The most exciting of these is probably Jitsi, which provides Hangouts-style video conferencing into any room.  This provides a welcome alternative to our 'native' conferencing functionality which sadly got stuck in a permanent early beta - and includes full screensharing as well!  The only catch is that it hasn't been released on iOS yet, and Android is still be to be implemented - but the experience is a still massive improvement over what we've had historically.  Here's a screenshot of some of the core team doing a 6-way conference with the native Jitsi functionality now included in Riot/iOS!

<img class="aligncenter size-full wp-image-2746" src="/blog/wp-content/uploads/2017/08/jitsi-ios.png" alt="" width="1689" height="884" />

Finally, if you want to write your own widget, just create a webapp and play with it via the Custom Widget interface.  If it's something useful for other people then please ping us on #matrix-dev:matrix.org and we'll see about getting it added as a preset application in Modular.

We think widgets are an awesome example of how Matrix can be used to coordinate collaboration between users in a room - for now it's just simply ensuring that users are looking at the same set of webapps when in a room, but in future you can see how it could extend to co-browsing, co-editing, payment functionality, or generally using Matrix to coordinate things other than textual/voip chat.  The sky's the limit, and we're hoping the Modular store (and other app stores) will start overflowing with apps in the near future!

As always, feedback is very welcome on new experimental stuff like this - so please come tell us what you think in <a href="https://matrix.to/#/#matrix:matrix.org">#matrix:matrix.org</a>!  And finally: huge kudos to Rick, Kegan, Rob, and everyone else who have been working away bringing Widgets to life.  It's the beginning of a new era :D

Matthew
