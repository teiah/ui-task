import { Locator, expect } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { Button, Text } from '../../controls';
import { BUTTON, RESET_FILTERS } from '../../constants';

const PAGER_INFO_TEST_ID = 'pager-info';
const ACTIVE_FILTERS_TEXT_TEST_ID = 'active-filters-text';

export abstract class BaseGridComponent extends BaseComponent {
  abstract readonly rows: Locator;
  readonly pagerInfo: Text;
  readonly activeFiltersText: Text;
  readonly resetFiltersButton: Button;

  constructor(root: Locator) {
    super(root);
    this.pagerInfo = new Text(this.root.getByTestId(PAGER_INFO_TEST_ID));
    this.activeFiltersText = new Text(this.root.getByTestId(ACTIVE_FILTERS_TEXT_TEST_ID));
    this.resetFiltersButton = new Button(this.root.getByRole(BUTTON, { name: RESET_FILTERS }));
  }

  async assertRowCount(expected: number): Promise<void> {
    await expect(this.rows).toHaveCount(expected);
  }

  async waitForReady(): Promise<void> {
    await expect(this.pagerInfo.element).toBeVisible();
  }
}
