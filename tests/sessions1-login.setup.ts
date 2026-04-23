import { test, expect } from "@playwright/test";
import { CREATOR_SESSION_PATH, VIEWER_SESSION_PATH } from "../playwright.config";

test.describe("Setup session", () => {
  test("authenticate as creator", async ({ page }) => {
    // Arrange:
    const userName = "Moses.Armstrong@Feest.ca";
    const password = "test1";

    await page.goto("/login/");

    // Act:
    await page.locator('[name="username"]').fill(userName);
    await page.locator("#password").fill(password);
    await page.locator("#loginButton").click();

    // Assert:
    await expect(page.getByTestId("hello")).toBeVisible();

    // Save session:
    await page.context().storageState({ path: CREATOR_SESSION_PATH });
  });

  test("authenticate as viewer", async ({ page }) => {
    // Arrange:
    const userName = "Danial.Dicki@dicki.test";
    const password = "test2";

    await page.goto("/login/");

    // Act:
    await page.locator('[name="username"]').fill(userName);
    await page.locator("#password").fill(password);
    await page.locator("#loginButton").click();

    // Assert:
    await expect(page.getByTestId("hello")).toBeVisible();

    // Save session:
    await page.context().storageState({ path: VIEWER_SESSION_PATH });
  });
});
