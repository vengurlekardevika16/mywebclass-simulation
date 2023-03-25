const { chromium } = require('@playwright/test');
const { test, expect } = require('@playwright/test');

test.describe('SEO tests', () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('Has a title tag', async () => {
    const title = await page.title();
    expect(title).not.toBe('');
  });

  test('Has a meta description tag', async () => {
    const description = await page.$eval('meta[name="description"]', el => el.content);
    expect(description).not.toBe('');
  });

  test('Has a meta keywords tag', async () => {
    const keywords = await page.$eval('meta[name="keywords"]', el => el.content);
    expect(keywords).not.toBe('');
  });

  test('Has an Open Graph title tag', async () => {
    const ogTitle = await page.$eval('meta[property="og:title"]', el => el.content);
    expect(ogTitle).not.toBeTruthy();
  });

  test('Has an Open Graph description tag', async () => {
    const ogDescription = await page.$eval('meta[property="og:description"]', el => el.content);
    expect(ogDescription).not.toBeTruthy();
  });

  test('Has an Open Graph image tag', async () => {
    const ogImage = await page.$eval('meta[property="og:image"]', el => el.content);
    expect(ogImage).not.toBe('');
  });

  test('Has an Open Graph URL tag', async () => {
    const ogUrl = await page.$eval('meta[property="og:url"]', el => el.content);
    expect(ogUrl).not.toBeTruthy();
  });
});
