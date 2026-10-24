import { BasePage } from './basePage';

export class ProductPage extends BasePage {
    urlProductPage = 'https://vivainternational.vn/quan-tri/products';

    constructor(page) {
        super(page);
        this.addProductButton = page
            .getByRole('button', { name: 'Thêm Sản Phẩm' })
            .first();
        this.productForm = page.locator('form').last();
        this.nameOfProduct = this.productForm.getByRole('textbox', {
            name: 'Tên Sản Phẩm'
        });
        this.desribeProduct = this.productForm.getByRole('textbox', {
            name: 'Mô Tả Sản Phẩm'
        });
        this.danhMucInput = this.productForm.getByRole('textbox', {
            name: 'Chọn danh mục'
        });
        this.loaiSanPham = this.productForm.getByTitle('Cà phê', {
            exact: true
        });
        this.giaGoc = this.productForm.getByRole('spinbutton', {
            name: 'Giá gốc'
        });
        this.giaKhuyenMai = this.productForm.getByRole('spinbutton', {
            name: 'Giá khuyến mãi'
        });
        this.skuInput = this.productForm.getByRole('textbox', {
            name: 'SKU Sản Phẩm'
        });
        this.barcodeInput = this.productForm.getByRole('textbox', {
            name: 'Mã Vạch Sản Phẩm'
        });
        this.quantityInput = this.productForm.getByRole('spinbutton', {
            name: 'Số Lượng Sản Phẩm'
        });
        this.tagInput = this.productForm.getByRole('textbox', {
            name: /Thẻ sản phẩm/
        });
        this.submitProductButton = this.productForm.getByRole('button', {
            name: 'Thêm Sản Phẩm',
            exact: true
        });
        this.productNames = page.getByRole('heading', { level: 2 });
    }

    async navigateToProductPage() {
        await this.navigateTo(this.urlProductPage);
    }

    async openAddProductForm() {
        await this.addProductButton.click();
    }

    async fillNameOfProduct(name) {
        await this.nameOfProduct.fill(name);
    }

    async fillMoTaSanPham(description) {
        await this.desribeProduct.fill(description);
    }

    async clickLoaiCafe() {
        await this.loaiSanPham.click();
    }

    async fillGiaGoc(giaGoc) {
        await this.giaGoc.fill(giaGoc);
    }

    async fillGiaKhuyenMai(giaKhuyenMai) {
        await this.giaKhuyenMai.fill(giaKhuyenMai);
    }

    async fillProductDetails(product) {
        await this.fillNameOfProduct(product.name);
        await this.fillMoTaSanPham(product.description);
        await this.skuInput.fill(product.sku);
        await this.barcodeInput.fill(product.barcode);
        await this.clickLoaiCafe();
        await this.fillGiaGoc(product.originalPrice);
        await this.fillGiaKhuyenMai(product.salePrice);
        await this.quantityInput.fill(product.quantity);

        if (product.tag) {
            await this.tagInput.fill(product.tag);
            await this.tagInput.press('Enter');
        }
    }

    async submitProduct() {
        await this.submitProductButton.click();
    }

    async addProduct(product) {
        await this.openAddProductForm();
        await this.fillProductDetails(product);
        await this.submitProduct();
    }
}
