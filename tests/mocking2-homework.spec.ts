import { test, expect } from "@playwright/test";

test.describe("Test User Data", () => {
  test("Check total price", async ({ page }) => {
    // Arrange:
    const totalCostTestId = "total-cost";
    const totalCostLocator = page.getByTestId(totalCostTestId);
    const shippingCostTestId = "shipping-cost";
    const shippingCostLocator = page.getByTestId(shippingCostTestId);
    const subtotalSumTestId = "total-subtotal-price";
    const subtotalSumLocator = page.getByTestId(subtotalSumTestId);
    const taxCostTestId = "tax-cost";
    const taxCostLocator = page.getByTestId(taxCostTestId);

    await page.route(
      "/api/v1/data/random/ecommerce-shopping-cart-simple",
      async (route) => {
        console.log(mockedApiResponse);
        await route.fulfill({ json: mockedApiResponse });
      },
    );
    const mockedTotalPrice = `1983.60`;
    const mockedShipingCost = `165.30`;
    const mockedSubtotalSum = `1653`;
    const mockedTaxCost = `165.30`;
    // Act
    await page.goto("/practice/random-shopping-cart-v1.html");

    // Assert
    await expect.soft(totalCostLocator).toHaveText(mockedTotalPrice);
    await expect.soft(shippingCostLocator).toHaveText(mockedShipingCost);
    await expect.soft(subtotalSumLocator).toHaveText(mockedSubtotalSum);
    await expect.soft(taxCostLocator).toHaveText(mockedTaxCost);
  });

  test("Invalid product quantity and subtotal", async ({ page }) => {
    // Arrange:
    const totalCostTestId = "total-cost";
    const totalCostLocator = page.getByTestId(totalCostTestId);
    const shippingCostTestId = "shipping-cost";
    const shippingCostLocator = page.getByTestId(shippingCostTestId);
    const subtotalSumTestId = "total-subtotal-price";
    const subtotalSumLocator = page.getByTestId(subtotalSumTestId);
    const taxCostTestId = "tax-cost";
    const taxCostLocator = page.getByTestId(taxCostTestId);

    await page.route(
      "/api/v1/data/random/ecommerce-shopping-cart-simple",
      async (route) => {
        console.log(mockedInvalidApiResponse);
        await route.fulfill({ json: mockedInvalidApiResponse });
      },
    );
    const mockedTotalPrice = `1803.60`;
    const mockedShipingCost = `150.30`;
    const mockedSubtotalSum = `1503`;
    const mockedTaxCost = `150.30`;
    // Act
    await page.goto("/practice/random-shopping-cart-v1.html");

    // Assert
    await expect.soft(totalCostLocator).toHaveText(mockedTotalPrice);
    await expect.soft(shippingCostLocator).toHaveText(mockedShipingCost);
    await expect.soft(subtotalSumLocator).toHaveText(mockedSubtotalSum);
    await expect.soft(taxCostLocator).toHaveText(mockedTaxCost);
  });

  test.fail("Missing product data (will fail with NaN)", async ({ page }) => {
    // Arrange:
    const totalCostTestId = "total-cost";
    const totalCostLocator = page.getByTestId(totalCostTestId);
    const shippingCostTestId = "shipping-cost";
    const shippingCostLocator = page.getByTestId(shippingCostTestId);
    const subtotalSumTestId = "total-subtotal-price";
    const subtotalSumLocator = page.getByTestId(subtotalSumTestId);
    const taxCostTestId = "tax-cost";
    const taxCostLocator = page.getByTestId(taxCostTestId);

    await page.route(
      "/api/v1/data/random/ecommerce-shopping-cart-simple",
      async (route) => {
        console.log(mockedMissingApiResponse);
        await route.fulfill({ json: mockedMissingApiResponse });
      },
    );
    const mockedTotalPrice = `1803.60`;
    const mockedShipingCost = `150.30`;
    const mockedSubtotalSum = `1503`;
    const mockedTaxCost = `150.30`;
    // Act
    await page.goto("/practice/random-shopping-cart-v1.html");

    // Assert
    await expect.soft(totalCostLocator).toHaveText(mockedTotalPrice);
    await expect.soft(shippingCostLocator).toHaveText(mockedShipingCost);
    await expect.soft(subtotalSumLocator).toHaveText(mockedSubtotalSum);
    await expect.soft(taxCostLocator).toHaveText(mockedTaxCost);
  });
});

const mockedApiResponse = {
  cartItems: [
    {
      product: {
        id: 15,
        name: "Coffee Maker",
        price: 50,
        icon: "☕",
      },
      quantity: 3,
      subtotal: 150,
    },
    {
      product: {
        id: 31,
        name: "Toothpaste",
        price: 3,
        icon: "🪥",
      },
      quantity: 1,
      subtotal: 3,
    },
    {
      product: {
        id: 12,
        name: "Camera",
        price: 500,
        icon: "📷",
      },
      quantity: 3,
      subtotal: 1500,
    },
  ],
};

const mockedInvalidApiResponse = {
  cartItems: [
    {
      product: {
        id: 15,
        name: "Coffee Maker",
        price: 50,
        icon: "☕",
      },
      quantity: 0,
      subtotal: 0,
    },
    {
      product: {
        id: 31,
        name: "Toothpaste",
        price: 3,
        icon: "🪥",
      },
      quantity: 1,
      subtotal: 3,
    },
    {
      product: {
        id: 12,
        name: "Camera",
        price: 500,
        icon: "📷",
      },
      quantity: 3,
      subtotal: 1500,
    },
  ],
};

const mockedMissingApiResponse = {
  cartItems: [
    {
      product: {
      },
      quantity: 3,
      subtotal: 150,
    },
    {
      product: {
        id: 31,
        name: "Toothpaste",
        price: 3,
        icon: "🪥",
      },
      quantity: 1,
      subtotal: 3,
    },
    {
      product: {
        id: 12,
        name: "Camera",
        price: 500,
        icon: "📷",
      },
      quantity: 3,
      subtotal: 1500,
    },
  ],
};
