import { expect, test } from "@playwright/test";

test.describe("System monitoring", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/visual-testing-v0.html");
  });

  test("visually System Metrics - widget full page", async ({ page }) => {
    // Assert:
    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  test("visually System Metrics - only widget", async ({ page }) => {
    // Arrange:
    const metricsWidget = page.getByTestId("static-widget");

    // Assert:
    await expect(metricsWidget).toHaveScreenshot();
  });

  test("visually System Metrics widget - whole widget + element", async ({ page }) => {
    // Arrange:
    const metricsWidget = page.getByTestId("static-widget");
    const performanceChart = page.getByTestId("performance-chart");

    // Assert:
    await expect.soft(metricsWidget).toHaveScreenshot();
    await expect.soft(performanceChart).toHaveScreenshot();
  });
});
