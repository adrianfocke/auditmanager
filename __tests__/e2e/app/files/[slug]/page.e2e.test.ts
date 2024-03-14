import { expect, test } from 'playwright/test';

test('File page exists', async ({ page }) => {
  await page.goto('/files/test');
  await expect(page).toBeDefined();
});
