const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/privacy.html')
  await page.getByRole('button', { name: 'Agree', exact: true }).click()

  // Retrieve the privacyPolicyAgreed item from local storage
  const privacyPolicyAgreed = await page.evaluate(() => {
    return localStorage.getItem('privacyPolicyAgreed')
  })

  // Check if privacyPolicyAgreed is set in local storage
  expect(privacyPolicyAgreed).toBeTruthy()
 })

test('MyWebClass.org has aria-label attribute on elements', async ({ page }) => {
  await page.goto('http://localhost:3000/privacy.html');

  const labeledElements = await page.$$('[aria-label]');
  for (let i = 0; i < labeledElements.length; i++) {
    const ariaLabel = await labeledElements[i].getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  }
});
