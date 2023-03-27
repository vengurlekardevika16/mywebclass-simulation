const { chromium } = require('@playwright/test');
import { test, expect } from '@playwright/test'


test.describe('MyWebClass.org', () => {
  let browser, page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/index.html');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should have the correct page title', async () => {
    expect(await page.title()).toBe('MyWebClass.org');
  });

  test('should display the correct heading', async () => {
    const heading = await page.$eval('h1', (el) => el.innerText);
    expect(heading).toBe('Transform your teaching');
  });

  test('should have a "Start Here" button', async () => {
    const button = await page.$('button:has-text("Start Here")');
    expect(button).not.toBeNull();
    expect(await button.innerText()).toContain('Start Here');
  });

  test('should have a navigation menu with a link to the Content Template page', async () => {
    const menu = await page.$('nav');
    expect(menu).toBeTruthy();
    const link = await menu.$('a[href="content.html"]');
    expect(link).toBeTruthy();
  });

  test('should have a footer with a link to the Privacy Policy page', async () => {
    const footer = await page.$('footer');
    expect(footer).toBeTruthy();
    const link = await footer.$('a[href="privacy.html"]');
    expect(link).toBeTruthy();
    expect(await link.innerText()).toBe('Privacy Policy');
  });

  test('should have a newsletter subscription form', async () => {
    const form = await page.$('form');
    expect(form).toBeTruthy();
    const input = await form.$('input[type="text"]');
    expect(input).toBeTruthy();
    const button = await form.$('button[type="button"]');
    expect(button).toBeTruthy();
    expect(await button.innerText()).toBe('Subscribe');
  });
});
