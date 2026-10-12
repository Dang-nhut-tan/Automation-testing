const { test, expect } = require('@playwright/test');

const ADMIN_URL = 'https://viethuy2.ngoctinco.com/quan-tri';
const API_URL = 'https://dataviethuy.ngoctinco.com';
const EMAIL = process.env.ADMIN_EMAIL || 'anhtran1m83@gmail.com';
const PASSWORD = process.env.ADMIN_PASSWORD || 'Nqshndc@123';

let token;
let articleId;

test.describe('Admin Article - Demo hooks', () => {
  // Chạy một lần trước tất cả test.
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${API_URL}/api/admins/auth-with-password`, {
      data: { identity: EMAIL, password: PASSWORD },
    });

    token = (await response.json()).token;
  });

  // Chạy trước mỗi test.
  test.beforeEach(async ({ page }) => {
    await page.goto(`${ADMIN_URL}/#/login`);
    await page.locator('input[type="email"]').fill(EMAIL);
    await page.locator('input[name="password"]').fill(PASSWORD);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/#\/dashboard/);
  });

  test('tạo bài viết mới', async ({ page }) => {
    //login
    const title = `[TEST] Bài viết ${Date.now()}`;

    await page.goto(`${ADMIN_URL}/#/noi-dung/tin-tuc/moi`);
    await page.locator('input[name="title"]').fill(title);
    await page.locator('.tiptap.ProseMirror').fill('Nội dung bài viết demo.');

    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes('/api/collections/news/records') &&
          res.request().method() === 'POST'
      ),
      page.getByRole('button', { name: 'Lưu', exact: true }).click(),
    ]);

    articleId = (await response.json()).id;
    await expect(page.locator('.MuiSnackbar-root')).toContainText('Đã lưu tin tức.');
    //xóa bài viết
  });

  // Chạy sau mỗi test.
  test.afterEach(async ({ request }) => {
    if (!articleId) return;

    await request.delete(`${API_URL}/api/collections/news/records/${articleId}`, {
      headers: { Authorization: token },
    });
  });
});
