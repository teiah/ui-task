import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { MembersGridComponent } from '../components';


export class MembersPage extends BasePage {
  protected readonly url = `/admin/${process.env.ORG_SLUG}/operations/members`;

  readonly grid: MembersGridComponent;

  constructor(page: Page) {
    super(page);
    if (!process.env.ORG_SLUG) {
      throw new Error('ORG_SLUG environment variable is not set');
    }
    this.grid = new MembersGridComponent(page, page.locator(MembersGridComponent.ROOT_SELECTOR));
  }

  async isLoaded(): Promise<void> {
    await this.grid.waitForReady();
  }
}
