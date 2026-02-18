import { test, expect } from "@playwright/test";
import { assert } from "node:console";

test.describe("Test User Data", () => {
  test("Check username visibility", async ({ page }) => {
    // Arrange:
    const userNameTestId = "user-full-name";
    const usernameLocator = page.getByTestId(userNameTestId);

    await page.route("/api/v1/data/random/simple-user", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      await route.fulfill({ json: json });
    });

    // Act
    await page.goto("/practice/random-simple-user-v1.html");

    // Assert
    await expect(usernameLocator).toBeVisible();
    const userName = await usernameLocator.innerText();
    console.log(userName);
  });

  test("Check username", async ({ page }) => {
    // Arrange:
    const userNameTestId = "user-full-name";
    const usernameLocator = page.getByTestId(userNameTestId);
    const expectedUserName = "John Doe";

    await page.route("/api/v1/data/random/simple-user", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      await route.fulfill({ json: mockedUserData });
    });

    // Act
    await page.goto("/practice/random-simple-user-v1.html");

    // Assert
    await expect(usernameLocator).toHaveText(expectedUserName);
  });

  test("Missing birth date", async ({ page }) => {
    // Arrange:
    const birthDateTestId = "user-date-of-birth";
    const birthDateLocator = page.getByTestId(birthDateTestId);
    const expectedBirthDate = "undefined";

    await page.route("/api/v1/data/random/simple-user", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      json.dateOfBirth = undefined;
      await route.fulfill({ json: json });
    });

    // Act
    await page.goto("/practice/random-simple-user-v1.html");

    // Assert
    await expect(birthDateLocator).toHaveText(expectedBirthDate);
  });

  test("Birth date over 100y ago", async ({ page }) => {
    // Arrange:
    const userAgeTestId = "user-age";
    const userAgeLocator = page.getByTestId(userAgeTestId);
    const expectedAge = "103";
    const birthDate = "1923-11-20T23:00:00.000Z";

    await page.route("/api/v1/data/random/simple-user", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      json.dateOfBirth = birthDate;
      await route.fulfill({ json: json });
    });

    // Act
    await page.goto("/practice/random-simple-user-v1.html");

    // Assert
    await expect(userAgeLocator).toHaveText(expectedAge);
  });
});

const mockedUserData = {
  userId: "U9621",
  username: "camilarahman334",
  firstName: "John",
  lastName: "Doe",
  email: "camilarahman334@test2.test.com",
  phone: "+845-777-803-4869",
  dateOfBirth: "1953-11-20T23:00:00.000Z",
  profilePicture: "6d4598e5-9778-4e9d-8a96-dd1a625b9f0a.jpg",
  address: {
    street: "179 Park Street",
    city: "Keystone City",
    postalCode: 92366,
    country: "USA",
  },
  lastLogin: "2019-01-12T23:00:00.000Z",
  accountCreated: "2021-08-10T22:00:00.000Z",
  status: 3,
};
