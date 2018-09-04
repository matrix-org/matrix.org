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
  white-space: nowrap;
}

table tr:nth-child(even) {
  background-color: #f5f5f5;
}

.green {
    background-color: #78A830;
    font-weight: bold;
}
.orange {
    background-color: #F0A800;
}
.red {
    background-color: #D84830;
}
</style>
<!-- https://www.colourlovers.com/palette/65580/traffic_light <- yes pls -->
<script>
jQuery(document).ready(function () {
    jQuery("td").each(function( index ) {
        var text = jQuery( this ).text();
        if (text.startsWith("Yes") || text.startsWith("✓")) {
            jQuery(this).addClass("green");
        }
        if (text.startsWith("Partial")) {
            jQuery(this).addClass("orange");
        }
        if (text === "No") {
            jQuery(this).addClass("red");
        }
    });
});
</script>

# Matrix Clients Matrix

## Platform Availability

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Linux|&#10003;, Electron|N/A  |N/A  | &#10003;  | &#10003;     | &#10003;        | &#10003;, flatpak    | &#10007;
Mac|&#10003;, Electron|N/A|N/A                    | &#10003;   | &#10003;    | Partial, build from source | &#10007;, WIP      | &#10003;
Windows|&#10003;, Electron|N/A|           N/A|         &#10003;|      &#10003;|&#10003;|&#10007;|&#10007;
Android|&#10007;|&#10003;, Play Store and F-Droid|N/A|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;
iOS|&#10007;|N/A|&#10003;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;

## Technical

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Platform| Web (React)|Android|iOS|Qt|Go|Qt|GTK+|Cocoa
Language| JavaScript (React)|Java|Objective-C|C++|Go|C++|Rust|Swift
SDK | matrix-js-sdk, matrix-react-sdk| matrix-android-sdk|matrix-ios-sdk||gomatrix (fork)|libqmatrixclient
Platform|Web|Android|iOS|Qt|Terminal|Qt|GTK+|macOS
supported matrix spec (r0, r1)|r0|r0|r0|r0|r0|r0|r0|r0

## Features

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
*Room Management*|
Room directory|Yes|Yes|Yes|No|No|No|Yes|No
Room tag showing|Yes|Partial (predefined)|Partial (predefined)|No|Yes|Yes|No|No
Room tag editing|Partial (predefined)|Partial (predefined)|Partial (predefined)|No|No|Yes|No|No
*Room Features*|
Room user list|Yes|Yes|Yes|Yes|Yes|Yes|Yes|Yes
Display Room Description|Yes|Yes|Yes|Yes|Yes|Yes|Yes|Yes
Edit Room Description|Yes|Yes|Yes|Yes|No|Yes|Yes|No
Highlights |Yes|Yes|Yes|No|Yes|Yes|Yes|Yes
Search joined rooms|Yes|Yes|Yes|Yes|Yes|No|                                                                       Yes|              Yes
Pushrules |Yes|Yes|Yes|No|Yes|Yes|No|No
Send read markers|Yes|Yes|Yes|Yes|Yes|                                                          Yes|No|No
Display read markers |Yes|Yes|Yes|Yes|No|No|No|No
Sending Invites|Yes|Yes|                 Yes|                    Yes|            No|          Yes|               Yes|No
Accepting Invites|Yes|Yes|               Yes|                    Yes|            No|          Yes|               Yes|No
*Message Features*|
E2E|Yes|Yes|Yes|Partial|                          No|No|No|Yes
Replies|Yes|Yes|Yes|No|                      No|No|No|No
Attachment uploading|Yes|Yes|Yes|Yes|No|No|Yes|No
Attachment downloading|Yes|Yes|Yes|Yes|Partial (images only)|                                 Yes|Yes|Yes
Send stickers|Yes|Yes|Yes|Yes|No|No|No|No
Send formatted messages (markdown)|Yes|Yes|Yes|No|Yes|                                        Yes|Yes|Yes
Rich Text Editor for formatted messages|Yes|No|No|No|No|No|No|No|No|No
Display formatted messages|Yes|Yes|Yes|No|Yes|No|No|Yes
Redacting |Yes|Yes|Yes|Yes|No|No|Yes|Yes
*Other Features*|
New user registration|Yes|Yes|Yes|Yes|No|No|No|No
voip|Yes|Yes|Yes|No|No|No|No|No

## Not-yet-specced Features

||    Riot Web    |    Riot Android    |    Riot iOS    |    Nheko    |    Gomuks    |    Quaternion    |    Fractal    |    Seaglass    |    Matrique    |    uMatriks
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
Communities Display|&#10003;|&#10003;|&#10003;|&#10003;|&#10007;|&#10007;|&#10007;|&#10007;
Communities Creation|&#10003;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;|&#10007;