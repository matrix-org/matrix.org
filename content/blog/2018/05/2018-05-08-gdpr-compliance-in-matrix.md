+++
title = "GDPR Compliance in Matrix"
path = "/blog/2018/05/08/gdpr-compliance-in-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Privacy"]
+++

Hi all,

As the May 25th deadline looms, we've had lots and lots of questions about how GDPR (the EU's new General Data Protection Regulation legislation) applies to Matrix and to folks running Matrix servers - and so we've written this blog post to try to spell out what we're doing as part of maintaining the Matrix.org server (and bridges and hosted integrations etc), in case it helps folks running their own servers.

The main controversial point is how to handle Article 17 of the GDPR: '[Right to Erasure](https://gdpr-info.eu/art-17-gdpr/)' (aka Right to be Forgotten). The question is particularly interesting for Matrix, because as a relatively new protocol with somewhat distinctive semantics it's not always clear how the rules apply - and there's no case law to seek inspiration from.

The key question boils down to whether Matrix should be considered more like email (where people would be horrified if senders could erase their messages from your mail spool), or should it be considered more like Facebook (where people would be horrified if their posts were visible _anywhere_ after they avail themselves of their right to erasure).

Solving this requires making a judgement call, which we've approached from two directions: firstly, considering what the spirit of the GDPR is actually trying to achieve (in terms of empowering users to control their data and have the right to be forgotten if they regret saying something in a public setting) - and secondly, considering the concrete legal obligations which exist.  

The conclusion we've ended up with is to (obviously) prioritise that Matrix can support all the core concrete legal obligations that GDPR imposes on it - whilst also having a detailed plan for the full 'spirit of the GDPR' where the legal obligations are ambiguous.  The idea is to get as much of the longer term plan into place as soon as possible, but ensure that the core stuff is in place for May 25th.

Please note that we are still talking to GDPR lawyers, and we'd also very much appreciate feedback from the wider Matrix community - i.e. this plan is very much subject to change.  We're sharing it now to ensure everyone sees where our understanding stands today.

The current todo list breaks down into the following categories. Most of these issues have matching github IDs, which we'll track in a progress dashboard.

### Right to Erasure

We're opting to follow the email model, where the act of sending an event (i.e. message) into a room shares a copy of that message to everyone who is ___currently___ in that room.  This means that in the privacy policy (see Consent below) users will have to consent to agreeing that a copy of their messages will be transferred to whoever they are addressing.  This is also the model followed by IM systems such as WhatsApp, Twitter DMs or ([almost](https://www.theinquirer.net/inquirer/news/3029749/facebook-zuckerberg-can-delete-old-messenger-conversations-you-cant)) Facebook Messenger.

This means that if a user invokes their right to erasure, we will need to ensure that their events will only ever be visible to users who already have a copy - and must __never__ be served to new users or the general public. Meanwhile, data which is no longer accessible by any user must of course be deleted entirely.

In the email analogy: this is like saying that you cannot erase emails that you have sent other people; you cannot try to rewrite history as witnessed by others... but you can erase your emails from a public mail archive or search engine and stop them from being visible to anyone else.

It is important to note that GDPR Erasure is _completely separate_ from the existing Matrix functionality of "redactions" which let users remove events from the room. A "redaction" today represents a request for the human-facing details of an event (message, join/leave, avatar change etc) to be removed.  Technically, there is no way to enforce a redaction over federation, but there is a "gentlemen's agreement" that this request will be honoured.

The alternative to the 'email-analogue' approach would have been to facilitate users' automatically applying the existing redact function to _all_ of the events they have ever submitted to a public room. The problem here is that defining a 'public room' is subtle, especially to uninformed users: for instance, if a message was sent in a private room (and so didn't get erased), what happens if that room is later made public? Conversely, if right-to-erasure removed messages from _all_ rooms, it will end up destroying the history integrity of 1:1 conversations, which pretty much everyone agrees is abhorrent. Hence our conclusion to protect erased users from being visible to the general public (or anyone who comes snooping around after the fact) - but preserving their history from the perspective of the people they were talking to at the time.

