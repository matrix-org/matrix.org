const fs = require('fs');
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt({html: true});
var markdownItAttrs = require('markdown-it-attrs'); 
md.use(markdownItAttrs);
var markdownItAnchor = require("markdown-it-anchor");
md.use(markdownItAnchor, {
    permalink: true,
    permalinkSymbol: "&#128279;",
    permalinkClass: "permalink",
    permalinkBefore: true
});

process.chdir(__dirname);

console.log(html());
function html() {
    var root = "../content/faq/";

    var outline = fs.readFileSync(root + "faq.html", 'utf-8');

    var markdownSource = "";
    var topMenuHtmlSource = "";

    var config = JSON.parse(fs.readFileSync(root + "questions-config.json", 'utf8'));

    var definitionLinks = "";
    config.definitions.forEach((definition) => {
        definitionLinks += "[" + definition.name.toLowerCase() + "]: ";
        definitionLinks += "#definition-" + definition.name.toLowerCase().replace(' ', '');
        definitionLinks += "\n";
    });

    config.sections.forEach((section) => {
        markdownSource += "\n# " + section.name + "\n";
        topMenuHtmlSource += '<div class="top-menu-item"><span class="title"><a href="#' + markdownItAnchor.defaults.slugify(section.name) + '">' + section.name + '</a></span><br />';
        section.parts.forEach((part) => {
            markdownSource += "\n## " + part.name + "\n";
            topMenuHtmlSource += '<a href="#' + markdownItAnchor.defaults.slugify(part.name) + '">' + part.name + '</a><br />';
            part.questions.forEach((question) => {
                if (typeof(question) == 'number') { question = "q" + question; } 
                var questionMarkdown = fs.readFileSync(root + "questions/" + question + ".md", 'utf-8');

                var questionParsed = md.parse(questionMarkdown + "\n\n" + definitionLinks, {});
                var questionDefinitions = [];
                questionParsed.forEach(token => {
                    if (! token.children) {
                        return;
                    }
                    token.children.forEach(childToken => {
                        if (childToken.type === "link_open") {
                            childToken.attrs.forEach(attr => {
                                if (attr[1].indexOf('#definition-') !== -1)
                                    questionDefinitions.push(attr[1].replace('#definition-', ''));
                            });
                        }
                    });
                });

                markdownSource += "\n<div class='question'>\n\n";

                questionMarkdown += "\n\n<div class='definition-list'>\n\n";
                
                questionDefinitions.forEach(term => {
                    var definition = config.definitions.find(d => {return d.name.toLowerCase().replace(' ', '') == term.toLowerCase()})
                    questionMarkdown += "\n\n<div class='definition-item definition-" + term + "'>\n\n";
                    questionMarkdown += "**" + definition.name + "**\n\n";
                    questionMarkdown += definition.definition;
                    questionMarkdown += "\n\n</div>\n\n";
                });

                questionMarkdown += "<div class='definition-close'>close</div>";

                questionMarkdown += "\n\n</div><!--.definition-list-->\n\n";

                markdownSource += questionMarkdown;
                markdownSource += "\n</div>\n";
            });
        });
        topMenuHtmlSource += '</div>';
    });

    var definitionsTable = '\n\n\# Definitions\n\nTerm | Definition\n--- | ---\n';
    config.definitions.forEach((definition) => {
        definitionsTable += definition.name;
        definitionsTable += '|' + definition.definition + "|\n";
    });
    markdownSource += "\n\n" + definitionsTable + "\n\n";

    markdownSource += "\n\n";
    markdownSource += definitionLinks;

    var twimUrls = fs.readFileSync(root + "_url-directory.md", 'utf8');

    markdownSource += "\n\n" + twimUrls;

    outline = outline.replace("{{QUESTIONS}}", md.render(markdownSource));
    outline = outline.replace("{{TOP-MENU}}", topMenuHtmlSource);

    return outline;
}

module.exports = {
    html: html
}