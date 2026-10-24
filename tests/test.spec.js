import {createUser} from './data/user'
import {test,expect} from '@playwright/test'

test("đăng nhập",async ({page})=>{
    const user=createUser()
    //let var cosnt
    console.log(user);
    await page.goto("https://vivainternational.vn/quan-tri/login");
    await page.locator("//input[@placeholder='ten@viva.vn']").fill(user.email);

    await page.pause();
})