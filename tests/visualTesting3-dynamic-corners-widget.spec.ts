import { expect, test } from "@playwright/test";

test.describe("System monitoring", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/visual-testing-v0B.html");
  });

  test("visually System Metrics widget with changing style - pixels tolerance", async ({
    page,
  }) => {
    // Arrange:
    const metricsWidget = page.getByTestId("static-widget");

    // Assert:
    await expect(metricsWidget).toHaveScreenshot({ maxDiffPixels: 200 });
  });

  test("visually System Metrics widget with changing style - ratio tolerance", async ({
    page,
  }) => {
    // Arrange:
    const metricsWidget = page.getByTestId("static-widget");

    // Assert:
    await expect(metricsWidget).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});
