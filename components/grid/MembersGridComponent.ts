import { Locator, Page } from '@playwright/test';
import { BaseGridComponent } from './BaseGridComponent';
import { InputFilterMenuComponent } from '../InputFilterMenuComponent';
import { ROW, TBODY } from '../../constants';

export const NAME_COLUMN = 'Name' as const;

export class MembersGridComponent extends BaseGridComponent {
  static readonly MEMBERS_GRID_TEST_ID = 'members-data-grid-container';

  readonly rows: Locator;

  constructor(root: Locator, private readonly page: Page) {
    super(root);
    this.rows = this.root.locator(TBODY).getByRole(ROW);
  }

  filter(columnName: string): InputFilterMenuComponent {
    return new InputFilterMenuComponent(this.root, this.page, columnName);
  }
}
