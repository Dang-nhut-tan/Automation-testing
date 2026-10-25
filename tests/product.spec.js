import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/productPage';
import { LoginPage } from './pages/loginBage';
import {createProduct,createProductInvalid,createProductWithFake} from './data/product'

import dotenv from 'dotenv';
dotenv.config();

test.describe('Thêm sản phẩm', () => {
    /** @type {LoginPage} */
    let loginPage;

    /** @type {ProductPage} */
    let productPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);

        await loginPage.loginSucess();
        await productPage.navigateToProductPage();
    });

    test('thêm sản phẩm thành công', async () => {

        const product=createProductWithFake();
        console.log(product);
        await productPage.addProduct(product);

        // await expect(
        //     productPage.productNames.filter({ hasText: product.name })
        // ).toBeVisible();
    });
});
