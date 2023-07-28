import { AllOfFilter, AnyOfFilter, refreshCardsView } from "./projects.js";

document.addEventListener('DOMContentLoaded', (event) => {

    var filters = [];
    let structureFilter = new AnyOfFilter("filter-structure", "all-instances", filters);
    let signupFilter = new AnyOfFilter("filter-signup", "all-instances", filters);
    let locationFilter = new AnyOfFilter("filter-location", "all-instances", filters);
    filters.push(
        structureFilter,
        signupFilter,
        locationFilter,
    );
    refreshCardsView("all-instances", filters);
    for (const filter of filters) {
        filter.refreshActiveState();
    }
})
