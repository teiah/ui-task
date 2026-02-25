import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { MembersGridComponent } from '../components';
export class MembersPage extends BasePage {
  protected readonly url = `/admin/${process.env.ORG_SLUG}/operations/members`;

  readonly grid: MembersGridComponent;

  constructor(page: Page) {
    super(page);
    this.grid = new MembersGridComponent(page.getByTestId(MembersGridComponent.MEMBERS_GRID_TEST_ID), page);
  }

  async isLoaded(): Promise<void> {
    await this.grid.waitForReady();
  }
}
