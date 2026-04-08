import { test } from "@playwright/test";
import { expect } from "../data/locator.expect";

test.describe("Custom web first assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/not-present-elements-1.html");
  });
  test("input max length", async ({ page }) => {
    // Arrange
    const inputTestId = "dti-input";
    const inputLocator = page.getByTestId(inputTestId);
    const expectedLength = 64;

    // Assert
    await expect(inputLocator).toHaveAttribute(
      "maxlength",
      String(expectedLength),
    );
  });

  test("input max length (custom expect)", async ({ page }) => {
    // Arrange
    const inputTestId = "dti-input";
    const inputLocator = page.getByTestId(inputTestId);
    const expectedLength = 64;

    // Assert
    await expect(inputLocator).toHaveMaxLength(expectedLength);
  });
});