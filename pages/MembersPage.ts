import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { MembersGridComponent } from '../components';

export class MembersPage extends BasePage {
  protected readonly url = `/admin/${process.env.ORG_SLUG}/operations/members`;
  protected readonly root = this.page.getByTestId('members-page');

  readonly grid: MembersGridComponent;

  constructor(page: Page) {
    super(page);
    this.grid = new MembersGridComponent(this.root.getByTestId(MembersGridComponent.MEMBERS_GRID_TEST_ID), page);
  }

  async isLoaded(): Promise<void> {
    await expect(this.root).toBeVisible();
    await this.grid.waitForReady();
  }
}
