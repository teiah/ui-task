import { Locator, expect } from '@playwright/test';

export abstract class FormControl {
  constructor(protected readonly locator: Locator) {}

  get element(): Locator {
    return this.locator;
  }

  async waitForVisible(): Promise<void> {
    await this.locator.waitFor({ state: 'visible' });
  }

  async assertEnabled(): Promise<void> {
    await expect(this.locator).toBeEnabled();
  }

  async assertDisabled(): Promise<void> {
    await expect(this.locator).toBeDisabled();
  }

  async assertText(expected: string): Promise<void> {
    await expect(this.locator).toHaveText(expected);
  }

  async assertVisible(): Promise<void> {
    await expect(this.locator).toBeVisible();
  }

  async assertHidden(): Promise<void> {
    await expect(this.locator).toBeHidden();
  }
}
