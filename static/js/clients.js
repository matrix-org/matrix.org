import { AllOfFilter, AnyOfFilter, refreshCardsView } from "./projects.js";

document.addEventListener('DOMContentLoaded', (event) => {

    var filters = [];
    let platformFilter = new AllOfFilter("filter-platform", "all-clients", filters);
    let maturityFilter = new AnyOfFilter("filter-maturity", "all-clients", filters);
    let licenceFilter = new AnyOfFilter("filter-licence", "all-clients", filters);
    let featureFilter = new AllOfFilter("filter-features", "all-clients", filters);
    filters.push(
        platformFilter,
        maturityFilter,
        licenceFilter,
        featureFilter
    );
    refreshCardsView("all-clients", filters);
    for(const filter of filters) {
        filter.refreshActiveState();
    }
})
