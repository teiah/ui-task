import { Locator } from '@playwright/test';
import { BaseGridComponent } from './BaseGridComponent';

export const NAME_COLUMN = 'Name' as const;

export class MembersGridComponent extends BaseGridComponent {
  private static readonly SELECTORS = {
    rows: '.k-table-row.k-master-row',
  };

  readonly rows: Locator;

  constructor(root: Locator) {
    super(root);
    this.rows = this.root.locator(MembersGridComponent.SELECTORS.rows);
  }
}
