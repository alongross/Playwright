const fs = require('fs');

async function validateCSV(filePath, expectedText) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.includes(expectedText);
}

module.exports = validateCSV;
