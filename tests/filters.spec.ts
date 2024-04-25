import { test, expect } from '@playwright/test';

// We want to make sure that the ecosystem page has all the filters and they are clickable
test('can select filters on ecosystem pages', async ({ page }) => {
    page.goto('/ecosystem/clients/');

    // Check if platform filter works
    await page.locator("#filter-platform").scrollIntoViewIfNeeded()
    await page.locator("#filters-overlay").isHidden()
    await page.locator("#filter-platform-menu").isHidden()
    await page.locator("#filter-platform").click()
    await page.locator("#filters-overlay").isVisible()
    await page.locator("#filter-platform-menu").isVisible()

    // Check if platform filter can be used
    await page.locator("div.reset-links:nth-child(9) > button:nth-child(1)").click()
    await page.locator("#filters-overlay").click()
    const clients = await page.locator("#all-clients").all()
    for (const client of clients) {
        await client.isHidden()
    }

    await page.locator("#filter-platform").click()
    await page.locator("div.reset-links:nth-child(9) > button:nth-child(2)").click()
    await page.locator("#filters-overlay").click()
    for (const client of clients) {
        await client.isVisible()
    }
});
