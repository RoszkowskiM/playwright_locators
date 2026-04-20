import { test, expect } from "@playwright/test";

test.describe("Test elements inside shadow dom", () => {
  test("interact with regular elements", async ({ page }) => {
    // Arrange:
    const inputSelector = "name-input";
    const buttonSelector = "submit";
    const resultsSelector = "results";
    const inputLocator = page.getByTestId(inputSelector);
    const buttonLocator = page.getByTestId(buttonSelector);
    const resultsLocator = page.getByTestId(resultsSelector);
    const inputValue = "John Doe";
    const expectedValue = `Hello, ${inputValue}!`;

    await page.goto("/practice/shadow-dom-0.html");

    // Act:
    await inputLocator.fill(inputValue);
    await buttonLocator.click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedValue);
  });

  test("interact with shadow dom elements", async ({ page }) => {
    // Arrange:
    const inputSelector = "shadow-name-input";
    const buttonSelector = "shadow-submit";
    const resultsSelector = "shadow-results";
    const inputLocator = page.getByTestId(inputSelector);
    const buttonLocator = page.getByTestId(buttonSelector);
    const resultsLocator = page.getByTestId(resultsSelector);

    const inputValue = "John Doe";
    const expectedValue = `Hello, ${inputValue}!`;

    await page.goto("/practice/shadow-dom-0.html");

    // Act:
    await inputLocator.fill(inputValue);
    await buttonLocator.click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedValue);
  });

  test("interact with nested shadow dom elements", async ({ page }) => {
    // Arrange:
    const inputSelector = "nested-shadow-name-input";
    const buttonSelector = "nested-shadow-submit";
    const resultsSelector = "nested-shadow-results";
    const inputLocator = page.getByTestId(inputSelector);
    const buttonLocator = page.getByTestId(buttonSelector);
    const resultsLocator = page.getByTestId(resultsSelector);

    const inputValue = "John Doe";
    const expectedValue = `Hello, ${inputValue}!`;

    await page.goto("/practice/shadow-dom-0.html");

    // Act:
    await inputLocator.fill(inputValue);
    await buttonLocator.click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedValue);
  });

  test.fail("interact with closed shadow dom elements", async ({ page }) => {
    // Arrange:
    const inputSelector = "closed-shadow-name-input";
    const buttonSelector = "closed-shadow-submit";
    const resultsSelector = "closed-shadow-results";
    const inputLocator = page.getByTestId(inputSelector);
    const buttonLocator = page.getByTestId(buttonSelector);
    const resultsLocator = page.getByTestId(resultsSelector);

    const inputValue = "John Doe";
    const expectedValue = `Hello, ${inputValue}!`;

    await page.goto("/practice/shadow-dom-0.html");

    // Act:
    await inputLocator.fill(inputValue, {timeout: 5000});
    await buttonLocator.click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedValue);
  });
});
