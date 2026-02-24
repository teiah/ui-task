import { Locator } from '@playwright/test';
import { BaseGridComponent } from './BaseGridComponent';
import { ROW, ROW_GROUP } from '../../constants';

export const NAME_COLUMN = 'Name' as const;

export class MembersGridComponent extends BaseGridComponent {
  static readonly MEMBERS_GRID_TEST_ID = 'members-data-grid-container';

  readonly rows: Locator;

  constructor(root: Locator) {
    super(root);
    this.rows = this.root.getByRole(ROW_GROUP).nth(1).getByRole(ROW);
  }
}
