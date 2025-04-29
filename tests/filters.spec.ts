import { test, expect } from '@playwright/test';

// We want to make sure that the ecosystem page has all the filters and they are clickable
test('can select filters on ecosystem pages', async ({ page }) => {
    page.goto('/ecosystem/clients/');

    // Check if platform filter works
    await page.locator("#filter-platform").scrollIntoViewIfNeeded()
    await expect(page.locator("#filters-overlay")).toBeHidden()
    await expect(page.locator("#filter-platform-menu")).toBeHidden()
    // Wait a bit for the page to load
    await page.waitForTimeout(1000)
    await page.locator("#filter-platform").click({ force: true })
    await expect(page.locator("#filters-overlay")).toBeVisible()
    await expect(page.locator("#filter-platform-menu")).toBeVisible()

    // Check if platform filter can be used
    const allButton = page.getByRole('button', { name: 'all' })
    await allButton.scrollIntoViewIfNeeded()
    await allButton.click()
    // Firefox somehow is very odd?! It doesn't click the button on the first try
    await page.locator("#filter-platform").click({ clickCount: 2 })
    await expect(page.locator("#filters-overlay")).toBeHidden()
    await expect(page.locator("#filter-platform-menu")).toBeHidden()

    const clients = await page.locator("#all-clients").all()
    for (const client of clients) {
        await expect(client).toBeHidden()
    }

    // Firefox tries to skip it?!
    await page.locator("#filter-platform").click({ force: true })
    const noneButton = page.getByRole('button', { name: 'none' })
    await noneButton.scrollIntoViewIfNeeded()
    await noneButton.click()
    await page.locator("#filter-platform").click()
    for (const client of clients) {
        await expect(client).toBeVisible()
    }
});
