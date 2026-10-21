import {LoginPage} from './pages/loginBage';
import {test,expect} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


const EMAIL=process.env.EMAIL;
const PASSWORD=process.env.PASSWORD;

test.describe("Đăng nhập",()=>{
    let loginPage;
    test.beforeEach(async({page})=>{
         loginPage=new LoginPage(page);
    })
    //let const var

test("Đăng nhập thành công",async({page})=>{
   await test.step("Điều hướng đến trang đăng nhập",async()=>{
    await loginPage.navigateToLoginPage();
    })
    await test.step("Điền thông tin đăng nhập",async()=>{
    await loginPage.fillEmail(EMAIL);
    await loginPage.fillPassword(PASSWORD);
    })
})

test("Đăng nhập thất bại,với email là khoảng trắng",async({page})=>{
        test.step("Điều hướng đến trang đăng nhập",async()=>{
             await loginPage.navigateToLoginPage();
        })

        await loginPage.fillEmail(" ");
        await loginPage.fillPassword("");
        await loginPage.clickLoginButton();
        await expect(loginPage.errorMessageEmail).toHaveText("Email là bắt buộc!");
})

})
