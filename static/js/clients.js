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
            let filterButton = document.getElementById(filterId);
            let filterMenu = document.getElementById(filterId + "-menu");
            let filterOverlay = document.getElementById("filters-overlay");

            filterButton.addEventListener("click", (event) => {
                if (filterMenu.style.display !== "block") {
                    filterMenu.style.display = "block";
                    filterOverlay.style.display = "block";
                    filterButton.style.zIndex = 150;
                } else {
                    filterMenu.style.display = "none";
                    filterOverlay.style.display = "none";
                    filterButton.style.zIndex = 100;
                }
            });

            filterOverlay.addEventListener("click", (event) => {
                filterMenu.style.display = "none";
                filterOverlay.style.display = "none";
                filterButton.style.zIndex = 100;
            });
        }

        enableFilters(filterId) {
            let filterMenu = document.getElementById(filterId + "-menu");
            for (const filterOption of filterMenu.children) {
                if (filterOption.classList.contains("filter-option")) {
                    const optionId = filterOption.children[0].id;
                    const checkbox = filterOption.children[0];
                    if (this.isAndFilter) {
                        if (checkbox.checked) {
                            console.log(filterOption.children[0].id);
                            this.allOf.push(filterOption.children[0].id);
                        }
                    } else {
                        if (checkbox.checked) {
                            this.anyOf.push(filterOption.children[0].id);
                        }
                    }
                    checkbox.addEventListener("change", (event) => {
                        if (checkbox.checked) {
                            this.boxWasChecked(optionId);
                        } else {
                            this.boxWasUnchecked(optionId);
                        }
                    });
                } else if (filterOption.classList.contains("reset-links")) {
                    filterOption.children[0].addEventListener("click", (event) => {
                        this.checkAllBoxes(filterId);
                    });
                    filterOption.children[1].addEventListener("click", (event) => {
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
            refreshCardsView(this.allOf, this.anyOf);
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
            refreshCardsView(this.allOf, this.anyOf);
        }

        checkAllBoxes(filterId) {
            let filterMenu = document.getElementById(filterId + "-menu");
            for (const filterOption of filterMenu.children) {
                if (filterOption.classList.contains("filter-option")) {
                    filterOption.children[0].checked = true;
                    this.boxWasChecked(filterOption.children[0].id);
                }
            }
            this.refreshCardsView();
        }

        uncheckAllBoxes(filterId) {
            let filterMenu = document.getElementById(filterId + "-menu");
            for (const filterOption of filterMenu.children) {
                if (filterOption.classList.contains("filter-option")) {
                    filterOption.children[0].checked = false;
                    this.boxWasUnchecked(filterOption.children[0].id);
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
    }

    function refreshCardsView(allOf, anyOf) {
        let deck = document.getElementById("all-clients");
        for (const deckItem of deck.children) {
            for (child of deckItem.children) {
                if (child.classList.contains("client-card")) {
                    let client = child;
                    let containsAllOf = allOf.every((elem) => {
                        return client.classList.contains(elem);
                    });
                    let containsAnyOf = false;
                    for (const filter of anyOf) {
                        if (client.classList.contains(filter)) {
                            containsAnyOf = true;
                            // and we can break?
                        }
                    }
                    if (anyOf.length <= 0) {
                        containsAnyOf = true;
                    }

                    if (containsAllOf && containsAnyOf) {
                        client.style.display = "flex";
                    } else {
                        client.style.display = "none";
                    }
                }
            }
        }
    };

    let allOf = [];
    let anyOf = []
    let platformFilter = new Filter("filter-platform", true, allOf, anyOf);
    let maturityFilter = new Filter("filter-maturity", false, allOf, anyOf);
    let licenceFilter = new Filter("filter-licence", false, allOf, anyOf);
    let featureFilter = new Filter("filter-features", true, allOf, anyOf);
    refreshCardsView(allOf, anyOf);
})
