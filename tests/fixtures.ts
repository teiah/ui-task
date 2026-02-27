import { test as base } from '@playwright/test';
import { MembersPage } from '../pages';

type Fixtures = {
  membersPage: MembersPage;
};

export const test = base.extend<Fixtures>({
  membersPage: async ({ page }, use) => {
    await use(await MembersPage.open(page));
  },
});

export { expect } from '@playwright/test';
