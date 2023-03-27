const { test, expect } = require('@playwright/test');

test.describe('SEO Testing', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  test('Page title should be present', async () => {
    const pageTitle = await page.title();
    expect(pageTitle).not.toBe('');
  });

  test('Page should contain meta description tag', async () => {
    const metaTag = await page.$('head meta[name="description"]');
    expect(metaTag).not.toBe(null);
  });

  test('Page should contain meta keywords tag', async () => {
    const metaTag = await page.$('head meta[name="keywords"]');
    expect(metaTag).not.toBe(null);
  });

  test('Page should contain Open Graph meta tags', async () => {
    const metaTitle = await page.$('head meta[property="og:title"]');
    const metaDescription = await page.$('head meta[property="og:description"]');
    const metaImage = await page.$('head meta[property="og:image"]');
    const metaUrl = await page.$('head meta[property="og:url"]');
    expect(metaTitle).not.toBe(null);
    expect(metaDescription).not.toBe(null);
    expect(metaImage).not.toBe(null);
    expect(metaUrl).not.toBe(null);
  });
});
