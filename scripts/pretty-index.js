#! /usr/local/bin/node

const fs = require('fs');
const MarkdownIt = require('markdown-it');
const md = MarkdownIt({html: true}).use(require('markdown-it-front-matter'), () => {});
const util = require("./pretty-util.js");
process.chdir(__dirname);


var indexTemplate = fs.readFileSync(`template-index.html`, 'utf-8');
function html() {
    var cards = [];
    cards.push(new Card("guides/how-can-i-get-involved.html", "", "Get Involved", ""));
    cards.push(new Card("guides/usage-of-the-js-sdk.html", "", "Start Making", ""));
    cards.push(new Card("guides/installing-synapse.html", "", "Install Synapse", ""));
    cards.push(new Card("guides/faq-out.html", "", "FAQs", ""));
    cards.push(new Card("try-matrix-now.html", "", "Try Matrix Now", ""));
    cards.push(new Card("guides/legal-docs-index.html", "", "Legal", ""));
    
    var indexCardsHtml = "";
    cards.forEach(card => {
        indexCardsHtml += util.getCard(card);
    })
    
    indexTemplate = indexTemplate.replace("<!--INDEXCARDS-->", indexCardsHtml);
    
    var guidesIndexMd = fs.readFileSync("../jekyll/_posts/guides/2016-01-01-index.md", 'utf-8');
    var guidesIndexHtml = md.render(guidesIndexMd);
    
    indexTemplate = indexTemplate.replace("<!--GUIDESLIST-->", guidesIndexHtml);
    return indexTemplate;
}

function getHomepageCard(card) {
    return `
<div class="col-md-4 col-12 mb-3">
    <div class="theme-card">
        <a href="${card.url}"><img class="img-fluid" src="${card.img}" alt="screenshot" /></a>
        <div class="card-block">
            <h4 class="card-title">${card.title}</h4>
            <p class="card-text">${card.description}</p>
        </div><!--//card-block-->
        <a class="mask" href="${card.url}"><i class="icon fa fa-search-plus"></i></a>
    </div><!--//theme-card-->
</div>`;
}

function Card(url, img, title, description) {
    this.url = url;
    this.img = img;
    this.title = title;
    this.description = description;
}

module.exports = {
    html: html
}