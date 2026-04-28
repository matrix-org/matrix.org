/*
 * SPDX-FileCopyrightText: 2026 The Matrix.org Foundation C.I.C.
 * SPDX-FileContributor: Syed Ishmum Ahnaf <syedishmum15@gmail.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const RESET_DELAY_MS = 2000;

function resetCopyFeedback(button, status, timeoutId) {
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
    const button = citation.querySelector("[data-cite-copy]");
    const status = citation.querySelector(".cite-copy-status");

    if (!button || !status) {
        return;
    }

    citation.classList.add("cite-copy-enabled");

    button.addEventListener("click", async () => {
        const checkedRadio = citation.querySelector(".cite-format-radio:checked");
        const activeFormat = checkedRadio?.dataset.citeFormat;
        const text = citation.querySelector(`[data-cite-panel="${activeFormat}"] .cite-text`);

        if (!activeFormat || !text) {
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

if (window.isSecureContext && navigator.clipboard?.writeText) {
    for (const citation of document.querySelectorAll(".citation")) {
        enableCitationCopy(citation);
    }
}
