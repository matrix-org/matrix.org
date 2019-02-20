#! /usr/local/bin/node

const fs = require('fs');
const { exec } = require('child_process');

var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/docs/";

process.stdout.write("Writing FAQ...\t");
var faq = require("./pretty-faq.js");
fs.writeFileSync(`${newDocsPath}faq-out.html`, faq.html());
process.stdout.write("FAQ writen\n");

process.stdout.write("Writing index...\t");
var index = require("./pretty-index.js");
fs.writeFileSync(`${newDocsPath}index.html`, index.html());
process.stdout.write("index writen\n");

process.stdout.write("Writing guides...\t");
var articlePages = require("./pretty-gen.js");
process.stdout.write("guides writen\n");

process.stdout.write("Writing TMN...\t");
var tryMatrixNow = require("./pretty-tmn.js");
process.stdout.write("TMN writen\n");

process.stdout.write("Writing bridges...\t");
var bridges = require("./pretty-bridges.js");
process.stdout.write("bridges writen\n");

process.stdout.write("Writing sdks...\t");
var sdks = require("./pretty-sdks.js");
process.stdout.write("sdks writen\n");

process.stdout.write("Writing bots...\t");
var bots = require("./pretty-bots.js");
process.stdout.write("bots writen\n");

exec(`cp ${__dirname}/../jekyll/_posts/projects/images/* /Users/benp/projects/matrix.org-docs-2019/docs/projects/images`);