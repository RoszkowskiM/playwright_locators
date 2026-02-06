import { test, expect } from "@playwright/test";

test.describe("Locator lists", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-multiple-elements-no-ids.html");
  });

  test("All buttons on page", async ({ page }) => {
    // Arrange
    const elementRole = "button";
    const buttonLocator = page.getByRole(elementRole);
    const expectedElementsCount = 7;

    // Act
    console.log(await buttonLocator.count());

    // Assert
    await expect(buttonLocator).toHaveCount(expectedElementsCount);
  });

  test("All buttons on page - negative case", async ({ page }) => {
    // Arrange
    // const elementRole = "button";
    const resultsId = "#results";
    const expectedMessage = "You clicked the button! (Third one!)";
    const buttonLocator = page.getByRole("button", { name: "Click here!" });
    const resultsLocator = page.locator(resultsId);

    // Error: locator.click: Error: strict mode violation: getByRole('button') resolved to 7 elements:
    // 1) <button id="btnPractice" class="button-primary" data-testid="open-practice">Main Practice Page</button> aka getByTestId('open-practice')
    // 2) <button class="my-button" onclick="buttonOnClick()">Click me!</button> aka getByRole('button', { name: 'Click me!' })
    // 3) <button class="my-button" onclick="buttonOnClick('(Second one!)')">Click me too!</button> aka getByRole('button', { name: 'Click me too!' })
    // 4) <button class="my-button" onclick="buttonOnClick('(Third one!)')">Click here!</button> aka getByRole('button', { name: 'Click here!' })
    // 5) <button class="my-button" onclick="buttonOnClick('(row 1)')">Click!</button> aka getByRole('row', { name: 'Row 1 X Click!' }).getByRole('button')
    // 6) <button class="my-button" onclick="buttonOnClick('(row 2)')">Click!</button> aka getByRole('row', { name: 'Row 2 Y Click!' }).getByRole('button')
    // 7) <button class="my-button" onclick="buttonOnClick('(row 3)')">Click!</button> aka getByRole('row', { name: 'Row 3 Z Click!' }).getByRole('button')

    // Act
    await buttonLocator.click();

    // Assert
    console.log(await resultsLocator.textContent());
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test("action on nth button", async ({ page }) => {
    // Arrange
    const elementRole = "button";
    const resultsId = "#results";
    const expectedMessage = "You clicked the button! (Second one!)";
    const buttonLocator = page.getByRole(elementRole);
    const resultsLocator = page.locator(resultsId);

    // Act
    await buttonLocator.nth(2).click();

    // Assert
    console.log(await resultsLocator.textContent());
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test("action on multiple buttons", async ({ page }) => {
    // Arrange
    const elementRole = "button";
    const elementText = "Click!";
    const resultsId = "#results";
    const buttonLocator = page.getByRole(elementRole, { name: elementText });
    const resultsLocator = page.locator(resultsId);

    // Act
    const numberOfElements = await buttonLocator.count();
    for (let i = 0; i < numberOfElements; i++) {
      await buttonLocator.nth(i).click();
      console.log(await resultsLocator.textContent());
    }

    const allButtonLocators = await buttonLocator.all();
    for (const button of allButtonLocators) {
      await button.click();
      console.log(await resultsLocator.textContent());
    }
    // Assert
    // some assert
  });
});
