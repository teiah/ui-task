import { Locator, expect } from '@playwright/test';
import { FormControl } from './FormControl';
import { BACKGROUND_COLOR, COLOR } from './CSSProperty';

export class Button extends FormControl {
  constructor(locator: Locator) {
    super(locator);
  }

  async getValue(): Promise<string> {
    return await this.locator.textContent() ?? '';
  }

  async click(): Promise<void> {
    await this.locator.click();
  }

  async assertText(expected: string): Promise<void> {
    await expect(this.locator).toHaveText(expected);
  }

  async assertBackgroundColor(expected: string): Promise<void> {
    await expect(this.locator).toHaveCSS(BACKGROUND_COLOR, expected);
  }

  async assertTextColor(expected: string): Promise<void> {
    await expect(this.locator).toHaveCSS(COLOR, expected);
  }
}
