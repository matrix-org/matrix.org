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

var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/";
fs.writeFileSync(`${newDocsPath}bridges.html`, html());

function html() {

    var cards = [];
    cards.push(new Card("#telegram", "images/telegram-logo.svg", "Telegram", ""));
    cards.push(new Card("#slack", "images/slack-logo.svg", "Slack", ""));
    cards.push(new Card("#irc", "<pre>IRC</pre>", "IRC", ""));
    cards.push(new Card("#discord", "images/discord-logo.svg", "Discord", ""));
    cards.push(new Card("#whatsapp", "whatsapp-logo.png", "WhatsApp", ""));
    cards.push(new Card("#gitter", "images/gitter-logo.svg", "Gitter", ""));
    cards.push(new Card("#email", "images/email-icon.svg", "Email", ""));
    cards.push(new Card("#sms", "images/sms-icon.svg", "SMS", ""));
    cards.push(new Card("#imessage", "images/imessage-logo.jpg", "iMessage", ""));
    cards.push(new Card("#hangouts", "images/hangouts-icon.svg", "Hangouts", ""));
    cards.push(new Card("#facebook-messenger", "images/messenger-logo.svg", "Facebook Messenger", ""));
    cards.push(new Card("#groupme", "images/groupme-icon.png", "GroupMe", ""));
    cards.push(new Card("#skype", "images/skype-icon.svg", "Skype", ""));
    cards.push(new Card("#mastodon", "images/mastodon-logo.svg", "Mastodon", ""));
    cards.push(new Card("#rocket-chat", "images/rocketchat-logo.png", "Rocket Chat", ""));

    var bridgeIconsHtml = "";
    cards.forEach(card => {
        bridgeIconsHtml += util.getCard(card, null, 3);
    })
    bridgesTemplate = bridgesTemplate.replace("<!--BRIDGEICONS-->", bridgeIconsHtml);

    var bridgeListHtml = "";
    pages.forEach((bridge) => {
        var bridgeMd = "\n\n# " + bridge.fm.bridges + "\n\n";
        bridgeMd += "\n\n## " + bridge.fm.title + "\n\n";

        bridgeMd += 
`|ss|           Author|                              Repo|         Language|                                       Matrix Room|         Maturity|
|:--:|            :---:|                             :---:|            :---:|                                             :---:|            :---:|
|![](${bridge.fm.thumbnail})|[${bridge.fm.author}]|[${bridge.fm.reponame}](${bridge.fm.repo})|${bridge.fm.language}| |${bridge.fm.maturity}|
\n\n`;
        //bridgeMd += 
        bridgeListHtml += md.render(bridgeMd);
        bridgeListHtml += md.renderer.render(bridge.tokens, {});
        console.log(bridge);
    })
    bridgesTemplate = bridgesTemplate.replace("<!--BRIDGESLIST-->", bridgeListHtml);
    
    return bridgesTemplate;
}


module.exports = {
    html: html
}