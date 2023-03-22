import { AllOfFilter, AnyOfFilter, refreshCardsView } from "./projects.js";

document.addEventListener('DOMContentLoaded', (event) => {

    var filters = [];
    let platformFilter = new AllOfFilter("filter-platform", filters);
    let maturityFilter = new AnyOfFilter("filter-maturity", filters);
    let licenceFilter = new AnyOfFilter("filter-licence", filters);
    let featureFilter = new AllOfFilter("filter-features", filters);
    filters.push(
        platformFilter,
        maturityFilter,
        licenceFilter,
        featureFilter
    );
    refreshCardsView(filters);
})
