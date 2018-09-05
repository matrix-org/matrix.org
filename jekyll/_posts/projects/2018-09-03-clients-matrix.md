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
    width: 18% !important;
}

#document table:first-of-type tr td:nth-child(1) {
  white-space: &#10007;wrap;
}

table tr:nth-child(even) {
  background-color: #f5f5f5;
}

table:nth-of-type(2) tr:nth-child(5)  {
    font-size: small;
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
        if (text.match(/Build from source|WIP|Predefined|Images|Partial|Text only/))
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

To connect to the Matrix federation, you will use a client. These are some of the most popular Matrix clients available today, and more are available at  [try-matrix-now](try-matrix-now). To get started using Matrix, pick a client and join [#matrix:matrix.org](https://matrix.to/#/#matrix:matrix.org)

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
Repo|[riot-web](https://github.com/vector-im/riot-web/)|[riot-android](https://github.com/vector-im/riot-android/)|[riot-ios](https://github.com/vector-im/riot-ios/)|[nheko](https://github.com/mujx/nheko)|[gomuks](https://github.com/tulir/gomuks)|[Quaternion](https://github.com/QMatrixClient/Quaternion/)|[Fractal](https://gitlab.gnome.org/World/fractal)|[Seaglass](https://github.com/neilalexander/seaglass)|[Matrique](https://gitlab.com/b0/matrique)|[uMatriks](https://github.com/uMatriks/uMatriks)
Matrix Room|<small>[#riot:<br />matrix.org](https://matrix.to/#/#riot:matrix.org)</small>|<small>[#riot-android:<br />matrix.org](https://matrix.to/#/#riot-android:matrix.org)</small>|<small>[#riot-ios:<br />matrix.org](https://matrix.to/#/#riot-ios:matrix.org)</small>|<small>[#nheko:<br />matrix.org](https://matrix.to/#/##nheko:matrix.org)</small>|<small>[#gomuks:<br />maunium.net](https://matrix.to/#/#gomuks:maunium.net)</small>|<small>[#qmatrixclient:<br />matrix.org](https://matrix.to/#/#qmatrixclient:matrix.org)</small>|<small>[#fractal-gtk:<br />matrix.org](https://matrix.to/#/#fractal-gtk:matrix.org)</small>|<small>[#seaglass:<br />matrix.org](https://matrix.to/#/#seaglass:matrix.org)</small>|<small>[#matrique:<br />matrix.org](https://matrix.to/#/#matrique:matrix.org)</small>|<small>[#uMatriks:<br />matrix.org](https://matrix.to/#/#uMatriks:matrix.org)</small>
Platform| Web (React)|          Android|             iOS|           Qt|Go<br />Terminal|              Qt|           GTK+|macOS<br />Cocoa|              Qt|Qt<br />Ubuntu Touch|
Language| JavaScript (React)|      Java|     Objective-C|          C++|            Go|               C++|           Rust|           Swift|             C++|             C++|
SDK | matrix-js-sdk, matrix-react-sdk| matrix-android-sdk|matrix-ios-sdk||gomatrix (fork)|libqmatrixclient|             |  matrix-ios-sdk|libqmatrixclient|libqmatrixclient|
Target Spec Version|r0.4.0|             r0.4.0|             r0.4.0|           r0.4.0|            r0.4.0|                r0.4.0|             r0.4.0|              r0.4.0|              r0.4.0|              r0.4.0|

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
Edit Room Description|&#10003;|&#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10003;|       &#10003;|        &#10003;|        &#10003;|        &#10007;|
Highlights |&#10003;|          &#10003;|        &#10003;|     &#10007;|      &#10003;|          &#10003;|       &#10003;|        &#10003;|        &#10007;|        &#10003;|
Pushrules | &#10003;|          &#10003;|        &#10003;|     &#10007;|      &#10003;|          &#10003;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Send read markers| &#10003;|   &#10003;|        &#10003;|     &#10003;|      &#10003;|          &#10003;|       &#10003;|        &#10007;|        &#10007;|        &#10007;|
Display read markers |&#10003;|&#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Sending Invites| &#10003;| &#10003;|            &#10003;|     &#10003;|      &#10007;|          &#10003;|       &#10003;|        &#10007;|        &#10007;|        &#10007;|
Accepting Invites| &#10003;| &#10003;|          &#10003;|     &#10003;|      &#10007;|          &#10003;|       &#10003;|        &#10003;|        &#10007;|        &#10007;|
Typing Notification|&#10003;|  &#10003;|        &#10003;|     &#10003;|      &#10003;|          &#10003;|       &#10003;|        &#10003;|        &#10003;|        &#10007;|
<br/>*Message Features*|
E2E|&#10003;|                  &#10003;|        &#10003;|    Text only|      &#10007;|          &#10007;|       &#10007;|        &#10003;|        &#10007;|        &#10007;|
Replies| &#10003;|             &#10003;|        &#10003;|     &#10007;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
Attachment uploading|&#10003;| &#10003;|        &#10003;|     &#10003;|      &#10007;|          &#10007;|       &#10003;|        &#10007;|        &#10003;|        &#10007;|
Attachment downloading| &#10003;| &#10003;|     &#10003;|     &#10003;|        Images|          &#10003;|       &#10003;|        &#10003;|        &#10003;|        &#10003;|
Send stickers| &#10003;|       &#10003;|        &#10003;|     &#10007;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|
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
Communities Creation|&#10003;| &#10007;|        &#10007;|     &#10007;|      &#10007;|          &#10007;|       &#10007;|        &#10007;|        &#10007;|        &#10007;|

*These features are in common usage in the Matrix ecosystem and could be added to a feature version of the spec.*