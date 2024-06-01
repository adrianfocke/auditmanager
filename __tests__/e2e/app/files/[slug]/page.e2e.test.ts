import { expect, test } from 'playwright/test';

test('File page exists', async ({ page }) => {
  await page.goto('/files/test');

  const textContent = await page.getByTestId('preview-container');

  await expect(textContent).toHaveText('TestCompanyfield_client_name');
});
