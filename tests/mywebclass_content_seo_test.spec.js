import { test, expect } from '@playwright/test';

test.describe('SEO tests for MyWebClass.org content page', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/content.html');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Content includes target keywords', async () => {
    const keywords = ['MyWebClass.org'];
    const pageContent = await page.textContent('body');
    const hasKeywords = keywords.every(keyword => pageContent.includes(keyword));
    expect(hasKeywords).toBeTruthy();
  });

  test('Meta tags are present and correct', async () => {
    const pageTitle = await page.title();
    const pageMetaDescription = await page.$eval('meta[name="description"]', el => el.content);
    const pageMetaKeywords = await page.$eval('meta[name="keywords"]', el => el.content);
    const hasMetaTags = Boolean(pageTitle && pageMetaDescription && pageMetaKeywords);
    expect(hasMetaTags).toBeTruthy();
  });

  test('URL has proper structure', async () => {
    const pageUrl = page.url();
    const pageUrlPathname = new URL(pageUrl).pathname;
    const hasProperUrlStructure = Boolean(pageUrl && !pageUrl.includes('%20') && pageUrlPathname === '/content.html');
    expect(hasProperUrlStructure).toBeTruthy();
  });

  test('Page load time is within acceptable limits', async () => {
    const pageLoadTime = await page.evaluate(() => window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart);
    const isFastLoading = pageLoadTime <= 5000;
    expect(isFastLoading).toBeTruthy();
  });
});
