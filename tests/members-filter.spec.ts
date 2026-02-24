import { test, expect, Locator } from '@playwright/test';
import { MembersPage } from '../pages';
import { InputFilterMenuComponent, NAME_COLUMN } from '../components';
import { CLEAR, FILTER, BACKGROUND_COLOR, COLOR, SEARCH_FOR, SOLID_BG, SOLID_TEXT, OUTLINE_BG, OUTLINE_TEXT } from '../constants';

const TOTAL_ROW_COUNT = 10;
const EXPECTED_RESULT_COUNT = 2;

async function assertButtonStyle(locator: Locator, bgColor: string, textColor: string): Promise<void> {
  await expect(locator).toHaveCSS(BACKGROUND_COLOR, bgColor);
  await expect(locator).toHaveCSS(COLOR, textColor);
}

test.describe('Members page', () => {
  test('TC-UI-01 - Filter members by name and verify result count', async ({ page }) => {
    const membersPage = await MembersPage.open(page);
    const nameFilter = new InputFilterMenuComponent(membersPage.grid.getLocator(), NAME_COLUMN);

    await test.step(`Verify ${TOTAL_ROW_COUNT} members are displayed before filtering`, async () => {
      await expect(membersPage.grid.rows).toHaveCount(TOTAL_ROW_COUNT);
    });

    await test.step('Verify Name filter menu elements', async () => {
      await nameFilter.open();
      await expect(nameFilter.input.element).toHaveAttribute('placeholder', `${SEARCH_FOR}${NAME_COLUMN}`);
      await expect(nameFilter.clearButton.element).toHaveText(CLEAR);
      await assertButtonStyle(nameFilter.clearButton.element, OUTLINE_BG, OUTLINE_TEXT);
      await expect(nameFilter.applyButton.element).toHaveText(FILTER);
      await assertButtonStyle(nameFilter.applyButton.element, SOLID_BG, SOLID_TEXT);
    });

    await test.step('Filter members by Name "zara"', async () => {
      await membersPage.grid.filterColumnByInputValue(NAME_COLUMN, 'zara');
    });

    await test.step(`Verify ${EXPECTED_RESULT_COUNT} results are displayed`, async () => {
      await expect(membersPage.grid.rows).toHaveCount(EXPECTED_RESULT_COUNT);
    });
  });
});
