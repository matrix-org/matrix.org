document.addEventListener('DOMContentLoaded', (event) => {
    // Display filters only if javascript is enabled
    let filtersBar = document.getElementById("filters");
    filtersBar.style.display = "flex";

    class PlatformFilter {
        constructor(id) {
            this.makeMenuInteractive(id);
            this.enableFilters(id);
            this.filteredOut = [];
        }

        makeMenuInteractive(id) {
            let filterButton = document.getElementById(id)
            filterButton.addEventListener("mouseup", (event) => {
                let platformFilterMenu = document.getElementById(id+"-menu");
                if(platformFilterMenu.style.display !== "block") {
                    platformFilterMenu.style.display = "block";
                } else {
                    platformFilterMenu.style.display = "none";
                }
            });
        }

        enableFilters(id) {
            let platformFilterMenu = document.getElementById(id+"-menu");
            for(var platformOption of platformFilterMenu.children) {
                if(!platformOption.classList.contains("reset-links")) {
                    let optionId = platformOption.children[0].id;
                    let checkbox = platformOption.children[0];
                    checkbox.addEventListener("change", (event) => {
                        if(checkbox.checked) {
                            this.removeFilter(optionId);
                        } else {
                            this.addFilter(optionId);
                        }
                    });
                } else {
                    platformOption.children[0].addEventListener("mouseup", (event) => {
                        this.removeAllFilters(id);
                    });
                    platformOption.children[1].addEventListener("mouseup", (event) => {
                        this.addAllFilters(id);
                    });
                }
            }
        }

        addFilter(optionId) {
            let filterPos = this.filteredOut.indexOf(optionId);
            if(filterPos == -1) {
                this.filteredOut.push(optionId);
            }
        }

        removeFilter(optionId) {
            let filterPos = this.filteredOut.indexOf(optionId);
            if(filterPos != -1) {
                this.filteredOut.splice(filterPos, 1);
            }
        }

        addAllFilters(id) {
            let platformFilterMenu = document.getElementById(id+"-menu");
            for(var platformOption of platformFilterMenu.children) {
                if(!platformOption.classList.contains("reset-links")) {
                        platformOption.children[0].checked = false;
                        this.addFilter(platformOption.children[0].id);
                }
            }
        }

        removeAllFilters(id) {
            let platformFilterMenu = document.getElementById(id+"-menu");
            for(var platformOption of platformFilterMenu.children) {
                if(!platformOption.classList.contains("reset-links")) {
                        platformOption.children[0].checked = true;
                        this.removeFilter(platformOption.children[0].id);
                }
            }
            this.filteredOut = [];
        }
    }

    let platformFilter = new PlatformFilter("filter-platform");
})
