#! /usr/local/bin/node

const fs = require('fs');

var newDocsPath = "/Users/benp/projects/matrix.org-docs-2019/";

process.stdout.write("Writing FAQ...\t");
var faq = require("./pretty-faq.js");
fs.writeFileSync(`${newDocsPath}faq-out.html`, faq.html());
process.stdout.write("FAQ writen\n");

var index = require("./pretty-index.js");
fs.writeFileSync(`${newDocsPath}index.html`, index.html());

var articlePages = require("./pretty-gen.js");

var tryMatrixNow = require("./pretty-tmn.js");
process.stdout.write("TMN writen\n");
