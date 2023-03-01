document.addEventListener('DOMContentLoaded', (event) => {
    // Display filters only if javascript is enabled
    let filtersBar = document.getElementById("filters");
    filtersBar.style.display = "flex";

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
            filterButton.addEventListener("mouseup", (event) => {
                let platformFilterMenu = document.getElementById(filterId+"-menu");
                if(platformFilterMenu.style.display !== "block") {
                    platformFilterMenu.style.display = "block";
                } else {
                    platformFilterMenu.style.display = "none";
                }
            });
        }

        enableFilters(filterId) {
            let platformFilterMenu = document.getElementById(filterId+"-menu");
            for(var platformOption of platformFilterMenu.children) {
                if(!platformOption.classList.contains("reset-links")) {
                    let optionId = platformOption.children[0].id;
                    let checkbox = platformOption.children[0];
                    if(this.isAndFilter) {
                        if(checkbox.checked) {
                            this.allOf.push(platformOption.children[0].id);
                        }
                    } else {
                        if(checkbox.checked) {
                            this.anyOf.push(platformOption.children[0].id);
                        }
                    }
                    checkbox.addEventListener("change", (event) => {
                        if(checkbox.checked) {
                            this.boxWasChecked(optionId);
                        } else {
                            this.boxWasUnchecked(optionId);
                        }
                    });
                } else {
                    platformOption.children[0].addEventListener("mouseup", (event) => {
                        this.checkAllBoxes(filterId);
                    });
                    platformOption.children[1].addEventListener("mouseup", (event) => {
                        this.uncheckAllBoxes(filterId);
                    });
                }
            }
        }

        boxWasChecked(optionId) {
            if(this.isAndFilter) {
                let filterPos = this.allOf.indexOf(optionId);
                if(filterPos == -1) {
                    this.allOf.push(optionId);
                }
            } else {
                let filterPos = this.anyOf.indexOf(optionId);
                if(filterPos == -1) {
                    this.anyOf.push(optionId);
                }
            }
            this.refreshCardsView();
        }

        boxWasUnchecked(optionId) {
            if(this.isAndFilter) {
                let filterPos = this.allOf.indexOf(optionId);
                if(filterPos != -1) {
                    this.allOf.splice(filterPos, 1);
                }
            } else {
                let filterPos = this.anyOf.indexOf(optionId);
                if(filterPos != -1) {
                    this.anyOf.splice(filterPos, 1);
                }
            }
            this.refreshCardsView();
        }

        checkAllBoxes(filterId) {
            let platformFilterMenu = document.getElementById(filterId+"-menu");
            for(let platformOption of platformFilterMenu.children) {
                if(!platformOption.classList.contains("reset-links")) {
                        platformOption.children[0].checked = true;
                        this.boxWasChecked(platformOption.children[0].id);
                }
            }
        }

        uncheckAllBoxes(filterId) {
            let platformFilterMenu = document.getElementById(filterId+"-menu");
            for(let platformOption of platformFilterMenu.children) {
                if(!platformOption.classList.contains("reset-links")) {
                        platformOption.children[0].checked = false;
                        this.boxWasUnchecked(platformOption.children[0].id);
                }
            }
        }

        refreshCardsView() {
            let clients = document.getElementById("all-clients");
            for(let client of clients.children) {
                if(client.classList.contains("client-card")) {
                    let containsAllOf = this.allOf.every((elem) => {
                        return client.classList.contains(elem);
                    });
                    let containsAnyOf = false;
                    for(let filter of this.anyOf) {
                        if(client.classList.contains(filter)) {
                            containsAnyOf = true;
                            // and we can break?
                        }
                    }
                    if(this.anyOf.length <= 0) {
                        containsAnyOf = true;
                    }
                    if(containsAllOf && containsAnyOf) {
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
    // let maturityFilter = new Filter("filter-maturity", false, allOf, anyOf);
    // let licenceFilter = new Filter("filter-licence", false, allOf, anyOf);
    // let featureFilter = new Filter("filter-features", true, allOf, anyOf);
})
