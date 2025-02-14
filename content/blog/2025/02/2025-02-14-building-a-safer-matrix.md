+++
date = "2025-02-14T14:30:00Z"
title = "Building a Safer Matrix"

[taxonomies]
author = ["Jim Mackenzie, VP Trust & Safety — The Matrix.org Foundation"]
category = ["General", "Trust & Safety", "Policy"]
+++

**N.B. this post is also available [in German](#german) below.**

## Introduction

Right now, the world needs secure communication more than ever. Waves of security breaches such as the “Salt Typhoon” compromise of the telephone network’s wiretap system have led the [FBI to advise US citizens to switch to end-to-end-encrypted communication](https://www.npr.org/2024/12/17/nx-s1-5223490/text-messaging-security-fbi-chinese-hackers-security-encryption). Geopolitical shifts painfully highlight the importance of privacy-preserving communication for vulnerable minorities, in fear of being profiled or targeted. Meanwhile the [International Rules-Based Order is at risk](https://www.bbc.co.uk/news/articles/cjex5w1z02do) like never before.

We built Matrix to provide secure communication for [everyone](https://matrix.org/about) \- to be the missing communication layer of the Open Web. This is not hyperbole: Matrix is literally layered on top of the Web \- letting organisations run their own servers while communicating in a wider network. As a result, Matrix is “decentralised”: the people who built Matrix do not control those servers; they are controlled by the admins who run them \- and just as the Web will outlive Tim Berners-Lee, Matrix will outlive us.

Matrix itself is a protocol (like email), defined as an [open standard](https://spec.matrix.org) maintained by The Matrix.org Foundation C.I.C \- a UK non-profit incorporated in 2018 to act as the steward of the protocol; to coordinate the protocol’s evolution and to work on keeping the public Matrix network safe. The Foundation is funded by donations from its [members](https://matrix.org/support/) (both individuals and organisations), and also organises the Matrix.org homeserver instance used by many as their initial home on the network.

Much like the Web, Matrix is a powerful technology available to the general public, which can be used both for good and evil.

The vast majority of Matrix’s use is constructive: enabling collaboration for open source software communities such as [Mozilla](https://wiki.mozilla.org/Matrix), [KDE](https://community.kde.org/Matrix), [GNOME](https://wiki.gnome.org/GettingInTouch/Matrix), [Fedora](https://docs.fedoraproject.org/en-US/project/communications/), [Ubuntu](https://ubuntu.com/community/communications/matrix), [Debian](https://wiki.debian.org/Matrix), and thousands of smaller projects; providing a secure space for vulnerable user groups; secure collaboration throughout academia (particularly in [DACH](https://github.com/matrix-tu-dresden-de/Dokumentation/blob/main/static/images/federation_map.svg)); [protecting healthcare communication](https://matrix.org/blog/2021/07/21/germany-s-national-healthcare-system-adopts-matrix/) in Germany; protecting national communication in [France](https://element.io/case-studies/tchap), [Germany](https://element.io/blog/bundesmessenger-is-a-milestone-in-germanys-ground-breaking-vision/), [Sweden](https://element.io/blog/dsam-och-esam-forordar-matrix-for-saker-och-federerad-kommunikation-inom-sveriges-offentliga-sektor/) and [Switzerland](https://www.youtube.com/watch?v=EIRuxDuWIDE); and providing secure communication for [NATO](https://www.youtube.com/watch?v=4aswIHJRwkk), the [US DoD](https://www.wyden.senate.gov/imo/media/doc/wyden-schmitt_dod_letter.pdf) and Ukraine. You can see the scope and caliber of the Matrix ecosystem from the [talks at The Matrix Conference](https://2024.matrix.org/watch) in September.

However, precisely the same capabilities which benefit privacy-sensitive organisations mean that a small proportion of members of the public will try to abuse the system.

We have been painfully aware of the risk of abuse since the outset of the project, and rather than abdicating responsibility in the way that many encrypted messengers do, we’ve worked steadily at addressing it. In the early days, even before we saw significant abuse, this meant speculating on approaches to combat it (e.g. our [FOSDEM 2017](https://archive.fosdem.org/2017/schedule/event/matrix_future/%20) talk and subsequent 2020 [blog post](https://matrix.org/blog/2020/10/19/combating-abuse-in-matrix-without-backdoors/%20) proposing decentralised reputation; now recognisable in [Bluesky’s](https://bsky.app) successful [Ozone](https://github.com/bluesky-social/ozone) anti-abuse system and composable moderation). However, these posts were future-facing at the time \- and these days we have different, concrete anti-abuse efforts in place.

In this post, we’d like to explain where things are at, and how they will continue to improve in future.

## What we do today

The largest use of our funding as a Foundation is spent on our full-time Safety team, and we expanded that commitment at the end of 2024\. On a daily basis, the team triage, investigate, identify and remove harmful content from the Matrix.org server, and remove users who share that material. They also build tooling to prevent, detect and remove harmful content, and to protect the people who work on user reports and investigations.

The humans who make up the Foundation Trust & Safety team are dedicated professionals who put their own mental health and happiness in jeopardy every day, reviewing harmful content added by people abusing the service we provide. Their work exposes them to harms including child sexual exploitation and abuse (CSEA), terrorist content, non-consensual intimate imagery (NCII), harassment, hate, deepfakes, fraud, misinformation, illegal pornography, drugs, firearms, spam, suicide, human trafficking and more. It’s a laundry list of the worst that humanity has to offer. The grim reality is that all online services have to deal with these problems, and to balance the work to detect and remove that content with the rights of their users. We’re committed to that work, and to supporting the Trust & Safety team to the best of our ability — we are very grateful for their sacrifice.

### Safety Tooling on Matrix

The Safety team tackles safety from two perspectives: keeping the users on the Matrix.org server safe, and helping to make the wider Matrix network as a whole safe, secure and private. For the latter, we contribute to the development of the Matrix specification, engage with the Matrix ecosystem, and consult with governments, law enforcement, civil society groups, academia and industry groups. We also invest in open source tooling to help the ecosystem with this problem. For the former, we employ a mix of proactive and reactive approaches to online harms.

The Matrix Specification includes a system for reporting rooms, messages and users to your homeserver, API endpoints for server admins to lock, suspend and deactivate users, mechanisms for quarantining harmful media and redacting unwanted messages. We use all of these, receiving hundreds of reports per week from users of the Matrix.org server and emails to our reporting address.

Additionally, we scan room names and titles on the Matrix.org server using a variety of keyword lists, and highlight matches for human review. We also maintain a moderation bot called [Mjolnir](https://github.com/matrix-org/mjolnir), which we use to moderate our community rooms, and offer as open source for other communities to use. Behind the scenes, we have tools to help the frontline safety team to investigate rooms, users and messages, and to take action where there is abuse.

When we identified abuse of the Matrix.org server room directory, we froze the directory and removed abusive rooms. In the near future, we’ll be moving to a curated directory, to stop it being used as an advertising system for abuse. It’s worth noting that historically Matrix has unintentionally given a platform to abuse with the concept of these “room directories”, which (unlike other encrypted messengers like Signal or Threema or WhatsApp) allow any user to advertise public chatrooms without needing admin approval \- this is a mistake we deeply regret, and will address by switching to curated room directories in general.

#### Approaches to tackling CSEA

One of our main focuses is tackling child sexual exploitation and abuse. We abhor CSEA, and have always explicitly called it out in our Terms and Conditions as something we work with law enforcement to combat. We deploy tooling and specific techniques to arrest the spread of CSEA on the Matrix.org server:

* We work with the Internet Watch Foundation (IWF), National Center for Missing and Exploited Children (NCMEC), [cybertip.ca](http://cybertip.ca), the Australian eSafety Commissioner and other parties. (Element, who runs the Matrix.org server on behalf of the Foundation, has been an active member of [IWF](https://www.iwf.org.uk/membership/our-members/element/) since 2020).  
* We work with law enforcement in the UK and the US.  
* We’ve consulted with groups like the Lucy Faithfull Foundation and Columbia SIPA to learn from their expertise.  
* We use Cloudflare’s [CSAM detection APIs](https://developers.cloudflare.com/cache/reference/csam-scanning/) on unencrypted content on Matrix.org.  
* We use the IWF Hash, URL and Keyword lists from the IWF on unencrypted content on Matrix.org.  
* We block rooms, remove media and suspend users who participate in rooms dedicated to sharing CSEA.  
* We engage productively with and welcome robust critique from civil society groups, and invite them to join us in tackling CSEA. Check out the **How you can help** section below for details.

### Recent Updates

Over the past six months, we’ve invested in improved tooling for the frontline team who review user reports. We’ve sponsored the addition of [account suspension](https://github.com/element-hq/synapse/pull/17964) to the Matrix Specification, and added a [mass redaction API](https://element-hq.github.io/synapse/latest/admin_api/user_admin_api.html#redact-all-the-events-of-a-user) endpoint for the most popular Matrix server implementation, Synapse, so that both the Matrix.org server and other server instances in the ecosystem can benefit. Suspension gives us reversible account enforcement, which means we can develop more automated systems for faster takedown ahead of investigation. This should reduce the time that illegal material is accessible, while enhancing the rights and protections of our users. We’ve also recently added [authenticated media](https://matrix.org/blog/2024/06/26/sunsetting-unauthenticated-media/), stopping abuse of Matrix as a content distribution network. We worked with the IWF on this project, following reports of abuse of Matrix servers as a content delivery mechanism for [ICAP sites](https://www.iwf.org.uk/annual-report-2023/trends-and-data/icap-sites/).

### The Matrix Community

The wider Matrix community has strong anti-abuse initiatives, which we are deeply encouraged by. In particular, the work on the [Draupnir](https://github.com/the-draupnir-project/Draupnir) moderation bot project and the Community Moderation Effort ([CME](https://matrix.to/#/#community-moderation-effort-bl:neko.dev)) are excellent additions to the safety ecosystem on Matrix. At the server tooling level, Awesome Technologies’ [synapse-admin tool](https://github.com/Awesome-Technologies/synapse-admin) and the [fork by etke.cc](https://github.com/etkecc/synapse-admin) are great examples of how open source ecosystems can contribute to safety tooling. We celebrate their work, and hope to see more grass-roots developments in the coming months and years.

## What we are working on

**Reporting**  
While we have a functional reporting system, we can make it better. In particular, users will receive updates on their reports and outcomes of those investigations. We’ll improve how users are notified about moderation action taken on their account, and how they can appeal those decisions. The entire ecosystem will benefit from these improvements, as we will contribute them to the Matrix Spec.

**Discovery & Project Intercept**  
We’re in the early stages of a project to tackle the search and discovery of CSEA. We’ve had productive conversations with the Lucy Faithfull Foundation and Project Intercept about effective steps to redirect harmful search queries on Matrix.org for that kind of content.

**Transparency Reporting**  
Accountability is important, so we’re aiming to start releasing transparency reports for Matrix.org this year. The project is nascent, but we’ll share details and invite contributions as we get closer to making it a reality. We’ll be working closely with the [Governing Board](https://matrix.org/category/governing-board/) on this project. We are hopeful that adding transparency reports will support our applications to join industry groups like [GIFCT](https://gifct.org/), [Tech Against Terrorism](https://techagainstterrorism.org/home) and [Tech Coalition](https://www.technologycoalition.org/).

**Terms of Service updates**  
We’re overhauling our terms of service to make it clearer what content is forbidden, and how to report it to us. Where we use proactive scanning techniques, we’ll make that clear in the terms, including how to appeal decisions made by automated systems.

**Open source our tooling**  
As we improve the tooling we use to manage safety on Matrix.org, we want to share our work. We’ll talk more about our goals here in future updates. We’re also engaging with the work of open source safety tooling that [ROOST](https://roost.tools/partnerships) are doing, as one of their partners.

**Meeting and beating our obligations under the Online Safety Act**  
We’re based in the UK, and we’ve engaged productively with the Online Safety Act since its conception. That includes our continued robust opposition to threats to end-to-end encryption. We already employ perceptual hash matching for CSEA content in unencrypted rooms, and we will continue to invest in this area, to work towards faster and more accurate takedowns, while respecting the privacy of our users.

**Talking about our work, sharing what we learn**  
A fair criticism of the Foundation is that we haven’t shared publicly about what we do to keep Matrix.org users safe enough, nor what we do to ensure that Matrix as a platform has safe foundations. Let’s change that in 2025, starting with this post.

## How you can help

### As a user of Matrix

If you encounter harmful content on Matrix, you can report it in a few ways:

* If you are a Matrix.org homeserver user, you can [report the content](https://github.com/element-hq/element-x-ios/pull/587) from your client, and it will head to our Safety team. Matrix clients like Element iOS now allow users to [report rooms](https://github.com/element-hq/element-ios/pull/7805), and we understand it will be available in Element X, Element Android and Element Web soon.  
* If you use another Matrix server, you can report to your server administrator from your client too.  
* If you are not a Matrix user, or if you are a user on another homeserver who wants to let us know about harmful content on Matrix.org, you can email us at [abuse@matrix.org](mailto:abuse@matrix.org) with the information you have. Room IDs and user IDs are very helpful. Please don't send us screenshots of harmful content — we'll let you know if we need more information.

### If you run a Matrix server

* Open registration is [disabled by default](https://github.com/matrix-org/synapse/commit/58367a9da2539abdbfe4dc817fba5b179b95334b) in Synapse, and we support that default. If your server offers open registration, you **must** invest in a safety team to provide appropriate moderation coverage, and mitigate the risks of allowing unknown users to use your server.  
* Review who is signing up for your server, and the rooms that your server joins.  
* Review reports from your users, and take action to remove harmful content they report. You should check your legal obligations in the country you host your server.  
* Work with other server operators to share information about harmful rooms and users. You can reach out to our Safety team at [abuse@matrix.org](mailto:abuse@matrix.org) to start that conversation.

### Civil Society Groups, Academia and Industry Groups

We welcome the help of civil society groups and academics working in this area. Please reach out to [abuse@matrix.org](mailto:abuse@matrix.org) with your contact details and area of interest, and we'll talk. We're very interested in bringing on trusted flaggers, so if you want to send us reports, please let us know. Challenging the spread of online harm needs all parts of the puzzle to work together, and we’re looking to be a good example of how tech can work for society. For industry groups, we’d love to work with you, to share experiences and to learn from each other. The barriers to entry for these groups are a challenge, and we’d welcome your help in participating.

### Law Enforcement

Please check out our guidelines here: [https://matrix.org/legal/law-enforcement-guidelines/](https://matrix.org/legal/law-enforcement-guidelines/)

### Funding

The tech industry under-invests in Safety. We’re trying to do things better, and Safety is the largest line item in the Foundation budget. This investment is despite the challenges we face in our [ongoing](https://matrix.org/blog/2024/12/25/the-matrix-holiday-special-2024/) attempts to [raise funds](https://matrix.org/blog/2024/01/2024-roadmap-and-fundraiser/) to support the development of Matrix [and](https://matrix.org/blog/2024/04/open-source-publicly-funded-service/) [open software generally](https://matrix.org/blog/2024/07/17/ngi-open-letter/). We rely on donations to operate. Big public and private organizations use the work we do, often without contributing back to support that work financially. It would be easy to sacrifice Trust & Safety spending given that set of economic constraints, but we’re trying to find a better path through. If you would like to fund our work on safety, please reach out to the Foundation at [funding@matrix.org](mailto:funding@matrix.org).

---
<br />

# Für mehr Schutz in Matrix {#german}

## Einleitung

Gerade jetzt braucht die Welt mehr denn je sichere Kommunikation. Wellen von Sicherheitsverletzungen wie der „Salt Typhoon“, der das Abhörsystem des Telefonnetzes kompromittierte, haben das [FBI veranlasst, den US-Bürgern zu raten, auf eine Ende-zu-Ende-verschlüsselte Kommunikation umzusteigen](https://www.npr.org/2024/12/17/nx-s1-5223490/text-messaging-security-fbi-chinese-hackers-security-encryption). Geopolitische Veränderungen machen schmerzlich deutlich, wie wichtig der Schutz der Privatsphäre bei der Kommunikation für gefährdete Minderheiten ist, die befürchten, profiliert oder ins Visier genommen zu werden. Gleichzeitig ist die [regelbasierte internationale Ordnung so gefährdet](https://www.bbc.co.uk/news/articles/cjex5w1z02do) wie nie zuvor.

Wir haben Matrix entwickelt, um sichere Kommunikation [für alle](https://matrix.org/about) zu ermöglichen \- um die fehlende Kommunikationsschicht des Open Web zu sein. Das ist keine Übertreibung: Matrix ist buchstäblich eine Schicht über dem Web, die es Organisationen ermöglicht, ihre eigenen Server zu betreiben und gleichzeitig in einem größeren Netzwerk zu kommunizieren. Folglich ist Matrix „dezentralisiert“: Die Leute, die Matrix entwickelt haben, kontrollieren diese Server nicht; sie werden von den Administratoren kontrolliert, die sie betreiben \- und so wie das Web Tim Berners-Lee überleben wird, wird Matrix uns überleben.

Matrix selbst ist ein Protokoll (wie E-Mail), das als [offener Standard](http://spec.matrix.org) definiert ist und von der Matrix.org Foundation C.I.C. gepflegt wird \- einer gemeinnützigen britischen Stiftung, die 2018 gegründet wurde, um als Verwalterin des Protokolls zu fungieren, die Weiterentwicklung des Protokolls zu koordinieren und das öffentliche Matrix-Netzwerk sicher zu halten. Die Stiftung wird durch Spenden ihrer [Mitglieder](https://matrix.org/support/) (sowohl Einzelpersonen als auch Organisationen) finanziert und organisiert auch die Matrix.org-Homeserver-Instanz, die von vielen als erste Heimat im Netzwerk genutzt wird.

Ähnlich wie das Internet ist auch Matrix eine mächtigeleistungsfähige Technologie, die der Allgemeinheit zur Verfügung steht und sowohl zum Guten als auch zum Bösen eingesetzt werden kann.

Die überwiegende Mehrheit der Matrix-Nutzung ist konstruktiv: Sie ermöglichtbietet Zusammenarbeit infür Open-Source-Software-Communities wie [Mozilla](https://wiki.mozilla.org/Matrix), [KDE](https://community.kde.org/Matrix), [GNOME](https://wiki.gnome.org/GettingInTouch/Matrix), [Fedora](https://docs.fedoraproject.org/en-US/project/communications/), [Ubuntu](https://ubuntu.com/community/communications/matrix), [Debian](https://wiki.debian.org/Matrix) und tTausende kleinerer Projekte; sie bietet einen sicheren Raum für gefährdete Benutzergruppen; sichere Zusammenarbeit in der gesamten akademischen Welt (insbesondere in der [DACH-Region](https://github.com/matrix-tu-dresden-de/Dokumentation/blob/main/static/images/federation_map.svg)); [Schutz der Kommunikation im Gesundheitswesen](https://matrix.org/blog/2021/07/21/germany-s-national-healthcare-system-adopts-matrix/) in Deutschland; Schutz der nationalen Kommunikation in [Frankreich](https://element.io/case-studies/tchap), [Deutschland](https://element.io/blog/bundesmessenger-is-a-milestone-in-germanys-ground-breaking-vision/), [Schweden](https://element.io/blog/dsam-och-esam-forordar-matrix-for-saker-och-federerad-kommunikation-inom-sveriges-offentliga-sektor/) und der [Schweiz](https://www.youtube.com/watch?v=EIRuxDuWIDE); und sichere Kommunikation für die [NATO](https://www.youtube.com/watch?v=4aswIHJRwkk), das [US-DoD](https://www.wyden.senate.gov/imo/media/doc/wyden-schmitt_dod_letter.pdf) und die Ukraine. Aus den [Vorträgen auf der Matrix-Konferenz](https://2024.matrix.org/watch) im September ist derkönnen Sie den Umfang und das Kaliber des Matrix-Ökosystems klar ersichtlichersehen.

Genau die gleichen Fähigkeiten, die datenschutzsensiblen Organisationen zugute kommen, bedeuten jedoch, dass ein kleiner Teil der Öffentlichkeit versuchen wird, das System zu missbrauchen.

Wir waren uns dieses Missbrauchsrisikos von Anfang an bewusst, und anstatt uns der Verantwortung zu entziehen, wie es viele verschlüsselte Messenger tun, haben wir kontinuierlich daran gearbeitet, dieses Problem zu addressierenlösen. In den frühen Tagen, noch bevor wir signifikanten Missbrauch sahen, bedeutete dies, dass wir über Ansätze zur Bekämpfung des Missbrauchs spekulierten (z. B. unser Vortrag auf der [FOSDEM 2017](https://archive.fosdem.org/2017/schedule/event/matrix_future/%20) und der darauffolgende [Blogbeitrag 2020](https://matrix.org/blog/2020/10/19/combating-abuse-in-matrix-without-backdoors/%20), in dem wir eine dezentrale Reputation vorschlugen; heute erkennbar in [Blueskysblueskys](https://bsky.app) erfolgreichem [Ozone-System zur Missbrauchsbekämpfung](https://github.com/bluesky-social/ozone) und der modularen Moderation). Damals waren diese Beiträge jedoch zukunftsorientiert \- und heute wenden wir andere konkrete Methoden zur Missbrauchsbekämpfung an.  
haben wir andere, konkrete Bemühungen zur Missbrauchsbekämpfung in Gang gesetzt.

In diesem Beitrag möchten wir erklären, wo die Dinge heute stehen und wie sie sich in Zukunft weiter verbessern werden.

## Unsere aktuelle Arbeit

Der größte Teil unserer Mittel als Stiftung wird für unser Vollzeit-Sicherheitsteam verwendet, und wir haben dieses Engagement Ende 2024 erweitert. Das Team kümmert sich täglich um die Sichtung, Untersuchung, Identifizierung und Entfernung schädlicher Inhalte vom Matrix.org-Server und entfernt Nutzer, die dieses Material teilen. Darüber hinaus entwickeltn siees Werkzeuge zur Verhinderung, Erkennung und Entfernung schädlicher Inhalte und zum Schutz der Mitarbeiter, die an den Berichten und Untersuchungen der Nutzer arbeiten.

Die Menschen, die das Trust & Safety Team der Stiftung bilden, sind engagierte Fachleute, die jeden Tag ihre eigene geistige Gesundheit und ihr Wohlbefinden aufs Spiel setzen, indem sie schädliche Inhalte überprüfen, die von Menschen hinzugefügt wurden, die den von uns angebotenen Dienst missbrauchen. Bei ihrer Arbeit sind sie Gefahren ausgesetzt, darunter sexuelle Ausbeutung und Missbrauch von Kindern (CSEA), terroristische Inhalte, nicht einvernehmliche intime Bilder (NCII), Belästigung, Hass, Deepfakes, Betrug, Fehlinformationen, illegale Pornografie, Drogen, Schusswaffen, Spam, Selbstmord, Menschenhandel und mehr. Es ist eine Wäscheliste mit dem Schlimmsten, was die Menschheit zu bieten hat. Die düstere Realität ist, dass sich alle Online-Dienste mit diesen Problemen auseinandersetzen und die Arbeit zur Erkennung und Entfernung dieser Inhalte mit den Rechten ihrer Nutzer in Einklang bringen müssen. Wir haben uns dieser Arbeit verschrieben und unterstützen das Trust & Safety Team nach besten Kräften \- wir sind sehr dankbar für ihre Aufopferung.

### Sicherheitswerkzeugetools für Matrix

Das Trust & Safety Team befasst sich mit dem Thema Sicherheit aus zwei Blickwinkeln: SchutzSicherheit für die Nutzer des Matrix.org-Servers und SchutzSicherheit für das gesamte Matrix-Netz als Ganzes. Für letzteres tragen wir zur Entwicklung der Matrix-Spezifikation bei, stehen im engen Austausch mit anderen engagieren uns im Matrix-Ökosystem und beraten uns mit Regierungen, Strafverfolgungsbehörden, zivilgesellschaftlichen Gruppen, Hochschulen und Industriegruppen. Wir investieren auch in Open-Source-Tools, um das Ökosystem bei diesem Problem zu unterstützen. Für ersteres setzen wir eine Mischung aus proaktivem und reaktivem Vorgehen gegen Online-Missbrauch ein.

Die Matrix-Spezifikation umfasst ein System zur Meldung von Räumen, Nachrichten und Nutzern an Ihren Homeserver, API-Endpunkte für Serveradministratoren zum Sperren, Suspendieren und Deaktivieren von Nutzern, Mechanismen zur Quarantäne von schädlichen Medien und zum Entfernen unerwünschter Nachrichten. Wir nutzen all diese Möglichkeiten und erhalten wöchentlich Hunderte von Meldungen von Benutzern des Matrix.org-Servers und E-Mails an unsere Meldeadresse.

Darüber hinaus scannen wir Raumnamen und \-titel auf dem Matrix.org-Server anhand einer Reihe von Schlüsselwortlisten und unterziehenmarkieren Übereinstimmungen für einer menschlichen Überprüfung. Wir pflegenunterhalten auch einen Moderations-Bot namens [Mjolnir](https://github.com/matrix-org/mjolnir), den wir zur Moderation unserer Community-Räume verwenden und als Open Source für andere Communities zur Verfügung stellen. Hinter den Kulissen verfügen wir über Tools, die dem Trust & Safety Team an vorderster Front helfen, Räume, Benutzer und Nachrichten zu untersuchen und Maßnahmen zu ergreifen, wenn Missbrauch vorliegt.

Als wir den Missbrauch des Serverraumverzeichnisses von Matrix.org feststellten, haben wir das Verzeichnis eingefroren und missbräuchliche Räume entfernt. In naher Zukunft werden wir zu einem kuratierten Verzeichnis wechseln, um zu verhindern, dass es als Werbesystem für Missbrauch genutzt wird. Es ist erwähnenswert, dass Matrix in der Vergangenheit mit dem Konzept dieser „Raumverzeichnisse“ unbeabsichtigt eine Plattform für Missbrauch geschaffen hat, da diese (im Gegensatz zu anderen verschlüsselten Messengern wie Signal oder Threema oder WhatsApp) jedem Nutzer erlauben, öffentliche Chaträume aufzulisten, ohne dass eine Genehmigung des Administrators erforderlich ist \- dies ist ein Fehler, den wir zutiefst bedauern und den wir durch den Wechsel zu kuratierten Raumverzeichnissen im Allgemeinen beheben werden.

#### Strategien gegen sexuellen Kindesmissbrauch und Ausbeutung (CSEA)

Einer unserer Schwerpunkte ist der Kampf gegen die sexuelle Ausbeutung und den Missbrauch von Kindern. Wir verabscheuen sexuelle Ausbeutung von Kindern (CSEA) und haben in unseren Nutzungsbedingungen immer ausdrücklich darauf hingewiesen, dass wir mit den Strafverfolgungsbehörden zusammenarbeiten, um sie zu bekämpfen. Wir setzen Werkzeuge und spezielle Techniken ein, um die Verbreitung von CSEA auf dem Matrix.org-Server zu unterbinden:

* Wir arbeiten mit der Internet Watch Foundation (IWF), dem National Center for Missing and Exploited Children (NCMEC), [cybertip.ca](http://cybertip.ca), dem Australian eSafety Commissioner und anderen Parteien zusammen. (Element, das den Matrix.org-Server im Auftrag der Stiftung betreibt, ist seit 2020 aktives Mitglied der [IWF](https://www.iwf.org.uk/membership/our-members/element/)).  
* Wir arbeiten mit Strafverfolgungsbehörden im Vereinigten Königreich und in den USA zusammen.  
* Wir haben uns mit Gruppen wie der Lucy Faithfull Foundation und Columbia SIPA beraten, um von deren Fachwissen zu lernen.  
* Wir verwenden die [CSAM-Erkennungs-APIs](https://developers.cloudflare.com/cache/reference/csam-scanning/) von Cloudflare für unverschlüsselte Inhalte auf Matrix.org.  
* Wir verwenden die IWF-Hash-, URL- und Schlüsselwortlisten der IWF für unverschlüsselte Inhalte auf Matrix.org.  
* Wir sperren Räume, entfernen Medien und suspendieren Benutzer, die an Räumen teilnehmen, die dem Austausch von CSEA gewidmet sind.  
* Wir stehen in produktivem Austausch mit zivilgesellschaftlichen Gruppen und begrüßen deren fundierte Kritik und laden sie ein, gemeinsam mit uns gegen CSEA vorzugehen. Weitere Informationen finden Sie weiter unten im Abschnitt **„Wie Sie helfen können**“.

### Aktuelle Maßnahmen

In den letzten sechs Monaten haben wir in verbesserte Werkzeuge für das Frontline-Team investiert, das Nutzerberichte überprüft. Wir haben die [Aufnahme der Kontosperrung](https://github.com/element-hq/synapse/pull/17964) in die Matrix-Spezifikation unterstützt und einen [API-Endpunkt für Massenlöschung](https://element-hq.github.io/synapse/latest/admin_api/user_admin_api.html#redact-all-the-events-of-a-user) für die am weitesten verbreitete Matrix-Server-Implementierung, Synapse, hinzugefügt, damit sowohl der Matrix.org-Server als auch andere Serverinstanzen im Ökosystem davon profitieren können. Bei der Kontosperrung können wir die Moderation von Konten umkehren, was bedeutet, dass wir mehr automatisierte Systeme für eine schnellere Löschung vor der Untersuchung entwickeln können. Dadurch sollen die Zeit, in der illegales Material zugänglich ist, verkürzt und gleichzeitig die Rechte und der Schutz unserer Nutzer gestärkt werden. Außerdem haben wir kürzlich [Authentifizierung für Medien](https://matrix.org/blog/2024/06/26/sunsetting-unauthenticated-media/) hinzugefügt, um den Missbrauch von Matrix als Netzwerk zur Verbreitung von Inhalten zu unterbinden. Wir haben bei diesem Projekt mit der IWF zusammengearbeitet, nachdem Berichte über den Missbrauch von Matrix-Servern als Content-Delivery-Mechanismus für [ICAP-Seiten](https://www.iwf.org.uk/annual-report-2023/trends-and-data/icap-sites/) eingegangen waren.

### Die Matrix Community

Die breitere Matrix-Community hat starke Initiativen zur Missbrauchsbekämpfung, die uns sehr ermutigen. Insbesondere die Arbeit am [Draupnir-Moderationsbot-Projekt](https://github.com/the-draupnir-project/Draupnir) und der Community Moderation Effort ([CME](https://matrix.to/#/#community-moderation-effort-bl:neko.dev)) sind hervorragende Ergänzungen zum Sicherheitsökosystem von Matrix. Auf der Ebene der Server-Tools sind das [Synapse-Admin-Tool](https://github.com/Awesome-Technologies/synapse-admin) von Awesome Technologies und der [Fork von etke.cc](https://github.com/etkecc/synapse-admin) großartige Beispiele dafür, wie Open-Source-Ökosysteme zu Sicherheits-Tools beitragen können. Wir freuen uns über ihre Arbeit und hoffen, dass wir in den kommenden Monaten und Jahren weitere von der Basis ausgehende Entwicklungen sehen werden.

## Woran wir gerade arbeiten

**Reporting**  
Wir haben zwar ein funktionierendes Meldesystem, aber wir können es noch besser machen. Insbesondere werden künftig die Nutzer Updates zu ihren Berichten und den Ergebnissen dieser Untersuchungen erhalten. Wir werden die Art und Weise verbessern, wie Nutzer über Moderationsmaßnahmen in ihrem Konto benachrichtigt werden und wie sie diese Entscheidungen anfechten können. Das gesamte Ökosystem wird von diesen Verbesserungen profitieren, da wir sie in die Matrix Spezifikation einbringen werden.

**Identifizierung & Project Intercept**  
Wir befinden uns in der Anfangsphase eines Projekts, das sich mit der Suche und Identifizierung von CSEA befasst. Wir hatten produktive Gespräche mit der Lucy Faithfull Foundation und Project Intercept über wirksame Schritte zur Umleitung schädlicher Suchanfragen auf Matrix.org für diese Art von Inhalten.

**Transparenz Reporting**  
Rechenschaftspflicht ist wichtig, deshalb wollen wir dieses Jahr mit der Veröffentlichung von Transparenzberichten für Matrix.org beginnen. Das Projekt befindet sich noch im Anfangsstadium, aber wir werden Einzelheiten bekannt geben und um Unterstützung und Mitwirkung bitten, sobald wir der Verwirklichung näher kommen. Wir werden bei diesem Projekt eng mit [dem Matrix.org-Verwaltungsrat (Governing Board) zusammenarbeiten](https://matrix.org/category/governing-board/). Wir hoffen, dass das Hinzufügen von Transparenzberichten unsere Anträge auf Mitgliedschaft in Branchengruppen wie [GIFCT](https://gifct.org/), [Tech Against Terrorism](https://techagainstterrorism.org/home) und [Tech Coalition](https://www.technologycoalition.org/) unterstützen wird.

**Aktualisierungen der Nutzungsbedingungen**  
Wir überarbeiten unsere Nutzungsbedingungen, um deutlicher zu machen, welche Inhalte verboten sind und wie man sie uns melden kann. In den Fällen, in denen wir proaktive Scanning-Techniken einsetzen, werden wir dies in den Bedingungen klarstellen, einschließlich der Frage, wie man gegen Entscheidungen automatischer Systeme Einspruch erheben kann.

**Unsere Tools als Open Source freigeben**  
Während wir die Tools für das Sicherheitsmanagement auf Matrix.org verbessern, wollen wir unsere Arbeit mit anderen teilen. Wir werden in zukünftigen Beiträgen mehr über unsere Ziele sprechen. Als einer der Partner von [ROOST](https://roost.tools/partnerships) beteiligen wir uns auch an der Arbeit an Open-Source-Sicherheitswerkzeugen.

**Erfüllung und Übertreffen unserer Verpflichtungen gemäß dem Online Safety Act**  
Wir sind im Vereinigten Königreich ansässig und haben uns von Anfang an produktiv mit dem Online Safety Act auseinandergesetzt. Dazu gehört auch, dass wir uns weiterhin entschieden gegen die Bedrohung der Ende-zu-Ende-Verschlüsselung wehren. Wir setzen bereits den Perceptual Hash Matching für CSEA-Inhalte in unverschlüsselten Räumen ein und werden weiterhin in diesen Bereich investieren, um schnellere und genauere Abschaltungen zu erreichen und gleichzeitig die Privatsphäre unserer Nutzer zu respektieren.

**Über unsere Arbeit sprechen und unsere Erkenntnisse teilen**  
Eine berechtigte Kritik an der Stiftung lautet, dass wir nicht viel darüber gesprochen haben, was wir tun, um die Sicherheit der Matrix.org-Nutzer zu gewährleisten, und auch nicht darüber, was wir tun, um sicherzustellen, dass Matrix als Plattform ein sicheres Fundament hat. Das wollen wir im Jahr 2025 ändern, angefangen mit diesem Beitrag.

## Wie Sie helfen können

### Als Nutzer von Matrix

Wenn Sie auf Matrix auf schädliche Inhalte stoßen, können Sie diese auf verschiedene Weise melden:

* Wenn Sie ein Matrix.org-Homeserver-Nutzer sind, können [Sie die Inhalte](https://github.com/element-hq/element-x-ios/pull/587) von Ihrem Client aus melden, und sie werden an unser Sicherheitsteam weitergeleitet. Matrix-Clients wie Element iOS ermöglichen es Nutzern, [Räume zu melden](https://github.com/element-hq/element-ios/pull/7805), und wir wissen, dass dies bald auch in Element X, Element Android und Element Web verfügbar sein wird.  
* Wenn Sie einen anderen Matrix-Server verwenden, können Sie die Meldung ebenfalls von Ihrem Client aus an Ihren Server-Administrator senden.  
* Wenn Sie kein Matrix-Nutzer sind oder wenn Sie ein Nutzer auf einem anderen Homeserver sind und uns über schädliche Inhalte auf matrix.org informieren möchten, können Sie uns eine E-Mail mit den Informationen, die Sie haben, an <abuse@matrix.org> schicken. Raum- und Benutzerkennungen sind sehr hilfreich. Bitte schicken Sie uns keine Bildschirmfotos von schädlichen Inhalten \- wir werden Ihnen Bescheid geben, wenn wir weitere Informationen benötigen.

### Als Matrix Server Betreiber

* Die offene Registrierung ist in Synapse [standardmäßig deaktiviert](https://github.com/matrix-org/synapse/commit/58367a9da2539abdbfe4dc817fba5b179b95334b), und wir unterstützen diese Voreinstellung. Wenn Ihr Server eine offene Registrierung anbietet, müssen Sie in ein Sicherheitsteam investieren, um eine angemessene Moderation zu gewährleisten und die Risiken zu minimieren, die entstehen, wenn Sie unbekannten Benutzern die Nutzung Ihres Servers erlauben.  
* Überprüfen Sie, wer sich auf Ihrem Server anmeldet und in welchen Räumen Ihr Server Mitglied ist.  
* Überprüfen Sie die Berichte Ihrer Nutzer und ergreifen Sie Maßnahmen, um gemeldete schädliche Inhalte zu entfernen. Überprüfen Sie Ihre rechtlichen Verpflichtungen in dem Land, in dem Sie Ihren Server betreiben.  
* Arbeiten Sie mit anderen Serverbetreibern zusammen, um Informationen über schädliche Räume und Nutzer auszutauschen. Sie können sich an unser Trust & Safety Team unter [abuse@matrix.org](mailto:abuse@matrix.org) wenden, um dieses Gespräch zu beginnen.

### Zivilgesellschaftliche Gruppen, Wissenschaft und Industrieverbände

Wir begrüßen die Unterstützung von Gruppen der Zivilgesellschaft und Akademikern, die in diesem Bereich arbeiten. Bitte wenden Sie sich an [abuse@matrix.org](mailto:abuse@matrix.org) und teilen Sie uns Ihre Kontaktdaten und Ihr Interessengebiet mit, damit wir uns austauschen können. Wir sind sehr daran interessiert, vertrauenswürdige Berichterstatter hinzuzuziehen. Wenn Sie uns also Berichte schicken möchten, lassen Sie es uns bitte wissen. Um die Ausbreitung von Online-Missbrauch zu bekämpfen, müssen alle Teile des Puzzles zusammenarbeiten, und wir wollen ein gutes Beispiel dafür sein, wie Technik für die Gesellschaft arbeiten kann. Wir würden gerne mit Branchengruppen zusammenarbeiten, Erfahrungen austauschen und voneinander lernen. Die Eintrittsbarrieren für diese Gruppen sind eine Herausforderung, und wir würden uns freuen, wenn Sie uns helfen würden, sie abzubauen.

### Strafverfolgungsbehörden

Bitte lesen Sie unsere Leitlinien hier: [https://matrix.org/legal/law-enforcement-guidelines/](https://matrix.org/legal/law-enforcement-guidelines/)

### Finanzierung

Die Tech-Industrie investiert zu wenig in die Sicherheit. Wir versuchen, es besser zu machen, und Sicherheit ist der größte Posten im Haushalt der Stiftung. Diese Investition erfolgt trotz der Herausforderungen, denen wir uns bei unseren [ständigen](https://matrix.org/blog/2024/12/25/the-matrix-holiday-special-2024/) Versuchen [gegenübersehen](https://matrix.org/blog/2024/01/2024-roadmap-and-fundraiser/), [Mittel zur Unterstützung](https://matrix.org/blog/2024/01/2024-roadmap-and-fundraiser/) der Entwicklung von Matrix [und](https://matrix.org/blog/2024/04/open-source-publicly-funded-service/) [offener Software im Allgemeinen](https://matrix.org/blog/2024/07/17/ngi-open-letter/) aufzubringen. Wir sind für unseren Betrieb auf Spenden angewiesen. Große öffentliche und private Organisationen nutzen die von uns geleistete Arbeit, oft ohne einen finanziellen Beitrag zu leisten. Es wäre einfach, die Ausgaben für Vertrauen und Sicherheit angesichts dieser wirtschaftlichen Zwänge zu opfern, aber wir versuchen, einen besseren Weg zu finden. Wenn Sie unsere Arbeit im Bereich Sicherheit finanziell unterstützen möchten, wenden Sie sich bitte an die Stiftung unter [funding@matrix.org](mailto:funding@matrix.org).
