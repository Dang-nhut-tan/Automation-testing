import { faker } from '@faker-js/faker';

export const flashSaleProductTemplate = {
    title: {
        vi: '🔥 FLASH SALE: Cà phê Viva [CHỈ CÒN ĐÚNG 1 SUẤT DUY NHẤT]',
        en: '🔥 FLASH SALE: Viva Coffee [ONLY 1 ITEM LEFT]'
    },
    description: {
        vi: '⚠️ KHO CHỈ CÒN ĐÚNG 1 SUẤT SẢN PHẨM DUY NHẤT - AI BẤM MUA TRƯỚC SẼ ĐƯỢC!',
        en: 'Limited stock: exactly 1 item in stock.'
    },
    prices: {
        originalPrice: 80000,
        price: 80000
    },
    stock: 1,
    status: 'show'
};

export function createCustomer(overrides = {}) {
    const { user_info = {}, ...restOverrides } = overrides;

    return {
        user_info: {
            name: faker.person.fullName(),
            contact: `09${faker.string.numeric(8)}`,
            email: faker.internet.email().toLowerCase(),
            address: faker.location.streetAddress(),
            city: 'Hồ Chí Minh',
            ...user_info
        },
        shippingOption: 'Giao hàng tận nơi',
        paymentMethod: 'COD',
        ...restOverrides
    };
}

export function createOrderPayload(customer, productId) {
    return {
        user_info: customer.user_info,
        cart: [
            {
                _id: productId,
                title: 'Cà phê Flash Sale Giới Hạn',
                price: 80000,
                quantity: 1
            }
        ],
        shippingOption: customer.shippingOption,
        paymentMethod: customer.paymentMethod
    };
}
