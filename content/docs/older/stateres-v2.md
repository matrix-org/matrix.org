+++
title = "State Resolution v2 for the Hopelessly Unmathematical"
extra.author = "Neil Alexander Twigg"
aliases = ["/docs/guides/implementing-stateres"]
+++

So you don't have a PhD in Mathematics and you want to implement [State
Resolution v2](https://matrix.org/docs/spec/rooms/v2)! This document aims to
demystify not just the _how_ but also the _why_ of resolving state conflicts in
Matrix room versions 2 and later, along with a bit of pseudocode to demonstrate
the implementation.

In Matrix, rooms don't belong to a specific server, but instead are replicated
across all servers that are participating in a given room. As a result, each
server in a room needs to be able to work out the room state independently and
all servers in a room need to be able to arrive, as far as possible, at the same
state when doing so. Doing this is what allows a room to "appear" the same for
all users, regardless of the homeserver they are joining from.

State resolution is the act of taking two or more different sets of state and
working out the final consistent state that we deem truthful. The idea is that
all homeservers will agree on what state looks like for a given room by
following the same state resolution algorithms.

When resolving state, we adhere to the following guidelines:

1. Higher power levels should take precedence over lower ones, e.g. the actions
   of an administrator should overrule those of a moderator
2. Earlier events should be processed before later ones where possible

It's worth mentioning that concepts such as "earlier" and "later" are difficult
to define in Matrix and this is a significant part of what makes state
resolution difficult to do. In State Res v2, we have a couple of new concepts
for defining when an event is "earlier" or "later" than another event - these
are covered in the sections below on ordering events.

### Defining state

First of all, a state event is a Matrix event which contains a `state_key`. The
state key defines _what_ the state applies to (or is often an empty string if
the state should apply to the entire room). Examples of state events are
`m.room.create`, `m.room.join_rules`, `m.room.power_level`, `m.room.member` etc.

Given that state events are also a part of the room history, state can be
different at different points in time. Therefore, the state at a specific event
contains a snapshot of all state events that apply to the room at the time of
that given event and won't include state events that came after it. In the case
of state events, the state at the time of that given event includes the changes
in state as provided by the event.

A state tuple is a `(event type, state key)` tuple. For example:

* `("m.room.power_levels", "")` for room power levels
* `("m.room.join_rules", "")` for room join rules
* `("m.room.member", "@neilalexander:matrix.org")` for `neilalexander`'s room
  membership

Each state event attempts to update a `(event type, state key)->event` key-value
mapping in a given room, thus allowing for key-value data to be stored per room.

### Defining control events and normal state events

In addition to the above, we also define _control events_ as being a subset of
state events which specifically have the power to add or remove abilities from
another user. These are:

* **Setting room power levels:** `m.room.power_levels` where the `state_key`
  equals `""`
* **Setting room join rules:** `m.room.join_rules` where the `state_key`
  equals `""`
* **Kicking a user:** `m.room.member` with `"leave"` content but where the
  `sender` (the admin/mod) does not match the `state_key` (the kicked user)
* **Banning a user:** `m.room.member` with `"ban"` content but where the
  `sender` (the admin/mod) does not match the `state_key` (the banned user)

Any _state event_ that does not match the above definition is, instead, classed
as a normal state event. These include, for example:

* **Setting room topic:** `m.room.topic` where the `state_key` equals `""`
* **Setting room avatar:** `m.room.display_avatar` where the `state_key`
  equals `""`
* **Users joining or leaving:** `m.room.member` with `"join"` or `"leave"`
  content where the `sender` is equal to the `state_key`

### Conflicted and unconflicted state sets

The ultimate goal of state resolution is to take some _conflicted_ inputs and
give _unconflicted_ output, and to do so in a consistent way such that all
servers will agree on the same state. In effect, we may have been given multiple
sets of state due to forks in the room and, when we combine them together, we
can end up with multiple different values for one or more given state tuples.
The goal is to ensure that our final state only contains a single value for each
state tuple.

Forks typically happen when servers that are participating in a room are no
longer able to keep each other up-to-date over federation. It's possible that
users on different servers will continue to send any number of events into the
room, including state events, resulting in state drifting across those servers.
When the servers are able to federate again, i.e. after network connectivity is
restored, then we can work out the conflicted and unconflicted state by merging
the forks.

Conflicted state happens when:

* We have _more than one_ different value for a given state tuple in each fork
* We have _only one_ value for a given state tuple but it happened in only one
  fork and not the other

Unconflicted state happens when:

* We have _only one_ value for a given state tuple because it is the same in all
  forks
* We have _only one_ value for a given state tuple because it happened before
  the fork

Events in the input set that are _unconflicted_ are considered to be truthful,
therefore apart from expecting that they pass auth, we don't do any further
state resolution on them. An _unconflicted_ event will _always_ appear in the
final resolved state.

Events in the input set that are _conflicted_ are the opposite - to begin with,
we have multiple events claiming different values and don't know which to
believe. We perform state resolution on them to decide which of those values we
wish to select, and _only_ the selected values appear in the final resolved
state.

Since we only want to perform state resolution on the _conflicted_ set, start by
working through the set of input events, including their auth events and sorting
them into _conflicted_ and _unconflicted_ buckets:

```txt
var conflicted_events:   list(event)
var unconflicted_events: list(event)
```

### Partial state

We refer to the state as _partial_ when we have not yet completed the state
resolution algorithm, therefore the result is incomplete. In the first stage,
the partial state is equal to the unconflicted state:

```txt
var partial_state: map(event_type -> map(state_key -> event))

for each unconflicted_events as e:
    partial_state[e.event_type()][e.state_key()] = e
```

Later, the resolved state blocks from the _conflicted state_ will be layered
onto the partial state, eventually bringing us to a complete _resolved state_.

### Resolved state

The final resolved state of a room is worked out from doing these things:

1. Starting with the _unconflicted_ state as our "base layer"
2. Working out the sequence of _control events_ using reverse topological
   ordering and then layering those on
3. Working out the sequence of _normal state events_ using mainline ordering and
   then layering those on
4. Reapplying any _unconflicted_ state keys which may have been overwritten in
   the previous steps

### Auth differences

Now that we have a set of _conflicted_ events, we also need to make sure that we
have enough information to satisfy the auth checks, regardless of which event we
eventually resolve to.

For example, imagine the case that Alice gives some power to Bob (in event `A`),
Bob gives some power to Charlie (in event `B`) and then Charlie changes the ban
level (in event `C`):

![drawing showing an example flow of power level changes](/docs/legacy/2020-04-14-stateresv2-1.svg)

However, in another fork, event `A` is known (so Bob has received power from
Alice) but `B` was not, therefore in the fork, Charlie never received power and
therefore was not authorised to change the ban level. When the two forks
converge, we would need to know about `B` in order to successfully authorise
`C`.

The _auth difference_ therefore contains all auth events that were not common to
both forks - if an auth event appears in only one fork but not the other then
that auth event must appear in the _auth difference_:

```txt
var auth_difference:     list(event)
var auth_sets:           map(fork_id -> list(event))

for each conflicted_events as e:
    found = true
    for each auth_sets as auth_set:
        if e not in auth_set:
            found = false

    if not found:
        auth_difference.append(e)
```

The _full conflicted set_ is effectively the conflicted events combined with the
auth difference:

```txt
var full_conflicted_set: list(event)

full_conflicted_set = conflicted_events + auth_difference
```

### Reverse topological ordering of control events

Now that we have calculated the _full conflicted set_, which also includes the
_auth difference_, we now can start to work out the order in which power was
given or taken away from specific users.

When resolving state conflicts, it's important to work out who really had power
to do certain things at a given point in time. Working this out for control
events takes priority over working out the order of normal state events - those
will be sorted based on the power levels from this step.

To work out the timeline of control events, we implement reverse topological
ordering, which results in a list of events in which the order guarantees that
auth events _always_ come before the events that refer to them. This is done
using an adaptation of Kahn's algorithm.

#### **Kahn's algorithm**

Since an event's auth chain forms a directed acyclic graph (DAG), we can say
that each auth event is a "node" in the graph and each relationship between two
events is an "edge". In our case, two nodes in the auth DAG have a relationship
when one event refers to another event as an auth event.

More precisely, we would say that an event that _refers to_ other auth events
has one or more _outgoing edges_ and that an event that is relied on by other
events has one or more _incoming edges_.

This allows us to make a couple of assertions: that an event that has no
incoming edges happened most recently, and an event that has no outgoing edges
happened least recently.

In our case, Kahn's algorithm works on three main components:

1. The unsorted input list of events, including the auth events
2. A map, where we count how many incoming edges each node has
3. The sorted output list of events, effectively the result of the algorithm

Assuming the following data structures, we can populate the event map and
incoming edges with initial values:

```txt
var output_events:  list(event)
var event_map:      map(event_id -> event)
var incoming_edges: map(event_id -> integer)

for each full_conflicted_set as e:
    event_map[e.event_id] = e
    incoming_edges[e.event_id] = 0
```

The Matrix-specific details of our implementation of Kahn's algorithm lie in the
tie-break between events. The tie-break ensures that we get a deterministic
ordering and that we also meet our two guidelines from the beginning: that we
will always try to prefer events from the more powerful, and we will always try
to process older events first. When sorting, you can assert that **x &lt; y** by
running the following tests in order:

1. The effective power level at **x** is greater than the effective power level
   at **y**
2. The event origin server timestamp of **x** is less than the event origin
   server timestamp of **y** (that is, event **x** is older than **y**)
3. The event ID of **x** is less than the event ID of **y**, as computed by a
   lexicographical comparison, as a fallback

To ensure that the algorithm is deterministic (that is, running in the same
order) for a given set of inputs, we must ensure that the map of incoming edges
has been sorted using the above rules before we do anything with it:

```txt
func sorted_incoming_edges() returns list(event):
    sort incoming_edges where x < y when:
        x.power_level > y.power_level or
        x.origin_server_ts < y.origin_server_ts or
        lexographic_compare(x.event_id, y.event_id) < 0
    return incoming_edges
```

Once the incoming edges have been sorted, iterate through the input list to
count how many incoming edges each event has and update the incoming edges map
with those values:

```txt
for each input_events as e:
    for each e.auth_events as a:
        incoming_edges[a.event_id] += 1
```

Then look for events that have no incoming edges and insert them into the
beginning of the output list—note that we differ from a pure implementation of
Kahn's algorithm here as we specifically require the incoming edges map to be
sorted (as above):

```txt
while len(incoming_edges) > 0:
    for each sorted_incoming_edges() as id, count:
        if count == 0:
            output_event.prepend(event_map[id])

            for each event_map[id].auth_events as auth_event:
                incoming_edges[auth_event.event_id] -= 1

            remove(incoming_edges, id)
```

Each time we add a node into the output list, we can "remove" its outgoing
edges. This means that every auth event referred to by this event has one less
incoming edge. Once it has been exhausted, we also remove the event from the
incoming edge map, so that we won't try to process it again.

Now we repeat the process, continuously, until the algorithm eventually exhausts
the entire incoming edges map. Once the map is empty, all edges have been
removed and the earliest events will appear at the beginning of the output list.

The output list is now sorted such that all referred events now appear before
the events that refer to them. It is sorted in _reverse topological order_.

### Iteratively apply resolved control events

Now that our control events have been sorted into reverse topological order,
where the first events in the list are the "oldest", we can now start to layer
these resolved control events in order to build the partial state.

To build up the partial state, start at the oldest event and loop through the
list, [performing auth checks on each
event](https://matrix.org/docs/spec/rooms/v1#authorization-rules) by using the
current `partial_state` as an allowed set of auth events. We define this process
as the function `auth_against_partial_state`.

It is expected that `partial_state` is an empty list for the first iteration, as
the oldest event (which is the room create event) does not require auth events.
The partial state (and, by extension, the selection of allowed auth events) will
grow with each iteration.

If the event passes auth checks then update the partial state to include the
newly authed event before moving onto the next iteration:

```txt
for each output_event as e:
    if auth_against_partial_state(e):
        partial_state[e.event_type][e.state_key] = e
```

Events that fail the auth check should be ignored and should not find their way
into the partial state.

### Creating the power level mainline

Once the control events have been applied to the partial state, the remainder of
the normal state events should be ordered and processed based on the ordering of
their power level auth events. This is done using a technique called _mainline
ordering_.

The _power level_ _mainline_ is created by following the path of power level
events, starting from the resolved `m.room.power_level` event from the partial
state, back to the point that the room was created:

```txt
var resolved_power_level_event: partial_state["m.room.power_level"][""] as event
var power_level_mainline:       list(event)

func mainline_iterate(e as event):
    power_level_mainline += e
    for each e.auth_events as auth_event:
        if auth_event.event_type == "m.room.power_level":
            mainline_iterate(auth_event)
```

We refer to the time period between any two given power level events as an
_epoch_.

In the below illustration, the "resolved" event is the event that appears in the
partial state from the previous section.

![drawing showing partial state example](/docs/legacy/2020-04-14-stateresv2-2.svg)

### Mainline ordering of normal state events

Since the mainline will be ordered based on when the power level changes
happened, and other state events use power level events as auth events, it is
possible to sort the order of normal state events based on which mainline power
level event they most closely refer to, or by definition, which epoch the event
happened in.

Note that events may appear that refer to power level events which don't appear
in the mainline, in which case it is necessary to step through the power level
events iteratively until you encounter one that is on the mainline. It is
referred to as the _closest mainline event_:

```txt
func get_closest_mainline_event(e as event) returns event:
    var closest_mainline_event: event

    func closest_iterate(e as event):
        if e in power_level_mainline:
            closest_mainline_event = e
        else:
            for each e.auth_events as auth_event:
                if auth_event.event_type == "m.room.power_level":
                    closest_iterate(auth_event)

    closest_iterate(e)
    return closest_mainline_event
```

In the following illustration, _Event B_ happens in a more recent epoch than
_Event A_ as the closest mainline event referred to by _Event A_ is older
(closer to the room's create event) than the closest mainline event referred to
by _Event B_:

![drawing showing an example of mainline ordering](/docs/legacy/2020-04-14-stateresv2-3.svg)

To sort the events, we use a method very similar to that used in the reverse
topological ordering of control events, only instead of initially sorting by
power level, we use the position of the nearest mainline power level event on
the mainline. When sorting, you can assert that **x &lt; y** by running the
following tests in order:

1. The closest mainline event to **x** is later in the mainline then the closest
   mainline event to **y** (for example, in the above diagram, **A** is less
   than **B** as **B** refers to a more recent mainline power level event)
2. The event origin server timestamp of **x** is less than the event origin
   server timestamp of **y**
3. The event ID of **x** is less than the event ID of **y**, as computed by a
   lexicographical comparison

To ensure that the algorithm is deterministic (that is, running in the same
order) for a given set of inputs, we ensure that the normal state events have
been sorted using the above criteria:

```txt
func sorted_normal_state_events() as list(event):
    sort normal_events where x < y when:
        x.position_on_mainline < y.position_on_mainline or
        x.origin_server_ts < y.origin_server_ts or
        lexographic_compare(x.event_id, y.event_id) < 0
    return normal_events
```

In the event that multiple candidate events refer to the same mainline power
level event, the remaining two tests will allow the sorting to be deterministic.

### Iteratively apply resolved normal state events

Now that our normal state events have been sorted into mainline order, where the
first events in the list are the "oldest", we can now start to layer these
resolved normal state events on top of the _partial state_.

Just as with the control events, each normal state event should be authed
against the partial state, before applying the valid events to the partial
state:

```txt
for each sorted_normal_state_events() as e:
    if auth_against_partial_state(e):
        partial_state[e.event_type][e.state_key] = e
```

Any event that fails to auth against the current partial state should be ignored
and should not be applied to the partial state.

### Re-apply unconflicted state

Now that all of the events from the original conflicted set have been resolved
and applied, we complete one final pass over the partial state by re-applying
the original unconflicted set. Ordinarily, nothing from the conflicted set
should overwrite anything from the unconflicted set, but pulling in auth events
may bring in additional state.

Reapply the unconflicted state events onto the partial state to complete the
state:

```txt
for each unconflicted_events as e:
    partial_state[e.event_type][e.state_key] = e
```

At this point, the partial state is now effectively _complete_, therefore it now
represents the final resolved state.

### Finishing up

Now that you have completed all of the above steps, you have successfully
implemented State Resolution v2! If you have any questions, please feel free to
join us in the [Homeserver
Developers](https://matrix.to/#/#homeservers-dev:matrix.org) channel.

Further reading:

* [Matrix Specification - Room Version 2](https://matrix.org/docs/spec/rooms/v2)
* [State Resolution: Reloaded (in Haskell)](https://matrix.uhoreg.ca/stateres/reloaded.html)
* [MSC1442 - State Resolution: Reloaded](https://github.com/matrix-org/matrix-doc/blob/erikj/state_res_msc/proposals/1442-state-resolution.md)
