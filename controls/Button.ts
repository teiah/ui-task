import { Locator, expect } from '@playwright/test';
import { FormControl } from './FormControl';

export class Button extends FormControl {
  async click(): Promise<void> {
    await this.locator.click();
  }

  async assertStyle(cssClass: string): Promise<void> {
    await expect(this.locator).toHaveClass(new RegExp(cssClass));
  }
}
