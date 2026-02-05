import { test, expect } from "@playwright/test";

test.describe("Finding checkbox", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("practice/simple-elements.html");
  });

  test("Different methods to locate checkbox element", async ({ page }) => {
    // Arrange
    const elementLocatorByDataTestId = page.getByTestId("dti-checkbox");
    const elementLocatorByRole = page.getByRole("checkbox");
    const elementLocatorById = page.locator("#id-checkbox");
    const elementLocatorByClass = page.locator(".my-checkbox");
    const elementLocatorByCustomAttr = page.locator("[ckbx='val1']");

    // Act
    await expect.soft(elementLocatorByDataTestId).toBeVisible();
    await expect.soft(elementLocatorByRole).toBeVisible();
    await expect.soft(elementLocatorById).toBeVisible();
    await expect.soft(elementLocatorByClass).toBeVisible();
    await expect.soft(elementLocatorByCustomAttr).toBeVisible();
  });
});
