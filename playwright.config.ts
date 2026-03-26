import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  // globalTimeout: 3 * 60 * 60_000, //3hrs
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  // expect: {
  //   timeout: 30_000,
  // },
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    // testIdAttribute: "pw-test",
    // actionTimeout: 2_000,
    // navigationTimeout: 10_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // viewport: null,
        // launchOptions: { args: ["--start-maximized"] },
      },
    },
    // {
    //   name: "Galaxy S24",
    //   use: { ...devices["Galaxy S24"] },
    // },
  ],
});
