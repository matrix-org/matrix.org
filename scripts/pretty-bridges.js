#! /usr/local/bin/node

const fs = require('fs');
const MarkdownIt = require('markdown-it');
const md = MarkdownIt()
    .use(require('markdown-it-front-matter'), () => {})
    .use(require('markdown-it-named-headings'))
    .use(require('markdown-it-header-sections'));
process.chdir(__dirname);
const util = require("./pretty-util.js");
var Card = util.Card;

var bridgesTemplate = fs.readFileSync(`template-bridges.html`, 'utf-8');

var markdownWiki = require('markdown-wiki');
markdownWiki.loadPages("../jekyll/_posts/projects/");
var wiki = markdownWiki.getWiki();

var pages = wiki.pages.filter(p => p.name != "template" && p.fm.bridges);

var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/docs/";

function html() {

    var cards = [];
    cards.push(new Card("#telegram", "/docs/projects/images/telegram-logo.svg", "Telegram", ""));
    cards.push(new Card("#slack", "/docs/projects/images/slack-logo.svg", "Slack", ""));
    cards.push(new Card("#irc", "<pre>IRC</pre>", "IRC", ""));
    cards.push(new Card("#discord", "/docs/projects/images/discord-logo.svg", "Discord", ""));
    cards.push(new Card("#whatsapp", "/docs/projects/images/whatsapp-logo.png", "WhatsApp", ""));
    cards.push(new Card("#gitter", "/docs/projects/images/gitter-logo.svg", "Gitter", ""));
    cards.push(new Card("#email", "/docs/projects/images/email-icon.svg", "Email", ""));
    cards.push(new Card("#sms", "/docs/projects/images/sms-icon.svg", "SMS", ""));
    cards.push(new Card("#imessage", "/docs/projects/images/imessage-logo.jpg", "iMessage", ""));
    cards.push(new Card("#hangouts", "/docs/projects/images/hangouts-icon.svg", "Hangouts", ""));
    cards.push(new Card("#facebook-messenger", "/docs/projects/images/messenger-logo.svg", "Facebook Messenger", ""));
    cards.push(new Card("#groupme", "/docs/projects/images/groupme-icon.png", "GroupMe", ""));
    cards.push(new Card("#skype", "/docs/projects/images/skype-icon.svg", "Skype", ""));
    cards.push(new Card("#mastodon", "/docs/projects/images/mastodon-logo.svg", "Mastodon", ""));
    cards.push(new Card("#rocket-chat", "/docs/projects/images/rocketchat-logo.png", "Rocket Chat", ""));

    var bridgeIconsHtml = "";
    cards.forEach(card => {
        bridgeIconsHtml += util.getCard(card, null, 2);
    })
    bridgesTemplate = bridgesTemplate.replace("<!--BRIDGEICONS-->", bridgeIconsHtml);

    var bridgeListHtml = "";
    pages.forEach((bridge) => {
        var bridgeMd = "\n\n# " + bridge.fm.bridges + "\n\n";
        bridgeMd += "\n\n## " + bridge.fm.title + `\n\n![](${bridge.fm.thumbnail})\n\n`;

        bridgeMd += 
`|           Author|                              Repo|         Language|                                       Matrix Room|         Maturity|
|            :---:|                             :---:|            :---:|                                             :---:|            :---:|
|[${bridge.fm.author}]|[${bridge.fm.reponame ? bridge.fm.reponame : bridge.fm.title}](${bridge.fm.repo})|${bridge.fm.language}| |${bridge.fm.maturity}|
\n\n`;
        //bridgeMd += 
        bridgeListHtml += md.render(bridgeMd + urlDir);
        bridgeListHtml += md.renderer.render(bridge.tokens, {});
        bridgeListHtml += `<br clear="all" />`;
    })
    bridgesTemplate = bridgesTemplate.replace("<!--BRIDGESLIST-->", bridgeListHtml);
    
    return bridgesTemplate;
}

var urlDir = `

[mautrix-telegram]: https://github.com/tulir/mautrix-telegram
[#telegram:maunium.net]: https://matrix.to/#/#telegram:maunium.net
[matrix-appservice-slack]: https://github.com/matrix-org/matrix-appservice-slack
[matrix-puppet-slack]: https://github.com/matrix-hacks/matrix-puppet-slack
[t2bot.io]: https://t2bot.io
[matrix-hacks]: https://github.com/matrix-hacks
[matrix-puppet-bridge]: https://github.com/matrix-hacks/matrix-puppet-bridge
[matrix-appservice-discord]: https://github.com/Half-Shot/matrix-appservice-discord
[matrix-appservice-irc]: https://github.com/matrix-org/matrix-appservice-irc
[#irc:matrix.org]: https://matrix.to/#/#irc:matrix.org
[mautrix-whatsapp]: https://github.com/tulir/mautrix-whatsapp
[matrix-appservice-email]: https://github.com/kamax-matrix/matrix-appservice-email
[matrix-appservice-gitter]: https://github.com/matrix-org/matrix-appservice-gitter
[#mxasd-email:kamax.io]: https://matrix.to/#/#mxasd-email:kamax.io
[#discord:half-shot.uk]: https://matrix.to/#/#discord:half-shot.uk
[#whatsapp:maunium.net]: https://matrix.to/#/#whatsapp:maunium.net
[matrix-puppet-imessage]: https://github.com/matrix-hacks/matrix-puppet-imessage
[SmsMatrix]: https://github.com/tijder/SmsMatrix
[matrix-puppet-hangouts]: https://github.com/matrix-hacks/matrix-puppet-hangouts
[matrix-puppet-facebook]: https://github.com/matrix-hacks/matrix-puppet-facebook
[matrix-puppet-groupme]: https://github.com/matrix-hacks/matrix-puppet-groupme
[matrix-puppet-skype]: https://github.com/matrix-hacks/matrix-puppet-skype
[Cadair]: https://github.com/Cadair
[matrix-appservice-hangouts]: https://github.com/Cadair/matrix-appservice-hangouts
[ma1uta]: https://github.com/ma1uta/
[exul]: https://github.com/exul/
[Half-Shot]: https://github.com/Half-Shot/
[Ryan Rix]: http://rix.si/
[Matrix.org team]: https://matrix.org
[The Matrix.org Team]: https://matrix.org
[Tulir]: https://github.com/tulir
[Keyvan Fatehi]: https://github.com/kfatehi/
`;


fs.writeFileSync(`${newDocsPath}bridges.html`, html());
module.exports = {
    html: html
}