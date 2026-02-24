import { chromium, devices, FullConfig } from '@playwright/test';
import { LoginPage } from './pages';
import { AUTH_FILE, LAUNCH_ARGS } from './playwright.config';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch({
    args: LAUNCH_ARGS,
  });
  const context = await browser.newContext({
    baseURL,
    ...devices['Desktop Chrome'],
  });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
  await context.storageState({ path: AUTH_FILE });

  await browser.close();
}

export default globalSetup;
