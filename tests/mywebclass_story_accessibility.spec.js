const { test, expect } = require('@playwright/test');

test.describe('Accessibility tests', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('All images have alternative text', async () => {
    const images = await page.$$('img');
    for (const image of images) {
      const altText = await image.getAttribute('alt');
      expect(altText).toBeDefined();
    }
  });

  test('All form controls have associated labels', async () => {
    const formControls = await page.$$('button, input, select, textarea');
    for (const control of formControls) {
      const label = await control.getAttribute('aria-label');
      const id = await control.getAttribute('aria-labelledby');
      expect(label || id).toBeDefined();
    }
  });

  test('All links have descriptive text', async () => {
    const links = await page.$$('a');
    for (const link of links) {
      const text = await link.textContent();
      expect(text).not.toBeNull();
    }
  });
});
