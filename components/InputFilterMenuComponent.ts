import { Locator, Page } from '@playwright/test';
import { Input, Text } from '../controls';
import { FilterMenuComponent } from './FilterMenuComponent';
import { INPUT, LABEL } from '../constants';

const FILTER_SEARCH_TEST_ID = 'table-filter-search-text';

export class InputFilterMenuComponent extends FilterMenuComponent {
  readonly input: Input;
  readonly inputLabel: Text;

  constructor(grid: Locator, page: Page, column: string) {
    super(grid, page, column);
    this.inputLabel = new Text(page.getByTestId(FILTER_SEARCH_TEST_ID).locator(LABEL));
    this.input = new Input(page.getByTestId(FILTER_SEARCH_TEST_ID).locator(INPUT));
  }

  protected isOpenLocator(): Locator {
    return this.input.element;
  }

  async fill(value: string): Promise<void> {
    await this.input.fill(value);
  }
}
