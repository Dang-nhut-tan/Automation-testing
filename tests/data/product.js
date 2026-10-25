// Dữ liệu sản phẩm cố định (Hardcoded Data)
import { faker } from "@faker-js/faker";
export const product = {
  name: "Cà phê Viva Espresso",
  description: "Cà phê rang xay nguyên chất thơm ngon đậm đà",
  sku: "VIVA-500",
  barcode: "8936012345678",
  originalPrice: "250000",
  salePrice: "200000",
  quantity: "50",
  tag: "coffee",
};

export function createProduct(overrides = {}) {
  const time = Date.now().toString();
  return {
    name: faker.commerce.name(),
    description: "Cà phê rang xay nguyên chất thơm ngon đậm đà",
    sku: "VIVA-500",
    barcode: "8936012345678",
    originalPrice: "250000",
    salePrice: "200000",
    quantity: "50",
    tag: "coffee",
    ...overrides,
  };
}

export function createProductInvalid(overrides = {}) {
  return createProduct({
    originalPrice: "-250000",
    ...overrides,
  });
}

export function createProductWithFake(overrides = {}) {
  const originalPrice = faker.number.int({
    min: 5000,
    max: 50000,
  });
  const salePrice = faker.number.int({
    min: 1000,
    max: originalPrice - 1000,
  });
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    sku: "VIVA-500",
    barcode: "8936012345678",
    originalPrice: originalPrice.toString(),
    salePrice: salePrice.toString(),
    quantity: "50",
    tag: "coffee",
    ...overrides,
  };
}
