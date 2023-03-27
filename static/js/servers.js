import { AllOfFilter, AnyOfFilter, refreshCardsView } from "./projects.js";

document.addEventListener('DOMContentLoaded', (event) => {

    var filters = [];
    let maturityFilter = new AnyOfFilter("filter-maturity", "all-servers", filters);
    let licenceFilter = new AnyOfFilter("filter-licence", "all-servers", filters);
    let languageFilter = new AnyOfFilter("filter-language", "all-servers", filters);
    filters.push(
        maturityFilter,
        licenceFilter,
        languageFilter
    );
    refreshCardsView("all-servers", filters);
    for(const filter of filters) {
        filter.refreshActiveState();
    }
})
