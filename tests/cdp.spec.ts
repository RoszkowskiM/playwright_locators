import { test, expect } from "@playwright/test";

test.describe("CDP communication", () => {
  test.afterEach("Kill browser", async ({ page }) => {
    await page.close();
  });

  test("emulate network throttle", async ({ context, page }) => {
    // Arrange:
    const tableSelector = "results-table";
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = "get-weather";
    const buttonLocator = page.getByTestId(buttonSelector);

    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send("Network.emulateNetworkConditions", {
      downloadThroughput: ((500 * 1000) / 8) * 0.8,
      latency: 400 * 5,
      offline: false,
      uploadThroughput: ((500 * 1000) / 8) * 0.8,
    });

    //   https://github.com/ChromeDevTools/devtools-frontend/blob/main/front_end/core/sdk/NetworkManager.ts
    //   const slow3GTargetLatency = 400;
    //   export const Slow3GConditions: Conditions = {
    //   key: PredefinedThrottlingConditionKey.SPEED_3G,
    //   title: i18nLazyString(UIStrings.slowG),
    //   i18nTitleKey: UIStrings.slowG,
    //   // ~500Kbps down
    //   download: 500 * 1000 / 8 * .8,
    //   // ~500Kbps up
    //   upload: 500 * 1000 / 8 * .8,
    //   // 400ms RTT
    //   latency: slow3GTargetLatency * 5,
    //   targetLatency: slow3GTargetLatency,
    // };

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    await page.waitForLoadState("domcontentloaded");

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();
  });

  test("script execution disabled", async ({ context, page }) => {
    // Arrange:
    const tableSelector = "results-table";
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = "get-weather";
    const buttonLocator = page.getByTestId(buttonSelector);

    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send("Emulation.setScriptExecutionDisabled", {
      value: true,
    });

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    await page.waitForLoadState("domcontentloaded");

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).not.toBeVisible();
  });

  test("emulate mobile view", async ({ context, page }) => {
    // Arrange:
    const tableSelector = "results-table";
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = "get-weather";
    const buttonLocator = page.getByTestId(buttonSelector);

    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send("Emulation.setDeviceMetricsOverride", {
      deviceScaleFactor: 1,
      mobile: true,
      height: 800,
      width: 400,
    });

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    await page.waitForLoadState("domcontentloaded");

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();
  });

  test("performance metrics", async ({ context, page }) => {
    // Arrange:
    const tableSelector = "results-table";
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = "get-weather";
    const buttonLocator = page.getByTestId(buttonSelector);

    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send("Performance.enable");

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    await page.waitForLoadState("domcontentloaded");

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();

    const metrics = await cdpSession.send("Performance.getMetrics");
    console.log(metrics);
  });
});
