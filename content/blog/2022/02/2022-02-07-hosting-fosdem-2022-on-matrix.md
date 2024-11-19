+++
title = "Hosting FOSDEM 2022 on Matrix"
path = "/blog/2022/02/07/hosting-fosdem-2022-on-matrix"

[taxonomies]
author = ["Thib"]
category = ["General"]
+++

Last year was the first time FOSDEM was hosted on Matrix, and it was generally a huge success - and so the FOSDEM team trusted us again this year and we’re happy to say that it seems to have gone really well! This year’s FOSDEM was massive once again, featuring 654 speakers, 731 events, and 103 tracks.

This year hosting the event went smoother than last year, the only significant issue was some of the Q&A Jitsis not being broadcast to the devrooms on Saturday before 10:15 UTC, for which we offer our apologies to the speakers impacted. This turned out to be a problem with the Matrix&lt;->Jitsi access control sync system which hadn’t showed up during earlier testing, but we patched around it rapidly on the day.

The most notable difference between this year and the previous year has been the usage of a “attendees.fosdem.org” instance in addition to the original “fosdem.org” one, specifically for attendees. The graphs speak for themselves: Synapse could handle the load of the 23K users (13K joined users and 10K lurkers) spread across a total number of 941 rooms. The real eye-opener however is that of the 13K joined users, only 4K came came from the FOSDEM attendee server, and 1K from Libera Chat, meaning that ~70% of the Matrix participants were already on Matrix and came in from existing servers! 🤯 That means the vast majority of people attended over federation. Decentralisation at work, people! It works! We didn’t host the conference… you did!!

![FOSDEM attendees heatmap](/blog/img/2022-07-02-fosdem_attendees_heatmap.png)

But not only did the backend handle the load smoothly: the general user experience felt tightly integrated. People were welcomed by a tailor-made home page in Element to help them navigate through all the tracks and stands:.

![Homescreen of chat.fosdem.org](/blog/img/2022-07-02-fosdem_homescreen.png)

One of the great things is it doesn’t require heavy modifications to Element: anyone who installs their own instance of Element can use a simple html file to display relevant information to their audience.

New this year, we also generated a space hierarchy for the whole conference at [#fosdem2022:fosdem.org](https://matrix.to/#/#fosdem2022:fosdem.org) to help navigate the maze of rooms, making it even easier for users on their own servers to jump in:

![FOSDEM Space listing all the FOSDEM rooms](/blog/img/2022-07-02-fosdem_space.png)

Another greatly appreciated feature was the famous “maximised widgets” I (Thib) [keep telling you about in Matrix Live episodes](https://www.youtube.com/c/Matrixdotorg). Attendees and speakers could give the conference the central attention it deserved while simultaneously keeping an eye on what was happening in the chat.

![FOSDEM stand with maximised widget view](/blog/img/2022-07-02-fosdem_stand.png)

From the speaker's perspective, we tried to streamline the user journey as much as possible: a bot invited them to a backstage room, in which they joined a Jitsi widget while their talk was being played in the track or devroom. They could see the most upvoted questions by the audience in a dedicated widget. A few minutes before their pre-recorded talk was over, a countdown (new this year!) could be displayed to tell them and the host they were about to go live. At the end of the countdown, the backstage Jitsi was broadcasted to the track so the speaker could answer the questions.

![Backstage room where the speaker and host could talk and see the questions](/blog/img/2022-07-02-fosdem_backstage.png)

If you want to have an in-depth look at the backend’s architecture, it didn’t change much from last year. You can have a look at [last year’s blog post for the details on the setup](https://matrix.org/blog/2021/02/15/how-we-hosted-fosdem-2021-on-matrix#how-was-it-built). Most of the heavy lifting was around [the conference bot](https://github.com/matrix-org/conference-bot) used to set rooms up, create the spaces, populate them with widgets, arrange layouts and trigger countdowns before going live…

Finally we are immensely proud that we had our first ever Matrix Devroom! Not only does it mean the staff of a large international open source conference thinks it’s worth having a track of our own, it also means our community has grown to the point where we could have [8 hours of back to back Matrix content](https://fosdem.org/2022/schedule/track/matrixorg_foundation_and_community/)! Here’s a link to [the YouTube playlists to which we are going to add the videos of FOSDEM](https://www.youtube.com/playlist?list=PLl5dnxRMP1hW7HxlJiHSox02MK9_KluLH) as they’re being published.

Huge thanks to the FOSDEM team for trusting us, massive shout-out to [Element Matrix Services](https://ems.element.io/) and Element’s Ops and infrastructure team for their fantastic job in setting everything up and making sure everything was ready in time, a sincere thank you to all the fantastic speakers who shared awesome content, and finally to all the attendees. What a weekend!
