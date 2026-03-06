import { BasePage } from './BasePage';
import { Button, Input } from '../controls';
import { BUTTON, CONTINUE, SIGN_IN, EMAIL, PASSWORD } from '../constants';

const SIGN_IN_TIMEOUT = 15_000;
const ADMIN_TIMEOUT = 20_000;

export class LoginPage extends BasePage {
  protected readonly url = '/login';

  private readonly emailInput = new Input(this.page.getByPlaceholder(EMAIL));
  private readonly continueButton = new Button(this.page.getByRole(BUTTON, { name: CONTINUE }));
  private readonly passwordInput = new Input(this.page.getByPlaceholder(PASSWORD));
  private readonly signInButton = new Button(this.page.getByRole(BUTTON, { name: SIGN_IN }));

  async isLoaded(): Promise<void> {
    await this.emailInput.waitForVisible();
    await this.page.waitForResponse(res => res.url().includes('recaptcha') && res.url().includes('anchor'));
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();
    await this.page.waitForURL('**/signin**', { timeout: SIGN_IN_TIMEOUT });

    await this.passwordInput.waitForVisible();
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForURL('**/admin/**', { timeout: ADMIN_TIMEOUT });
  }
}
