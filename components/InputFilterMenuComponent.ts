import { Locator, Page } from '@playwright/test';
import { Input } from '../controls';
import { FilterMenuComponent } from './FilterMenuComponent';
import { SEARCH_FOR } from '../constants';

export class InputFilterMenuComponent extends FilterMenuComponent {
  readonly input: Input;

  constructor(grid: Locator, page: Page, column: string) {
    super(grid, page, column);
    this.input = new Input(page.getByPlaceholder(`${SEARCH_FOR}${column}`));
  }

  protected isOpenLocator(): Locator {
    return this.input.element;
  }

  async fill(value: string): Promise<void> {
    await this.input.fill(value);
  }

  async filterColumnByValue(value: string): Promise<void> {
    await this.open();
    await this.fill(value);
    await this.apply();
    await this.assertClosed();
  }
}
