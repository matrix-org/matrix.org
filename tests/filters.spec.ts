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
    await page.getByRole('button', { name: 'all' }).click()
    await page.locator("#filter-platform").click()
    const clients = await page.locator("#all-clients").all()
    for (const client of clients) {
        await client.isHidden()
    }

    await page.locator("#filter-platform").click()
    await page.getByRole('button', { name: 'none' }).click()
    await page.locator("#filter-platform").click()
    for (const client of clients) {
        await client.isVisible()
    }
});
