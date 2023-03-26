const { test, expect } = require('@playwright/test');

test('Check alt text on image', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const img = await page.$('img');
  const alt = await img.getAttribute('alt');
  expect(alt).not.toBeNull();
})

test('Check label element for newsletter', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const label = await page.$('label[for="newsletter1"]');

  expect(label).not.toBeNull();
})


test('should have aria-current attribute on current page link', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const currentLink = await page.waitForSelector('a[aria-current="page"]');
  const ariaCurrentAttr = await currentLink.getAttribute('aria-current');
  expect(ariaCurrentAttr).toBe('page');
});
