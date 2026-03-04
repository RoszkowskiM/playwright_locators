import { test, expect } from "@playwright/test";

test.describe("Book store", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login.html");
    await page
      .getByRole("textbox", { name: "Enter User Email" })
      .fill("maciej88.work@gmail.com");
    await page.getByRole("textbox", { name: "Enter Password" }).fill("toshiba");
    await page.getByRole("button", { name: "LogIn" }).click();
    await page.getByRole("link", { name: "🦎 GAD" }).click();
    await page.getByRole("link", { name: " Book Shop Discover and" }).click();
    await page.getByRole("link", { name: " Books" }).click();
  });

  test("Confirm all prices are non-zero values", async ({ page }) => {
    // Arrange

    // Act

    // Assert
  });
});
