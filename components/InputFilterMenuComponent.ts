import { Locator, Page } from '@playwright/test';
import { Input, Text } from '../controls';
import { FilterMenuComponent } from './FilterMenuComponent';
import { INPUT, LABEL } from '../constants';

export class InputFilterMenuComponent extends FilterMenuComponent {
  readonly input: Input;
  readonly inputLabel: Text;

  constructor(grid: Locator, page: Page, column: string, filterTestId: string) {
    super(grid, page, column);
    const filterContainer = page.getByTestId(filterTestId);
    this.inputLabel = new Text(filterContainer.locator(LABEL));
    this.input = new Input(filterContainer.locator(INPUT));
  }

  protected isOpenLocator(): Locator {
    return this.input.element;
  }

  async fill(value: string): Promise<void> {
    await this.input.fill(value);
  }
}
