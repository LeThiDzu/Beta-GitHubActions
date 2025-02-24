import {defineConfig, devices} from "@playwright/test";
import generateCustomLayout from "./commons/report-template"
require('dotenv').config({ path: '.env' });

export default defineConfig({
  testDir: "./tests",
  timeout: 0,
  snapshotPathTemplate: '{arg}{ext}',
  expect: {
    timeout: 60000
  },
  reporter: [
    ['html'],  // HTML reporter
    [
      "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        slackWebHookUrl: process.env.SLACK_WEBHOOK_URL,
        sendResults: "always",
        layout: generateCustomLayout,
      },
    ]
  ],
  use: {
    headless: true,
    trace: "on-first-retry",
    actionTimeout: 30000,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: {width: 1920, height: 1080},
      },
    }
  ],
});