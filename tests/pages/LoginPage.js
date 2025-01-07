const selectors = require('../selectors/selectors.json');

class LoginPage  {
  constructor(page) {
    this.page = page;
    this.emailField = selectors.loginPage.emailField;
    this.passwordField = selectors.loginPage.passwordField;
    this.loginButton = selectors.loginPage.loginButton;
  }

  async login(email, password) {
   

    await this.page.getByPlaceholder('Email address').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in', exact: true }).click();
  }
}

module.exports = LoginPage ;
