import { Locator, expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { Button, Link } from '../controls';
import { BUTTON, LINK, CLEAR, FILTER } from '../constants';

const COLUMN_MENU_ROLE = 'Column menu';

export abstract class FilterMenuComponent extends BaseComponent {
  readonly clearButton: Button;
  readonly applyButton: Button;

  constructor(grid: Locator, protected readonly column: string) {
    super(grid);
    this.clearButton = new Button(this.root.getByRole(BUTTON, { name: CLEAR }));
    this.applyButton = new Button(this.root.getByRole(BUTTON, { name: FILTER }));
  }

  getColumnMenuLink(): Link {
    return new Link(this.root.getByRole(LINK, { name: `${this.column} ${COLUMN_MENU_ROLE}` }));
  }

  protected abstract isOpenLocator(): Locator;

  protected async assertOpen(): Promise<void> {
    await expect(this.isOpenLocator()).toBeVisible();
  }

  protected async assertClosed(): Promise<void> {
    await expect(this.isOpenLocator()).toBeHidden();
  }

  async open(): Promise<void> {
    await this.assertClosed();
    await this.getColumnMenuLink().click();
    await this.assertOpen();
  }

  async apply(): Promise<void> {
    await this.applyButton.click();
  }

  async clear(): Promise<void> {
    await this.clearButton.click();
  }
}
