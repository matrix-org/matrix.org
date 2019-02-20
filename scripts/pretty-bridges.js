#! /usr/local/bin/node

const fs = require('fs');
const MarkdownIt = require('markdown-it');
const md = MarkdownIt()
    .use(require('markdown-it-front-matter'), () => {})
    .use(require('markdown-it-named-headings'));
process.chdir(__dirname);
const util = require("./pretty-util.js");
var Card = util.Card;

var bridgesTemplate = fs.readFileSync(`template-bridges.html`, 'utf-8');

var markdownWiki = require('markdown-wiki');
markdownWiki.loadPages("../jekyll/_posts/projects/");
var wiki = markdownWiki.getWiki();

var pages = wiki.pages.filter(p => p.name != "template" && p.fm.bridges);

var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/docs/";
fs.writeFileSync(`${newDocsPath}bridges.html`, html());

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
        bridgeMd += "\n\n## " + bridge.fm.title + "\n\n";

        bridgeMd += 
`|           Author|                              Repo|         Language|                                       Matrix Room|         Maturity|
|            :---:|                             :---:|            :---:|                                             :---:|            :---:|
|[${bridge.fm.author}]|[${bridge.fm.reponame}](${bridge.fm.repo})|${bridge.fm.language}| |${bridge.fm.maturity}|
\n\n![](${bridge.fm.thumbnail})`;
        //bridgeMd += 
        bridgeListHtml += md.render(bridgeMd);
        bridgeListHtml += md.renderer.render(bridge.tokens, {});
    })
    bridgesTemplate = bridgesTemplate.replace("<!--BRIDGESLIST-->", bridgeListHtml);
    
    return bridgesTemplate;
}


module.exports = {
    html: html
}