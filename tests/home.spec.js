import {test} from '@playwright/test';

test("Kiểm thử giao diện",async ({page})=>{
    await page.goto("https://vivainternational.vn/");
})
