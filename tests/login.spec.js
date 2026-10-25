import { LoginPage } from "./pages/loginBage";
import { test, expect } from "@playwright/test";
import { loginTestCases } from "./data/login";
import dotenv from "dotenv";
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

test.describe("Đăng nhập", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    // Phải await việc điều hướng để trang tải xong trước khi test bắt đầu thao tác.
    // Nếu thiếu await, một lệnh goto khác có thể chạy chồng lên và gây net::ERR_ABORTED.
    await loginPage.navigateToLoginPage();
  });

  test("Đăng nhập thành công", async ({ page }) => {
    await test.step("Điền thông tin đăng nhập", async () => {
      await loginPage.fillEmail(EMAIL);
      await loginPage.fillPassword(PASSWORD);
    });

    await test.step("Gửi thông tin và kiểm tra đăng nhập thành công", async () => {
      await loginPage.clickLoginButton();
      await expect(page).toHaveURL(/\/quan-tri\/dashboard\/?$/);
    });
  });

  test("Đăng nhập thất bại, với email là khoảng trắng", async () => {
    await loginPage.fillEmail(" ");
    await loginPage.fillPassword("");
    await loginPage.clickLoginButton();
    await expect(loginPage.errorMessageEmail).toHaveText("Email là bắt buộc!");
  });

  for (const testCase of loginTestCases) {
    test(`${testCase.testName}`, async ({ page }) => {
      await loginPage.login(testCase.email, testCase.password);

      if (testCase.isSuccess) {
        // Assertion của Playwright là bất đồng bộ; thiếu await sẽ tạo lỗi sau khi test đã kết thúc.
        await expect(page).toHaveURL(/\/quan-tri\/dashboard\/?$/);
      }

      // Chỉ kiểm tra lỗi khi test case có khai báo thông báo mong đợi.
      // Không truyền null/undefined vào toHaveText vì Playwright không chấp nhận các giá trị đó.
      if (testCase.expectedEmailError) {
        await expect(loginPage.errorMessageEmail).toHaveText(
          testCase.expectedEmailError,
        );
      }
      if (testCase.expectedPasswordError) {
        await expect(loginPage.errorMessagePassword).toHaveText(
          testCase.expectedPasswordError,
        );
      }
    });
  }
});
