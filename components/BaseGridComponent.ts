import { Locator, expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { InputFilterMenuComponent } from './InputFilterMenuComponent';
import { COLUMN_MENU_ROLE } from './FilterMenuComponent';
import { LINK } from '../controls';

export abstract class BaseGridComponent extends BaseComponent {
  abstract readonly rows: Locator;

  constructor(root: Locator) {
    super(root);
  }

  async assertInputFilterElements(columnName: string): Promise<void> {
    const filter = new InputFilterMenuComponent(this.root, columnName);
    await filter.open();
    await filter.assertElements();
  }

  async filterColumnByInputValue(columnName: string, value: string): Promise<void> {
    await new InputFilterMenuComponent(this.root, columnName).filterColumnByValue(value);
  }

  async assertRowCount(expected: number): Promise<void> {
    await expect(this.rows).toHaveCount(expected);
  }

  async waitForReady(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
    await expect(this.root.getByRole(LINK, { name: new RegExp(COLUMN_MENU_ROLE) })).not.toHaveCount(0);
  }
}
