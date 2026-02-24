import { Locator, expect } from '@playwright/test';
import { Input } from '../controls';
import { FilterMenuComponent } from './FilterMenuComponent';

const SEARCH_PLACEHOLDER_PREFIX = 'Search for ';

export class InputFilterMenuComponent extends FilterMenuComponent {
  private readonly input: Input;

  constructor(grid: Locator, column: string) {
    super(grid, column);
    this.input = new Input(grid.getByPlaceholder(`${SEARCH_PLACEHOLDER_PREFIX}${column}`));
  }

  async assertOpen(): Promise<void> {
    await expect(this.input.element, { message: `Expected "${this.column}" filter menu to be open` }).toBeVisible();
  }

  async assertClosed(): Promise<void> {
    await expect(this.input.element, { message: `Expected "${this.column}" filter menu to be closed` }).toBeHidden();
  }

  async assertElements(): Promise<void> {
    await this.assertButtons();
    await expect(this.input.element).toHaveAttribute('placeholder', `${SEARCH_PLACEHOLDER_PREFIX}${this.column}`);
  }

  async fill(value: string): Promise<void> {
    await this.input.fill(value);
  }

  async filterColumnByValue(value: string): Promise<void> {
    if (!await this.input.element.isVisible()) {
      await this.open();
    }
    await this.fill(value);
    await this.apply();
  }
}
