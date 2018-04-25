/*
* read-existing-md.js: output all existing project markdown files
* to an HTML table to simplify review.
*
* to run: node read-existing-md.js > output.html
*/

var fs = require('fs'),
readline = require('readline');

var files = fs.readdirSync('../jekyll/_posts/projects');
console.log("<table>");

files.forEach(file => {
    if (file === "images") return;
    console.log("<tr>");

    console.log("<td>");
    console.log(file);

    console.log("</td>");

    console.log("<td>");
    var titleFound = false;
    var lines = fs.readFileSync('../jekyll/_posts/projects/' + file, 'utf-8').split('\n');
    var content = "";
    lines.forEach(line => {
      if (titleFound) {
        if (line.length === 0) {
          content += "<br />";
        } else {
          content += line + "<br />";
        }
        
      }
      if (line === "# {{ page.title }}") titleFound = true;
    });
    console.log(content);
    
    console.log("</td>");
    console.log("</tr>");
  });
