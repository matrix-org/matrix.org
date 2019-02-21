const fs = require('fs');
var markdownWiki = require('markdown-wiki');
var markdownit = require('markdown-it')();
process.chdir(__dirname);


markdownWiki.loadPages("../jekyll/_posts/projects/");
var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/docs/";
var templateHtml = fs.readFileSync(`template-try-matrix-now.html`, 'utf-8');
var templateHtmlProject = fs.readFileSync(`template-project.html`, 'utf-8');

var wiki = markdownWiki.getWiki();

var pages = wiki.pages.filter(p => p.name != "template");

var languagesList = Array.from(new Set(pages.map(p => {return p.fm.language}))).join(",");
var licensesList = Array.from(new Set(pages.map(p => {return p.fm.license}))).join(",");

var gettingStarted = pages.filter(p => p.fm.getting_started);
var gettingStartedHtml = "";
gettingStarted.forEach(project => {
    var categories = project.fm.categories.split(" ");
    categories = categories.filter(c => c !== "projects")
    gettingStartedHtml += getProjectCard(project.fm, `projects/${categories[0]}/${project.name}.html`, 3, false);
});

var clients = pages.filter(p => 
    p.fm.categories && p.fm.categories.indexOf("client") != -1);
var clientsHtml = "";
clients.forEach(project => {
    clientsHtml += getProjectCard(project.fm, `projects/client/${project.name}.html`, 4, true);
    createProjectHtml("client", project);
});

var bots = pages.filter(p => 
    p.fm.categories && p.fm.categories.indexOf("bot") != -1);
var botsHtml = "";
bots.forEach(project => {
    botsHtml += getProjectCard(project.fm, `projects/bot/${project.name}.html`, 3, true);
    createProjectHtml("bot", project);
});

var servers = pages.filter(p => p.fm.categories && p.fm.categories.indexOf("server") != -1);
var serversHtml = "";
servers.forEach(project => {
    serversHtml += getProjectCard(project.fm, `projects/server/${project.name}.html`, 3, true);
});

var sdks = pages.filter(p => p.fm.categories && p.fm.categories.indexOf("sdk") != -1);
var sdksHtml = "";
sdks.forEach(project => {
    sdksHtml += getProjectCard(project.fm, `projects/sdk/${project.name}.html`, 3, true);
});

var bridges = pages.filter(p => p.fm.categories && p.fm.categories.indexOf("bridge") != -1);
var bridgesHtml = "";
bridges.forEach(project => {
    bridgesHtml += getProjectCard(project.fm, `projects/bridge/${project.name}.html`, 3, true);
});

var others = pages.filter(p => p.fm.categories && p.fm.categories.indexOf("other") != -1);
var othersHtml = "";
others.forEach(project => {
    othersHtml += getProjectCard(project.fm, `projects/other/${project.name}.html`, 3, true);
});

function getProjectCard(fm, url, bootstrap12ths, filterable) {
    filterable = filterable ? "filterableProject" : "";
    var image = "";
    if (fm.thumbnail) {
        image = `<a href="${url}"><img class="img-fluid" src="${fm.thumbnail}" alt="screenshot" /></a>`;
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
            <a class="mask" href="${url}"><i class="icon fa fa-search-plus"></i></a>
        </div><!--//theme-card-->
    </div>
    `;
}

function createProjectHtml(type, project) {
    if (! project.fm.screenshot) project.fm.screenshot = "/docs/projects/images/no_image.svg";
    var projectHtml = templateHtmlProject;
    projectHtml = projectHtml.replace("<!--TITLE-->", project.fm.title);
    projectHtml = projectHtml.replace("<!--IMAGE-->", project.fm.screenshot);
    projectHtml = projectHtml.replace("<!--DETAILS-->", getDetailsTable(project.fm));
    projectHtml = projectHtml.replace("<!--DESCRIPTION-->", project.fm.description);
    var textContent = markdownit.renderer.render(project.tokens, {});
    textContent = textContent.replace("<h1>{{ page.title }}</h1>", "");
    textContent = textContent.replace("<p>Repository: &lt;{{page.repo}}&gt;</p>", "");
    projectHtml = projectHtml.replace("<!--TEXTCONTENT-->", textContent);
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
templateHtml = templateHtml.replace("<!-- ###SDKS### -->", sdksHtml);
templateHtml = templateHtml.replace("<!-- ###BRIDGES### -->", bridgesHtml);
templateHtml = templateHtml.replace("<!-- ###OTHERS### -->", othersHtml);

templateHtml = templateHtml.replace('<!--LANGUAGES-->', languagesList);
templateHtml = templateHtml.replace('<!--LICENSES-->', licensesList);

fs.writeFileSync(`${newDocsPath}try-matrix-now.html`, templateHtml);
