import { test, expect } from "@playwright/test";

test.describe("Test Weather Data", () => {
  test("Get weather data and present table to user", async ({ page }) => {
    // Arrange:
    const getWeatherButtonTestId = "get-weather";
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const resultsTableTestId = "results-table";
    const resultsTableLocator = page.getByTestId(resultsTableTestId);

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    getWeatherButtonLocator.click();

    // Assert:
    await expect(resultsTableLocator).toBeVisible();
  });

  test("Check mean temperature", async ({ page }) => {
    // Arrange:
    const getWeatherButtonTestId = "get-weather";
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const meanTemperatureTestId = "dti-meanTemperature";
    const meanTemperatureLocator = page.getByTestId(meanTemperatureTestId);
    const expectedMeanTemperature = "23.00";

    await page.route("/api/v1/data/random/weather-simple", async (route) => {
      await route.fulfill({ json: mockedApiResponse });
    });

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    getWeatherButtonLocator.click();

    // Assert:
    await expect(meanTemperatureLocator).toHaveText(expectedMeanTemperature);
  });

  test("Check mean temperature with past day included", async ({ page }) => {
    // Arrange:
    const getWeatherButtonTestId = "get-weather";
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const getPastDayButtonTestId = "get-weather-past-day";
    const getPastDayButtonLocator = page.getByTestId(getPastDayButtonTestId);
    const meanTemperatureTestId = "dti-meanTemperature";
    const meanTemperatureLocator = page.getByTestId(meanTemperatureTestId);
    const expectedMeanTemperature = "24.25";

    
    await page.route("/api/v1/data/random/weather-simple", async (route) => {
        if (route.request().method() === "POST") {
            await route.fulfill({ json: mockedApiResponse });
        } else {
            await route.fulfill({ json: mockedPastDayApiResponse });
        }
    });
    
    // Act:
    await page.goto("/practice/random-weather-v2.html");
    getWeatherButtonLocator.click();
    getPastDayButtonLocator.click();

    // Assert:
    await expect(meanTemperatureLocator).toHaveText(expectedMeanTemperature);
  });
});

const mockedApiResponse = [
  {
    date: "2026-04-12",
    city: "Warsaw",
    temperature: 19,
    temperatureMin: 5,
    temperatureMax: 25,
    humidity: "51%",
    dayLength: 17,
    windSpeed: 4,
    windSpeedRange: "0-5 km/h",
  },
  {
    date: "2026-04-11",
    city: "Warsaw",
    temperature: 27,
    temperatureMin: 27,
    temperatureMax: 32,
    humidity: "63%",
    dayLength: 13,
    windSpeed: 0,
    windSpeedRange: "0-5 km/h",
  },
  {
    date: "2026-04-10",
    city: "Warsaw",
    temperature: 23,
    temperatureMin: 10,
    temperatureMax: 32,
    humidity: "57%",
    dayLength: 15,
    windSpeed: 3,
    windSpeedRange: "0-5 km/h",
  },
];

const mockedPastDayApiResponse = [
  {
    date: "2026-04-09",
    city: "Warsaw",
    temperature: 28,
    temperatureMin: 25,
    temperatureMax: 37,
    humidity: "78%",
    dayLength: 16,
    windSpeed: 3,
    windSpeedRange: "0-5 km/h",
  },
];
