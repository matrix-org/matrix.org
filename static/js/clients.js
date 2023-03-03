document.addEventListener('DOMContentLoaded', (event) => {
    class Filter {
        constructor(filterId, isAndFilter, allOf, anyOf) {
            this.allOf = allOf;
            this.anyOf = anyOf;
            this.makeMenuInteractive(filterId);
            this.enableFilters(filterId);
            this.isAndFilter = isAndFilter;
        }

        makeMenuInteractive(filterId) {
            let filterButton = document.getElementById(filterId)
            filterButton.addEventListener("click", (event) => {
                let filterMenu = document.getElementById(filterId + "-menu");
                if (filterMenu.style.display !== "block") {
                    filterMenu.style.display = "block";
                } else {
                    filterMenu.style.display = "none";
                }
            });
        }

        enableFilters(filterId) {
            let filterMenu = document.getElementById(filterId + "-menu");
            for (const platformOption of filterMenu.children) {
                if (platformOption.classList.contains("filter-option")) {
                    const optionId = platformOption.children[0].id;
                    const checkbox = platformOption.children[0];
                    if (this.isAndFilter) {
                        if (checkbox.checked) {
                            this.allOf.push(platformOption.children[0].id);
                        }
                    } else {
                        if (checkbox.checked) {
                            this.anyOf.push(platformOption.children[0].id);
                        }
                    }
                    checkbox.addEventListener("change", (event) => {
                        if (checkbox.checked) {
                            this.boxWasChecked(optionId);
                        } else {
                            this.boxWasUnchecked(optionId);
                        }
                    });
                } else if (platformOption.classList.contains("reset-links")) {
                    platformOption.children[0].addEventListener("click", (event) => {
                        this.checkAllBoxes(filterId);
                    });
                    platformOption.children[1].addEventListener("click", (event) => {
                        this.uncheckAllBoxes(filterId);
                    });
                }
            }
        }

        boxWasChecked(optionId) {
            if (this.isAndFilter) {
                let filterPos = this.allOf.indexOf(optionId);
                if (filterPos == -1) {
                    this.allOf.push(optionId);
                }
            } else {
                let filterPos = this.anyOf.indexOf(optionId);
                if (filterPos == -1) {
                    this.anyOf.push(optionId);
                }
            }
            this.refreshCardsView();
        }

        boxWasUnchecked(optionId) {
            if (this.isAndFilter) {
                let filterPos = this.allOf.indexOf(optionId);
                if (filterPos != -1) {
                    this.allOf.splice(filterPos, 1);
                }
            } else {
                let filterPos = this.anyOf.indexOf(optionId);
                if (filterPos != -1) {
                    this.anyOf.splice(filterPos, 1);
                }
            }
            this.refreshCardsView();
        }

        checkAllBoxes(filterId) {
            let filterMenu = document.getElementById(filterId + "-menu");
            for (const platformOption of filterMenu.children) {
                if (platformOption.classList.contains("filter-option")) {
                    platformOption.children[0].checked = true;
                    this.boxWasChecked(platformOption.children[0].id);
                }
            }
        }

        uncheckAllBoxes(filterId) {
            let filterMenu = document.getElementById(filterId + "-menu");
            for (const platformOption of filterMenu.children) {
                if (platformOption.classList.contains("filter-option")) {
                    platformOption.children[0].checked = false;
                    this.boxWasUnchecked(platformOption.children[0].id);
                }
            }
        }

        refreshCardsView() {
            let clients = document.getElementById("all-clients");
            for (const client of clients.children) {
                if (client.classList.contains("client-card")) {
                    let containsAllOf = this.allOf.every((elem) => {
                        return client.classList.contains(elem);
                    });
                    let containsAnyOf = false;
                    for (const filter of this.anyOf) {
                        if (client.classList.contains(filter)) {
                            containsAnyOf = true;
                            // and we can break?
                        }
                    }
                    if (this.anyOf.length <= 0) {
                        containsAnyOf = true;
                    }

                    if (containsAllOf && containsAnyOf) {
                        client.style.display = "flex";
                    } else {
                        client.style.display = "none";
                    }
                }
            }
        };
    }

    let allOf = [];
    let anyOf = []
    let platformFilter = new Filter("filter-platform", true, allOf, anyOf);
    let maturityFilter = new Filter("filter-maturity", false, allOf, anyOf);
    let licenceFilter = new Filter("filter-licence", false, allOf, anyOf);
    let featureFilter = new Filter("filter-features", true, allOf, anyOf);
    platformFilter.refreshCardsView();
})
