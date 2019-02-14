#! /usr/local/bin/node

const fs = require('fs');
const MarkdownIt = require('markdown-it');
var yaml = require('js-yaml');
const mapping = { section: 'doc-section' };
const md = MarkdownIt()
    .use(require('markdown-it-front-matter'), function(fm) {
        front_matter = yaml.safeLoad(fm);
    })
    .use(require('markdown-it-header-sections'))
    .use(require('markdown-it-named-headings'))
    .use(require('@toycode/markdown-it-class'), mapping);


process.chdir(__dirname + "/..");

var guides = fs.readdirSync('jekyll/_posts/guides/');
guides = guides.filter(filename => {return filename.endsWith('.md')})
var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/";

var front_matter;

var pages = {};

guides.forEach(guide => {
    var guideMd = fs.readFileSync('jekyll/_posts/guides/' + guide, 'utf-8');
    var tokens = md.parse(guideMd, {});
    if (! front_matter.section) return;
    var title = {};
    var headers = [];
    var previous_token = "";
    tokens.forEach(token => {
        if (previous_token.type === "heading_open") {
            var header_obj = {
                level: previous_token.tag,
                content: token.content,
                id: previous_token.attrs[0][1]
            };
            if (header_obj.level === "h1") {
                title = header_obj;
            } else {
                headers.push(header_obj);
            }
        }
        previous_token = token;
    })
    if (! pages[front_matter.section]) pages[front_matter.section] = [];
    pages[front_matter.section].push({
        title: title,
        headers: headers,
        tokens: tokens,
        filename: guide,
        front_matter: front_matter
    })
});
Object.keys(pages).forEach(section => {
    
    pages[section].forEach(page => {
        console.log(page);
        var templateHtml = fs.readFileSync(`${newDocsPath}template-documentation.html`, 'utf-8');
        templateHtml = templateHtml.replace("<!-- ###NAVIGATION### -->", generateNavigationHtml(page.title.id, section));
        templateHtml = templateHtml.replace("<!-- ###CONTENT### -->", md.renderer.render(page.tokens, {langPrefix: 'language-'}));
        templateHtml = templateHtml.replace(/<!-- ###TITLE### -->/g, page.title.content);
        fs.writeFileSync(`${newDocsPath}/guides/${page.title.id}.html`, templateHtml);
    });
});

function generateNavigationHtml(forTitle, section) {
    var output = "";
    pages[section].forEach(page => {
        var linkClass = page.title.id === forTitle ? "nav-link scrollto" : "nav-link";
        var linkPath = page.title.id === forTitle ? "" : page.title.id + '.html';
        var containerClass = page.title.id === forTitle ? "collapse show selectedPage" : "collapse";
        var selectedPageClass = page.title.id === forTitle ? "selectedPage" : "";
        output += `<a data-toggle="collapse" href="#${page.title.id}" role="button" aria-expanded="false" aria-controls="${page.title.id}" class="${selectedPageClass}">\n`;
        output += `\t<h4>${page.title.content}</h4>\n`;
        output += `</a>\n`;
        output += `<div id="${page.title.id}" class="${containerClass}">\n`;
        output += `\t<a class="${linkClass}" href="${linkPath}">${page.title.content}</a>\n`;
        var previous_header = {};
        page.headers.forEach(header => {
            if (previous_header.level === 'h2' && header.level === 'h3') {
                output += `<nav class="doc-sub-menu nav flex-column">\n`;
            }
            if (previous_header.level === 'h3' && header.level === 'h2') {
                output += `</nav>\n`;
            }
            
            output += `\t<a class="${linkClass}" href="${linkPath}#${header.id}">${header.content}</a>\n`;
            previous_header = header;
        });

        output += `</div>\n`;
    });
    return output;
}