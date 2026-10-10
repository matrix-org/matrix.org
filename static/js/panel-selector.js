document.addEventListener("DOMContentLoaded", () => {
    let selector = document.getElementById("sdk-purpose-selector");
    let buttons = selector.querySelectorAll(".sdk-purpose-card");

    function selectPurpose(button) {
        for (const other of buttons) {
            other.setAttribute("aria-pressed", other === button ? "true" : "false");
        }

        let allPanels = document.getElementsByClassName("panel");
        for (const panel of allPanels) {
            panel.classList.add("hidden");
        }
        let panel = document.getElementById(button.id + "-panel");
        panel.classList.remove("hidden");
    }

    for (const button of buttons) {
        button.addEventListener("click", () => selectPurpose(button));
    }

    selectPurpose(buttons[0]);
});
