(function () {
    const carousel = document.querySelector('.providers-carousel');
    if (!carousel) return;

    const items = [...carousel.querySelectorAll('.provider-compact')];
    const NUM_ITEMS = items.length;
    const DURATION_S = 30; // keep in sync with CSS --carousel-duration
    const DRAG_THRESHOLD = 5; // px of movement before treating as drag, not click

    function baseDelay(i) {
        return -(DURATION_S / NUM_ITEMS) * i;
    }

    function getItemCyclePx() {
        const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return 190 + remPx; // --item-width (190px) + --item-gap (1rem)
    }

    // Both wheel and drag feed into a single pixel offset; updating the
    // animation-delay of each card shifts its phase without pausing anything.
    let totalOffset = 0;

    function applyOffset() {
        const totalCyclePx = NUM_ITEMS * getItemCyclePx();
        const timePerPx = DURATION_S / totalCyclePx;
        items.forEach((item, i) => {
            item.style.animationDelay = `${baseDelay(i) - totalOffset * timePerPx}s`;
        });
    }

    // ── Mouse wheel / trackpad ──────────────────────────────────────────────

    carousel.addEventListener('wheel', e => {
        e.preventDefault();
        totalOffset += e.deltaX !== 0 ? e.deltaX : e.deltaY;
        applyOffset();
    }, { passive: false });

    // ── Drag (mouse + touch) ────────────────────────────────────────────────

    let dragging = false;
    let hasDragged = false;
    let dragStartX = 0;
    let offsetAtDragStart = 0;

    function onDragStart(clientX) {
        dragging = true;
        hasDragged = false;
        dragStartX = clientX;
        offsetAtDragStart = totalOffset;
    }

    function onDragMove(clientX) {
        if (!dragging) return;
        const dx = clientX - dragStartX;
        if (Math.abs(dx) > DRAG_THRESHOLD) hasDragged = true;
        // Dragging left advances the carousel (same feel as scrolling down)
        totalOffset = offsetAtDragStart - dx;
        applyOffset();
    }

    function onDragEnd() {
        dragging = false;
    }

    // Swallow click events that were actually drag gestures
    carousel.addEventListener('click', e => {
        if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
            hasDragged = false;
        }
    }, true);

    carousel.addEventListener('mousedown', e => { onDragStart(e.clientX); e.preventDefault(); });
    window.addEventListener('mousemove',   e => onDragMove(e.clientX));
    window.addEventListener('mouseup',     () => onDragEnd());

    carousel.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
    carousel.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),  { passive: true });
    carousel.addEventListener('touchend',   () => onDragEnd());
})();
