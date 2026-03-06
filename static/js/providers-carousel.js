/*
 * SPDX-FileCopyrightText: 2026 The Matrix.org Foundation C.I.C.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

(function () {
    const carousel = document.querySelector(".providers-carousel");
    if (!carousel) return;

    const items = [...carousel.querySelectorAll(".provider-compact")];
    const NUM_ITEMS = items.length;
    const DRAG_THRESHOLD = 5; // px of movement before treating as drag, not click

    function getCSSNumber(prop) {
        const raw = getComputedStyle(carousel).getPropertyValue(prop).trim();
        // Strip known units: s, px, rem, em
        return parseFloat(raw);
    }

    function getCSSPx(prop) {
        const raw = getComputedStyle(carousel).getPropertyValue(prop).trim();
        if (raw.endsWith("rem")) {
            const remPx = parseFloat(
                getComputedStyle(document.documentElement).fontSize,
            );
            return parseFloat(raw) * remPx;
        }
        if (raw.endsWith("em")) {
            const emPx = parseFloat(getComputedStyle(carousel).fontSize);
            return parseFloat(raw) * emPx;
        }
        // px or bare number
        return parseFloat(raw);
    }

    function getDurationS() {
        // --carousel-duration is in seconds (e.g. "30s")
        return getCSSNumber("--carousel-duration");
    }

    function getItemCyclePx() {
        return getCSSPx("--item-width") + getCSSPx("--item-gap");
    }

    function baseDelay(i) {
        return -(getDurationS() / NUM_ITEMS) * i;
    }

    // Both wheel and drag feed into a single pixel offset; updating the
    // animation-delay of each card shifts its phase without pausing anything.
    let totalOffset = 0;

    function applyOffset() {
        const durationS = getDurationS();
        const totalCyclePx = NUM_ITEMS * getItemCyclePx();
        const timePerPx = durationS / totalCyclePx;
        items.forEach((item, i) => {
            item.style.animationDelay = `${baseDelay(i) - totalOffset * timePerPx}s`;
        });
    }

    // ── Mouse wheel / trackpad ──────────────────────────────────────────────

    carousel.addEventListener(
        "wheel",
        (e) => {
            e.preventDefault();
            totalOffset += e.deltaX !== 0 ? e.deltaX : e.deltaY;
            applyOffset();
        },
        { passive: false },
    );

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
    carousel.addEventListener(
        "click",
        (e) => {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                hasDragged = false;
            }
        },
        true,
    );

    carousel.addEventListener("mousedown", (e) => {
        onDragStart(e.clientX);
        e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => onDragMove(e.clientX));
    window.addEventListener("mouseup", () => onDragEnd());

    carousel.addEventListener(
        "touchstart",
        (e) => onDragStart(e.touches[0].clientX),
        { passive: true },
    );
    carousel.addEventListener(
        "touchmove",
        (e) => onDragMove(e.touches[0].clientX),
        { passive: true },
    );
    carousel.addEventListener("touchend", () => onDragEnd());
})();
