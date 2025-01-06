const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

test.describe('Login Feature', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto('https://example.com/login');
  });

  test('should log in with valid credentials', async ({ page }) => {
    await homePage.login('validUser', 'validPassword');
    await expect(page).toHaveURL('https://example.com/dashboard');
  });
});
