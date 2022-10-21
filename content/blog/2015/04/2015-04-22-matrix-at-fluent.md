+++
title = "Matrix at Fluent"
path = "/blog/2015/04/22/matrix-at-fluent"

[taxonomies]
author = ["Oddvar Lovaas"]
category = ["General"]
+++

This week, Matrix is visiting San Francisco for <a href="http://fluentconf.com/" title="Fluent">Fluent</a>, a web development conference over three days, with events ranging from 2-day training sessions to 10-min showcase presentations.

<a href="http://matrix.org/blog/wp-content/uploads/2015/04/fluent1.png"><img src="http://matrix.org/blog/wp-content/uploads/2015/04/fluent1.png" alt="fluent" width="1328" height="540" class="aligncenter size-full wp-image-894" /></a>

I had the opportunity to participate in the latter: Tuesday's Solutions Showcase in the Community Lounge. The presentation was recorded, here is the <a href="https://www.youtube.com/watch?v=JhZ1D_DFQAY" title="video">video</a> and <a href="http://matrix.org/blog/wp-content/uploads/2015/04/2015-04-20_Fluent_10min.pdf">slides</a>.

I also had a 30-min in-depth <a href="http://fluentconf.com/javascript-html-2015/public/schedule/detail/42666" title="talk">talk</a> earlier today, where I went through a case study of adding Matrix to your existing app (<a href="http://matrix.org/blog/wp-content/uploads/2015/04/2015-04-20_Fluent_30min.pdf">slides</a>). After evaluating options, we decided to use the <a href="https://facebook.github.io/flux/docs/chat.html" title="flux-chat">flux-chat</a> example by Facebook - it's a basic chat application that uses their internal message dispatcher and showcases how a React/Flux app works.

The code for the original example can be found <a href="https://github.com/facebook/flux/tree/master/examples/flux-chat/" title="here">here</a>, and the complete diff of changes necessary to integrate it with Matrix - using the <a href="https://github.com/matrix-org/matrix-js-sdk" title="matrix-js-sdk">matrix-js-sdk</a> - can be found <a href="https://github.com/facebook/flux/compare/master...ara4n:mxstore" title="here">here</a> (thanks to Matthew for yet another late-night hack!). I think it's very cool to see how easily their chat example can be turned into a Matrix client, albeit a fairly basic one! <a href="http://arasphere.net/flux/examples/flux-chat/" title="Here">Here</a> is an online version if you want to try it out!

<table style="border:solid 0px #ffffff;" border="0" width="100%"><tr style="border:0"><td style="border:0">
<a href="http://matrix.org/blog/wp-content/uploads/2015/04/flux-chat-org.png"><img src="http://matrix.org/blog/wp-content/uploads/2015/04/flux-chat-org.png" alt="flux-chat-org" width="1199" height="756" class="aligncenter size-full wp-image-885" /></a></td>
<td style="border:0"><a href="http://matrix.org/blog/wp-content/uploads/2015/04/flux-chat-matrix1.png"><img src="http://matrix.org/blog/wp-content/uploads/2015/04/flux-chat-matrix1.png" alt="flux-chat-matrix" width="1199" height="756" class="aligncenter size-full wp-image-883" /></a></td></tr>
<tr style="border:0">
<td style="border:0" colspan="2"><em><center>The original flux-chat and the Matrix-enabled flux-chat</center></em>
</td>
</tr></table>

If you have any questions or comments, we are still at Fluent - you can catch us in the exhibition hall in booth #208 - or virtually, as always, in <a href="/beta/#/room/#matrix:matrix.org" title="#matrix:matrix.org">#matrix:matrix.org</a>!
