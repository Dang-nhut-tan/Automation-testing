import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  urlLoginPage = "https://vivainternational.vn/quan-tri/login";
  EMAIL=process.env.EMAIL;
  PASS=process.env.PASSWORD;
  constructor(page) {
    super(page);
    this.emailInput = page.getByPlaceholder("ten@viva.vn");
    this.passWord = page.locator('[name="password"]');
    this.loginButton =  page.getByRole('button', { name: 'Đăng Nhập' , exact: true });
    this.errorMessageEmail =   page.getByText('Email là bắt buộc!', { exact: true })
  }

  async navigateToLoginPage(urlLoginPage) {
    await this.navigateTo(this.urlLoginPage);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }
  async fillPassword(password) {
    await this.passWord.fill(password);
  }
  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
  async loginSucess()
  {
    await this.navigateToLoginPage();
    await this.fillEmail(this.EMAIL);
    await this.fillPassword(this.PASS);
    await Promise.all([
      this.page.waitForURL(url => !url.pathname.endsWith('/login')),
      this.clickLoginButton()
    ]);
  }
}

