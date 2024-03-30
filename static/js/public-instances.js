import { AllOfFilter, AnyOfFilter, refreshCardsView } from "./projects.js";

document.addEventListener('DOMContentLoaded', (event) => {

    var filters = [];
    let structureFilter = new AnyOfFilter("filter-structure", "all-instances", filters);
    let signupFilter = new AnyOfFilter("filter-signup", "all-instances", filters);
    let locationFilter = new AnyOfFilter("filter-location", "all-instances", filters);
    let softwareFilter = new AnyOfFilter("filter-software", "all-instances", filters)
    filters.push(
        structureFilter,
        signupFilter,
        locationFilter,
        softwareFilter
    );
    refreshCardsView("all-instances", filters);
    for (const filter of filters) {
        filter.refreshActiveState();
    }

    const dialogOpeners = document.querySelectorAll("#all-instances > div > a");
    const overlay = document.getElementById("filters-overlay");
    for(var opener of dialogOpeners) {
        const modal = document.getElementById(opener.id + "-modal");
        const closers = modal.getElementsByClassName("close-button");
        for(const closer of closers) {
            closer.addEventListener('click', () => {
                modal.classList.remove("display");
                overlay.classList.remove("display");
            });
        }
        opener.addEventListener('click', () => {
            modal.classList.add("display");
            overlay.classList.add("display");
        });
        overlay.addEventListener('click', () => {
            modal.classList.remove("display");
        });
        document.addEventListener('keydown', (e) => {
            if(e.key == "Escape") {
                modal.classList.remove("display");
            }
        })
    }
})
