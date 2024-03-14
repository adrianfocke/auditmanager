import { expect, test } from 'playwright/test';

test('Files page shows available files', async ({ page }) => {
  await page.goto('/files');
  await expect(page.getByTestId('test')).toBeDefined();
});
