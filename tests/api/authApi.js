export class AuthApi {
    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://vivainternational.vn';
    }

    async login(email, password) {
        return await this.request.post(`${this.baseUrl}/api/admin/login`, {
            data: { email, password }
        });
    }

    async getAdminToken(email = process.env.EMAIL, password = process.env.PASSWORD) {
        const response = await this.login(email, password);
        const data = await response.json();
        return data.token;
    }
}
