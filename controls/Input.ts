import { Locator } from '@playwright/test';
import { FormControl } from './FormControl';

export class Input extends FormControl {
  constructor(locator: Locator) {
    super(locator);
  }

  async getPlaceholder(): Promise<string> {
    return await this.locator.getAttribute('placeholder') ?? '';
  }

  async fill(value: string): Promise<void> {
    await this.locator.fill(value);
  }
}
