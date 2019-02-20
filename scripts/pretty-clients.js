var rawMd = `
# Matrix Clients Matrix

To connect to the Matrix federation, you will use a client. These are some of the most popular Matrix clients available today, and more are available at  [try-matrix-now](try-matrix-now). To get started using Matrix, pick a client and join [#matrix:matrix.org](https://matrix.to/#/#matrix:matrix.org)

## Platform Availability

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Spectral    |    uMatriks    | FluffyChat|
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Linux|&#10003;<br /><small>Electron</small>| |          |   &#10003;  | &#10003;     |  &#10003;        |   &#10003;    |                |        &#10003;|
Mac|&#10003;<br /><small>Electron</small>||             |  &#10003;   |      &#10003;|  &#10003;        |            WIP|        &#10003;|        &#10003;|
Windows|&#10003;<br /><small>Electron</small>||         |     &#10003;|      &#10003;|          &#10003;|               |                |        &#10003;|
Android||&#10003;||||||
iOS|||&#10003;|||||
Ubuntu Touch|     |                    |         |         |         |                  |                  |                  |                  |                 &#10003;|   &#10003;|


## Details

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Spectral    |    uMatriks    | FluffyChat|
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Repo|[riot-web](https://github.com/vector-im/riot-web/)|[riot-android](https://github.com/vector-im/riot-android/)|[riot-ios](https://github.com/vector-im/riot-ios/)|[nheko](https://github.com/Nheko-Reborn/nheko)|[gomuks](https://github.com/tulir/gomuks)|[Quaternion](https://github.com/QMatrixClient/Quaternion/)|[Fractal](https://gitlab.gnome.org/World/fractal)|[Seaglass](https://github.com/neilalexander/seaglass)|[Spectral](https://gitlab.com/b0/spectral)|[uMatriks](https://github.com/uMatriks/uMatriks)|[FluffyChat](https://github.com/ChristianPauly/fluffychat)|
Matrix Room|<small>[#riot:<br />matrix.org](https://matrix.to/#/#riot:matrix.org)</small>|<small>[#riot-android:<br />matrix.org](https://matrix.to/#/#riot-android:matrix.org)</small>|<small>[#riot-ios:<br />matrix.org](https://matrix.to/#/#riot-ios:matrix.org)</small>|<small>[#nheko:<br />matrix.org](https://matrix.to/#/##nheko:matrix.org)</small>|<small>[#gomuks:<br />maunium.net](https://matrix.to/#/#gomuks:maunium.net)</small>|<small>[#qmatrixclient:<br />matrix.org](https://matrix.to/#/#qmatrixclient:matrix.org)</small>|<small>[#fractal-gtk:<br />matrix.org](https://matrix.to/#/#fractal-gtk:matrix.org)</small>|<small>[#seaglass:<br />matrix.org](https://matrix.to/#/#seaglass:matrix.org)</small>|<small>[#spectral:<br />encom.eu.org](https://matrix.to/#/#spectral:encom.eu.org)</small>|<small>[#uMatriks:<br />matrix.org](https://matrix.to/#/#uMatriks:matrix.org)</small>|<small>[#fluffychat:<br />matrix.org](https://matrix.to/#/#fluffychat:matrix.org)</small>
Platform| Web (React)|          Android|             iOS|           Qt|Go<br />Terminal|              Qt|           GTK+|macOS<br />Cocoa|              Qt|Qt<br />Ubuntu Touch|Qt<br />Ubuntu Touch|
Language| JavaScript (React)|      Java|     Objective-C|          C++|            Go|               C++|           Rust|           Swift|             C++|             C++|QML
SDK | matrix-js-sdk, matrix-react-sdk| matrix-android-sdk|matrix-ios-sdk||gomatrix (fork)|libqmatrixclient|             |  matrix-ios-sdk|libqmatrixclient|libqmatrixclient||
Target Spec Version|r0.4.0|             r0.4.0|             r0.4.0|           r0.4.0|            r0.4.0|                r0.4.0|             r0.4.0|              r0.4.0|              r0.4.0|              r0.4.0|r0.4.0|


## Features

|                      |    Riot Web    |    Riot Android    |  Riot iOS   |     Nheko|    Gomuks| Quaternion|  Fractal|  Seaglass|  Spectral|  uMatriks| FluffyChat|
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
<br/>*Room Management*|
Room directory|                 &#10003;|            &#10003;|     &#10003;|  &#10007;|  &#10007;|   &#10007;| &#10003;|  &#10007;|  &#10007;|  &#10007;|   &#10003;|
Room tag showing|               &#10003;|          Predefined|   Predefined|  &#10003;|  &#10003;|   &#10003;| &#10007;|  &#10007;|  &#10007;|  &#10007;|   &#10003;|
Room tag editing|             Predefined|          Predefined|   Predefined|  &#10007;|  &#10007;|   &#10003;| &#10007;|  &#10007;|  &#10007;|  &#10007;|   &#10003;|
Search joined rooms|            &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10003;|    Partial| &#10003;|  &#10003;|  &#10003;|  &#10007;|    Partial|
<br/>*Room Features*|
Room user list|                 &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10003;|   &#10003;| &#10003;|  &#10003;|  &#10007;|  &#10003;|   &#10003;|
Display Room Description|       &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10003;|   &#10003;| &#10003;|  &#10003;|  &#10003;|  &#10003;|   &#10003;|
Edit Room Description|          &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10007;|   &#10003;| &#10003;|  &#10003;|  &#10003;|  &#10007;|   &#10003;|
Highlights |                    &#10003;|            &#10003;|     &#10003;|  &#10007;|  &#10003;|   &#10003;| &#10003;|  &#10003;|  &#10007;|  &#10003;|   &#10003;|
Pushrules |                     &#10003;|            &#10003;|     &#10003;|  &#10007;|  &#10003;|   &#10007;| &#10007;|  &#10007;|  &#10007;|  &#10007;|   &#10003;|
Send read markers|              &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10003;|   &#10003;| &#10003;|  &#10007;|  &#10007;|  &#10007;|   &#10003;|
Display read markers |          &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10007;|   Only own| &#10007;|  &#10007;|  &#10007;|  &#10007;|    Partial|
Sending Invites|                &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10007;|   &#10003;| &#10003;|  &#10007;|  &#10007;|  &#10007;|   &#10003;|
Accepting Invites|              &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10007;|   &#10003;| &#10003;|  &#10003;|  &#10007;|  &#10007;|   &#10003;|
Typing Notification|            &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10003;|   &#10003;| &#10003;|  &#10003;|  &#10003;|  &#10007;|   &#10003;|
<br/>*Message Features*|
E2E|                            &#10003;|            &#10003;|     &#10003;| Text only|  &#10007;|   &#10007;| &#10007;|  &#10003;|  &#10007;|  &#10007;|   &#10007;|
Replies|                        &#10003;|            &#10003;|     &#10003;|  &#10007;|  &#10007;|   &#10007;| &#10007;|  &#10007;|  &#10007;|  &#10007;|   &#10003;|
Attachment uploading|           &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10007;|   &#10003;| &#10003;|  &#10007;|  &#10003;|  &#10007;|   &#10003;|
Attachment downloading|         &#10003;|            &#10003;|     &#10003;|  &#10003;|    Images|   &#10003;| &#10003;|  &#10003;|  &#10003;|  &#10003;|   &#10003;|
Send stickers|                  &#10003;|            &#10003;|     &#10003;|  &#10007;|  &#10007;|   &#10007;| &#10007;|  &#10007;|  &#10007;|  &#10007;|   &#10003;|
Send formatted messages (markdown)|&#10003;|         &#10003;|     &#10003;|  &#10003;|  &#10003;|   &#10007;| &#10003;|  &#10003;|  &#10003;|  &#10007;|   &#10007;|
Rich Text Editor for formatted messages| &#10003;|   &#10007;|     &#10007;|  &#10007;|  &#10007;|   &#10007;| &#10007;|  &#10007;|  &#10007;|  &#10007;|   &#10007;|
Display formatted messages|     &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10003;|   &#10003;| &#10007;|  &#10003;|  &#10003;|  &#10007;|   &#10007;|
Redacting |                     &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10007;|   &#10003;| &#10003;|  &#10003;|  &#10003;|  &#10007;|   &#10003;|
<br/>*Other Features*|
Multiple Matrix Accounts|       &#10007;|            &#10007;|     &#10007;|  &#10007;|  &#10007;|   &#10003;| &#10007;|  &#10007;|  &#10003;|  &#10007;|   &#10007;|
New user registration|          &#10003;|            &#10003;|     &#10003;|  &#10003;|  &#10007;|   &#10007;| &#10007;|  &#10007;|  &#10007;|  &#10007;|   &#10003;|
voip|                           &#10003;|            &#10003;|     &#10003;|  &#10007;|  &#10007;|   &#10007;| &#10007;|  &#10007;|  &#10007;|  &#10007;|   &#10007;|

## Future-specification Features

|                      |    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko|    Gomuks| Quaternion|    Fractal|    Seaglass| Spectral|  uMatriks| FluffyChat|
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Communities Display|            &#10003;|            &#10003;|        &#10003;| &#10003;|  &#10007;|   &#10007;|   &#10007;|    &#10007;| &#10007;|  &#10007;|   &#10007;|
Communities Creation|           &#10003;|            &#10007;|        &#10007;| &#10007;|  &#10007;|   &#10007;|   &#10007;|    &#10007;| &#10007;|  &#10007;|   &#10007;|

*These features are in common usage in the Matrix ecosystem and could be added to a future version of the spec.*

`;


const MarkdownIt = require('markdown-it');
const md = MarkdownIt({html: true})
    .use(require('markdown-it-front-matter'), () => {})
    .use(require('markdown-it-named-headings'));

function html() {
    var rawHtml = md.render(rawMd);
    return rawHtml;
}

module.exports = {
    html: html
}