In practice, our core to-do list for Right to Erasure is:

- As a first cut, provide Article 17 right-to-erasure at a per-account granularity. The simplest UX for this will be an option when calling the account deactivation API to request erasure as well as deactivation. There will be a 30 day grace period, and (ideally) a 2FA confirmation (if available) to avoid the feature being abused.
- Homeservers must delete events that nobody has access to any more (i.e. if all the users in a room have GDPR-erased themselves). If users have deactivated their accounts without GDPR-erasure, then the data will persist in case they reactivate in future.
- Homeservers must delete media that nobody has access to any more. This is hard, as media is referenced by `mxc://` URLs which may be shared across multiple events (e.g. stickers or forwarded events, including E2E encrypted events), and moreover `mxc://` URLs aren't currently authorized.  As a first cut, we track which user uploaded the `mxc://` content, and if they erase themselves then the content will also be erased.
- Homeservers must not serve up unredacted events over federation to users who were not in the room at the time. This poses some interesting problems in terms of the privacy implications of sharing MXIDs of erased users over federation - see "GDPR erasure of MXIDs" below.
- Matrix must specify a way of informing both servers and clients (especially bots and bridges) of GDPR erasures (as distinct from redactions), so that they can apply the appropriate erasure semantics.

#### GDPR erasure of Matrix IDs

