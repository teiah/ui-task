import { Locator, Page } from '@playwright/test';
import { BaseGridComponent } from './BaseGridComponent';
import { InputFilterMenuComponent } from '../InputFilterMenuComponent';
import { Button } from '../../controls';
import { ROW, TBODY, BUTTON, RESET_FILTERS } from '../../constants';

export const NAME_COLUMN = 'Name' as const;

export class MembersGridComponent extends BaseGridComponent {
  static readonly MEMBERS_GRID_TEST_ID = 'members-data-grid-container';

  readonly rows: Locator;
  readonly nameFilter: InputFilterMenuComponent;
  readonly resetFiltersButton: Button;

  constructor(root: Locator, page: Page) {
    super(root);
    this.rows = this.find(TBODY).getByRole(ROW);
    this.nameFilter = new InputFilterMenuComponent(root, page, NAME_COLUMN);
    this.resetFiltersButton = new Button(this.root.getByRole(BUTTON, { name: RESET_FILTERS }));
  }
}
