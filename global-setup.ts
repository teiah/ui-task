import { chromium, devices, FullConfig } from '@playwright/test';
import { LoginPage } from './pages';
import { AUTH_FILE, LAUNCH_ARGS } from './playwright.config';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;

  if (!process.env.EMAIL) throw new Error('EMAIL environment variable is not set');
  if (!process.env.PASSWORD) throw new Error('PASSWORD environment variable is not set');
  if (!process.env.ORG_SLUG) throw new Error('ORG_SLUG environment variable is not set');
  const browser = await chromium.launch({
    args: LAUNCH_ARGS,
  });
  const context = await browser.newContext({
    baseURL,
    ...devices['Desktop Chrome'],
  });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
  await context.storageState({ path: AUTH_FILE });

  await browser.close();
}

export default globalSetup;
