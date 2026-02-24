import { Locator } from '@playwright/test';
import { BaseGridComponent } from './BaseGridComponent';
import { Button } from '../../controls';

export const NAME_COLUMN = 'Name' as const;

const COMPOSITE_FILTER_TEST_ID = 'grid-composite-filter-action';
const ACTIVE_FILTER = 'Active';
const DROP_IN_FILTER = 'Drop-in';
const PENDING_FILTER = 'Pending';
const MEMBER_PORTAL_FILTER = 'Member Portal';

export class MembersGridComponent extends BaseGridComponent {
  private static readonly SELECTORS = {
    rows: '.k-table-row.k-master-row',
  };

  readonly rows: Locator;
  readonly activeFilter: Button;
  readonly dropInFilter: Button;
  readonly pendingFilter: Button;
  readonly memberPortalFilter: Button;

  constructor(root: Locator) {
    super(root);
    this.rows = this.root.locator(MembersGridComponent.SELECTORS.rows);
    this.activeFilter = new Button(this.compositeFilter(ACTIVE_FILTER));
    this.dropInFilter = new Button(this.compositeFilter(DROP_IN_FILTER));
    this.pendingFilter = new Button(this.compositeFilter(PENDING_FILTER));
    this.memberPortalFilter = new Button(this.compositeFilter(MEMBER_PORTAL_FILTER));
  }

  private compositeFilter(label: string): Locator {
    return this.root.locator(`[data-test="${COMPOSITE_FILTER_TEST_ID}"]`).filter({ hasText: new RegExp(`^${label}`) });
  }
}
