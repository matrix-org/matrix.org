document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".blog-item");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            items.forEach(item => {
                if (filter === "all" || item.dataset.category === filter) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});