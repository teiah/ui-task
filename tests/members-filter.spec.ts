import { test } from '@playwright/test';
import { MembersPage } from '../pages';
import { NAME_COLUMN } from '../components';
import { CLEAR, FILTER, SEARCH_FOR, K_BUTTON_SOLID_PRIMARY, K_BUTTON_SOLID_BASE } from '../constants';
import { assertCount } from './helpers';

test.describe('Members page', () => {
  test('TC-UI-01 - Filter members by name and verify result count', async ({ page }) => {
    const UNFILTERED_ROW_COUNT = 10;
    const FILTER_VALUE = 'zara';
    const EXPECTED_RESULT_COUNT = 2;
    const EXPECTED_PAGER_TEXT = `1 - ${EXPECTED_RESULT_COUNT} out of ${EXPECTED_RESULT_COUNT}`;

    const membersPage = await test.step('Navigate to Members page', async () => {
      return MembersPage.open(page);
    });

    const { grid } = membersPage;
    const { nameFilter } = grid;

    await test.step(`Verify ${UNFILTERED_ROW_COUNT} members are displayed before filtering`, async () => {
      await assertCount(grid.rows, UNFILTERED_ROW_COUNT);
    });

    await test.step('Verify no status filters are selected', async () => {
      await grid.activeFiltersText.assertHidden();
    });

    await test.step('Open Name filter menu and verify elements', async () => {
      await nameFilter.open();
      await nameFilter.input.assertPlaceholder(`${SEARCH_FOR}${NAME_COLUMN}`);
      await nameFilter.clearButton.assertText(CLEAR);
      await nameFilter.clearButton.assertStyle(K_BUTTON_SOLID_BASE);
      await nameFilter.applyButton.assertText(FILTER);
      await nameFilter.applyButton.assertStyle(K_BUTTON_SOLID_PRIMARY);
      await nameFilter.applyButton.assertDisabled();
    });

    await test.step(`Enter "${FILTER_VALUE}" in Name filter and verify Filter button is enabled`, async () => {
      await nameFilter.fill(FILTER_VALUE);
      await nameFilter.applyButton.assertEnabled();
    });

    await test.step('Apply Name filter', async () => {
      await nameFilter.apply();
      await nameFilter.assertClosed();
    });

    await test.step(`Verify ${EXPECTED_RESULT_COUNT} results are displayed`, async () => {
      await assertCount(grid.rows, EXPECTED_RESULT_COUNT);
      await grid.pagerInfo.assertText(EXPECTED_PAGER_TEXT);
    });
  });
});
