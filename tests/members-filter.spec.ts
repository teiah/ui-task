import { test } from '@playwright/test';
import { MembersPage } from '../pages';
import { NAME } from '../components';

const TOTAL_ROW_COUNT = 10;
const EXPECTED_RESULT_COUNT = 2;

test.describe('Members page', () => {
  test('TC-UI-01 - Filter members by name and verify result count', async ({ page }) => {
    const membersPage = await MembersPage.open(page);

    await test.step(`Verify ${TOTAL_ROW_COUNT} members are displayed before filtering`, async () => {
      await membersPage.grid.assertRowCount(TOTAL_ROW_COUNT);
    });

    await test.step('Verify Name filter menu elements', async () => {
      await membersPage.grid.assertInputFilterElements(NAME);
    });

    await test.step('Filter members by Name "zara"', async () => {
      await membersPage.grid.filterColumnByInputValue(NAME, 'zara');
    });

    await test.step(`Verify ${EXPECTED_RESULT_COUNT} results are displayed`, async () => {
      await membersPage.grid.assertRowCount(EXPECTED_RESULT_COUNT);
    });
  });
});

