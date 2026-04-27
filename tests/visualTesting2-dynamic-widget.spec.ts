import { expect, test } from "@playwright/test";

test.describe("System monitoring - masking and mocking", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/visual-testing-v1B.html");
  });

  test.fail(
    "visually System Metrics widget with dynamic elements (will fail)",
    async ({ page }) => {
      // Arrange:
      const metricsWidget = page.getByTestId("static-widget");

      // Assert:
      await expect(metricsWidget).toHaveScreenshot();
    },
  );

  test("visually System Metrics widget with dynamic elements (masking)", async ({
    page,
  }) => {
    // Arrange:
    const metricsWidget = page.getByTestId("static-widget");
    const performanceChart = page.getByTestId("performance-chart");

    // Assert:
    await expect(metricsWidget).toHaveScreenshot({
      mask: [performanceChart],
    });
  });

  test("visually System Metrics widget with dynamic elements (mocking)", async ({
    page,
  }) => {
    // Arrange:
    const metricsWidget = page.getByTestId("static-widget");

    await page.route("/api/v1/data/random/numbers", async (route) => {
      await route.fulfill({ json: mockedChartData });
    });

    // Assert:
    await expect(metricsWidget).toHaveScreenshot();
  });
});

const mockedChartData = {
  data: [
    92.9609344893029, 64.16922455584148, 75.2489825804023, 37.56521391822233,
    59.09059749270467, 3.3591370352433993, 75.97241275967662,
    38.322727996960516, 36.10320374210691, 12.63125235129686, 73.69948890401258,
    85.73924089314407, 51.52179168526817, 2.6836318797997047,
    23.382169346567526, 3.6359541086184866, 31.618343028622792,
    0.9229348132952571, 78.17229233531971, 57.464333623667706,
    10.713276948452451, 38.8958865836145, 77.140807489918, 34.211564038448785,
    8.013043149480437, 70.34445053436632, 99.44479067889085, 16.904108038211216,
    40.18051925284663, 9.326396075885373, 48.0717196588176, 92.11084761427594,
    19.59175044090338, 72.76759851580263, 16.39771337848832, 42.836975592692,
    5.089311890820527, 22.000904161182834, 71.02211480857632,
    56.424839093029696, 98.4551269969468, 72.26843894668518, 83.27875017902157,
    58.70889643665366, 95.05788665041452, 17.524453504049482, 19.20419029720146,
    19.260115312979174, 12.262285479549382, 24.603270910488657,
  ],
};
