/*
 * SPDX-FileCopyrightText: 2026 The Matrix.org Foundation C.I.C.
 * SPDX-FileContributor: awtj8o81ryywg793
 * 
 * SPDX-License-Identifier: Apache-2.0
 */

const toggles = document.querySelectorAll(".site-header label");

/*
 * Retrieves the checkbox associated with a given label element.
 *
 * @param {HTMLElement} element - The label element.
 * @returns {HTMLElement|null} The associated checkbox element or null if not found.
 */
const getCheckbox = (element) =>
    document.querySelector(
        `.site-header input[type="checkbox"]#${element.getAttribute('for')}`
    );

/*
 * Retrieves all related toggles for a given label element, excluding itself.
 *
 * @param {HTMLElement} element - The label element.
 * @returns {HTMLElement[]} An array of related label elements.
 */
const getRelatedToggles = (element) =>
    Array.from(document.querySelectorAll(
        `.site-header label[for="${element.getAttribute('for')}"]`
    )).filter(related => related !== element);

/*
 * Toggles the ARIA attributes of a given label element.
 *
 * @param {HTMLElement} element - The label element to toggle attributes for.
 */
const toggleAriaAttributes = (element) => {
    const isExpanded = element.getAttribute("aria-expanded") === "true";
    const isPressed = element.getAttribute("aria-pressed") === "true";

    element.setAttribute("aria-expanded", !isExpanded);
    element.setAttribute("aria-pressed", !isPressed);
};

/*
 * Handles the toggle action for a given label element, including updating
 * ARIA attributes and checkbox state.
 *
 * @param {HTMLElement} element - The label element to handle the toggle for.
 */
const handleToggle = (element) => {
    toggleAriaAttributes(element);

    const relatedToggles = getRelatedToggles(element);
    relatedToggles.forEach(relatedElement => {
        toggleAriaAttributes(relatedElement);
        relatedElement.setAttribute("aria-pressed", false);
    });

    const checkbox = getCheckbox(element);
    if (checkbox)
        checkbox.checked = !checkbox.checked;
};

// Initialise toggles
toggles.forEach(element => {
    element.setAttribute("role", "button");
    element.setAttribute("tabindex", 0);
    element.setAttribute("aria-expanded", "false");
    element.setAttribute("aria-pressed", "false");

    const checkbox = getCheckbox(element);
    if (checkbox)
        checkbox.checked = false; // Ensure a consistent state

    element.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default browser behaviour (i.e., toggling).
        handleToggle(element);
    });

    element.addEventListener("keydown", (event) => {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault(); // Prevent the default browser behaviour (i.e., page scrolling).
            handleToggle(element);
        }
    });
});
