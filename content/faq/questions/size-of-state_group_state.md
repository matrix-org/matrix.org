### Why is the state_groups_state table so large? What is it storing?

Room state takes up a lot of space! To be specific, regular snapshots are taken of room states, so you can rapidly find out the state for historical events.

Why is it so important to record this, and to know the past room state including full member list?

It's needed to enable access control and state resolution, for example the home server needs to be able to decide:

* "who can see this message at that point in time?"
* "what was the state of the room was when this message was received, and so is it *allowed* to be received?"

Synapse stores these snapshots approximately every 100 messages, with deltas in between.