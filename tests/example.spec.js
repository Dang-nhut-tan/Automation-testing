// @ts-check
import { test, expect } from '@playwright/test';

test("Dăng nhập thành công", async ({ page }) => {
  await page.goto("https://vivainternational.vn/quan-tri/login")
  await page.locator('xpath=/html/body/div/div[2]/div/div/main/div/form/input[1]').fill('quantri@vivainternational.vn')
  await page.locator('//input[@name="password"]').type("8u5xJl1tzEz7bhXT0")
  await page.getByRole('textbox', { name: '***************' }).fill('8u5xJl1tzEz7bhXT0wQH');
  await page.getByRole('button', { name: 'Đăng Nhập', exact: true }).click();
  await expect(page).toHaveTitle("ưefhuiwfhiuwfiuhw")

});