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

}
