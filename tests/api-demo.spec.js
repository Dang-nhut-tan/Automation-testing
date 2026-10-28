import { test, expect } from '@playwright/test';
import { AuthApi } from './api/authApi';
import { ProductApi } from './api/productApi';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL = process.env.EMAIL || 'quantri@vivainternational.vn';
const PASSWORD = process.env.PASSWORD || '8u5xJl1tzEz7bhXT0wQH';

test.describe('DEMO API TESTING TRONG PLAYWRIGHT (CHUẨN POM)', () => {

    // =========================================================================
    // NHÓM 1: API Testing (Kiểm thử trực tiếp API)
    // =========================================================================
    test.describe('Nhóm 1: API Testing', () => {
        test('1.1 Response Validation (Kiểm tra danh mục trả về 200 và có dữ liệu)', async ({ request }) => {
            const productApi = new ProductApi(request);

            // Gọi API trực tiếp qua API Object
            const response = await productApi.getCategories();
            expect(response.status()).toBe(200);

            const categories = await response.json();
            expect(Array.isArray(categories)).toBe(true);
            expect(categories.length).toBeGreaterThan(0);
        });

        test('1.2 Negative Testing (Đăng nhập sai mật khẩu trả về 401)', async ({ request }) => {
            const authApi = new AuthApi(request);

            // Đăng nhập với mật khẩu không đúng
            const response = await authApi.login(EMAIL, 'MatKhauSai123!');
            expect(response.status()).toBe(401);
        });
    });

    // =========================================================================
    // NHÓM 2: Authentication & Session Management (Quản lý đăng nhập & Token)
    // =========================================================================
    test.describe('Nhóm 2: Authentication & Session Management', () => {
        test('2.1 API Login & Token Management (Lấy JWT token thành công qua API)', async ({ request }) => {
            const authApi = new AuthApi(request);

            // Đăng nhập qua API cực nhanh mà không cần mở trình duyệt
            const response = await authApi.login(EMAIL, PASSWORD);
            expect(response.status()).toBe(200);

            const data = await response.json();
            // Xác nhận có trường token và token hợp lệ
            expect(data.token).toBeDefined();
            expect(data.token.length).toBeGreaterThan(20);
        });
    });

    // =========================================================================
    // NHÓM 3: API Mocking & Network Interception (Kiểm soát request/response khi test UI)
    // =========================================================================
    test.describe('Nhóm 3: API Mocking & Network Interception', () => {
        test('3.1 API Mocking (Chặn API và trả về dữ liệu giả lập)', async ({ page }) => {
            // Chặn request lấy danh mục và ép trả về 1 danh mục giả
            await page.route('**/api/category/show', async (route) => {
                const mockCategories = [
                    {
                        _id: 'mock_cat_001',
                        name: { vi: 'Danh Mục Mock Test Demo', en: 'Mock Category Demo' },
                        status: 'Show'
                    }
                ];
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(mockCategories)
                });
            });

            // Mở trang web để xem giao diện nhận dữ liệu Mock
            await page.goto('https://vivainternational.vn/');
            expect(page.url()).toContain('vivainternational.vn');
        });

        test('3.2 Error Simulation (Giả lập lỗi Server 500 khi gọi API)', async ({ page }) => {
            // Chặn API và giả lập máy chủ bị lỗi 500 Internal Server Error
            await page.route('**/api/products/**', async (route) => {
                await route.fulfill({
                    status: 500,
                    contentType: 'application/json',
                    body: JSON.stringify({ message: 'Internal Server Error' })
                });
            });

            // Mở trang web để kiểm tra UI khi server gặp lỗi
            await page.goto('https://vivainternational.vn/');
            expect(page.url()).toContain('vivainternational.vn');
        });
    });

    // =========================================================================
    // NHÓM 4: API & UI Integration Testing (Kết hợp API và UI trong cùng quy trình)
    // =========================================================================
    test.describe('Nhóm 4: API & UI Integration Testing', () => {
        test('4.1 API Setup -> UI Validation (Lấy dữ liệu từ API rồi kiểm tra hiển thị trên UI)', async ({ request, page }) => {
            const productApi = new ProductApi(request);

            // Bước 1 (API): Lấy danh sách danh mục từ backend
            const response = await productApi.getCategories();
            const categories = await response.json();
            const firstCategoryName = categories[0].name.vi;

            // Bước 2 (UI): Mở giao diện và kiểm tra tên danh mục xuất hiện
            await page.goto('https://vivainternational.vn/');
            await expect(page.getByText(firstCategoryName).first()).toBeVisible();
        });
    });

});
