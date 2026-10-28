import { chromium } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  static async launchChrome(options = {}) {
    return await chromium.launch({
      channel: 'chrome',
      headless: false,
      slowMo: 100,
      args: [
        '--window-position=0,0',
        '--window-size=768,840'
      ],
      ...options
    });
  }

  static async launchEdge(options = {}) {
    return await chromium.launch({
      channel: 'msedge',
      headless: false,
      slowMo: 100,
      args: [
        '--window-position=768,0',
        '--window-size=768,840'
      ],
      ...options
    });
  }
}
