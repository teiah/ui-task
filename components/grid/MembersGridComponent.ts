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
  static readonly ROOT_SELECTOR = '[data-test="members-data-grid-container"]';

  private static readonly SELECTORS = {
    rows: '.k-table-row.k-master-row',
  };

  readonly rows: Locator;
  readonly activeFilter: Button;
  readonly dropInFilter: Button;
  readonly pendingFilter: Button;
  readonly memberPortalFilter: Button;

  constructor(private readonly page: Page, root: Locator) {
    super(root);
    this.rows = this.root.locator(MembersGridComponent.SELECTORS.rows);
    this.activeFilter = new Button(this.compositeFilter(ACTIVE_FILTER));
    this.dropInFilter = new Button(this.compositeFilter(DROP_IN_FILTER));
    this.pendingFilter = new Button(this.compositeFilter(PENDING_FILTER));
    this.memberPortalFilter = new Button(this.compositeFilter(MEMBER_PORTAL_FILTER));
  }

  filter(columnName: string): InputFilterMenuComponent {
    return new InputFilterMenuComponent(this.root, this.page, columnName);
  }

  private compositeFilter(label: string): Locator {
    return this.root.locator(`[data-test="${COMPOSITE_FILTER_TEST_ID}"]`).filter({ hasText: new RegExp(`^${label}`) });
  }
}
