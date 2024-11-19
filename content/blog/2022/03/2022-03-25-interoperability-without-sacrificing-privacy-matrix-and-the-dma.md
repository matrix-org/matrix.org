+++
title = "Interoperability without sacrificing privacy: Matrix and the DMA"
date = "2022-03-25T22:39:46Z"
updated = "2022-03-25T18:01:39Z"
path = "/blog/2022/03/25/interoperability-without-sacrificing-privacy-matrix-and-the-dma"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Yesterday the EU Parliament & Council agreed on the contents of the Digital
Markets Act - new legislation from the EU intended to limit anticompetitive
behaviour from tech “gatekeepers”, i.e. big tech companies (those with market
share larger than €75B or with more than €7.5B a year of revenue).

This is absolutely landmark legislation, where the EU has decided not to break
the gatekeepers up in order to create a more competitive marketplace - but
instead to “break them open”.  This is unbelievably good news for the open
Internet, as it is obligating the gatekeepers to provide open APIs for their
communication services.  In other words: no longer will the tech giants be
able to arbitrarily lock their users inside their walled gardens - there will
be a legal requirement for them to expose APIs to other services.

While the formal outcomes of yesterday’s agreement haven’t been published yet
(beyond [this press release](https://www.europarl.europa.eu/news/en/press-room/20220315IPR25504/deal-on-digital-markets-act-ensuring-fair-competition-and-more-choice-for-users)),
our understanding is that the DMA will mandate:

* Gatekeepers will have to provide open and documented APIs to their
    services, on request, in order to facilitate interoperability (i.e. so
    that other services can communicate with their users).
* These APIs must preserve the same level of end-to-end encryption (if any)
    to remote users as is available to local users.
* This applies to 1:1 messaging and file transfer in the short term, and
    group messaging, file-transfer, 1:1 VoIP and group VoIP in the longer
    term.

This is the best possible outcome imaginable for the open internet.  Never
again will a big tech company be able to hold their users hostage in a walled
garden, or arbitrarily close down or sabotage their APIs.

### So, what’s the catch?

Since the DMA announcement on Thursday, there’s been [quite a lot](https://twitter.com/alexstamos/status/1507145126006587411)
of [yelling](https://twitter.com/AlecMuffett/status/1507366934412734491) from some very
experienced voices that mandating interoperability via open APIs is going to
irrevocably undermine end-to-end encrypted messengers like WhatsApp.  This
seems to mainly be born out of a concern that the DMA is somehow trying to
subvert end-to-end encryption, despite the fact that the DMA explicitly
mandates that the APIs must expose the same level of security, including
end-to-end encryption, that local users are using. (N.B. Signal doesn’t
qualify as a gatekeeper, so none of this is relevant to Signal).

So, for WhatsApp, it means that the API would expose both the message-passing
interface as well as the key management APIs required to interoperate with
WhatsApp using your own end-to-end-encrypted WhatsApp client - E2EE would be
preserved.

However, this does mean that if you were to actively interoperate between
providers (e.g. if Matrix turned up and asked WhatsApp, post DMA, to expose
an API we could use to write bridges against), then that bridge would need to
convert between WhatsApp’s E2EE’d payloads and Matrix’s E2EE’d payloads.
(Even though both WhatsApp and Matrix use the Double Ratchet, the actual
payloads within the encryption are completely different and would need to be
converted).  Therefore such a bridge has to re-encrypt the traffic - which
means that the plaintext is exposed on the bridge, putting it at risk and
breaking the end-to-end encryption guarantee.

There are solutions to this, however:

* We could run the bridge somewhere relatively safe - e.g. the user’s client.
  There’s a bunch of work going on already in Matrix to run clientside
  bridges, so that your laptop or phone effectively maintains a connection
  over to iMessage or WhatsApp or whatever as if it were logged in… but then
  relays the messages into Matrix once re-encrypted.  By decentralising the
  bridges and spreading them around the internet, you avoid them becoming a
  single honeypot that bad actors might look to attack: instead it becomes
  more a question of endpoint compromise (which is already a risk today).

* The gatekeeper could switch to a decentralised end-to-end encrypted protocol
  like Matrix to preserve end-to-end encryption throughout.  This is
  obviously significant work on the gatekeeper’s side, but we shouldn’t rule
  it out.  For instance, making the transition for a non-encrypted service is
  impressively little work, as [we proved with Gitter](https://matrix.org/blog/2020/12/07/gitter-now-speaks-matrix#how-do-you-make-an-existing-chat-system-talk-matrix).
  (We’d ideally need to figure out decentralised/federated identity-lookup
  first though, to avoid switching from one centralised identity database
  to another).

* Worst case, we could flag to the user that their conversation is insecure
  (the chat equivalent of a scary TLS certificate warning).  Honestly, this
  is something communication apps (including Matrix-based ones!) should be
  doing anyway: as a user you should be able to tell what 3rd parties
  (bots, integrations etc) have been added to a given conversation.  Adding
  this sort of semantic actually opens up a much richer set of communication
  interactions, by giving the user the flexibility over who to trust with
  their data, even if it breaks the platonic ideal of pure E2E encryption.

On balance, we think that the benefits of mandating open APIs outweigh the
risks that someone is going to run a vulnerable large-scale bridge and
undermine everyone’s E2EE.  It’s better to have the option to be able to get
at your data in the first place than be held hostage in a walled garden.

### Other considerations

One other complaint which has come up a bunch is around speed of innovation:
the idea that WhatsApp or similar would be seriously slowed down by having
to (effectively) maintain stable documented federation APIs, and figure out
how to do backwards compatibility for new features.  It’s true that this will
take a bit more effort (similar to how adding GDPR compliance takes some
effort), but the ends make it more than worth it.  Plus, if the rag-tag
Matrix ecosystem can do it, it doesn’t seem unreasonable to think that a
$600B company like Meta can figure it out too...

Another consideration is that it might make it too easy to build malicious 3rd
party clients - e.g. building your own "special" version of Signal which
connects to the official service, but deliberately or otherwise has security
flaws.  The fact is that we're already in this position though: there are
illicit alternative clients flying around all over the place, and the onus is
on the app stores to protect their users from installing malware.  This isn't
reason to throw the baby of interoperability out with the bathwater of
bootleg clients.

The final complaint is about moderation and abuse: while open APIs are good
news for consumer choice, they can also be used by spammers, phishers and
other miscreants to cause problems for the users within the gatekeeper.  Much
like a mediaeval citadel; opening up your walled garden means that both good
and bad people can turn up.  And much like real life, this is a solvable problem,
even if it’s unfortunate: the benefits of free trade massively outweigh the
downsides of having to police strangers more effectively.  Frankly,
moderation and anti-abuse approaches on the Internet today are infamously
broken, with centralised moderation by gatekeepers producing increasingly
erratic results.  By opening the walled gardens, we are forcing a much-needed
opportunity to review how to empower users and admins to filter unwanted
content on their own terms.  There’s a recent write-up of the proposed
approach for Matrix at
[https://element.io/blog/moderation-needs-a-radical-change/](https://element.io/blog/moderation-needs-a-radical-change/),
which outlines one strategy - but there are many others.  Honestly, having to improve
moderation tooling is a worthwhile price to pay for the benefits of open
APIs.

So, there you have it. Hopefully you’ll agree that the benefits here outweigh
the risks: without open APIs we wouldn't even have the *option* to talk about
interoperability.  We should be celebrating a new dawn for open access,
rather than fearing that the sky is falling and this is nefarious attempt to
undermine end-to-end encryption.
