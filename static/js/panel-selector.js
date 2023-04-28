document.addEventListener("DOMContentLoaded", (event) => {
    let selector = document.getElementById("sdk-purpose-selector");
    for (const panelOption of selector.children) {
        panelOption.addEventListener("change", (event) => {
            let allPanels = document.getElementsByClassName("panel");
            for (const panel of allPanels) {
                panel.classList.add("hidden");
            }
            let panel = document.getElementById(panelOption.id + "-panel");
            panel.classList.remove("hidden");
        });
    }

    let allPanels = document.getElementsByClassName("panel");
    for (const panel of allPanels) {
        panel.classList.add("hidden");
    }
    allPanels[0].classList.remove("hidden");
});
