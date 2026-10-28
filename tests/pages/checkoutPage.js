import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.nameInput = page.getByPlaceholder('Nguyễn Văn A');
        this.contactInput = page.getByPlaceholder('0901 234 567');
        this.emailInput = page.getByPlaceholder('email@vidu.com — để nhận thông báo đơn hàng');
        this.addressInput = page.getByPlaceholder('Số nhà, tên đường');
        this.wardInput = page.getByPlaceholder('Phường Bến Nghé');
        this.citySelect = page.locator('select[name="city"]');
        this.confirmOrderButton = page.getByRole('button', { name: 'Xác Nhận Đơn Hàng' });
    }

    async fillShippingInfo(customer) {
        await this.nameInput.fill(customer.user_info.name);
        await this.contactInput.fill(customer.user_info.contact);
        await this.emailInput.fill(customer.user_info.email);
        await this.addressInput.fill(customer.user_info.address);
        await this.wardInput.fill('Phường Bến Nghé');
        await this.citySelect.selectOption('TP. Hồ Chí Minh');
    }

    async confirmOrder() {
        await this.confirmOrderButton.click();
    }
}

