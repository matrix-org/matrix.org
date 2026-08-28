// TODO: remove this whole file once CSS Anchor Positioning is Baseline
// *widely* available - not just "newly available", which it became in
// January 2026. The @supports block in _tooltip.scss already handles
// positioning natively (with viewport-edge avoidance) in browsers that
// support it; this file is only the fallback for the rest, computing the
// same kind of clamped, viewport-relative placement by hand.
function supportsAnchorPositioning() {
    return typeof CSS !== "undefined" && CSS.supports && CSS.supports("anchor-name", "--tooltip-anchor-test");
}

function positionTooltip(wrap, content) {
    content.style.position = "fixed";
    content.style.left = "0px";
    content.style.top = "0px";
    content.style.bottom = "auto";
    content.style.transform = "none";

    const triggerRect = wrap.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const margin = 8;
    const gap = 6;

    let left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - contentRect.width - margin));

    let top = triggerRect.top - contentRect.height - gap;
    if (top < margin) {
        // Not enough room above the trigger - show it below instead.
        top = triggerRect.bottom + gap;
    }

    content.style.left = left + "px";
    content.style.top = top + "px";
}

document.addEventListener("DOMContentLoaded", () => {
    if (supportsAnchorPositioning()) {
        return;
    }

    for (const wrap of document.querySelectorAll(".hover-tooltip")) {
        const content = wrap.querySelector(".tooltip-content");
        if (!content) {
            continue;
        }

        wrap.addEventListener("mouseenter", () => positionTooltip(wrap, content));
        wrap.addEventListener("focusin", () => positionTooltip(wrap, content));
    }
});
