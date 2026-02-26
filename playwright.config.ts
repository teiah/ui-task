import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export const AUTH_FILE = 'auth.json';
export const LAUNCH_ARGS = ['--disable-blink-features=AutomationControlled'];
export const BASE_URL = 'https://staging.officernd.com';

export default defineConfig({
  globalSetup: './global-setup.ts',
  testDir: './tests',
  retries: 1,
  reporter: 'html',
  expect: { timeout: 15000 },
  use: {
    baseURL: BASE_URL,
    headless: true,
    storageState: AUTH_FILE,
    testIdAttribute: 'rnd-data-id',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: { args: LAUNCH_ARGS },
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        launchOptions: { args: LAUNCH_ARGS },
      },
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
