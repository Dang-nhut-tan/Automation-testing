import {Page} from '@playwright/test'

export class BasePage
{
    constructor(page)
    {
        this.page=page;
    }

    async navigateTo(url)
    {
        await this.page.goto(url);
    }
}