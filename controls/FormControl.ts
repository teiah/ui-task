import { Locator } from '@playwright/test';

export abstract class FormControl {
  constructor(protected readonly locator: Locator) {}

  get element(): Locator {
    return this.locator;
  }

  abstract getValue(): Promise<string>;

  async waitForVisible(): Promise<void> {
    await this.locator.waitFor({ state: 'visible' });
  }
}
