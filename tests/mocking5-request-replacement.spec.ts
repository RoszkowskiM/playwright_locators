import { test, expect } from "@playwright/test";

test.describe("Replace requests", () => {
  test("modify whole request data", async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = "get-weather";
    const commentSelector = "comment";
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const commentLocator = page.getByTestId(commentSelector);
    const expectedCity = "Hongkong";

    await page.goto("/practice/random-weather-v2.html");

    await page.route("/api/v1/data/random/weather-simple", async (route) => {
      await route.continue({
        postData: { city: expectedCity, futuredays: "3", days: 1 },
      });
    });

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(commentLocator).toContainText(expectedCity);
  });

  test("modify part of request data", async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = "get-weather";
    const commentSelector = "comment";
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const commentLocator = page.getByTestId(commentSelector);
    const expectedCity = "Hongkong";

    await page.goto("/practice/random-weather-v2.html");

    await page.route(
      "/api/v1/data/random/weather-simple",
      async (route, request) => {
        console.log(request.postData());
        const body = JSON.parse(request.postData() || "{}");
        console.log("After parsing:", body);
        body.city = expectedCity;
        console.log("After modification:", body);
        await route.continue({
          postData: body,
        });
      },
    );

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(commentLocator).toContainText(expectedCity);
  });
});
