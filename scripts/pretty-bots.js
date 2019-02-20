#! /usr/local/bin/node

const fs = require('fs');
const MarkdownIt = require('markdown-it');
const md = MarkdownIt()
    .use(require('markdown-it-front-matter'), () => {})
    .use(require('markdown-it-named-headings'))
    .use(require('markdown-it-header-sections'));
var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/docs/";

var markdownWiki = require('markdown-wiki');
markdownWiki.loadPages("../jekyll/_posts/projects/");
var wiki = markdownWiki.getWiki();

var pages = wiki.pages.filter(p => p.name != "template" && p.fm.categories && p.fm.categories.split(" ").indexOf("bot") != -1);

var sdkListHtml = "";
pages.forEach(sdk => {
    var sdkMd = "\n\n## " + sdk.fm.title + "\n\n";
    sdkMd += `Repository: <${sdk.fm.repo}>\n\n`;
    sdkMd += `![ ${sdk.fm.repo} ](${sdk.fm.screenshot})`
    sdkListHtml += md.render(sdkMd);
    sdkListHtml += md.renderer.render(sdk.tokens, {});
    
})
var bridgesTemplate = fs.readFileSync(`template-bots.html`, 'utf-8');

bridgesTemplate = bridgesTemplate.replace("<!--BOTSLIST-->", sdkListHtml);

fs.writeFileSync(`${newDocsPath}bots.html`, bridgesTemplate);