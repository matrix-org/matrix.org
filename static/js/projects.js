class Filter {
    constructor(filterId, filters) {
        this.allOf = [];
        this.anyOf = [];
        this.filterId = filterId;
        this.filters = filters;
        this.makeMenuInteractive(filterId);
        this.enableFilters(filterId);
    }

    makeMenuInteractive(filterId) {
        let filterButton = document.getElementById(filterId);
        let filterMenu = document.getElementById(filterId + "-menu");
        let filterOverlay = document.getElementById("filters-overlay");

        filterButton.addEventListener("click", (event) => {
            if (!filterMenu.classList.contains("display")) {
                filterMenu.classList.add("display");
                filterOverlay.classList.add("display");
                filterButton.classList.add("expanded");
            } else {
                filterMenu.classList.remove("display");
                filterOverlay.classList.remove("display");
                filterButton.classList.remove("expanded");
            }
        });

        filterOverlay.addEventListener("click", (event) => {
            filterMenu.classList.remove("display");
            filterOverlay.classList.remove("display");
            filterButton.classList.remove("expanded");
        });
    }

    checkAllBoxes(filterId) {
        let filterMenu = document.getElementById(filterId + "-menu");
        for (const filterOption of filterMenu.children) {
            if (filterOption.classList.contains("filter-option")) {
                filterOption.children[0].checked = true;
                this.boxWasChecked(filterOption.children[0].id);
            }
        }
        refreshCardsView(this.filters);
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
}

class AllOfFilter extends Filter {
    enableFilters(filterId) {
        let filterMenu = document.getElementById(filterId + "-menu");
        for (const filterOption of filterMenu.children) {
            if (filterOption.classList.contains("filter-option")) {
                const optionId = filterOption.children[0].id;
                const checkbox = filterOption.children[0];
                if (checkbox.checked) {
                    this.allOf.push(filterOption.children[0].id);
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
        let filterPos = this.allOf.indexOf(optionId);
        if (filterPos == -1) {
            this.allOf.push(optionId);
        }

        this.refreshActiveState();
        refreshCardsView(this.filters);
    }

    boxWasUnchecked(optionId) {
        let filterPos = this.allOf.indexOf(optionId);
        if (filterPos != -1) {
            this.allOf.splice(filterPos, 1);
        }

        this.refreshActiveState();
        refreshCardsView(this.filters);
    }

    refreshActiveState() {
        let filterButton = document.getElementById(this.filterId);
        if(this.allOf.length === 0) {
            filterButton.classList.remove("enabled");
        } else {
            filterButton.classList.add("enabled");
        }
    }
}

class AnyOfFilter extends Filter {
    constructor(filterId, filters) {
        super(filterId, filters);

        this.numberOfOption = 0;
        let filterMenu = document.getElementById(filterId + "-menu");
        for (const filterOption of filterMenu.children) {
            if (filterOption.classList.contains("filter-option")) {
                this.numberOfOption++;
            }
        }
    }

    enableFilters(filterId) {
        let filterMenu = document.getElementById(filterId + "-menu");
        for (const filterOption of filterMenu.children) {
            if (filterOption.classList.contains("filter-option")) {
                const optionId = filterOption.children[0].id;
                const checkbox = filterOption.children[0];
                if (checkbox.checked) {
                    this.anyOf.push(filterOption.children[0].id);
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
        let filterPos = this.anyOf.indexOf(optionId);
        if (filterPos == -1) {
            this.anyOf.push(optionId);
        }
        this.refreshActiveState();
        refreshCardsView(this.filters);
    }

    boxWasUnchecked(optionId) {
        let filterPos = this.anyOf.indexOf(optionId);
        if (filterPos != -1) {
            this.anyOf.splice(filterPos, 1);
        }
        this.refreshActiveState();
        refreshCardsView(this.filters);
    }

    refreshActiveState() {
        let filterButton = document.getElementById(this.filterId);
        if(this.anyOf.length === this.numberOfOption) {
            filterButton.classList.remove("enabled");
        } else {
            filterButton.classList.add("enabled");
        }
    }
}

function refreshCardsView(filters) {
    let anyOf = [];
    let allOf = [];
    for(let filter of filters) {
        anyOf = anyOf.concat(filter.anyOf);
        allOf = allOf.concat(filter.allOf);
    }
    let deck = document.getElementById("all-clients");
    for (const deckItem of deck.children) {
        for (var child of deckItem.children) {
            if (child.classList.contains("project-card")) {
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
                    client.classList.remove("filtered-out");
                } else {
                    client.classList.add("filtered-out");
                }
            }
        }
    }
};

export { Filter, AllOfFilter, AnyOfFilter, refreshCardsView };
