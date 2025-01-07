const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ReportsPage = require('../pages/ReportsPage');
const validateCSV = require('../utils/validateCSV');

test('Cymulate Task - Validate Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const reportsPage = new ReportsPage(page);

  // Navigate to login page
  await page.goto('https://app.cymulate.com/login', { waitUntil: 'networkidle' });

  // Login
  await loginPage.login('candidate_user@cymulate1.com', 'ZzAa!@#$4321');

  // Navigate to Reports -> Web Application Firewall -> History
  await reportsPage.navigateToHistory();

  // Validate WAF Details
  const { wafURL, status, score } = await reportsPage.validateWAFDetails();
  expect(wafURL).toBe('https://ekslabs.cymulatedev.com');
  expect(status).toBe('Completed');
  expect(score).toBeGreaterThan(20);

  // Generate and download CSV
  const isValidCSV = await reportsPage.generateAndDownloadCSV('ekslabs.cymulatedev.com');

  // Validate that the CSV contains the expected content
  expect(isValidCSV).toBe(true);
  
});
