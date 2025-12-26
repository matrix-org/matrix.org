const dropdownToggle = document.querySelector("label#dropdown-button");
const dropdownCheckbox = document
    .querySelector("input[type='checkbox']#site-header-dropdown-checkbox");

/**
 * Toggles the aria-pressed attribute of a given element.
 *
 * @param {HTMLElement} element - The element whose aria-pressed attribute will be toggled.
 */
function toggleAriaPressed(element) {
    const isPressed = element.getAttribute("aria-pressed") === "true";

    element.setAttribute("aria-pressed", !isPressed);
}

/**
 * Toggles the checked state of a checkbox element.
 *
 * @param {HTMLInputElement} element - The checkbox whose checked state will be toggled.
 */
function toggleCheckbox(element) {
    element.checked = !element.checked;
}

console.log(dropdownToggle);

document.addEventListener("DOMContentLoaded", () => {
    /**
     * Set the aria-pressed attribute on the dropdown toggle as a progressive enhancement
     * since its value depends on being updated by JavaScript.
     */
    dropdownToggle.setAttribute("aria-pressed", dropdownCheckbox.checked);

    /**
     * Set the tabindex attribute on the dropdown toggle as a progressive enhancement
     * since it doesn't make much sense to mark it as focusable if JavaScript isn't enabled.
     */
    dropdownToggle.setAttribute("tabindex", 0);
});

dropdownToggle.addEventListener("click", () => {
    toggleAriaPressed(dropdownToggle);
});

dropdownToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        toggleCheckbox(dropdownCheckbox);
        toggleAriaPressed(dropdownToggle);
    }
});
