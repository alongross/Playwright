const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  use: {
    headless: false, // Set to false for headed mode
    browserName: 'chromium', // Use 'chromium' for Chrome
    channel: 'chrome', // Ensure Chrome is used as the browser
    trace: 'on', // Enable trace for debugging
  },
});
