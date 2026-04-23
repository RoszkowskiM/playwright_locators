import { test, expect } from "@playwright/test";
// import { CREATOR_SESSION_PATH, VIEWER_SESSION_PATH } from "../playwright.config";
// import { SESSION_PATH } from "../playwright.config";

// test.use({ storageState: SESSION_PATH });

test.describe("Account - creator", {tag: ["@creator"]}, () => {
//   test.use({ storageState: CREATOR_SESSION_PATH });

  test("user welcome page", async ({ page }) => {
    // Arrange:
    await page.goto("/welcome/");

    // Assert:
    await expect(page.getByTestId("hello")).toHaveText(
      "Hi Moses.Armstrong@Feest.ca!",
    );
  });
});

test.describe("Account - viewer", {tag: ["@viewer"]}, () => {
//   test.use({ storageState: VIEWER_SESSION_PATH });
  
  test("user welcome page", async ({ page }) => {
    // Arrange:
    await page.goto("/welcome/");

    // Assert:
    await expect(page.getByTestId("hello")).toHaveText(
      "Hi Danial.Dicki@dicki.test!",
    );
  });
});
