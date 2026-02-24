import { Locator, Page, expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { Button, Link } from '../controls';
import { BUTTON, LINK, CLEAR, FILTER } from '../constants';

const COLUMN_MENU_ROLE = 'Column menu';

export abstract class FilterMenuComponent extends BaseComponent {
  readonly clearButton: Button;
  readonly applyButton: Button;

  constructor(grid: Locator, protected readonly page: Page, protected readonly column: string) {
    super(grid);
    this.clearButton = new Button(page.getByRole(BUTTON, { name: CLEAR }));
    this.applyButton = new Button(page.getByRole(BUTTON, { name: FILTER }));
  }

  getColumnMenuLink(): Link {
    return new Link(this.root.getByRole(LINK, { name: `${this.column} ${COLUMN_MENU_ROLE}` }));
  }

  protected abstract isOpenLocator(): Locator;

  protected async assertOpen(): Promise<void> {
    await expect(this.isOpenLocator()).toBeVisible();
  }

  async assertClosed(): Promise<void> {
    await expect(this.isOpenLocator()).toBeHidden();
  }

  async open(): Promise<void> {
    if (!await this.isOpenLocator().isVisible()) {
      await this.getColumnMenuLink().click();
    }
    await this.assertOpen();
  }

  async apply(): Promise<void> {
    await this.applyButton.click();
  }

  async clear(): Promise<void> {
    await this.clearButton.click();
  }
}
