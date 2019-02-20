#! /usr/local/bin/node

const fs = require('fs');
const MarkdownIt = require('markdown-it');
const md = MarkdownIt()
    .use(require('markdown-it-front-matter'), () => {})
    .use(require('markdown-it-named-headings'));
var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/docs/";

var markdownWiki = require('markdown-wiki');
markdownWiki.loadPages("../jekyll/_posts/projects/");
var wiki = markdownWiki.getWiki();

var pages = wiki.pages.filter(p => p.name != "template" && p.fm.categories && p.fm.categories.split(" ").indexOf("sdk") != -1);

var bridgesTemplate = fs.readFileSync(`template-sdks.html`, 'utf-8');
var raw = `
|                                   |       Language/Platform|       Maintainer|           Repo|          Matrix Room|      Supports E2E|
|                              :---:|                   :---:|            :---:|          :---:|                :---:|             :---:|
[Matrix Client SDK for GLib](#matrix-client-sdk-for-glib)|C|[Gergely Polonkai](https://github.com/gergelypolonkai/)|[matrix-glib-sdk](https://github.com/gergelypolonkai/matrix-glib-sdk)|| |
[MatrixAPI](#matrixapi)|C#|[VRocker](https://github.com/VRocker/)|[MatrixAPI](https://github.com/VRocker/MatrixAPI)|| |
[godot-matrix](#godot-matrix)|C++|[vurpo](https://gitlab.com/vurpo/)|[godot-matrix](https://gitlab.com/vurpo/godot-matrix)|| |
[mtxclient](#mtxclient)|C++|[mujx](https://github.com/mujx/)|[mtxclient](https://github.com/mujx/mtxclient)|| |
[libqmatrixclient](#libqmatrixclient)|C++/Qt|[QMatrixClient team](https://github.com/QMatrixClient/)|[libqmatrixclient](https://github.com/QMatrixClient/libqmatrixclient)|[#qmatrixclient:matrix.org](https://matrix.to/#/#qmatrixclient:matrix.org)| |
[mautrix-go](#mautrix-go)|Go|[Tulir](https://github.com/tulir/)|[mautrix-go](https://github.com/tulir/mautrix-go)|[#maunium.net:maunium.net](https://matrix.to/#/#maunium.net:maunium.net)| |
[gomatrix](#gomatrix)|Go|[Matrix.org](https://matrix.org/)|[gomatrix](https://github.com/matrix-org/gomatrix)|| |
[Matrix on Haxe](#matrix-on-haxe)|Haxe|[endes](https://notabug.org/Tamaimo/)|[haxe-matrix-im](https://notabug.org/Tamaimo/haxe-matrix-im)|| |
[Matrix.org Android SDK](#matrixorg-android-sdk)|Java|[Matrix.org team](https://matrix.org/)|[matrix-android-sdk](https://github.com/matrix-org/matrix-android-sdk)|[#riot-android:matrix.org](https://matrix.to/#/#riot-android:matrix.org)|Yes|
[Matrix Java SDK](#matrix-java-sdk)|Java|[Kamax.io](https://kamax.io/)|[matrix-java-sdk](https://github.com/kamax-io/matrix-java-sdk)|[#matrix-java-sdk:kamax.io](https://matrix.to/#/#matrix-java-sdk:kamax.io)| |
[botkit-matrix](#botkit-matrix)|JavaScript|[frankgerhardt](https://github.com/frankgerhardt/)|[botkit-matrix](https://github.com/frankgerhardt/botkit-matrix)||Yes|
[Matrix.org JS SDK](#matrixorg-js-sdk)|JavaScript|[Matrix.org team](https://matrix.org/)|[matrix-js-sdk](https://github.com/matrix-org/matrix-js-sdk)||Yes|
[Matrix.org MatrixKit (iOS)](#matrixorg-matrixkit-ios)|Objective-C|[Matrix.org team](https://matrix.org/)|[matrix-ios-kit](https://github.com/matrix-org/matrix-ios-kit)|[#riot-ios:matrix.org](https://matrix.to/#/#riot-ios:matrix.org)|Yes|
[Matrix.org iOS SDK](#matrixorg-ios-sdk)|Objective-C|[Matrix.org team](https://matrix.org/)|[matrix-ios-sdk](https://github.com/matrix-org/matrix-ios-sdk)|[#riot-ios:matrix.org](https://matrix.to/#/#riot-ios:matrix.org)|Yes|
[Drupal matrix\_api module](#drupal-matrix_api-module)|PHP|[freelock](http://www.freelock.com)|[matrix\_api](https://cgit.drupalcode.org/matrix_api)|| |
[Net::Async::Matrix (Perl)](#netasyncmatrix-perl)|Perl|[LeoNerd](https://github.com/leonerd/)|[Net-Async-Matrix](https://metacpan.org/release/Net-Async-Matrix)|| |
[Matrix::Client](#matrixclient)|Perl|[matiaslina](https://github.com/matiaslina/)|[perl6-matrix-client](https://github.com/matiaslina/perl6-matrix-client)|| |
|                  [maubot](#maubot)|                  Python|          [tulir]|       [maubot]|[#maubot:maunium.net]|
|  [mautrix-python](#mautrix-python)|                  Python|          [tulir]|[mautrix-python](https://github.com/tulir/mautrix-python)|[#maunium.net:maunium.net](https://matrix.to/#/#maunium.net:maunium.net)| |
|              [opsdroid](#opsdroid)|                  Python|      [SolarDrew]|     [opsdroid]|
[Matrix.org Python SDK](#matrixorg-python-sdk)|Python|[Matrix.org team](https://matrix.org/)|[matrix-python-sdk](https://github.com/matrix-org/matrix-python-sdk)|[#matrix-python-sdk:matrix.org](https://matrix.to/#/#matrix-python-sdk:matrix.org)| |
[Racket Matrix SDK](#racket-matrix-sdk)|Racket|[Aidan Gauland](https://gitlab.com/aidalgol/)|[racket-matrix-sdk](https://gitlab.com/aidalgol/racket-matrix-sdk/)|| |
[Ruby Matrix SDK](#ruby-matrix-sdk)|Ruby|[Ananace](https://github.com/ananace/)|[ruby-matrix-sdk](https://github.com/ananace/ruby-matrix-sdk)|| |
[Glitch in the Matrix](#glitch-in-the-matrix)|Rust|[eta](https://github.com/eeeeeta/)|[glitch-in-the-matrix](https://github.com/eeeeeta/glitch-in-the-matrix)|| |
[matrix-js-bot-sdk](#matrix-js-bot-sdk)|TypeScript|[Travis Ralston](https://github.com/turt2live/)|[matrix-js-bot-sdk](https://github.com/turt2live/matrix-js-bot-sdk)|[#matrix-bot-sdk:t2bot.io](https://matrix.to/#/#matrix-bot-sdk:t2bot.io)|Yes
`;


var sdkTableHtml = md.render(raw);
bridgesTemplate = bridgesTemplate.replace("<!--BRIDGEICONS-->", sdkTableHtml);

var sdkListHtml = "";
pages.forEach(sdk => {
    var sdkMd = "\n\n## " + sdk.fm.title + "\n\n";
    sdkMd += `Repository: <${sdk.fm.repo}>`;
    sdkListHtml += md.render(sdkMd);
    sdkListHtml += md.renderer.render(sdk.tokens, {langPrefix: 'language-'});
    
})

bridgesTemplate = bridgesTemplate.replace("<!--BRIDGESLIST-->", sdkListHtml);

fs.writeFileSync(`${newDocsPath}sdks.html`, bridgesTemplate);