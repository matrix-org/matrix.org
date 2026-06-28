/*
 * SPDX-FileCopyrightText: 2026 The Matrix.org Foundation C.I.C.
 * SPDX-FileContributor: Syed Ishmum Ahnaf <syedishmum15@gmail.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const RESET_DELAY_MS = 2000;

function resetCopyFeedback(status, timeoutId) {
    status.textContent = "";
    if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
    }
}

function scheduleReset(button, status) {
    const existingTimeoutId = button.dataset.resetTimeoutId;
    if (existingTimeoutId !== undefined) {
        window.clearTimeout(Number(existingTimeoutId));
    }

    const timeoutId = window.setTimeout(() => {
        resetCopyFeedback(status);
        delete button.dataset.resetTimeoutId;
    }, RESET_DELAY_MS);

    button.dataset.resetTimeoutId = String(timeoutId);
}

function enableCitationCopy(citation) {
    const buttons = citation.querySelectorAll("[data-cite-copy]");

    if (buttons.length === 0) {
        return;
    }

    citation.classList.add("cite-copy-enabled");

    for (const button of buttons) {
        button.addEventListener("click", async () => {
            const panel = button.closest("[data-cite-panel]");
            const text = panel?.querySelector(".cite-text");
            const status = panel?.querySelector(".cite-copy-status");

            if (!text || !status) {
                return;
            }

            try {
                await navigator.clipboard.writeText(text.textContent.trim());
                status.textContent = "Copied";
            } catch (error) {
                status.textContent = "Copy failed";
            }

            scheduleReset(button, status);
        });
    }
}

if (window.isSecureContext && navigator.clipboard?.writeText) {
    for (const citation of document.querySelectorAll(".citation")) {
        enableCitationCopy(citation);
    }
}
