const selectors = require('../selectors/selectors.json');

class HomePage {
  constructor(page) {
    this.page = page;
    this.usernameField = selectors.loginPage.usernameField;
    this.passwordField = selectors.loginPage.passwordField;
    this.loginButton = selectors.loginPage.loginButton;
  }

  async login(username, password) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }
}

module.exports = HomePage;
