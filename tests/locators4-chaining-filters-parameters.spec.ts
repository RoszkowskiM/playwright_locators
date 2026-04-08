import { test, expect } from "@playwright/test";

test.describe("Locator filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-multiple-elements-no-ids.html");
  });

  test.describe("Finding element - different approaches", () => {
    test("Single button click using options", async ({ page }) => {
      // Arrange:
      const elementRole = "button";
      const resultsId = "dti-results";
      const expectedMessage = "You clicked the button!";
      const elementText = "Click me!";

      const buttonLocator = page.getByRole(elementRole, { name: elementText });
      const resultsLocator = page.getByTestId(resultsId);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });

    test("Single button click (using filter and hasText)", async ({ page }) => {
      // Arrange:
      const elementRole = "button";
      const resultsId = "dti-results";
      const expectedMessage = "You clicked the button!";
      const elementText = "Click me!";

      const buttonLocator = page
        .getByRole(elementRole)
        .filter({ hasText: elementText });
      const resultsLocator = page.getByTestId(resultsId);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });
  });

  test.describe("Buttons in table - different approaches", () => {
    test("Single button click (chained getBy)", async ({ page }) => {
      // Arrange:
      const elementRole = "button";
      const parentRole = "row";
      const parentText = "Row 2";
      const resultsId = "dti-results";
      const expectedMessage = "You clicked the button! (row 2)";

      const buttonLocator = page
        .getByRole(parentRole, { name: parentText })
        .getByRole(elementRole);
      const resultsLocator = page.getByTestId(resultsId);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });

    test("Single button click (using filter and has)", async ({ page }) => {
      // Arrange:
      const elementRole = "button";
      const parentRole = "row";
      const parentText = "Row 2";
      const resultsId = "dti-results";
      const expectedMessage = "You clicked the button! (row 2)";

      const buttonLocator = page
        .getByRole(parentRole)
        .filter({ has: page.getByText(parentText) })
        .getByRole(elementRole);
      const resultsLocator = page.getByTestId(resultsId);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });
  });
});
