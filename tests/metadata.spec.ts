import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" Matrix.org
    await expect(page).toHaveTitle(/Matrix.org/);

    // Ensure that the different subpages have their name in the title as well
    await page.goto('blog')

    // Expect a title "to contain" Blog
    await expect(page).toHaveTitle(/Blog/);
});


test.describe('accessibility', () => {
    test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
    // It also fails in some cases due to semantically incorrect header order - https://dequeuniversity.com/rules/axe/4.9/heading-order
    test.fixme('blog should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/blog');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
