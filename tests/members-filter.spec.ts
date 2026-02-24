import { test } from '@playwright/test';
import { MembersPage } from '../pages';
import { InputFilterMenuComponent, NAME_COLUMN } from '../components';

const TOTAL_ROW_COUNT = 10;
const EXPECTED_RESULT_COUNT = 2;

test.describe('Members page', () => {
  test('TC-UI-01 - Filter members by name and verify result count', async ({ page }) => {
    const membersPage = await MembersPage.open(page);

    await test.step(`Verify ${TOTAL_ROW_COUNT} members are displayed before filtering`, async () => {
      await membersPage.grid.assertRowCount(TOTAL_ROW_COUNT);
    });

    const nameFilter = new InputFilterMenuComponent(membersPage.grid.getLocator(), NAME_COLUMN);

    await test.step('Verify Name filter menu elements', async () => {
      await nameFilter.assertElements();
    });

    await test.step('Filter members by Name "zara"', async () => {
      await membersPage.grid.filterColumnByInputValue(NAME_COLUMN, 'zara');
    });

    await test.step(`Verify ${EXPECTED_RESULT_COUNT} results are displayed`, async () => {
      await membersPage.grid.assertRowCount(EXPECTED_RESULT_COUNT);
    });
  });
});

