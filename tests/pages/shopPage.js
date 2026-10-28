import { BasePage } from './basePage';

export class ShopPage extends BasePage {
    constructor(page) {
        super(page);
        this.addToCartButton = page.getByRole('button', { name: 'Thêm vào giỏ' });
        this.proceedToCheckoutButton = page.getByRole('button', { name: /Tiến hành thanh toán/i });
    }

    async openProduct(slug) {
        await this.navigateTo(`https://vivainternational.vn/product/${slug}`);
    }

    async addToCartAndCheckout() {
        await this.addToCartButton.click();
        await this.proceedToCheckoutButton.click();
    }
}

