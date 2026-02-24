import { Locator, expect } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';

export abstract class BaseGridComponent extends BaseComponent {
  abstract readonly rows: Locator;
  readonly pagerInfo: Locator;
  readonly activeFiltersText: Locator;

  constructor(root: Locator) {
    super(root);
    this.pagerInfo = this.root.locator('[data-test="pager-info"]');
    this.activeFiltersText = this.root.locator('[data-test="active-filters-text"]');
  }

  async waitForReady(): Promise<void> {
    await expect(this.pagerInfo).toBeVisible();
  }
}
