/*
 * SPDX-FileCopyrightText: 2026 The Matrix.org Foundation C.I.C.
 * SPDX-FileContributor: Syed Ishmum Ahnaf <syedishmum15@gmail.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const RESET_DELAY_MS = 2000;

function resetCopyFeedback(button, status, timeoutId) {
    button.textContent = "Copy";
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
        resetCopyFeedback(button, status);
        delete button.dataset.resetTimeoutId;
    }, RESET_DELAY_MS);

    button.dataset.resetTimeoutId = String(timeoutId);
}

function enableCitationCopy(citation) {
    citation.classList.add("cite-copy-enabled");

    for (const button of citation.querySelectorAll("[data-cite-copy]")) {
        button.addEventListener("click", async () => {
            const panel = button.closest(".cite-panel");
            const text = panel?.querySelector(".cite-text");
            const status = panel?.querySelector(".cite-copy-status");

            if (!text || !status) {
                return;
            }

            try {
                await navigator.clipboard.writeText(text.textContent.trim());
                button.textContent = "Copied";
                status.textContent = "Copied";
            } catch (error) {
                button.textContent = "Copy";
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
