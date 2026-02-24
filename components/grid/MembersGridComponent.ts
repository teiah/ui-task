import { Locator, Page } from '@playwright/test';
import { BaseGridComponent } from './BaseGridComponent';
import { Button } from '../../controls';
import { InputFilterMenuComponent } from '../InputFilterMenuComponent';

export const NAME_COLUMN = 'Name' as const;

const COMPOSITE_FILTER_TEST_ID = 'grid-composite-filter-action';
const ACTIVE_FILTER = 'Active';
const DROP_IN_FILTER = 'Drop-in';
const PENDING_FILTER = 'Pending';
const MEMBER_PORTAL_FILTER = 'Member Portal';

export class MembersGridComponent extends BaseGridComponent {
  static readonly MEMBERS_GRID_TEST_ID = 'members-data-grid-container';

  readonly rows: Locator;
  readonly activeFilter: Button;
  readonly dropInFilter: Button;
  readonly pendingFilter: Button;
  readonly memberPortalFilter: Button;

  constructor(private readonly page: Page, root: Locator) {
    super(root);
    this.rows = this.root.getByRole('rowgroup').nth(1).getByRole('row');
    this.activeFilter = new Button(this.compositeFilter(ACTIVE_FILTER));
    this.dropInFilter = new Button(this.compositeFilter(DROP_IN_FILTER));
    this.pendingFilter = new Button(this.compositeFilter(PENDING_FILTER));
    this.memberPortalFilter = new Button(this.compositeFilter(MEMBER_PORTAL_FILTER));
  }

  filter(columnName: string): InputFilterMenuComponent {
    return new InputFilterMenuComponent(this.root, this.page, columnName);
  }

  private compositeFilter(label: string): Locator {
    return this.root.getByTestId(COMPOSITE_FILTER_TEST_ID).filter({ hasText: new RegExp(`^${label}`) });
  }
}
