import { Locator, expect } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { InputFilterMenuComponent } from '../InputFilterMenuComponent';
import { COLUMN_MENU_ROLE } from '../FilterMenuComponent';
import { LINK } from '../../constants';

export abstract class BaseGridComponent extends BaseComponent {
  abstract readonly rows: Locator;
  readonly pagerInfo: Locator;

  constructor(root: Locator) {
    super(root);
    this.pagerInfo = this.root.locator('[data-test="pager-info"]');
  }

  filter(columnName: string): InputFilterMenuComponent {
    return new InputFilterMenuComponent(this.root, columnName);
  }

  async filterColumnByInputValue(columnName: string, value: string): Promise<void> {
    await this.filter(columnName).filterColumnByValue(value);
  }

  async waitForReady(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
    await expect(this.root.getByRole(LINK, { name: new RegExp(COLUMN_MENU_ROLE) })).not.toHaveCount(0);
  }
}
