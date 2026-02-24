import { test } from '@playwright/test';
import { MembersPage } from '../pages';
import { NAME_COLUMN } from '../components';
import { CLEAR, FILTER, SEARCH_FOR, SOLID_BG, SOLID_TEXT, OUTLINE_BG, OUTLINE_TEXT } from '../constants';
import { assertCount, assertText, assertPlaceholder, assertButtonText, assertButtonStyle } from './helpers';

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

    await test.step('Open Name filter menu and verify elements', async () => {
      const nameFilter = membersPage.grid.filter(NAME_COLUMN);
      await nameFilter.open();
      await assertPlaceholder(nameFilter.input.element, `${SEARCH_FOR}${NAME_COLUMN}`);
      await assertButtonText(nameFilter.clearButton.element, CLEAR);
      await assertButtonStyle(nameFilter.clearButton.element, OUTLINE_BG, OUTLINE_TEXT);
      await assertButtonText(nameFilter.applyButton.element, FILTER);
      await assertButtonStyle(nameFilter.applyButton.element, SOLID_BG, SOLID_TEXT);
    });

    await test.step(`Filter members by Name "${FILTER_VALUE}"`, async () => {
      await membersPage.grid.filterColumnByInputValue(NAME_COLUMN, FILTER_VALUE);
    });

    await test.step(`Verify ${EXPECTED_RESULT_COUNT} results are displayed`, async () => {
      await assertCount(membersPage.grid.rows, EXPECTED_RESULT_COUNT);
      await assertText(membersPage.grid.pagerInfo, EXPECTED_PAGER_TEXT);
    });
  });
});
