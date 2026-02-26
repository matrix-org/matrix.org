(function () {
    const track = document.querySelector('.providers-track');
    if (!track) return;

    const DURATION_S = 30; // keep in sync with CSS animation duration
    const DRAG_THRESHOLD = 5; // px of movement before treating as a drag

    function getCurrentX() {
        return new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
    }

    function resumeFrom(x) {
        const halfWidth = track.scrollWidth / 2;
        const pos = ((x % halfWidth) - halfWidth) % halfWidth;
        const progress = pos / -halfWidth; // 0..1
        const delay = (-progress * DURATION_S).toFixed(4);
        track.style.transform = '';
        track.style.animation = `providers-scroll ${DURATION_S}s linear ${delay}s infinite`;
    }

    let dragging = false;
    let hasDragged = false;
    let startX = 0;
    let startOffset = 0;

    function onStart(clientX) {
        dragging = true;
        hasDragged = false;
        startX = clientX;
        startOffset = getCurrentX();
        track.style.animation = 'none';
        track.style.transform = `translateX(${startOffset}px)`;
    }

    function onMove(clientX) {
        if (!dragging) return;
        const dx = clientX - startX;
        if (Math.abs(dx) > DRAG_THRESHOLD) hasDragged = true;
        track.style.transform = `translateX(${startOffset + dx}px)`;
    }

    function onEnd(clientX) {
        if (!dragging) return;
        dragging = false;
        resumeFrom(startOffset + clientX - startX);
    }

    // Prevent card navigation when the interaction was a drag, not a tap/click
    track.addEventListener('click', e => {
        if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
            hasDragged = false;
        }
    }, true);

    track.addEventListener('mousedown', e => { onStart(e.clientX); e.preventDefault(); });
    window.addEventListener('mousemove', e => onMove(e.clientX));
    window.addEventListener('mouseup',   e => onEnd(e.clientX));

    track.addEventListener('touchstart', e => onStart(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove',  e => onMove(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchend',   e => onEnd(e.changedTouches[0].clientX));
})();
