import { test, expect } from "@playwright/test";

test.describe("Actions on a button", () => {
  test("Enter key on a button", async ({ page }) => {
    // Arrange
    const btnLocator = page.getByRole("button", { name: "Click me!" });
    const resultsLocator = page.getByTestId("dti-results");
    const expectedMessage = "You clicked the button!";

    // Act
    await page.goto("practice/simple-elements.html");
    await btnLocator.press("Enter");

    // Assert
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test("Double click on a button", async ({ page }) => {
    // Arrange
    const btnLocator = page
      .getByRole("row", { name: "Button Click me! Click me!", exact: true })
      .getByRole("button");
    const resultsLocator = page.locator("#results-container");
    const expectedMessage = "Button Click me! clicked 3!";

    // Act
    await page.goto("practice/custom-elements.html");
    // await btnLocator.dblclick();
    await btnLocator.click({ clickCount: 3 });

    // Assert
    await expect.soft(resultsLocator).toHaveText(expectedMessage);
    // await expect.soft(page.getByRole('button', { name: 'Clicked 3!' })).toHaveCSS("color", "rgb(255, 0, 0)");
    await expect
      .soft(page.getByRole("button", { name: "Clicked 3!" }))
      .toHaveAttribute("style", /color:\s*red/);
  });

  test("Hover over an event", async ({ page }) => {
    // Arrange
    // const eventLocator = page.getByText('Hoover mouse here!');
    const eventLocator = page.getByTestId('dti-tooltip-element');
    
    const resultsLocator = page.getByTestId("dti-results");
    const expectedMessage = "Mouse over event occurred!";

    // Act
    await page.goto("practice/simple-elements.html");
    await eventLocator.hover();

    // Assert
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
});
