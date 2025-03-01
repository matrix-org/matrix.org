+++
title = "Introduction to Application Services"
path = "/blog/2015/03/02/introduction-to-application-services"

[taxonomies]
author = ["Kegan Dougal"]
category = ["Tutorials"]
+++

<strong>This post has now been edited into a guide - you can find <a href="https://github.com/matrix-org/matrix-doc/blob/master/supporting-docs/guides/2015-08-21-application_services.md">the source in github</a>, and the <a href="http://matrix.org/docs/guides/application-services">formatted guide on the matrix.org website</a>!</strong>

<hr />

Hi everyone. I'm Kegan, one of the core developers on Matrix. I'd like to explain a bit more about one of the upcoming features in Matrix: Application Services. This is an entirely new component in the Matrix architecture which gives great power (along with great responsibility!) to the wielder.

Application services are distinct modules which which sit alongside a home server providing arbitrary extensible functionality decoupled from the home server implementation. Just like the rest of Matrix, they communicate via HTTP using JSON. Application services function in a very similar way to traditional clients, but they are given much more power than a normal client. They can reserve entire namespaces of room aliases and user IDs for their own purposes. They can silently monitor events in rooms, or any events directed at any user ID. This power allows application services to have extremely useful abilities which overall enhance the end user experience.

One of the main use cases for application services is for protocol bridges. As you may know, we have an IRC bridge bot on matrix.org which resides as a user on #matrix, #matrix-dev, #openwebrtc and #vuc which bridges into freenode. There is nothing special about this bot; it is just treated as a client. However, this limits the things the bot can do. For example, the bot cannot reserve the virtual user IDs it creates, and cannot lazily bridge arbitrary IRC rooms on-the-fly. By using application services, the IRC bot can do both of these things. This would allow any Matrix user to join a room alias which doesn't exist: say <code>#irc.freenode.python:matrix.org</code>, which would then tell the application service to create a new Matrix room, make the alias for it, join #python on freenode and bridge into it. Any IRC user on #python would then be provisioned as a virtual user e.g. <code>@irc.freenode.alice:matrix.org</code>. This also allows PMs to be sent directly to <code>@irc.freenode.alice:matrix.org</code>, no matter what channel Alice is on.

Application services have enormous potential for creating new and exciting ways to transform and enhance the core Matrix protocol. For example, you could aggregate information from multiple rooms into a summary room, or create throwaway virtual user accounts to proxy messages for a fixed user ID on-the-fly. As you may expect, all of this power assumes a high degree of trust between application services and home servers. Only home server admins can allow an application service to link up with their home server, and the application service is in no way federated to other home servers. You can think of application services as additional logic on the home server itself, without messing around with the book-keeping that home servers have to do. This makes adding useful functionality very easy.

<strong>Example</strong>

The application service (AS) API itself uses webhooks to communicate from the home server to the AS:

- Room Alias Query API : The home server hits a URL on your application server to see if a room alias exists.
- User Query API : The home server hits a URL on your application server to see if a user ID exists.
- Push API : The home server hits a URL on your application server to notify you of new events for your users and rooms.

