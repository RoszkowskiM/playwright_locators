import { test, expect } from "@playwright/test";

test.describe("Locator filters and nested table", () => {
  // https://playwright.dev/docs/locators#locator-operators

  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-nested-table-v1.html");
  });

  test("Click selected button using getByRole", async ({ page }) => {
    // we expect to get the following output on console:
    // You clicked the button! (row 2-1-2)

    // Arrange:
    const expectedMessage = "You clicked the button! (row 2-1-2)";
    const resultsId = "dti-results";
    const firstRowText = "Row 2.0";
    const secondRowText = "Row 1";
    const thirdRowText = "Row 2";
    const resultsLocator = page.getByTestId(resultsId);

    const buttonLocator = page
      .getByRole("row", { name: firstRowText })
      .getByRole("row", { name: secondRowText })
      .getByRole("row", { name: thirdRowText })
      .getByRole("button");
    // Act:
    await buttonLocator.click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test("Click Z buttons using filter", async ({ page }) => {
    // we expect to get the following output on console:
    // You clicked the button! (row 1-3)
    // You clicked the button! (row 2-3)
    // You clicked the button! (row 3-3)

    // Arrange:
    const resultsId = "dti-results";
    const resultsLocator = page.getByTestId(resultsId);
    const buttonLocators = page
      .getByRole("row")
      .filter({ hasText: "Z", hasNotText: "Y" })
      .getByRole("button");
    const numberOfButtons = await buttonLocators.count();
    const expectedMessages: { [key: number]: string } = {
      0: "You clicked the button! (row 1-3)",
      1: "You clicked the button! (row 2-3)",
      2: "You clicked the button! (row 3-3)",
    };

    // Act:
    for (let index = 0; index < numberOfButtons; index++) {
      // Act:
      await buttonLocators.nth(index).click();
      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessages[index]);
    }

    // Assert:
  });
});
