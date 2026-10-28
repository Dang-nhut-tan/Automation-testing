import { test, expect, request as playwrightRequest } from '@playwright/test';
import { AuthApi } from './api/authApi';
import { ProductApi } from './api/productApi';
import { BasePage } from './pages/basePage';
import { ShopPage } from './pages/shopPage';
import { CheckoutPage } from './pages/checkoutPage';
import {
    flashSaleProductTemplate,
    createCustomer
} from './data/order';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL = process.env.EMAIL || 'quantri@vivainternational.vn';
const PASSWORD = process.env.PASSWORD || '8u5xJl1tzEz7bhXT0wQH';

test.describe('TEST DATA MANAGEMENT & UI CONCURRENCY ORDER (CHROME & EDGE SPLIT SCREEN)', () => {
    let apiContext;
    let authApi;
    let productApi;
    let adminToken;
    let flashSaleProductId;
    let flashSaleSlug;

    test.beforeAll(async () => {
        apiContext = await playwrightRequest.newContext();
        authApi = new AuthApi(apiContext);
        productApi = new ProductApi(apiContext);

        adminToken = await authApi.getAdminToken(EMAIL, PASSWORD);

        const uniqueSuffix = Date.now();
        const productData = {
            ...flashSaleProductTemplate,
            title: {
                vi: `${flashSaleProductTemplate.title.vi} (${uniqueSuffix})`,
                en: `${flashSaleProductTemplate.title.en} (${uniqueSuffix})`
            }
        };

        const createRes = await productApi.createProduct(productData, adminToken);
        expect(createRes.status()).toBe(200);

        const createdProduct = await createRes.json();
        flashSaleProductId = createdProduct._id;
        flashSaleSlug = createdProduct.slug;

        console.log(`\n================================================================`);
        console.log(`📦 ĐÃ SETUP SẢN PHẨM: ${productData.title.vi}`);
        console.log(`🎯 TỒN KHO THIẾT LẬP: stock = 1 (CHỈ CÒN ĐÚNG 1 SUẤT DUY NHẤT)`);
        console.log(`================================================================\n`);
    });

    test('1 Khách hàng dùng Chrome, 1 Khách hàng dùng Edge chia nửa màn hình cùng mua 1 sản phẩm', async () => {
        const chromeBrowser = await BasePage.launchChrome();
        const edgeBrowser = await BasePage.launchEdge();

        const userAContext = await chromeBrowser.newContext({ viewport: null });
        const userBContext = await edgeBrowser.newContext({ viewport: null });

        const pageA = await userAContext.newPage();
        const pageB = await userBContext.newPage();

        const shopPageA = new ShopPage(pageA);
        const checkoutPageA = new CheckoutPage(pageA);

        const shopPageB = new ShopPage(pageB);
        const checkoutPageB = new CheckoutPage(pageB);

        const customerA = createCustomer({ user_info: { name: 'Khách A (Google Chrome)' } });
        const customerB = createCustomer({ user_info: { name: 'Khách B (Microsoft Edge)' } });

        await Promise.all([
            shopPageA.openProduct(flashSaleSlug),
            shopPageB.openProduct(flashSaleSlug)
        ]);

        await pageA.waitForTimeout(3000);

        await Promise.all([
            (async () => {
                await shopPageA.addToCartAndCheckout();
                await checkoutPageA.fillShippingInfo(customerA);
            })(),
            (async () => {
                await shopPageB.addToCartAndCheckout();
                await checkoutPageB.fillShippingInfo(customerB);
            })()
        ]);

        await Promise.all([
            checkoutPageA.confirmOrder(),
            checkoutPageB.confirmOrder()
        ]);

        await pageA.waitForTimeout(5000);

        await chromeBrowser.close();
        await edgeBrowser.close();
    });

    test.afterAll(async () => {
        if (flashSaleProductId && adminToken && productApi) {
            await productApi.deleteProduct(flashSaleProductId, adminToken);
        }
        if (apiContext) {
            await apiContext.dispose();
        }
    });
});
