import { test, expect } from '@playwright/test';

// We want to make sure that the hover has all children visible and is clickable
test('can select hovermenu', async ({ page, isMobile }) => {
    test.skip(isMobile, "Test runs only on desktop");
    await page.goto('/');

    await page.getByLabel('Ecosystem').hover();
    const submenu = page.locator(".section-wrap:has(label:has-text('Ecosystem')) .section-submenu");

    const elements = await submenu.all();

    await expect(submenu).toBeVisible()
    for (const element of elements) {
        await expect(element).toBeVisible()

        // Ensure the elements itself can be hovered
        await element.hover()
        await expect(submenu).toBeVisible()
        await expect(element).toBeVisible()
    }
});

// We want to make sure that the menu is clickable
test('can select mobile menu', async ({ page, isMobile }) => {
    test.skip(!isMobile, "Test runs only on mobile");
    await page.goto('/');
    await page.locator(".dropdown-button").click();

    await page.getByLabel('Ecosystem').click();
    const submenu = page.locator(".section-wrap:has(label:has-text('Ecosystem')) .section-submenu");

    const elements = await submenu.all();

    await expect(submenu).toBeVisible()
    for (const element of elements) {
        await expect(element).toBeVisible()
    }
});
