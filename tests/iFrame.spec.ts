import { test, expect } from "@playwright/test";

test.describe("Test iframes", () => {
  test("submit data in iframe", async ({ page }) => {
    await page.goto("/practice/iframe-0.html");

    // Arrange:
    const inputSelector = "name-input";
    const submitButtonSelector = "submit";
    const resultsSelector = "results";

    const iframe = page.getByTestId("dti-simple-iframe").contentFrame();

    const inputLocator = iframe.getByTestId(inputSelector);
    const submitButtonLocator = iframe.getByTestId(submitButtonSelector);
    const resultsLocator = iframe.getByTestId(resultsSelector);

    const inputText = "John Doe";
    const expectedText = `Hello, ${inputText}!`;

    // Act:
    await inputLocator.fill("John Doe");
    await submitButtonLocator.click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedText);
  });

  test("submit registration data in nested iframe", async ({ page }) => {
    await page.goto("/practice/iframe-4.html");

    // Arrange:
    const usernameInputSelector = "username-input";
    const passwordInputSelector = "password-input";
    const submitButtonSelector = "register-submit";
    const resultsSelector = "register-results";

    const outerFrame = page.getByTestId("dti-simple-iframe").contentFrame();
    const innerFrame = outerFrame.locator("#inner-iframe").contentFrame();

    const usernameInputLocator = innerFrame.getByTestId(usernameInputSelector);
    const passwordInputLocator = innerFrame.getByTestId(passwordInputSelector);
    const submitButtonLocator = innerFrame.getByTestId(submitButtonSelector);
    const resultsLocator = innerFrame.getByTestId(resultsSelector);

    const username = "John Doe";
    const password = "12345678";

    const expectedText = `Registration successful! Username: ${username}, Age: 18, Password: ********`;

    // Act:
    await usernameInputLocator.fill(username);
    await passwordInputLocator.fill(password);
    await submitButtonLocator.click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedText);
  });
});
