import { Locator } from '@playwright/test';
import { Input } from '../controls';
import { FilterMenuComponent } from './FilterMenuComponent';
import { SEARCH_FOR } from '../constants';

export class InputFilterMenuComponent extends FilterMenuComponent {
  readonly input: Input;

  constructor(grid: Locator, column: string) {
    super(grid, column);
    this.input = new Input(grid.getByPlaceholder(`${SEARCH_FOR}${column}`));
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
