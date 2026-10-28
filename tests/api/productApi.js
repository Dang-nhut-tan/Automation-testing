// tests/api/productApi.js
// API Object Model cho Sản phẩm & Danh mục (Dựa theo Swagger Viva International)

export class ProductApi {
    /**
     * @param {import('@playwright/test').APIRequestContext} request
     */
    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://vivainternational.vn';
    }

    /**
     * Lấy danh sách sản phẩm từ hệ thống
     * Swagger: GET /api/products/show
     */
    async getProducts() {
        return await this.request.get(`${this.baseUrl}/api/products/show`);
    }

    /**
     * Lấy danh sách danh mục sản phẩm
     * Swagger: GET /api/category/show
     */
    async getCategories() {
        return await this.request.get(`${this.baseUrl}/api/category/show`);
    }

    /**
     * Tạo mới sản phẩm (yêu cầu quyền Admin Bearer Token)
     * Swagger: POST /api/products/add
     */
    async createProduct(productData, token) {
        return await this.request.post(`${this.baseUrl}/api/products/add`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: productData
        });
    }

    /**
     * Xóa sản phẩm theo ID (yêu cầu quyền Admin Bearer Token)
     * Swagger: DELETE /api/products/{id}
     */
    async deleteProduct(productId, token) {
        return await this.request.delete(`${this.baseUrl}/api/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
