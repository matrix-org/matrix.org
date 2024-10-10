import { test, expect } from '@playwright/test';

test('can switch between the different SDK types', async ({ page }) => {
    await page.goto('/ecosystem/sdks/');

    // Client SDKs
    await page.locator("#sdk-purpose-selector > label:nth-child(2)").click()
    await expect(page.locator("#purpose-client-panel > p:nth-child(2)")).toHaveText("Client SDKs are used to develop clients humans will interact with. They handle\nall the Matrix heavy lifting and leave it up to the developer to implement a UI.")

    // Bot SDKs
    await page.locator("#sdk-purpose-selector > label:nth-child(4)").click()
    await expect(page.locator("#purpose-bot-panel > p:nth-child(2)")).toHaveText("Bot SDKs are used to develop bots no humans will interact with. They handle all the Matrix heavy lifting so the developer can focus on what the bot is actually useful for.")

    // Bridge SDKs
    await page.locator("#sdk-purpose-selector > label:nth-child(6)").click()
    await expect(page.locator("#purpose-bridge-panel > p:nth-child(2)")).toHaveText("Bridge SDKs are used to develop appservices meant to either connect a Matrix community to a third party chat platform, or to exchange data with another platform.")

});
