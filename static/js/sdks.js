import { AllOfFilter, AnyOfFilter, refreshCardsView } from "./projects.js";

document.addEventListener('DOMContentLoaded', (event) => {

    // Client SDKs
    var clientFilters = [];
    let clientMaturityFilter = new AnyOfFilter("client-sdks-filter-maturity", "client-sdks", clientFilters);
    let clientLicenceFilter = new AnyOfFilter("client-sdks-filter-licence", "client-sdks", clientFilters);
    let clientLanguageFilter = new AnyOfFilter("client-sdks-filter-language", "client-sdks", clientFilters);
    clientFilters.push(
        clientMaturityFilter,
        clientLicenceFilter,
        clientLanguageFilter
    );
    refreshCardsView("client-sdks", clientFilters);
    for (const filter of clientFilters) {
        filter.refreshActiveState();
    }

    // Bot SDKs
    var botFilters = [];
    let botMaturityFilter = new AnyOfFilter("bot-sdks-filter-maturity", "bot-sdks", botFilters);
    let botLicenceFilter = new AnyOfFilter("bot-sdks-filter-licence", "bot-sdks", botFilters);
    let botLanguageFilter = new AnyOfFilter("bot-sdks-filter-language", "bot-sdks", botFilters);
    botFilters.push(
        botMaturityFilter,
        botLicenceFilter,
        botLanguageFilter
    );
    refreshCardsView("bot-sdks", botFilters);
    for (const filter of botFilters) {
        filter.refreshActiveState();
    }

    // Bridge SDKs
    var bridgeFilters = [];
    let bridgeMaturityFilter = new AnyOfFilter("bridge-sdks-filter-maturity", "bridge-sdks", bridgeFilters);
    let bridgeLicenceFilter = new AnyOfFilter("bridge-sdks-filter-licence", "bridge-sdks", bridgeFilters);
    let bridgeLanguageFilter = new AnyOfFilter("bridge-sdks-filter-language", "bridge-sdks", bridgeFilters);
    bridgeFilters.push(
        bridgeMaturityFilter,
        bridgeLicenceFilter,
        bridgeLanguageFilter
    );
    refreshCardsView("bridge-sdks", bridgeFilters);
    for (const filter of bridgeFilters) {
        filter.refreshActiveState();
    }
})
