/*
* runner.js: start a new localhost http server on port 300.
* makes it easy to see the generated site.
*
* to run: node runner.js
*/
var express = require('express');
var app = express();
var fs = require('fs');

//process.chdir(__dirname + "/..");
process.chdir("/Users/benp/projects/matrix.org-docs-2019/");

app.get('*', function (req, res) {
    var path = process.cwd() + req.path;
    if (fs.existsSync(path)) {
        res.sendFile(path);
    } else {
        res.sendFile(path + '.html');
    }
});

var server = app.listen(8989, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);

});
