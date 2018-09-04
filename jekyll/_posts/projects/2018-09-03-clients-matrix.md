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

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Linux|&#10003;<br /><small>Electron</small>    |            |          | &#10003;  | &#10003;     | &#10003;        | &#10003;    | 
Mac|&#10003;<br /><small>Electron</small>||                    | &#10003;   | &#10003;    | Build from source | WIP      | &#10003;
Windows|&#10003;<br /><small>Electron</small>||           |         &#10003;|      &#10003;|&#10003;||
Android||&#10003;||||||
iOS|||&#10003;|||||

## Technical

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Platform| Web (React)|Android|iOS|Qt|Go|Qt|GTK+|Cocoa
Language| JavaScript (React)|Java|Objective-C|C++|Go|C++|Rust|Swift
SDK | matrix-js-sdk, matrix-react-sdk| matrix-android-sdk|matrix-ios-sdk||gomatrix (fork)|libqmatrixclient
Platform|Web|Android|iOS|Qt|Terminal|Qt|GTK+|macOS
supported matrix spec|r0|r0|r0|r0|r0|r0|r0|r0

## Features

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
<br/>*Room Management*|
Room directory|  &#10003;| &#10003;| &#10003;|&#10007;|&#10007;|&#10007;| &#10003;|&#10007;|                                                                                                      &#10007;|
Room tag showing| &#10003;|Predefined|Predefined|&#10007;| &#10003;| &#10003;|&#10007;|&#10007;|                                                                 &#10007;|
Room tag editing|Predefined|Predefined|Predefined|&#10007;|&#10007;| &#10003;|&#10007;|&#10007;|                                                 &#10007;|
Search joined rooms| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;|&#10007;|                                                                     &#10003;|            &#10003;|               &#10003;|
<br/>*Room Features*|
Room user list| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;|                                                                                                  &#10003;|
Display Room Description| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;              |            &#10003;|               &#10003;|
Edit Room Description| &#10003;| &#10003;| &#10003;| &#10003;|&#10007;| &#10003;| &#10003;|                                                                                 &#10007;|            &#10003;|
Highlights | &#10003;| &#10003;| &#10003;|&#10007;| &#10003;| &#10003;| &#10003;| &#10003;                            |                    &#10003;|               &#10003;
Pushrules | &#10003;| &#10003;| &#10003;|&#10007;| &#10003;| &#10003;|&#10007;|&#10007;
Send read markers| &#10003;| &#10003;| &#10003;| &#10003;| &#10003;|                                                           &#10003;|&#10007;|&#10007;
Display read markers | &#10003;| &#10003;| &#10003;| &#10003;|&#10007;|&#10007;|&#10007;|&#10007;
Sending Invites| &#10003;| &#10003;|                  &#10003;|                     &#10003;|            &#10007;|           &#10003;|                &#10003;|&#10007;
Accepting Invites| &#10003;| &#10003;|                &#10003;|                     &#10003;|            &#10007;|           &#10003;|                &#10003;|            &#10003;|            &#10007;|
Typing &#10007;tification| &#10003;|        &#10003;|       &#10003;|                       |              |           &#10003;|                  |                    |      &#10003;      |
<br/>*Message Features*|
E2E| &#10003;| &#10003;| &#10003;|Partial|                          &#10007;|&#10007;|&#10007;| &#10003;
Replies| &#10003;| &#10003;| &#10003;|&#10007;|                      &#10007;|&#10007;|&#10007;|&#10007;
Attachment uploading| &#10003;| &#10003;| &#10003;| &#10003;|&#10007;|&#10007;| &#10003;|&#10007;
Attachment downloading| &#10003;| &#10003;| &#10003;| &#10003;|Images|                                 &#10003;|                &#10003;|             &#10003;|             &#10003;|
Send stickers| &#10003;| &#10003;| &#10003;| &#10003;|&#10007;|&#10007;|&#10007;|&#10007;
Send formatted messages (markdown)| &#10003;| &#10003;| &#10003;|&#10007;| &#10003;|          &#10003;| &#10003;| &#10003;     |&#10003;           |          &#10007;|
Rich Text Editor for formatted messages| &#10003;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;
Display formatted messages| &#10003;| &#10003;| &#10003;|&#10007;| &#10003;|&#10007;|&#10007;| &#10003;
Redacting | &#10003;| &#10003;| &#10003;| &#10003;|&#10007;|&#10007;| &#10003;| &#10003;
<br/>*Other Features*|
New user registration| &#10003;| &#10003;| &#10003;| &#10003;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;
voip| &#10003;| &#10003;| &#10003;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;

## Not-yet-specced Features

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Communities Display|&#10003;|&#10003;|&#10003;|&#10003;|&#10007;|&#10007;|&#10007;|&#10007;
Communities Creation|&#10003;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;