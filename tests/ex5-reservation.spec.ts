import { test, expect } from "@playwright/test";

test.describe("Reservation tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-reservation-v1.html");
  });

  test.describe("Food reservation", () => {
    test("Single button click using options", async ({ page }) => {
      // Arrange:
      const buttonRole = "button";
      const checkboxRole = "checkbox";
      const rowRole = "row";
      const reservationDate = "23.10.2024";
      const featureText = "Food";
      const resultsId = "dti-results";
      const checkoutButtonName = "Checkout";
      const expectedMessage = `Reservation for ${reservationDate} with features: ${featureText} for total price: 150$`;

      const checkboxLocator = page
        .getByRole(rowRole)
        .filter({ hasText: featureText })
        .getByRole(checkboxRole);
      const reserveButtonLocator = page
        .getByRole(rowRole, { name: reservationDate })
        .getByRole(buttonRole);
      const checkoutButtonLocator = page.getByRole(buttonRole, {
        name: checkoutButtonName,
      });
      const resultsLocator = page.getByTestId(resultsId);

      // Act:
      await checkboxLocator.check();
      await reserveButtonLocator.click();
      await checkoutButtonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });
  });
});
