import { defineConfig, devices } from "@playwright/test";
import path from "path";

export const CREATOR_SESSION_PATH = path.join(
  __dirname,
  "./.auth/creator.json",
);
export const VIEWER_SESSION_PATH = path.join(__dirname, "./.auth/viewer.json");

export default defineConfig({
  testDir: "./tests",
  // globalTimeout: 3 * 60 * 60_000, //3hrs
  fullyParallel: true,
  workers: process.env.CI ? 1 : 2,
  // workers: 1,
  reporter: [["list"], ["html"], ["./logger/custom-reporter.ts"]],
  // expect: {
  //   timeout: 30_000,
  // },
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    // testIdAttribute: "pw-test",
    actionTimeout: 10_000,
    // navigationTimeout: 10_000,
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 200,
    },
  },

  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}{ext}",
  projects: [
    {
      name: "setup",
      use: {
        ...devices["Desktop Chrome"],
      },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // viewport: null,
        // launchOptions: { args: ["--start-maximized"] },
      },
    },
    {
      name: "creator role",
      grep: /@creator/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: CREATOR_SESSION_PATH,
      },
      dependencies: ["setup"],
    },
    {
      name: "viewer role",
      grep: /@viewer/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: VIEWER_SESSION_PATH,
      },
      dependencies: ["setup"],
    },
    // {
    //   name: "Galaxy S24",
    //   use: { ...devices["Galaxy S24"] },
    // },
  ],
});
