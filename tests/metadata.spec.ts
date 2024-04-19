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

    // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
    test.fixme('about should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/about');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
    test.fixme('support should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/support');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
    test.fixme('try-matrix should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/try-matrix');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
    // Also lists are not structured corectly - https://dequeuniversity.com/rules/axe/4.9/list
    test.fixme('docs should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/docs/chat_basics/matrix-for-im/');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
    test.fixme('membership should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/membership');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test.describe('Ecosystem', () => {
        // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
        test.fixme('ecosystem should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('/ecosystem');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });

        test('ecosystem/clients should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('/ecosystem/clients');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });

        // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
        test.fixme('ecosystem/bridges should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('/ecosystem/bridges');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });

        // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
        test.fixme('ecosystem/servers should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('/ecosystem/servers');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });

        test('ecosystem/integrations should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('/ecosystem/integrations');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });

        // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
        test.fixme('ecosystem/sdks should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('/ecosystem/sdks');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });

        // This fails to various contrast related issues - https://dequeuniversity.com/rules/axe/4.9/color-contrast
        test.fixme('ecosystem/hosting should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('/ecosystem/hosting');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });
    });
});
