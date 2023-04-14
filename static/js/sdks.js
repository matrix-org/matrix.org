import { AllOfFilter, AnyOfFilter, refreshCardsView } from "./projects.js";

document.addEventListener('DOMContentLoaded', (event) => {

    var filters = [];
    let maturityFilter = new AnyOfFilter("filter-maturity", "all-sdks", filters);
    let licenceFilter = new AnyOfFilter("filter-licence", "all-sdks", filters);
    let languageFilter = new AnyOfFilter("filter-language", "all-sdks", filters);
    filters.push(
        maturityFilter,
        licenceFilter,
        languageFilter
    );
    refreshCardsView("all-sdks", filters);
    for (const filter of filters) {
        filter.refreshActiveState();
    }
})
