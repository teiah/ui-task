import { Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class PrimaryNav extends BaseComponent {
  private static readonly SELECTORS = {
    operationsLink: '[data-test="side-nav-link-operations"]',
  };

  constructor(root: Locator) {
    super(root);
  }

  async openOperations(): Promise<void> {
    await this.root.locator(PrimaryNav.SELECTORS.operationsLink).click();
  }
}
