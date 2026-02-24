import { Locator, expect } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';

const PAGER_INFO_TEST_ID = 'pager-info';
const ACTIVE_FILTERS_TEXT_TEST_ID = 'active-filters-text';

export abstract class BaseGridComponent extends BaseComponent {
  abstract readonly rows: Locator;
  readonly pagerInfo: Locator;
  readonly activeFiltersText: Locator;

  protected constructor(root: Locator) {
    super(root);
    this.pagerInfo = this.root.getByTestId(PAGER_INFO_TEST_ID);
    this.activeFiltersText = this.root.getByTestId(ACTIVE_FILTERS_TEXT_TEST_ID);
  }

  async waitForReady(): Promise<void> {
    await expect(this.pagerInfo).toBeVisible();
  }
}
