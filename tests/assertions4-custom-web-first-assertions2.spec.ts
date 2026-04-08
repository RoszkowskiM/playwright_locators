import { test } from "@playwright/test";
import { expect } from "../data/temperatures.expect";

test.describe("Custom web first assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-weather-forecast-delay.html");
  });

  test("temperature in range - custom assertion", async ({ page }) => {
    // Arrange:
    const todaysTempTestId = "dti-temperature-today";
    const todaysTempLocator = page.getByTestId(todaysTempTestId);
    const minExpectedTemp = -20;
    const maxExpectedTemp = 40;

    // Act:
    await expect(todaysTempLocator).toBeVisible();
    const tempValue = await todaysTempLocator.innerText();

    // Assert:
    expect(tempValue).toBeInRange(minExpectedTemp, maxExpectedTemp);
  });

  test("temperature in range - custom web first assertion", async ({
    page,
  }) => {
    // Arrange:
    const todaysTempTestId = "dti-temperature-today";
    const todaysTempLocator = page.getByTestId(todaysTempTestId);
    const minExpectedTemp = -20;
    const maxExpectedTemp = 40;

    // Assert:
    await expect(todaysTempLocator).elementValueToBeInRange(
      minExpectedTemp,
      maxExpectedTemp,
    );
  });
});
