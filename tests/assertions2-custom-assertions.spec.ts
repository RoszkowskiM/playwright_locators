import { test } from "@playwright/test";
import { expect } from "../data/values.expect";

test.describe("Custom assertion example", () => {
  test("value is one of expected values", async ({ page }) => {
    // Arrange:
    const myValue = 2;
    const possibleValues = [1, 2, 3];

    // Assert:
    const isOnList = possibleValues.includes(myValue);
    expect(isOnList).toBeTruthy();
  });

  test("value is one of expected values - custom assertion", async ({
    page,
  }) => {
    // Arrange:
    const myValue = 2;
    const possibleValues = [1, 2, 3];

    // Assert:
    expect(myValue).toBeOneOfValues(possibleValues);
  });

  test("temperature in range", async ({ page }) => {
    // Arrange:
    const todaysTempTestId = "dti-temperature-today";
    const todaysTempLocator = page.getByTestId(todaysTempTestId);
    const minExpectedTemp = 20;
    const maxExpectedTemp = 40;

    // Act:
    page.goto("/practice/simple-weather-forecast.html");
    await expect(todaysTempLocator).toBeVisible();
    const tempValue = await todaysTempLocator.innerText();
    const tempValueAsNumber = parseInt(tempValue);

    // Assert:
    expect(tempValueAsNumber).toBeGreaterThanOrEqual(minExpectedTemp);
    expect(tempValueAsNumber).toBeLessThanOrEqual(maxExpectedTemp);
  });

  test("temperature in range - custom assertion", async ({ page }) => {
    // Arrange:
    const todaysTempTestId = "dti-temperature-today";
    const todaysTempLocator = page.getByTestId(todaysTempTestId);
    const minExpectedTemp = 20;
    const maxExpectedTemp = 40;

    // Act:
    page.goto("/practice/simple-weather-forecast.html");
    await expect(todaysTempLocator).toBeVisible();
    const tempValue = await todaysTempLocator.innerText();

    // Assert:
    expect(tempValue).toBeInRange(minExpectedTemp, maxExpectedTemp);
  });

  test("humidity in range (0%-100%)- homework", async ({ page }) => {
    // Arrange:
    const todaysHumidityTestId = "dti-humidity-today";
    const todaysHumidityLocator = page.getByTestId(todaysHumidityTestId);

    // Act:
    page.goto("/practice/simple-weather-forecast.html");
    await expect(todaysHumidityLocator).toBeVisible();
    const HumidityValue = await todaysHumidityLocator.innerText();

    // Assert:
    expect(HumidityValue).toBePercentageValue();
  });

  test("humidity in range (custom value)- homework", async ({ page }) => {
    // Arrange:
    const todaysHumidityTestId = "dti-humidity-today";
    const todaysHumidityLocator = page.getByTestId(todaysHumidityTestId);

    // Act:
    page.goto("/practice/simple-weather-forecast.html");
    await expect(todaysHumidityLocator).toBeVisible();
    const HumidityValue = await todaysHumidityLocator.innerText();

    // Assert:
    expect(HumidityValue).toBeCustomPercentageValue(-100, 200);
  });
});
