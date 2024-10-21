+++
title = "Publishing the Backend Roadmap"
path = "/blog/2019/02/15/publishing-the-backend-roadmap"

[taxonomies]
author = ["Neil Johnson"]
category = ["Tech"]
+++

Good people,

2019 is a big year for Matrix, in the next month we will have shipped:

<ul>
  <li style="font-weight: 400;">Matrix spec 1.0 (including the first stable release of the Server to Server Spec)
</li>
  <li style="font-weight: 400;">Synapse 1.0
</li>
  <li style="font-weight: 400;">Riot 1.0
</li>
</ul>
This is huge in itself, but is really only the beginning, and now we want to grow the ecosystem as quickly as possible. This means landing a mix of new features, enhancing existing ones, some big performance improvements as well as generally making life easier for our regular users, homeserver admins and community developers.

Today we are sharing the Matrix core team's backend roadmap. The idea is that this will make it easier for anyone to understand where the project is going, what we consider to be important, and why.

To see the roadmap in its full glory, <a href="https://github.com/orgs/matrix-org/projects/9">take a look here</a>.

### What is a roadmap and why is it valuable?

A roadmap is a set of high level projects that the team intend to work on and a rough sense of the relative priority. It is essential to focus on specific goals, which inevitably means consciously not working on other initiatives.

Our roadmap is not a delivery plan - there are explicitly no dates. The reason for this is that we know that other projects will emerge, developers will be needed to support other urgent initiatives, matrix.org use continues to grow exponentially and will require performance tweaking.

So simply, based on what we know now, this is the order we will work on our projects.

### Why are we sharing it?

We already share our <a href="https://github.com/orgs/matrix-org/projects/8">day to day todo list</a>, and of course our commit history, but it can be difficult for a casual observer to see the bigger picture from such granular data. The purpose of sharing is that we want anyone from the community to understand where our priorities lie.

We are often asked ‘Why are you not working on X, it is really important' where the answer is often ‘We agree that X is really important, but A, B and C are more important and must come first'.

The point of sharing the roadmap is to make that priority trade off more transparent and consumable.

### How did we build it?

The core contributors to Synapse and Dendrite are 6 people, of 5 nationalities spread across 3 locations. After shipping the <a href="/docs/spec/server_server/r0.1.1.html">r0 release of the Server to Server spec</a> last month we took some time to step back and have a think about what to do after Synapse 1.0 lands. This meant getting everyone in one place to talk it through.

We also had Ben (benpa) contribute from a community perspective and took input from speaking to so many of you at FOSDEM.

In the end we filled a wall with post-its, each post-it representing a sizeable project. The position of the post-it was significant in that the vertical axis being a sense of how valuable we thought the task would be, and the horizontal axis being a rough guess on how complex we considered it to be.

We found this sort of grid approach to be really helpful in determining relative priority.

After many hours and plenty of blood, sweat and tears we ended up with something we could live with and wrote it up in the <a href="https://github.com/orgs/matrix-org/projects/9">shared board</a>.

<a href="/blog/wp-content/uploads/2019/02/IMG_2247.jpg"><img class="alignnone size-medium wp-image-3996" src="/blog/wp-content/uploads/2019/02/IMG_2247-300x225.jpg" alt="" width="300" height="225" /></a><a href="/blog/wp-content/uploads/2019/02/IMG_2245.jpg"><img class="alignnone size-medium wp-image-3990" src="/blog/wp-content/uploads/2019/02/IMG_2245-300x225.jpg" alt="" width="300" height="225" /></a>

### And this is written in blood right?

Not at all (it's written in board marker). This is simply a way to express our plan of action and we are likely to make changes to it dynamically. However, this means that at any given moment, if someone wants to know what we are working on then the roadmap is the place to go.

### But wait I want to know more

Here is a video of myself and Matthew to talk you through the projects

{{ youtube_player(video_id="LfyQ6cNGbLk") }}

### Interesting, but I have questions

Any feedback gratefully received, come and ask questions in <a href="https://matrix.to/#/#synapse:matrix.org">#synapse</a> or <a href="https://matrix.to/#/#dendrite:matrix.org">#dendrite</a> or feel free to ping me direct at @neilj:matrix.org
