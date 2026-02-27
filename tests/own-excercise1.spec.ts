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
    const eventLocator = page.getByTestId("dti-tooltip-element");

    const resultsLocator = page.getByTestId("dti-results");
    const expectedMessage = "Mouse over event occurred!";

    // Act
    await page.goto("practice/simple-elements.html");
    await eventLocator.hover();

    // Assert
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
});

test.describe("Actions on text box", () => {
  test("Textbox fill and clear", async ({ page }) => {
    // Arrange
    const txtboxLocator = page.locator("textarea");
    const resultsLocator = page.getByTestId("dti-results");
    const expectedMessage = "Textarea value changed to: Sweet filling";
    const expectedMessageAfterClear = "Textarea value changed to:";

    // Act
    await page.goto("practice/simple-elements-no-ids.html");
    await txtboxLocator.fill("Sweet filling");
    await txtboxLocator.blur();
    await expect(resultsLocator).toHaveText(expectedMessage);
    await txtboxLocator.clear();
    await txtboxLocator.blur();

    // Assert
    await expect(resultsLocator).toHaveText(expectedMessageAfterClear);
  });

  test("Textbox fill (slow typing)", async ({ page }) => {
    // Arrange
    const txtboxLocator = page.locator("textarea");
    const resultsLocator = page.getByTestId("dti-results");
    const expectedMessage = "Textarea value changed to: Sweet filling";

    // Act
    await page.goto("practice/simple-elements-no-ids.html");
    await txtboxLocator.pressSequentially("Sweet filling", { delay: 500 });
    await txtboxLocator.blur();

    // Assert
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test.describe("Actions on dropdowns", () => {
    test("Select option", async ({ page }) => {
      // Arrange
      const dropdownLocator = page.getByRole("combobox").nth(2);
      const resultsLocator = page.getByTestId("dti-results");
      const expectedMessage = "Selected option: option2 (Third one!)";

      // Act
      await page.goto("practice/simple-multiple-elements-no-ids.html");
      // await dropdownLocator.selectOption("option2");
      // await dropdownLocator.selectOption({label: "Option 2"});
      await dropdownLocator.selectOption({ index: 1 });

      // Assert
      await expect(resultsLocator).toHaveText(expectedMessage);
    });

    test("Get dropdown values", async ({ page }) => {
      // Arrange
      const dropdownLocator = page.getByRole("combobox").nth(2);

      // Act
      await page.goto("practice/simple-multiple-elements-no-ids.html");
      const dropdwnElemList = await dropdownLocator.allTextContents();

      // const dropdwnElemList = await dropdownLocator.all();
      // const optionsArr = [];
      // for (let ele of dropdwnElemList) {
      //   const eleText = await ele.textContent();
      //   if (eleText) {
      //     optionsArr.push(eleText);
      //   }
      // }

      // Assert
      // console.log(`list of options: ${optionsArr}`);

      console.log(`list of options: ${dropdwnElemList}`);
    });
  });
});
