const { test, expect } = require('@playwright/test');

test.describe('Hooks', () => {
  test.beforeAll(async () => {
    console.log('Before all');
  });

  test.afterAll(async () => {
    console.log('After all');
  });

  test.beforeEach(async () => {
    //đăng nhập trước khi chạy test
    console.log('Before each');
  });

  test.afterEach(async () => {
    console.log('After each');
  });

  test('demo hooks run', async ({ page }) => {
    //login
    console.log('Test 1');
    //xóa bài
  });

   test('demo hooks run 2', async ({ page }) => {
    //login
    console.log('Test 2');
    //xóa bài
  });

     test('demo hooks run 3', async ({ page }) => {
    //login
    console.log('Test 3');
    //xóa bài
  });

});

