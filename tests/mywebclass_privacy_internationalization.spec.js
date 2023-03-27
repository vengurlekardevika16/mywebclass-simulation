import { test, expect } from '@playwright/test'

test.describe('MyWebClass.org internationalization', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('http://localhost:3000/privacy.html')
  })

  test.afterEach(async () => {
    await page.close()
  })

  test('Should display the site in "en" when the "Accept-Language" header is set to "en"', async () => {
    // Set the Accept-Language header and navigate to the website
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en' })
    await page.goto('http://localhost:3000/privacy.html')

    // Check if the lang attribute of the HTML tag is set to "en"
    const langAttribute = await page.getAttribute('html', 'lang')
    expect(langAttribute).toBe('en', 'The lang attribute of the HTML tag is not set to "en".')

    // Performing additional checks for the "en" language version of the website here
    const pageTitle = await page.innerText('title')
    expect(pageTitle).toContain('Privacy and Cookies Policy', 'The page title is incorrect.')

    const headerText = await page.innerText('h1#title')
    expect(headerText).toContain('Privacy and Cookies Policy', 'The header text is incorrect.')


  })
})
