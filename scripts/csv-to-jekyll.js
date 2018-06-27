/*
* csv-to-jekyll.js: takes a CSV file of projects bound for the try-matrix-now
* page and generates a markdown file for each line. Writes to a temp dir to
* be manually merged.
*
* to run: node csv-to-jekyll.js
*/

var csv = require('csv-parser');
var fs = require('fs');
var https = require('https');

var file = fs.createWriteStream("Matrix CRM - Projects.csv");
var request = https.get("https://docs.google.com/spreadsheets/d/1LC2b7Gh2n-PB0BUtOCkaoOHLfNvTTcY0ANHEXqzmmfY/export?format=csv", function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(readCSV);
  });
});


function readCSV() {
  fs.createReadStream('Matrix CRM - Projects.csv')
    .pipe(csv())
    .on('data', function (data) {
      //console.log(data);
      //if (! data.W) return;
      if (data.JekyllContent === "#N/A") return;
      if (data.Filename === "") return;
      if (data.Removed === "Y") return;
      writeJekyllFile(data);
  });
}

function writeJekyllFile(project) {
  console.log(project);
  var stream = fs.createWriteStream("../projects-gen/" + project.Filename, {'flags': 'w', 'encoding':'utf8', 'mode': '0666'});
  stream.once('open', function(fd) {
    stream.write("---\n");
    stream.write("layout: project\n");
    stream.write("title: " + project.Name + "\n");
    stream.write("categories: projects " + project.type + "\n");
    if (project.thumb) {
        stream.write("thumbnail: " + project.thumb + "\n");
    }
    stream.write("description: " + project.description + "\n");
    stream.write("author: " + project.author + "\n");
    stream.write("maturity: " + project.maturity + "\n");
    stream.write("language: " + project.language + "\n");
    stream.write("license: " + project.license + "\n");
    stream.write("repo: " + project.Repo + "\n");
    if (project.Home) {
        stream.write("home: " + project.Home + "\n");
    }
    stream.write("---\n");
    stream.write("\n");
    if (project.Screenshot) {
        stream.write("![screenshot](" + project.Screenshot + " \"{{ page.title }}\")");
        stream.write("\n");
        stream.write("\n");
    }
    stream.write("# {{ page.title }}\n");
    var JekyllContent = project.JekyllContent.split(" \n\n")
    JekyllContent.forEach(function (line, id, array)  {
      stream.write(line);
      if (id !== array.length - 1) stream.write("\n\n");
    });
    if (project.Repo) {
        stream.write("\n\n");
        stream.write("Repository: <{{page.repo}}>");
    }
    //stream.write(project.JekyllContent);
    stream.write("\n");
    stream.end();
  });
}
