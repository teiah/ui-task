import { Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { Button } from '../controls';
import { BUTTON, LINK, CLEAR, FILTER } from '../constants';

export const COLUMN_MENU_ROLE = 'Column menu';

export abstract class FilterMenuComponent extends BaseComponent {
  readonly clearButton: Button;
  readonly applyButton: Button;

  constructor(grid: Locator, protected readonly column: string) {
    super(grid);
    this.clearButton = new Button(this.root.getByRole(BUTTON, { name: CLEAR }));
    this.applyButton = new Button(this.root.getByRole(BUTTON, { name: FILTER }));
  }

  private columnMenuButton(): Button {
    return new Button(this.root.getByRole(LINK, { name: `${this.column} ${COLUMN_MENU_ROLE}` }));
  }

  async open(): Promise<void> {
    await this.columnMenuButton().click();
  }

  async apply(): Promise<void> {
    await this.applyButton.click();
  }

  async clear(): Promise<void> {
    await this.clearButton.click();
  }
}
