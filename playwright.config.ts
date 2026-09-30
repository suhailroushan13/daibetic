import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
    // Optional: point at a preinstalled Chromium instead of the Playwright-managed one.
    ...(process.env.PW_CHROMIUM ? { launchOptions: { executablePath: process.env.PW_CHROMIUM } } : {}),
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: {
    command: 'npm run start -- -p 4321 -H 127.0.0.1',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
