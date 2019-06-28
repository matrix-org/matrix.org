var fs = require('fs');

const postContent = fs.readFileSync(process.argv[2], 'utf-8');
const urlDirectory = fs.readFileSync(__dirname + "/_url-directory.md", 'utf-8')
                        .split("\n");

const refs = {};

urlDirectory.forEach(item => {
    item = item.split("]:");
    refs[item[0] + ']'] = item[1].trim();
});

Object.keys(refs).forEach(ref => {
    if (postContent.indexOf(ref) !== -1) {
        console.log(ref + ": " + refs[ref]);
    }
})
