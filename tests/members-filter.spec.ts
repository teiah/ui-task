import { test } from '@playwright/test';
import { MembersPage } from '../pages';
import { InputFilterMenuComponent, NAME_COLUMN } from '../components';
import { CLEAR, FILTER, SEARCH_FOR, SOLID_BG, SOLID_TEXT, OUTLINE_BG, OUTLINE_TEXT } from '../constants';
import { assertCount, assertPlaceholder, assertButtonText, assertButtonStyle } from './helpers';

const TOTAL_ROW_COUNT = 10;
const EXPECTED_RESULT_COUNT = 2;

test.describe('Members page', () => {
  test('TC-UI-01 - Filter members by name and verify result count', async ({ page }) => {
    const membersPage = await MembersPage.open(page);
    const nameFilter = new InputFilterMenuComponent(membersPage.grid.getLocator(), NAME_COLUMN);

    await test.step(`Verify ${TOTAL_ROW_COUNT} members are displayed before filtering`, async () => {
      await assertCount(membersPage.grid.rows, TOTAL_ROW_COUNT);
    });

    await test.step('Verify Name filter menu elements', async () => {
      await nameFilter.open();
      await assertPlaceholder(nameFilter.input.element, `${SEARCH_FOR}${NAME_COLUMN}`);
      await assertButtonText(nameFilter.clearButton.element, CLEAR);
      await assertButtonStyle(nameFilter.clearButton.element, OUTLINE_BG, OUTLINE_TEXT);
      await assertButtonText(nameFilter.applyButton.element, FILTER);
      await assertButtonStyle(nameFilter.applyButton.element, SOLID_BG, SOLID_TEXT);
    });

    await test.step('Filter members by Name "zara"', async () => {
      await membersPage.grid.filterColumnByInputValue(NAME_COLUMN, 'zara');
    });

    await test.step(`Verify ${EXPECTED_RESULT_COUNT} results are displayed`, async () => {
      await assertCount(membersPage.grid.rows, EXPECTED_RESULT_COUNT);
    });
  });
});