A very basic application service may want to log all messages in rooms which have an alias starting with "#logged_" (side note: logging won't work if these rooms are using end-to-end encryption).

Here's an example of a very basic application service using Python (with Flask and Requests) which logs room activity:
<pre># app_service.py:

import json, requests  # we will use this later
from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route("/transactions/&lt;transaction&gt;", methods=["PUT"])
def on_receive_events(transaction):
    events = request.get_json()["events"]
    for event in events:
        print "User: %s Room: %s" % (event["user_id"], event["room_id"])
        print "Event Type: %s" % event["type"]
        print "Content: %s" % event["content"]
    return jsonify({'{'}{'}'})

if __name__ == "__main__":
    app.run()
</pre>
Set your new application service running on port 5000 with:
<pre>python app_service.py
</pre>
The home server needs to know that the application service exists before it will send requests to it. This is done via a registration YAML file which is specified in Synapse's main config file e.g. <code>homeserver.yaml</code>. The server admin needs to add the application service registration configuration file as an entry to this file.
<pre># homeserver.yaml
app_service_config_files:
  - "/path/to/appservice/registration.yaml"
</pre>
NB: Note the "-" at the start; this indicates a list element. The registration file <code>registration.yaml</code> should look like:
<pre># registration.yaml

# this is the base URL of the application service
url: "http://localhost:5000"

# This is the token that the AS should use as its access_token when using the Client-Server API
# This can be anything you want.
as_token: wfghWEGh3wgWHEf3478sHFWE

# This is the token that the HS will use when sending requests to the AS.
# This can be anything you want.
hs_token: ugw8243igya57aaABGFfgeyu

# this is the local part of the desired user ID for this AS (in this case @logging:localhost)
sender_localpart: logging
namespaces:
  users: []
  rooms: []
  aliases:
    - exclusive: false
      regex: "#logged_.*"
</pre>
<strong>You will need to restart the home server after editing the config file before it will take effect.</strong>

To test everything is working correctly, go ahead and explicitly create a room with the alias "#logged_test:localhost" and send a message into the room: the HS will relay the message to the AS by PUTing to /transactions/&lt;tid&gt; and you should see your AS print the event on the terminal. This will monitor any room which has an alias prefix of "#logged_", but it won't lazily create room aliases if they don't already exist. This means it will only log messages in the room you created before: #logged_test:localhost. Try joining the room "#logged_test2:localhost" without creating it, and it will fail. Let's fix that and add in lazy room creation:
<pre>@app.route("/rooms/&lt;alias&gt;")
def query_alias(alias):
    alias_localpart = alias.split[":"][0](1:)
    requests.post(
        # NB: "TOKEN" is the as_token referred to in registration.yaml
        "<a href="http://localhost:8008/_matrix/client/api/v1/createRoom?access_token=TOKEN" target="_blank">http://localhost:8008/_matrix/client/api/v1/createRoom?access_token=TOKEN</a>",
        json.dumps({'{'}
            "room_alias_name": alias_localpart
        {'}'}),
        headers={'{'}"Content-Type":"application/json"{'}'}
    )
    return jsonify({'{'}{'}'})
</pre>
This makes the application service lazily create a room with the requested alias whenever the HS queries the AS for the existence of that alias (when users try to join that room), allowing any room with the alias prefix #logged_to be sent to the AS. Now try joining the room "#logged_test2:localhost" and it will work as you'd expect.  You can see that if this were a real bridge, the AS would have checked for the existence of #logged_test2 in the remote network, and then lazily-created it in Matrix as required.

Application services are powerful components which extend the functionality of home servers, but they are limited. They can only ever function in a "passive" way. For example, you cannot implement an application service which censors swear words in rooms, because there is no way to prevent the event from being sent. Aside from the fact that censoring will not work when using end-to-end encryption, all federated home servers would also need to reject the event in order to stop developing an inconsistent event graph. To "actively" monitor events, another component called a "Policy Server" is required, which is beyond the scope of this post.  Also, Application Services can result in a performance bottleneck, as all events on the homeserver must be ordered and sent to the registered application services.  If you are bridging huge amounts of traffic, you may be better off having your bridge directly talk the Server-Server federation API rather than the simpler Application Service API.

I hope this post demonstrates how easy it is to create an application service, along with a few ideas of the kinds of things you can do with them. Obvious uses include build protocol bridges, search engines, invisible bots, etc. For more information on the AS HTTP API, check out the new <a href="http://matrix.org/docs/spec/#application-service-api">Application Service API</a> section in the spec, or the raw drafts and spec in <a href="https://github.com/matrix-org/matrix-doc/" target="_blank">https://github.com/matrix-org/matrix-doc/</a>.  The AS API is not yet frozen, so feedback is very welcome!
