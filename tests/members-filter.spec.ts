import { test } from '@playwright/test';
import { MembersPage } from '../pages';
import { NAME_COLUMN } from '../components';
import { CLEAR, FILTER, SEARCH_FOR, K_BUTTON_SOLID_PRIMARY, K_BUTTON_SOLID_BASE } from '../constants';
import { assertCount, assertText, assertPlaceholder, assertButtonStyle, assertHidden } from './helpers';

test.describe('Members page', () => {
  test('TC-UI-01 - Filter members by name and verify result count', async ({ page }) => {
    const UNFILTERED_ROW_COUNT = 10;
    const FILTER_VALUE = 'zara';
    const EXPECTED_RESULT_COUNT = 2;
    const EXPECTED_PAGER_TEXT = `1 - ${EXPECTED_RESULT_COUNT} out of ${EXPECTED_RESULT_COUNT}`;

    const membersPage = await test.step('Navigate to Members page', async () => {
      return MembersPage.open(page);
    });

    await test.step(`Verify ${UNFILTERED_ROW_COUNT} members are displayed before filtering`, async () => {
      await assertCount(membersPage.grid.rows, UNFILTERED_ROW_COUNT);
    });

    await test.step('Verify no status filters are selected', async () => {
      await assertHidden(membersPage.grid.activeFiltersText.element);
    });

    const nameFilter = membersPage.filter(NAME_COLUMN);

    await test.step('Open Name filter menu and verify elements', async () => {
      await nameFilter.open();
      await assertPlaceholder(nameFilter.input.element, `${SEARCH_FOR}${NAME_COLUMN}`);
      await assertText(nameFilter.clearButton.element, CLEAR);
      await assertButtonStyle(nameFilter.clearButton.element, K_BUTTON_SOLID_BASE);
      await assertText(nameFilter.applyButton.element, FILTER);
      await assertButtonStyle(nameFilter.applyButton.element, K_BUTTON_SOLID_PRIMARY);
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
      await assertCount(membersPage.grid.rows, EXPECTED_RESULT_COUNT);
      await assertText(membersPage.grid.pagerInfo.element, EXPECTED_PAGER_TEXT);
    });
  });
});
