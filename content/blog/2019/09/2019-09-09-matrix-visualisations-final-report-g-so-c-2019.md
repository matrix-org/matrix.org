+++
title = "Matrix Visualisations final report (GSoC 2019)"
path = "/blog/2019/09/09/matrix-visualisations-final-report-g-so-c-2019"

[taxonomies]
author = ["Eisha Chen-yen-su"]
category = ["GSOC"]

[extra]
image = "https://raw.githubusercontent.com/Kagamihime/gsoc-2019-final-report/master/events_display.png"
+++

The Google Summer of Code 2019 is coming to an end for me, so it means that it’s time for the final report.

## The work done

I’ve been taking care of the project “Matrix Visualisations” during these past months. This project aimed at initiating the development of a tool which allows the real-time visualisation of the events DAG of a given Matrix room, as seen from the perspective of one or more homeservers (HS’s).

Regarding my initial proposal, I’ve completed every task proposed and even implemented some additional functionalities. The application is not finished yet and there could be a lot of improvements added to it (especially regarding the design of the UI) but the core functionalities have been implemented.<br/>
I am going to precise what has been accomplished and then give some ideas of features to improve.

During GSoC, I have used two separate repositories for [the frontend](https://github.com/Kagamihime/matrix-visualisations) and [the backend](https://github.com/Kagamihime/matrix-visualisations-backend). I will keep both of them because I’m referencing PRs from them (as PRs are easier to link than lengthy lists of commits).<br/>
However, this is [the repository](https://github.com/Kagamihime/matrix-visualisations-complete) regrouping these two parts and this one will be moved to matrix-org for the continuation of this project.

### Complete the implementation of the CS API backend

During the application period, I wrote a prototype for this project. This prototype implemented some requests to the CS API (like [/login](https://matrix.org/docs/spec/client_server/r0.5.0#get-matrix-client-r0-login), [/logout](https://matrix.org/docs/spec/client_server/r0.5.0#post-matrix-client-r0-logout) or [/sync](https://matrix.org/docs/spec/client_server/r0.5.0#get-matrix-client-r0-sync)) but there were more requests to implement in order to be able to fully use this API:

* In order for the application to automatically join (and leave at the end) a room if the provided account hasn’t already joined it, I implemented the requests to [/joined_rooms](https://matrix.org/docs/spec/client_server/r0.5.0#get-matrix-client-r0-joined-rooms), [/join](https://matrix.org/docs/spec/client_server/r0.5.0#post-matrix-client-r0-rooms-roomid-join) and [/leave](https://matrix.org/docs/spec/client_server/r0.5.0#post-matrix-client-r0-rooms-roomid-leave).
* The request [/messages](https://matrix.org/docs/spec/client_server/r0.5.0#get-matrix-client-r0-rooms-roomid-messages) has been implemented to allow the application to fetch previous messages.
* For retrieving in real-time new events, I used the field `from` in the [/sync](https://matrix.org/docs/spec/client_server/r0.5.0#get-matrix-client-r0-sync) request.

I also did a lot of clean up in the source code from the prototype during this task. You can have more details in [this PR](https://github.com/Kagamihime/matrix-visualisations/pull/1).

### Implement the first UI to interact with the DAG

First of all, a lot of work had to be made in order to properly update the displayed DAG when adding new events to it. At this point, I previously used the `setData` method of the `Network` object of [the visjs library](https://visjs.org/) (which is used for displaying the graph and interacting with it) each time a node was added, but it was resetting the display each time it was called.<br/>
The proper solution was to progressively add nodes and edges to the `DataSet` object passed to the constructor of the network (see the documentation of [DataSet](https://visjs.github.io/vis-data/data/index.html) and [Network](https://visjs.github.io/vis-network/docs/network/) for more details).

The DAG has been set to be displayed vertically, the events with the same depth are at the same level, the deepest events are at the bottom. The events which origin is the HS on which we are making the observation are in green, those which are coming from other servers are in orange.
Here is a picture of what it looks like:
![Events display](https://raw.githubusercontent.com/Kagamihime/gsoc-2019-final-report/master/events_display.png "Events display")

In the graph, there is a special node just after the earliest event which allows us to ask the application to load more events. Here is what it looks like:
![More Events button](https://raw.githubusercontent.com/Kagamihime/gsoc-2019-final-report/master/more_events_button.png "More Events button")

When you double click on the node of an event, there is a text area on the right which displays its complete JSON body, like this:
![JSON body display](https://raw.githubusercontent.com/Kagamihime/gsoc-2019-final-report/master/body_display.png "JSON body display")

I’ve also implemented the possibility to choose which particular fields of the event can be directly displayed in the labels of the nodes of the displayed graph:
![Fields selection](https://raw.githubusercontent.com/Kagamihime/gsoc-2019-final-report/master/fields_selection.png "Fields selection")

### Synapse PostgreSQL backend

Next, I implemented a backend for retrieving events from the PostgreSQL database of a Synapse HS. It is a small HTTP server which receives requests from the frontend application and then makes queries to the Synapse database to get the requested events.<br/>
You can find details about the API for using this backend in [this readme](https://github.com/Kagamihime/matrix-visualisations-backend/blob/master/README.md), in the “HTTP REST API” section.<br/>
You can find more details about this initial implementation: [here](https://github.com/Kagamihime/matrix-visualisations-backend/pull/1), [here](https://github.com/Kagamihime/matrix-visualisations-backend/pull/2), [here](https://github.com/Kagamihime/matrix-visualisations-backend/pull/3) (my mentor helped me on this one, thanks to him), and [here](https://github.com/Kagamihime/matrix-visualisations-backend/pull/5).<br/>
I’ve added the support of this backend in the frontend application, as well as a way to choose which backend to use (between this one and the CS API) in [this PR](https://github.com/Kagamihime/matrix-visualisations/pull/4).

### Multiple views

I implemented the ability to observe the same DAG of a room from multiple HS’s. This is done with “views”.

![View selection](https://raw.githubusercontent.com/Kagamihime/gsoc-2019-final-report/master/backend_selection.png "View selection")

In the picture above, you can see that there is a drop down menu from which you can select the view. The fields under this line are used to control the selected view: indicate where it will be connecting, for which room (you could as well observe a different room in a different view), etc…<br/>
By default, there is only one view but you can add as many as you want by clicking “Add a view”.

All the DAGs from the different views are displayed side-by-side within the same canvas, like this:
![Multiple DAGs](https://raw.githubusercontent.com/Kagamihime/gsoc-2019-final-report/master/multiple_dags.png "Multiple DAGs")

You can have a look at the details of the implementation in [this PR](https://github.com/Kagamihime/matrix-visualisations/pull/6).

### Add Federation API support

The next major task I had to do was the implementation of a backend for retrieving events via the Federation API. I thought a lot about the possible options for the location of this backend and I decided to extend the web server created for the PostgreSQL Synapse backend, so that we could launch it in a “postgres mode” or “federation mode”. But the backend would offer the same HTTP API in both modes.

The backend uses [the Federation API](https://matrix.org/docs/spec/server_server/r0.1.3) in the following way:

* Before being able to retrieve events from a certain room, the backend must join it with [/make_join](https://matrix.org/docs/spec/server_server/r0.1.3#get-matrix-federation-v1-make-join-roomid-userid) and [/send_join](https://matrix.org/docs/spec/server_server/r0.1.3#put-matrix-federation-v1-send-join-roomid-eventid) requests, it creates an “imaginary user” in this room. The join event created during this process will be the one returned by the endpoint `/deepest`.
* To get earlier events, the backend uses [/backfill](https://matrix.org/docs/spec/server_server/r0.1.3#get-matrix-federation-v1-backfill-roomid) requests.
* In order to get new events, the backend listens for pushed events from other HS’s with the [/send](https://matrix.org/docs/spec/server_server/r0.1.3#put-matrix-federation-v1-send-txnid) request.
* When the observation is done, the backend makes the “imaginary user” leave the room by sending [/make_leave](https://matrix.org/docs/spec/server_server/r0.1.3#get-matrix-federation-v1-make-leave-roomid-userid) and [/send_leave](https://matrix.org/docs/spec/server_server/r0.1.3#put-matrix-federation-v1-send-leave-roomid-eventid) requests.

The full details of the implementation are in [this PR](https://github.com/Kagamihime/matrix-visualisations-backend/pull/8). My mentor also helped me get the usage of the `Future`s  right thanks to [this PR](https://github.com/Kagamihime/matrix-visualisations-backend/pull/7).<br/>
There has been a small modification in the frontend too, because of the addition of the `/stop` endpoint in the backend’s HTTP API, these modifications are in [this PR](https://github.com/Kagamihime/matrix-visualisations/pull/7).

### Display the state of the room for a given event

For each event, there is a state of the room associated with it, which describes what was the state of the room at the moment this event was accepted (the name of the room, its topic, its members and parameters, etc…).<br/>
So I’ve added a way to display this: when you have selected and displayed the JSON body of a given event, you can also request the associated room’s state. I have made it possible to use this feature with every backends: the CS API, the PostgreSQL database and the Federation API. You can have the full details of the implementation [here](https://github.com/Kagamihime/matrix-visualisations-backend/pull/9) (for the backend) and [here](https://github.com/Kagamihime/matrix-visualisations/pull/8) (for the frontend).

You can see the result of this feature in the picture below (there is a button “Room state at the selected event”, which allows to ask the application to fetch the state, and the text area under this button where the state is displayed):
![Room's state display](https://raw.githubusercontent.com/Kagamihime/gsoc-2019-final-report/master/room_state.png "Room's state display")

### Additional fixes

Lastly, I’ve applied small fixes to the code of the backend, you can see them in [this PR](https://github.com/Kagamihime/matrix-visualisations/pull/9).

## Possible improvements

The objective of this project was to develop the core functionalities of this application, however there are a lot of improvements to bring to it, like:

* Adding the possibility to start the observation of a room from any events (provided that we have the ID of this events) instead of the latest one.
* These hasn’t been any UI/UX work design, the CSS style sheet is minimal and the overall look isn’t beautiful or correctly organised. So there would be a lot of work to be done in this area by people with better knowledge in this field than me.
* The timestamps of the events are not displayed in a human readable format and would be written as dates and hours to greatly improve the readability.
* The application has been tested a lot, especially in situations of misusage. I’ve fixed some bugs which occurred when I was testing it but it was far from being an exhaustive testing, so there could be many improvements regarding the overall robustness of this software.
* The backend supports HTTPS connections but has no mechanism for controlling the access of the data behind it (in particular, it means that if you should not run on a production database as it would basically allow anyone to access any data on it). So more work would be needed to make it secure.

## Conclusion

This experience has been really rewarding for me. I could discover more about the Matrix community and how the Matrix ecosystem works (on a technical point of view). I want to thank my mentor, Erik Johnston, for his guidance during these past months, and the people in this community who gave me advice.

GSoC has also allowed me to further improve my programming skills in general and discover many various things: the WASM technology, how to use Rust in this context thanks to the various existing libraries/frameworks available, the practical usage of SQL requests as well as TLS certificates and how to apply cryptographic signatures.<br/>
It was sometimes challenging to use such experimental technologies (due to the lack of clear documentation) but also very exiting!

Mid-September, I will start my class for my second and final year of my master degree (software engineering, specialised in distributed systems and applications) at Sorbonne Université so I will definitely have less free time. So I don’t think I’ll be able to actively continue to contribute but I will do my best to help other people to continue the work I’ve initiated.
