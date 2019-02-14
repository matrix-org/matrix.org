const fs = require('fs');
var markdownWiki = require('markdown-wiki');
var markdownit = require('markdown-it')();
process.chdir(__dirname);


markdownWiki.loadPages("../jekyll/_posts/projects/");
var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/";
var templateHtml = fs.readFileSync(`${newDocsPath}template-try-matrix-now.html`, 'utf-8');
var templateHtmlProject = fs.readFileSync(`${newDocsPath}template-project.html`, 'utf-8');

var wiki = markdownWiki.getWiki();

var pages = wiki.pages.filter(p => p.name != "template");

var languagesList = Array.from(new Set(pages.map(p => {return p.fm.language}))).join(",");

var gettingStarted = pages.filter(p => p.fm.getting_started);
var gettingStartedHtml = "";
gettingStarted.forEach(project => {
    gettingStartedHtml += getProjectCard(project.fm, null, 3, false);
});

var clients = pages.filter(p => 
    p.fm.categories && p.fm.categories.indexOf("client") != -1);
var clientsHtml = "";
clients.forEach(client => {
    clientsHtml += getProjectCard(client.fm, null, 4, true);
    //createProjectHtml("client", client);
});

var bots = pages.filter(p => 
    p.fm.categories && p.fm.categories.indexOf("bot") != -1);
var botsHtml = "";
bots.forEach(bot => {
    botsHtml += getProjectCard(bot.fm, null, 3, true);
});

var servers = pages.filter(p => p.fm.categories && p.fm.categories.indexOf("server") != -1);
var serversHtml = "";
servers.forEach(project => {
    serversHtml += getProjectCard(project.fm, null, 3, true);
});

var sdks = pages.filter(p => p.fm.categories && p.fm.categories.indexOf("server") != -1);
var sdksHtml = "";
sdks.forEach(project => {
    sdksHtml += getProjectCard(project.fm, null, 3, true);
});

function getProjectCard(fm, url, bootstrap12ths, filterable) {
    filterable = filterable ? "filterableProject" : "";
    var image = "";
    var localPath = "../../matrix.org-gh/matrix.org";
    if (fm.thumbnail) {
        image = `<a href="${url}" target="_blank"><img class="img-fluid" src="${localPath}${fm.thumbnail}" alt="screenshot" /></a>`;
    }
    return `
    <div class="col-md-${bootstrap12ths} col-12 mb-3 ${filterable}"
        data-featured="${fm.featured == "TRUE" ? true : false}"
        data-maturity="${slugify(fm.maturity)}"
        data-language="${slugify(fm.language)}"
        data-license="${slugify(fm.license)}">
        <div class="theme-card">
            ${image}
            <div class="card-block">
                <h4 class="card-title">${fm.title}</h4>
                <p class="card-text">${fm.description}</p>
            </div><!--//card-block-->
            <a class="mask" href="${url}" target="_blank"><i class="icon fa fa-search-plus"></i></a>
        </div><!--//theme-card-->
    </div>
    `;
}

function createProjectHtml(type, project) {
    var localPath = "../../../../matrix.org-gh/matrix.org";
    var projectHtml = templateHtmlProject;
    projectHtml = projectHtml.replace("<!--TITLE-->", project.fm.title);
    projectHtml = projectHtml.replace("<!--IMAGE-->", localPath + project.fm.screenshot);
    projectHtml = projectHtml.replace("<!--DETAILS-->", getDetailsTable(project.fm));
    projectHtml = projectHtml.replace("<!--DESCRIPTION-->", project.fm.description);
    projectHtml = projectHtml.replace("<!--TEXTCONTENT-->", markdownit.renderer.render(project.tokens, {}));
    fs.writeFileSync(`${newDocsPath}/projects/${type}/${project.name}.html`, projectHtml);
}

function getDetailsTable(fm) {
    var markdown = `|||
|---:|:---|
|**Name**|${fm.title}|
|**Author**|${fm.author}|
|**Maturity**|${fm.maturity}|
|**Language**|${fm.language}|
|**License**|${fm.license}|
|**Repo**|<${fm.repo}>|
|**Homepage**|<${fm.home}>|
|**Matrix Room**|${fm.matrix_room}|`;
    return markdownit.render(markdown, {});
}

function slugify(str) {
    if (!str) return "";
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return str.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with ‘and’
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple — with single -
      .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
}

templateHtml = templateHtml.replace("<!-- ###GETSTARTED### -->", gettingStartedHtml);

templateHtml = templateHtml.replace("<!-- ###SERVERS### -->", serversHtml);
templateHtml = templateHtml.replace("<!-- ###CLIENTS### -->", clientsHtml);
templateHtml = templateHtml.replace("<!-- ###BOTS### -->", botsHtml);
templateHtml = templateHtml.replace("<!-- ###SDKS### -->", botsHtml);
templateHtml = templateHtml.replace("<!-- ###OTHERS### -->", botsHtml);

templateHtml = templateHtml.replace('<!--LANGUAGES-->', languagesList);

fs.writeFileSync(`${newDocsPath}try-matrix-now.html`, templateHtml);
console.log('written');