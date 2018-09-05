---
layout: default
categories: projects
---

<style>
table {
    width: 100%
}

table tr td {
    width: 8%
}

table tr td:nth-child(1) {
    width: 20%
}

#document table:first-of-type tr td:nth-child(1) {
  white-space: &#10007;wrap;
}

table tr:nth-child(even) {
  background-color: #f5f5f5;
}

.green {
    color: #78A830;
    font-weight: bold;
     font-size: x-large;
}
.orange {
    color: #F0A800;
}
.red {
    color: #D84830;
}
small {
    font-size: small;
    font-weight: normal;
}
h2 {
    padding-top: 10px;
}
</style>
<!-- https://www.colourlovers.com/palette/65580/traffic_light <-  &#10003; pls -->
<script>
jQuery(document).ready(function () {
    jQuery("td").each(function( index ) {
        var text = jQuery( this ).text();
        if (text.startsWith("Yes") || text.startsWith("✓")) {
            jQuery(this).addClass("green");
        }
        if (text.match(/Build from source|WIP|Predefined|Images|Partial/))
        {
            jQuery(this).addClass("orange");
        }
        if (text === "No" || text.startsWith("✗")) {
            jQuery(this).addClass("red");
        }
    });
});
</script>

# Matrix Clients Matrix

## Platform Availability

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks    |
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Linux|&#10003;<br /><small>Electron</small>| |          |   &#10003;  | &#10003;     |  &#10003;        |   &#10003;    |                |        &#10003;|
Mac|&#10003;<br /><small>Electron</small>||             |  &#10003;   |      &#10003;| Build from source|            WIP|        &#10003;|
Windows|&#10003;<br /><small>Electron</small>||         |     &#10003;|      &#10003;|          &#10003;|               |                |        &#10003;|
Android||&#10003;||||||
iOS|||&#10003;|||||
Ubuntu Touch||||||||||&#10003;

