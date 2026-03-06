import { test } from './fixtures';
import { NAME_COLUMN } from '../components';
import { CLEAR, FILTER, SEARCH_FOR, K_BUTTON_SOLID_PRIMARY, K_BUTTON_SOLID_BASE } from '../constants';

test('TC-UI-01 - Filter members by name and verify result count', async ({ membersPage }) => {
  const UNFILTERED_ROW_COUNT = 10;
  const FILTER_VALUE = 'zara';
  const EXPECTED_RESULT_COUNT = 2;
  const EXPECTED_PAGER_TEXT = `1 - ${EXPECTED_RESULT_COUNT} out of ${EXPECTED_RESULT_COUNT}`;
  const EXPECTED_ACTIVE_FILTERS_TEXT = `Active Filters: ${NAME_COLUMN} (${FILTER_VALUE})`;

  const { grid } = membersPage;
  const { nameFilter } = grid;

  await test.step(`verify ${UNFILTERED_ROW_COUNT} members are displayed before filtering`, async () => {
    await grid.assertRowCount(UNFILTERED_ROW_COUNT);
  });

  await test.step('verify no status filters are selected', async () => {
    await grid.activeFiltersText.assertHidden();
  });

  await test.step('open Name filter menu and verify elements', async () => {
    await nameFilter.open();
    await Promise.all([
      nameFilter.inputLabel.assertText(NAME_COLUMN),
      nameFilter.input.assertPlaceholder(`${SEARCH_FOR}${NAME_COLUMN}`),
      nameFilter.clearButton.assertText(CLEAR),
      nameFilter.clearButton.assertStyle(K_BUTTON_SOLID_BASE),
      nameFilter.applyButton.assertText(FILTER),
      nameFilter.applyButton.assertStyle(K_BUTTON_SOLID_PRIMARY),
      nameFilter.applyButton.assertDisabled(),
    ]);
  });

  await test.step(`enter "${FILTER_VALUE}" in Name filter and verify Filter button is enabled`, async () => {
    await nameFilter.fill(FILTER_VALUE);
    await nameFilter.applyButton.assertEnabled();
  });

  await test.step('apply Name filter', async () => {
    await nameFilter.clickFilterButton();
  });

  await test.step(`verify filter is applied and ${EXPECTED_RESULT_COUNT} results are displayed`, async () => {
    await grid.assertRowCount(EXPECTED_RESULT_COUNT);
    await grid.assertColumnContains(NAME_COLUMN, FILTER_VALUE);
    await grid.pagerInfo.assertText(EXPECTED_PAGER_TEXT);
    await grid.activeFiltersText.assertText(EXPECTED_ACTIVE_FILTERS_TEXT);
    await grid.resetFiltersButton.assertVisible();
  });
});
