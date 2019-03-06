#! /usr/local/bin/node

const fs = require('fs');
const MarkdownIt = require('markdown-it');
const md = MarkdownIt()
    .use(require('markdown-it-front-matter'), () => {})
    .use(require('markdown-it-named-headings'))
    .use(require('markdown-it-header-sections'));
var newDocsPath = "../pretty-docs/";

var markdownWiki = require('markdown-wiki');
markdownWiki.loadPages("../jekyll/_posts/projects/");
var wiki = markdownWiki.getWiki();

var pages = wiki.pages.filter(p => p.name != "template" && p.fm.categories && p.fm.categories.split(" ").indexOf("bot") != -1);

var botListHtml = "";
pages.forEach(bot => {
    var botMd = "\n\n## " + bot.fm.title + "\n\n";
    botMd += `Repository: <${bot.fm.repo}>\n\n`;
    if (bot.fm.screenshot) {
        botMd += `![ ${bot.fm.title} ](${bot.fm.screenshot})`;
    } else if (bot.fm.thumbnail) {
        botMd += `![ ${bot.fm.title} ](${bot.fm.thumbnail})`;
    }
    botListHtml += md.render(botMd);
    botListHtml += md.renderer.render(bot.tokens, {});
    botListHtml += `<br clear="all" />`;
    
})
var bridgesTemplate = fs.readFileSync(`template-bots.html`, 'utf-8');

bridgesTemplate = bridgesTemplate.replace("<!--BOTSLIST-->", botListHtml);

fs.writeFileSync(`${newDocsPath}bots.html`, bridgesTemplate);