var video = document.getElementById('videoStream');
if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(video.src);
    hls.attachMedia(video);
}
