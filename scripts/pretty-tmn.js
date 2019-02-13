const fs = require('fs');
var markdownWiki = require('markdown-wiki');
process.chdir(__dirname);


markdownWiki.loadPages("../jekyll/_posts/projects/");
var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/";
var templateHtml = fs.readFileSync(`${newDocsPath}template-try-matrix-now.html`, 'utf-8');

var wiki = markdownWiki.getWiki();

var pages = wiki.pages;

var clients = pages.filter(p => 
    p.fm.categories && p.fm.categories.indexOf("client") != -1);
var clientsHtml = "";
clients.forEach(client => {
    clientsHtml += getProjectCard(client.fm.title, client.fm.description, client.fm.thumbnail, null, 4);
});

var bots = pages.filter(p => 
    p.fm.categories && p.fm.categories.indexOf("bot") != -1);
var botsHtml = "";
bots.forEach(bot => {
    botsHtml += getProjectCard(bot.fm.title, bot.fm.description, null, null, 3);
});

function getProjectCard(title, description, thumbnail, url, bootstrap12ths) {
    var image = "";
    var localPath = "../../matrix.org-gh/matrix.org";
    console.log(localPath);
    if (thumbnail) {
        image = `<a href="${url}" target="_blank"><img class="img-fluid" src="${localPath}${thumbnail}" alt="screenshot" /></a>`;
    }
    return `
    <div class="col-md-${bootstrap12ths} col-12 mb-3">
        <div class="theme-card">
            ${image}
            <div class="card-block">
                <h4 class="card-title">${title}</h4>
                <p class="card-text">${description}</p>
            </div><!--//card-block-->
            <a class="mask" href="${url}" target="_blank"><i class="icon fa fa-search-plus"></i></a>
        </div><!--//theme-card-->
    </div>
    `;
}

templateHtml = templateHtml.replace("<!-- ###CLIENTS### -->", clientsHtml);
templateHtml = templateHtml.replace("<!-- ###BOTS### -->", botsHtml);

fs.writeFileSync(`${newDocsPath}try-matrix-now.html`, templateHtml);
console.log('written');