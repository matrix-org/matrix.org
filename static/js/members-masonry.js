// Progressive enhancement for the Platinum/Gold/Silver/Ecosystem/Associate
// tier tiles (#supporters .supporters-tier-flow in membership.html).
//
// Without this script, the tiles are a plain flex-wrap row (see
// .supporters-tier-flow in _support.scss) - it keeps them in DOM order
// (Platinum, Gold, Silver, Ecosystem, Associate) at every width, which is
// what a screen reader or a no-JS browser sees, but it can leave whitespace
// next to a short tile in the same row as a tall one, since flex rows don't
// backfill gaps from a later row.
//
// True masonry (grid-template-rows: masonry) is Firefox-only today, and CSS
// multi-column reorders content column-by-column instead of preserving
// reading order - neither is usable here. This does the packing by hand:
// measure each tile's natural height, then greedily place each one (in DOM
// order) into whichever column is currently shortest. That's the same
// algorithm libraries like Masonry.js use. Reading order is no longer
// strictly left-to-right top-to-bottom, but every tile still appears before
// the next columns starts filling behind it, and DOM order (and so the
// no-JS/reader order) is untouched - this only moves nodes visually.
(() => {
    const flow = document.querySelector(".supporters-tier-flow");
    if (!flow) {
        return;
    }

    function columnCountFor(width) {
        if (width < 700) {
            return 1;
        }
        if (width < 1100) {
            return 2;
        }
        return 3;
    }

    // Captured once, before this script ever touches the DOM, so it always
    // reflects the true Platinum/Gold/Silver/Ecosystem/Associate order -
    // not document order, which stops matching that after the first layout
    // pass moves tiles into columns (a resize re-running this would
    // otherwise re-derive the processing order from wherever the previous
    // pass happened to leave each tile, compounding drift on every resize).
    const originalOrder = Array.from(
        flow.querySelectorAll(".supporters-section")
    );

    function layout() {
        // Undo any previous columns first, so heights are always measured
        // from the flat flex-wrap state, not from inside a narrower column.
        const items = originalOrder;
        flow.classList.remove("js-masonry");
        for (const item of items) {
            flow.appendChild(item);
        }
        for (const column of flow.querySelectorAll(".supporters-tier-column")) {
            column.remove();
        }

        const columnCount = columnCountFor(flow.clientWidth);
        if (columnCount <= 1) {
            // The plain flex-wrap layout already reads fine as a single
            // column; no need to introduce column wrappers for it.
            return;
        }

        const heights = items.map((item) => item.offsetHeight);

        const columns = Array.from({ length: columnCount }, () => {
            const column = document.createElement("div");
            column.className = "supporters-tier-column";
            return column;
        });
        const columnHeights = new Array(columnCount).fill(0);

        items.forEach((item, i) => {
            const shortest = columnHeights.indexOf(Math.min(...columnHeights));
            columns[shortest].appendChild(item);
            columnHeights[shortest] += heights[i];
        });

        flow.classList.add("js-masonry");
        for (const column of columns) {
            flow.appendChild(column);
        }
    }

    let resizeTimeout;
    function scheduleLayout() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(layout, 150);
    }

    document.addEventListener("DOMContentLoaded", layout);
    window.addEventListener("resize", scheduleLayout);
})();
