const selectors = require('../selectors/selectors.json');

class ReportsPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToHistory() {
    await this.page.getByTestId('link-button-Reports').click();
    await this.page.locator('div').filter({ hasText: /^34\/100Overview History Last Assessment: 29\/12\/2024 11:34:53$/ }).getByRole('link').nth(1).click();
    await this.page.getByRole('rowgroup').locator('div').filter({ hasText: '29/12/2024 11:34:53ekslabs.' }).nth(1).click();
  }

  async validateWAFDetails() {
    const wafURL = await this.page.locator('xpath=//*[@id="cym-app"]/div[11]/div[1]/div[2]/div[2]/div[2]/div/div/div[4]/div[2]').textContent();
    const status = await this.page.getByTestId('assessment-status-report').textContent();
    const score = parseInt(await this.page.locator('[class*="score-text"]').textContent(), 10);

    return { wafURL, status, score };
  }

  async generateAndDownloadCSV(expectedContent) {
    // Click to generate the CSV
    await this.page.locator('xpath=//*[@id="cym-app"]/div[11]/div[1]/div[2]/div[2]/div[2]/div/div/div[14]/div[1]/div/button/span[1]').click();
    await this.page.locator('xpath=//*[@id="cym-app"]/div[11]/div[1]/div[2]/div[2]/div[2]/div/div/div[14]/div[1]/div/div/div[2]/div[2]/button').click();

    // Click the download icon
    await this.page.getByTestId('DownloadIcon').click();
    await this.page.getByTestId('download-report-button-6776a8c659c47dcb1b7ff6bb').click();

    // Wait for the download to complete
    const downloadPromise = this.page.waitForEvent('download');
    const download = await downloadPromise;

    // Save the downloaded file to a specific path
    const filePath = await download.path();
    console.log(`File downloaded to: ${filePath}`);

    // Validate CSV Content
    const isValidCSV = await this.validateCSVContent(filePath, expectedContent);
    return isValidCSV;
}

async validateCSVContent(filePath, expectedContent) {
    const fs = require('fs').promises;

    try {
        // Read the CSV file
        const csvContent = await fs.readFile(filePath, 'utf-8');

        // Check if it contains the expected text
        return csvContent.includes(expectedContent);
    } catch (error) {
        console.error(`Error reading CSV file: ${error.message}`);
        return false;
    }
}
}

module.exports = ReportsPage;
