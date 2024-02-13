import { AllOfFilter, AnyOfFilter, refreshCardsView } from "./projects.js";

document.addEventListener('DOMContentLoaded', (event) => {

    var filters = [];
    let maturityFilter = new AnyOfFilter("filter-maturity", "all-distributions", filters);
    let supportFilter = new AnyOfFilter("filter-support", "all-distributions", filters);
    let licenceFilter = new AnyOfFilter("filter-licence", "all-distributions", filters);
    let frameworkFilter = new AnyOfFilter("filter-framework", "all-distributions", filters);
    filters.push(
        maturityFilter,
        supportFilter,
        licenceFilter,
        frameworkFilter
    );
    refreshCardsView("all-distributions", filters);
    for (const filter of filters) {
        filter.refreshActiveState();
    }
})
