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
        opener.addEventListener('click', () => {
            modal.showModal();
            overlay.classList.add("display");
        });
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.close();
            }
        });
        modal.addEventListener('close', () => {
            console.log("Closed");
            const overlay = document.getElementById("filters-overlay");
            overlay.classList.remove("display");
        });
    }
})
