import { test, expect } from '@playwright/test';
import { MembersPage } from '../pages';
import { InputFilterMenuComponent, NAME_COLUMN } from '../components';
import { CLEAR, FILTER, BACKGROUND_COLOR, COLOR } from '../constants';

const TOTAL_ROW_COUNT = 10;
const EXPECTED_RESULT_COUNT = 2;
const SEARCH_PLACEHOLDER = `Search for ${NAME_COLUMN}`;
const CLEAR_BUTTON_BG_COLOR = 'rgb(255, 255, 255)';
const CLEAR_BUTTON_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)';
const FILTER_BUTTON_BG_COLOR = 'rgb(45, 62, 208)';
const FILTER_BUTTON_TEXT_COLOR = 'rgb(255, 255, 255)';

test.describe('Members page', () => {
  test('TC-UI-01 - Filter members by name and verify result count', async ({ page }) => {
    const membersPage = await MembersPage.open(page);
    const nameFilter = new InputFilterMenuComponent(membersPage.grid.getLocator(), NAME_COLUMN);

    await test.step(`Verify ${TOTAL_ROW_COUNT} members are displayed before filtering`, async () => {
      await expect(membersPage.grid.rows).toHaveCount(TOTAL_ROW_COUNT);
    });

    await test.step('Verify Name filter menu elements', async () => {
      await nameFilter.open();
      await expect(nameFilter.input.element).toHaveAttribute('placeholder', SEARCH_PLACEHOLDER);
      await expect(nameFilter.clearButton.element).toHaveText(CLEAR);
      await expect(nameFilter.clearButton.element).toHaveCSS(BACKGROUND_COLOR, CLEAR_BUTTON_BG_COLOR);
      await expect(nameFilter.clearButton.element).toHaveCSS(COLOR, CLEAR_BUTTON_TEXT_COLOR);
      await expect(nameFilter.applyButton.element).toHaveText(FILTER);
      await expect(nameFilter.applyButton.element).toHaveCSS(BACKGROUND_COLOR, FILTER_BUTTON_BG_COLOR);
      await expect(nameFilter.applyButton.element).toHaveCSS(COLOR, FILTER_BUTTON_TEXT_COLOR);
    });

    await test.step('Filter members by Name "zara"', async () => {
      await membersPage.grid.filterColumnByInputValue(NAME_COLUMN, 'zara');
    });

    await test.step(`Verify ${EXPECTED_RESULT_COUNT} results are displayed`, async () => {
      await expect(membersPage.grid.rows).toHaveCount(EXPECTED_RESULT_COUNT);
    });
  });
});
