import { expect, test } from 'playwright/test';

test('Home page redirects to /files', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/files');
});
