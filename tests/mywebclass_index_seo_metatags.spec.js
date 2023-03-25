const { test, expect } = require('@playwright/test');

test('Verify meta tags on index page', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const charset = await page.$eval('meta[charset]', (element) => element.getAttribute('charset'));
  expect(charset).toBe('UTF-8');

  const viewport = await page.$eval('meta[name="viewport"]', (element) => element.getAttribute('content'));
  expect(viewport).toBe('width=device-width, initial-scale=1');

  const keywords = await page.$eval('meta[name="keywords"]', (element) => element.getAttribute('content'));
  expect(keywords).toBe('My Webclass Homepage');

  const author = await page.$eval('meta[name="author"]', (element) => element.getAttribute('content'));
  expect(author).toBe('Keith Williams');

  const description = await page.$eval('meta[name="description"]', (element) => element.getAttribute('content'));
  expect(description).toBe('A project to help educators integrate new technoliges into their teaching');

  const ogTitle = await page.$eval('meta[property="og:title"]', (element) => element.getAttribute('content'));
  expect(ogTitle).toBe('');

  const ogDescription = await page.$eval('meta[property="og:description"]', (element) => element.getAttribute('content'));
  expect(ogDescription).toBe('');

  const ogUrl = await page.$eval('meta[property="og:url"]', (element) => element.getAttribute('content'));
  expect(ogUrl).toBe('');
});
