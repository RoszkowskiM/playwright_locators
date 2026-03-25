import { test, expect } from "@playwright/test";
import { assert } from "node:console";

test.describe("Web-first assertions and auto-waiting", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/not-displayed-elements-1.html");
  });

  test("Auto-waiting for elements for action", async ({ page }) => {
    // Arrange:
    const buttonRole = "button";
    const expectedMessage = "You clicked the button!";
    const resultsTestId = "dti-results";
    const buttonLocator = page.getByRole(buttonRole, { name: "Click me!" });
    const resultsLocator = page.getByTestId(resultsTestId);
    // Act:
    await buttonLocator.click();
    // Assert:
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test("Button visibility (Web-first assertions)", async ({ page }) => {
    // Arrange:
    const buttonRole = "button";
    const buttonLocator = page.getByRole(buttonRole, { name: "Click me!" });

    // const elementVisibility = await buttonLocator.isVisible();
    // console.log(elementVisibility);
    // expect(elementVisibility).toBe(true);

    // Assert:
    await expect(buttonLocator).toBeVisible();
  });
});
