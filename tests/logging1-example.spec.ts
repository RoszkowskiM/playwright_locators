import { test, expect } from "@playwright/test";
import { logDebug, logInfo } from "../logger/logger-api";

test.describe("WeatherApp", () => {
  test.beforeEach(async ({ page }) => {
    logInfo("opening page WeatherApp.");
    await page.goto("practice/weatherApp/");
    logDebug('>>> TEST <<<');
  });

  test("has Weather App title", async ({ page }) => {
    const expectedTitle = "🦎 GAD - Weather App";

    // Assert
    logDebug("Checking title.", expectedTitle);
    await expect(page).toHaveTitle(new RegExp(expectedTitle));
  });

  test("get Login / Register link", async ({ page }) => {
    const expectedTitle = "Login / Register";

    // Assert
    logDebug("Checking title.", expectedTitle);
    await expect(page.getByRole("link", { name: expectedTitle })).toBeVisible();
  });

  test("get Weather Date header", async ({ page }) => {
    const expectedTitle = "Weather Date";

    // Assert
    logDebug("Checking title.", expectedTitle);
    await expect(
      page.getByRole("heading", { name: expectedTitle }),
    ).toBeVisible();
  });

  test("get Current Temperature header", async ({ page }) => {
    const expectedTitle = "Current Temperature";

    // Assert
    logDebug("Checking title.", expectedTitle);
    await expect(
      page.getByRole("heading", { name: expectedTitle }),
    ).toBeVisible();
  });

  test("get Current Wind Speed header", async ({ page }) => {
    const expectedTitle = "Current Wind Speed";

    // Assert
    logDebug("Checking title.", expectedTitle);
    await expect(
      page.getByRole("heading", { name: expectedTitle }),
    ).toBeVisible();
  });

  test("get Select a date input", async ({ page }) => {
    const expectedTitle = "Select a date";

    // Assert
    logDebug("Checking title.", expectedTitle);
    await expect(
      page.getByRole("textbox", { name: expectedTitle }),
    ).toBeVisible();
  });
});
