import { test, expect } from '@playwright/test';

test('Register user - common controls', async ({ page }) => {

  await page.goto(
    'https://material.playwrightvn.com/01-xpath-register-page.html'
  );

  // =========================
  // 1. TEXTBOX - fill()
  // =========================
  await page
    .getByRole('textbox', { name: 'Username:' })
    .fill('tan');

  await page
    .getByRole('textbox', { name: 'Email:' })
    .fill('tan128345@gmail.com');

  await page
    .getByRole('radio', { name: 'Male', exact: true })
    .check();

  await page
    .getByRole('checkbox', { name: 'Reading' })
    .check();

  await page
    .getByRole('checkbox', { name: 'Traveling' })
    .check();


  await page
    .getByLabel('Interests:')
    .selectOption('science');

  await page
    .getByLabel('Country:')
    .selectOption('canada');


  await page
    .getByRole('textbox', { name: 'Date of Birth:' })
    .fill('2026-10-02');

  await page
    .getByLabel('Profile Picture:')
    .setInputFiles('test-data/avatar.png');


  await page
    .getByRole('textbox', { name: 'Biography:' })
    .fill('Playwright automation tester');

  await page
    .getByRole('slider', { name: 'Rate Us:' })
    .fill('10');

  // =========================
  // 9. COLOR INPUT - fill()
  // =========================
  await page
    .locator('#favcolor')
    .fill('#646f6f');

  // =========================
  // 10. CHECKBOX
  // =========================
  await page
    .getByRole('checkbox', { name: 'Subscribe' })
    .check();

  await page
    .getByRole('checkbox', { name: 'Enable Feature:' })
    .check();

  // =========================
  // 11. BUTTON - click()
  // =========================
  await page
    .getByRole('button', { name: 'Register' })
    .click();

  // =========================
  // 12. ASSERTION
  // =========================
  await expect(
    page.getByRole('row', {
      name: /tan tan128345@gmail\.com/
    })
  ).toBeVisible();

  // =========================
  // 13. DIALOG
  // =========================
  page.once('dialog', async dialog => {
    console.log('Dialog:', dialog.message());
    await dialog.accept();
  });

  await page
    .getByRole('button', { name: 'Delete' })
    .click();
});