## Details

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks    |
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Repo|[riot-web on GitHub](https://github.com/vector-im/riot-web/)|[riot-android on GitHub](https://github.com/vector-im/riot-android/)|[riot-ios on GitHub](https://github.com/vector-im/riot-ios/)|[nheko on github](https://github.com/mujx/nheko)|[gomuks on github](https://github.com/tulir/gomuks)|[Quaternion on GitHub](https://github.com/QMatrixClient/Quaternion/)|[Fractal on Gnome GitLab](https://gitlab.gnome.org/World/fractal)|[Seaglass on GitHub](https://github.com/neilalexander/seaglass)|[Matrique on GitLab](https://gitlab.com/b0/matrique)|[uMatriks on GitHub](https://github.com/uMatriks/uMatriks)
Matrix Room|<small>[#riot:<br />matrix.org](https://matrix.to/#/#riot:matrix.org)</small>|<small>[#riot:<br />matrix.org](https://matrix.to/#/#riot:matrix.org)</small>|<small>[#riot:<br />matrix.org](https://matrix.to/#/#riot:matrix.org)</small>|<small>[#nheko:<br />matrix.org](https://matrix.to/#/##nheko:matrix.org)</small>|<small>[#gomuks:<br />maunium.net](https://matrix.to/#/#gomuks:maunium.net)</small>|<small>[#qmatrixclient:<br />matrix.org](https://matrix.to/#/#qmatrixclient:matrix.org)</small>|<small>[#fractal-gtk:<br />matrix.org](https://matrix.to/#/#fractal-gtk:matrix.org)</small>|<small>[#seaglass:<br />matrix.org](https://matrix.to/#/#seaglass:matrix.org)</small>|<small>[#matrique:<br />matrix.org](https://matrix.to/#/#matrique:matrix.org)</small>|<small>[#uMatriks:<br />matrix.org](https://matrix.to/#/#uMatriks:matrix.org)</small>
Platform| Web (React)|          Android|             iOS|           Qt|Go<br />Terminal|              Qt|           GTK+|macOS<br />Cocoa|              Qt|Qt<br />Ubuntu Touch|
Language| JavaScript (React)|      Java|     Objective-C|          C++|            Go|               C++|           Rust|           Swift|             C++|             C++|
SDK | matrix-js-sdk, matrix-react-sdk| matrix-android-sdk|matrix-ios-sdk||gomatrix (fork)|libqmatrixclient|             |  matrix-ios-sdk|libqmatrixclient|libqmatrixclient|
supported matrix spec|r0|             r0|             r0|           r0|            r0|                r0|             r0|              r0|              r0|              r0|

## Features

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
<br/>*Room Management*|
Room directory|  &#10003;|     &#10003;|        &#10003;|     &#10007;|      &#10007;|          &#10007;|       &#10003;|        &#10007;|        &#10007;|        &#10007;|
Room tag showing| &#10003;|  Predefined|      Predefined|     &#10007;|      &#10003;|          &#10003;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Room tag editing|Predefined| Predefined|      Predefined|     &#10007;|      &#10007;|          &#10003;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Search joined rooms| &#10003;| &#10003;|        &#10003;|     &#10003;|      &#10003;|          &#10007;|       &#10003;|        &#10003;|        &#10003;|        &#10007;|
<br/>*Room Features*|
Room user list| &#10003;|      &#10003;|        &#10003;|     &#10003;|      &#10003;|          &#10003;|       &#10003;|        &#10003;|        &#10007;|        &#10003;|
Display Room Description|&#10003;|&#10003;|     &#10003;|     &#10003;|      &#10003;|          &#10003;|       &#10003;|        &#10003;|        &#10003;|        &#10003;|
Edit Room Description|&#10003;|&#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10003;|       &#10003;|        &#10007;|        &#10003;|        &#10007;|
Highlights |&#10003;|          &#10003;|        &#10003;|     &#10007;|      &#10003;|          &#10003;|       &#10003;|        &#10003;|        &#10007;|        &#10003;|
Pushrules | &#10003;|          &#10003;|        &#10003;|     &#10007;|      &#10003;|          &#10003;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Send read markers| &#10003;|   &#10003;|        &#10003;|     &#10003;|      &#10003;|          &#10003;|       &#10003;|        &#10007;|        &#10007;|        &#10007;|
Display read markers |&#10003;|&#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Sending Invites| &#10003;| &#10003;|            &#10003;|     &#10003;|      &#10007;|          &#10003;|       &#10003;|        &#10007;|        &#10007;|        &#10007;|
Accepting Invites| &#10003;| &#10003;|          &#10003;|     &#10003;|      &#10007;|          &#10003;|       &#10003;|        &#10003;|        &#10007;|        &#10007;|
Typing Notification|&#10003;|  &#10003;|        &#10003;|     &#10003;|      &#10003;|          &#10003;|       &#10003;|        &#10003;|        &#10003;|        &#10007;|
<br/>*Message Features*|
E2E|&#10003;|                  &#10003;|        &#10003;|      Partial|      &#10007;|          &#10007;|       &#10007;|        &#10003;|        &#10007;|        &#10007;|
Replies| &#10003;|             &#10003;|        &#10003;|     &#10007;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Attachment uploading|&#10003;| &#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10007;|       &#10003;|        &#10007;|        &#10003;|        &#10007;|
Attachment downloading| &#10003;| &#10003;|     &#10003;|     &#10003;|        Images|          &#10003;|       &#10003;|        &#10003;|        &#10003;|        &#10003;|
Send stickers| &#10003;|       &#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Send formatted messages (markdown)|&#10003;|&#10003;|&#10003;|&#10007;|      &#10003;|          &#10007;|       &#10003;|        &#10003;|        &#10003;|        &#10007;|
Rich Text Editor for formatted messages| &#10003;|&#10007;|&#10007;|&#10007;|&#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Display formatted messages| &#10003;| &#10003;| &#10003;|     &#10007;|      &#10003;|          &#10007;|       &#10007;|        &#10003;|        &#10003;|        &#10007;|
Redacting | &#10003;|          &#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10007;|       &#10003;|        &#10003;|        &#10003;|        &#10007;|
<br/>*Other Features*|
New user registration|&#10003;|&#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
voip|&#10003;|                 &#10003;|        &#10003;|     &#10007;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|

## Future-specification Features

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Communities Display|&#10003;|  &#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Communities Creation|&#10003;| &#10003;|        &#10003;|     &#10007;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|

*These features are in common usage in the Matrix ecosystem and could be added to a feature version of the spec.*