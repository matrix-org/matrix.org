import { test, expect } from '@playwright/test';

// We want to make sure that the hover has all children visible and is clickable
test('can select hovermenu', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Ecosystem').hover();
    const elements = [
        page.locator(".section-submenu > a:nth-child(1)"),
        page.locator(".section-submenu > a:nth-child(2)"),
        page.locator(".section-submenu > a:nth-child(3)"),
        page.locator(".section-submenu > a:nth-child(4)"),
        page.locator(".section-submenu > a:nth-child(5)"),
        page.locator(".section-submenu > a:nth-child(6)"),
    ]

    await expect(page.locator(".section-submenu")).toBeVisible()
    for (const element of elements) {
        await expect(element).toBeVisible()

        // Ensure the elements itself can be hovered
        await element.hover()
        await expect(page.locator(".section-submenu")).toBeVisible()
        await expect(element).toBeVisible()
    }
});
