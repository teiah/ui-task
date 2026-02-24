import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { MembersGridComponent } from '../components';
import { InputFilterMenuComponent } from '../components/InputFilterMenuComponent';

export class MembersPage extends BasePage {
  protected readonly url = `/admin/${process.env.ORG_SLUG}/operations/members`;

  readonly grid: MembersGridComponent;

  constructor(page: Page) {
    super(page);
    if (!process.env.ORG_SLUG) {
      throw new Error('ORG_SLUG environment variable is not set');
    }
    this.grid = new MembersGridComponent(page.getByTestId(MembersGridComponent.MEMBERS_GRID_TEST_ID));
  }

  filter(columnName: string): InputFilterMenuComponent {
    return new InputFilterMenuComponent(this.grid.getLocator(), this.page, columnName);
  }

  async isLoaded(): Promise<void> {
    await this.grid.waitForReady();
  }
}