One interesting edge case that comes out of GDPR erasure is that we need a way to stop GDPR-erased events from leaking out over federation - when in practice they are cryptographically signed into the event Directed Acyclic Graph (DAG) of a given room. Today, we can remove the message contents (and preserve the integrity of the room's DAG) via redaction - but this still leaves personally identifying information in the form of the Matrix IDs (MXIDs) of the sender of these events.

In practice, this could be quite serious: imagine that you join a public chatroom for some sensitive subject (e.g. `#hiv:example.com`) and then later on decide that you want to erase yourself from the room. It would be very undesirable if any new homeserver joining that room received a copy of the DAG showing that your MXID had sent thousands of events into the room - especially if your MXID was clearly identifying (i.e. your real name).

Mitigating this is a hard problem, as MXIDs are baked into the DAG for a room in many places - not least to identify which servers are participating in a room. The problem is made even worse by the fact that in Matrix, server hostnames themselves are often personally identifying (for one-person homeservers sitting on a personal domain).

We've spent quite a lot time reasoning through how to fix this situation, and a full technical spec proposal for removing MXIDs from events can be found at <https://docs.google.com/document/d/1ni4LnC_vafX4h4K4sYNpmccS7QeHEFpAcYcbLS-J21Q>. The high level proposal is to switch to giving each user a different ID in the form of a cryptographic public key for every room it participates in, and maintaining a mapping of today's MXIDs to these per-user-per-room keys.  In the event of a GDPR erasure, these mappings can be discarded, pseudonymising the user and avoiding correlation across different rooms. We'd also switch to using cryptographic public keys as the identifiers for Rooms, Events and Users (for cross-room APIs like presence).

This is obviously a significant protocol change, and we're not going to do it lightly - we're still waiting for legal confirmation on whether we need it for May 25th (it may be covered as an intrinsic technical limitation of the system).  However, the good news is that it paves the way towards many other desirable features: the ability to migrate accounts between homeservers; the ability to solve the problem of how to handle domain names being reused (or hijacked); the ability to decouple homeservers from DNS so that they can run clientside (for p2p matrix); etc.  The chances are high that this proposal will land in the relatively near future (especially if mandated by GDPR), so input is very appreciated at this point!

### Consent

GDPR describes [six lawful bases for processing](https://gdpr-info.eu/art-6-gdpr/) personal data. For those running Matrix servers, it seems the best route to compliance is the most explicit and active one: _consent_.

_Consent_ requires that our users are __fully informed__ as to exactly how their data will be used, where it will be stored, and (in our case) the specific caveats associated with a decentralised, federated communication system. They are then asked to provide their explicit approval before using (or continuing to use) the service.

In order to gather consent in a way that doesn't break all of the assorted Matrix clients connecting to matrix.org today, we have identified both an immediate- and a long-term approach.

The (immediate-term) todo list for gathering consent is:

- Modify Synapse to serve up a simple 'consent tool' static webapp to display the privacy notice/terms and conditions and gather consent to this API.
    - Add a 'consent API' to the CS API which lets a server track whether a given user has consented to the server's privacy policy or not.
- Send emails and push notifications to advise users of the upcoming change (and link through to the consent tool)
- Develop a bot that automatically connects to all users (new and existing), posting a link to the consent tool. This bot can also be used in the future as a general 'server notice channel' for letting server admins inform users of privacy policy changes; planned downtime; security notices etc.
- Modify synapse to reject message send requests for all users who have not yet provided consent
    - return a useful error message which contains a link to the consent tool
- Making our anonymised user analytics for Riot.im 'opt in' rather than 'opt out' - this isn't a requirement of GDPR (since our analytics are [fully anonymised](https://gdpr-info.eu/recitals/no-26/)) but reflects our commitment to user data sovereignty

Long-term:

- Add a User Interactive Auth flow for the `/register` API to gather consent at register
- As an alternative to the bot:
    - Fix user authentication in general to distinguish between 'need to reauthorize without destroying user data' and 'destroy user data and login again', so we can use the re-authorize API to gather consent via `/login` without destroying user data on the client.
    - port the `/login` API to use User Interactive Auth and also use it to gather consent for existing users when logging in

### Deactivation

Account deactivation (the ability to terminate your account on your homeserver) intersects with GDPR in a number of places.

Todo list for account deactivation:

- Remove deactivated users from all rooms - this finally solves the problem where deactivated users leave zombie users around on bridged networks.
- Remove deactivated users from the homeserver's user directory
- Remove all 3PID bindings associated with a deactivated user from the identity servers
- Improve the account deactivation UX to make sure users understand the full consequences of account deactivation

### Portability

GDPR states that users have a right to extract their data in a _structured, commonly used and machine-readable format_.

In the medium term we would like to develop this as a core feature of Matrix (i.e. an API for exporting your logs and other data, or for that matter account portability between Matrix servers), but in the immediate term we'll be meeting our obligations by providing a manual service.

The immediate todo list for data portability is:

- Expose a simple interface for people to request their data
- Implement the necessary tooling to provide full message logs (as a csv) upon request. As a first cut this would be the result of manually running something like `select * from events where user=?`.

### Other

GDPR mandates rules for all the personal data stored by a business, so there are some broader areas to bear in mind which aren't really Matrix specific, including:

- Making a clear statement as to how data is processed if you apply for a job
- Ensuring you are seeking appropriate consent for cookies
- Making sure all the appropriate documentation, processes and training materials are in place to meet GDPR obligations.

### Conclusion

So, there you have it. We'll be tracking progress in github issues and an associated dashboard over the coming weeks; for now <https://github.com/matrix-org/synapse/issues/1941> (for Right to Erasure) or <https://github.com/vector-im/riot-meta/issues/149> (GDPR in general) is as good as place as any to gather feedback. Alternatively, feel free to comment on the original text of this blog post: <https://docs.google.com/document/d/1JTEI6RENnOlnCwcU2hwpg3P6LmTWuNS9S-ZYDdjqgzA>.

It's worth noting that we feel that GDPR is an excellent piece of legislation from the perspective of forcing us to think more seriously about our privacy - it has forced us to re-prioritise all sorts of long-term deficiencies in Matrix (e.g. dependence on DNS; improving User Interactive authentication; improving logout semantics etc). There's obviously a lot of work to be done here, but hopefully it should all be worth it!
