// @ts-check
import { test, expect } from '@playwright/test';

test.skip("Dăng nhập thành công", async ({ page }) => {
  await page.goto("https://vivainternational.vn/quan-tri/login")
  await page.locator('xpath=/html/body/div/div[2]/div/div/main/div/form/input[1]').fill('quantri@vivainternational.vn')
  await page.locator('//input[@name="password"]').type("8u5xJl1tzEz7bhXT0")
  await page.getByRole('textbox', { name: '***************' }).fill('8u5xJl1tzEz7bhXT0wQH');
  await page.getByRole('button', { name: 'Đăng Nhập', exact: true }).click();
  await expect(page).toHaveTitle("Viva International — Quản trị")
  //regex
  //kiểm tra đầu số vn 03 05 09
  await expect(page).toHaveURL(/\/dashboard/)


});

test("Dăng nhập với email là khoảng trắng", async ({ page }) => {
  await page.goto("/quan-tri/login")
  const emailInput = await page.locator('xpath=/html/body/div/div[2]/div/div/main/div/form/input[1]');
  await emailInput.fill('');
  await emailInput.fill('rưhigiowiouhroghuiorgoh')
  await emailInput.clear()
  // press
  await emailInput.press('Tab');
  await page.locator('//input[@name="password"]').type("8u5xJl1tzEz7bhXT0")
  await page.getByRole('textbox', { name: '***************' }).fill('8u5xJl1tzEz7bhXT0wQH');
  const loginButton = await page.getByRole('button', { name: 'Đăng Nhập', exact: true });
  // await loginButton.dblclick();
  await loginButton.click({
    button: 'right',
  });
  await expect(page.getByText("Email là bắt buộc!")).toBeVisible()
});

test("Dăng nhập với email là khoảng trắng  ewsssdss", async ({ page }) => {
  // login
  await page.goto("/")
  await page.locator("//input").click()
  await page.pause()
  //xóa bài đăng
});

//input[@value="male"]

test.only("đăng nhập", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html")
  await page.locator("//input[@value='male']").check()
  await page.locator('//select[@id="country"]').selectOption('uk')
  await page.locator('//select[@id="country"]').selectOption({
    index:2
  })
  await page.pause()
})


