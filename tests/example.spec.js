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

test.only("Dăng nhập với email là khoảng trắng", async ({ page }) => {
  await page.goto("/")
  await page.getByRole('textbox', { name: 'Tìm sản phẩm (vd: cà phê phin' }).click();
  await page.pause()
  // await page.locator('xpath=/html/body/div/div[2]/div/div/main/div/form/input[1]').fill('')
  // await page.locator('//input[@name="password"]').type("8u5xJl1tzEz7bhXT0")
  // await page.getByRole('textbox', { name: '***************' }).fill('8u5xJl1tzEz7bhXT0wQH');
  // await page.getByRole('button', { name: 'Đăng Nhập', exact: true }).click();
  // await expect(page.getByText("Email là bắt buộc!")).toBeVisible()
});

test("Dăng nhập với email là khoảng trắng  ewsssdss", async ({ page }) => {
  await page.goto("/")
  await page.locator("//input").click()
  await page.pause()
});


