import { Locator } from '@playwright/test';
import { FormControl } from './FormControl';

export class Link extends FormControl {
  constructor(locator: Locator) {
    super(locator);
  }

  async click(): Promise<void> {
    await this.locator.click();
  }
}
