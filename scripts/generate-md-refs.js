var fs = require('fs');

const postContent = fs.readFileSync(process.argv[2], 'utf-8');

const refs = {};
refs["[Dendrite]"] = "https://github.com/matrix-org/dendrite";
refs["[Half-Shot]"] = "https://matrix.to/#/@Half-Shot:half-shot.uk";
refs["[tulir]"] = "https://matrix.to/#/@tulir:maunium.net";
refs["[Kai]"] = "https://matrix.to/#/@kai:nasnotfound.de";
refs["[Soru]"] = "https://matrix.to/#/@sorunome:sorunome.de";
refs["[matrix-appservice-discord]"] = "https://github.com/Half-Shot/matrix-appservice-discord/";
refs["[yuforia]"] = "https://matrix.to/#/@uforia:matrix.org";
refs["[Wilko]"] = "https://matrix.to/#/@wilko:pattle.im";
refs["[Pattle]"] = "https://pattle.im/";
refs["[#app:pattle.im]"] = "https://matrix.to/#/#app:pattle.im";
refs["[aa13q]"] = "https://matrix.to/#/@aa13q:matrix.org";
refs["[Kitsune]"] = "https://matrix.to/#/@kitsune:matrix.org";
refs["[Mathijs]"] = "https://matrix.to/#/@mathijs:matrix.vgorcum.com";
refs["[jaywink]"] = "https://matrix.to/#/@jaywink:feneas.org";
refs["[Black Hat]"] = "https://matrix.to/#/@bhat:encom.eu.org";
refs["[Spectral]"] = "https://gitlab.com/b0/spectral";
refs["[Alexandre Franke]"] = "https://matrix.to/#/@afranke:matrix.org";
refs["[Fractal]"] = "https://wiki.gnome.org/Apps/Fractal";
refs["[Fox]"] = "https://matrix.to/#/@f0x:pixie.town";
refs["[Neo]"] = "https://github.com/f0x52/neo/";
refs["[#twim:matrix.org]"] = "https://matrix.to/#/#twim:matrix.org";
refs["[anoa]"] = "https://matrix.to/#/@andrewm:amorgan.xyz";


Object.keys(refs).forEach(ref => {
    if (postContent.indexOf(ref) !== -1) {
        console.log(ref + ": " + refs[ref]);
    }
})
