import { Locator, Page, expect } from '@playwright/test';
import { BaseGridComponent } from './BaseGridComponent';
import { InputFilterMenuComponent } from '..';
import { ROW, TBODY } from '../../constants';

export const NAME_COLUMN = 'Name' as const;

const MEMBERS_GRID_TEST_ID = 'members-data-grid-container';
const NAME_FILTER_TEST_ID = 'table-filter-search-text';
const MEMBER_NAME_LINK_TEST_ID = 'navigate-to-member-details';

export class MembersGridComponent extends BaseGridComponent {

  readonly rows: Locator;
  readonly nameCells: Locator;
  readonly nameFilter: InputFilterMenuComponent;

  constructor(scope: Locator, page: Page) {
    super(scope.getByTestId(MEMBERS_GRID_TEST_ID));
    this.rows = this.find(TBODY).getByRole(ROW);
    this.nameCells = this.rows.getByTestId(MEMBER_NAME_LINK_TEST_ID);
    this.nameFilter = new InputFilterMenuComponent(this.root, page, NAME_COLUMN, NAME_FILTER_TEST_ID);
  }

  async assertColumnContains(column: string, value: string): Promise<void> {
    const columnCells: Record<string, Locator> = {
      [NAME_COLUMN]: this.nameCells,
    };
    const cells = columnCells[column];
    if (!cells) throw new Error(`No cell locator registered for column: ${column}`);
    await expect(cells.filter({ hasNotText: new RegExp(value, 'i') })).toHaveCount(0);
  }
}
