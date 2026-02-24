import { Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

const MEMBERS_URL_PATTERN = '**/operations/members**';
const NAV_TIMEOUT = 15_000;

export class SecondaryNav extends BaseComponent {
  private static readonly SELECTORS = {
    membersLink: '[data-test="side-nav-link-operations-members"]',
  };

  constructor(root: Locator) {
    super(root);
  }

  async goToMembers(): Promise<void> {
    await this.root.locator(SecondaryNav.SELECTORS.membersLink).click();
    await this.root.page().waitForURL(MEMBERS_URL_PATTERN, { timeout: NAV_TIMEOUT });
  }
}
