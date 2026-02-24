import { Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { Button } from '../controls';
import { BUTTON, LINK, CLEAR, FILTER } from '../constants';

export const COLUMN_MENU_ROLE = 'Column menu';

const CLEAR_BUTTON_BG_COLOR = 'rgb(255, 255, 255)';
const CLEAR_BUTTON_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)';
const FILTER_BUTTON_BG_COLOR = 'rgb(45, 62, 208)';
const FILTER_BUTTON_TEXT_COLOR = 'rgb(255, 255, 255)';

export abstract class FilterMenuComponent extends BaseComponent {
  private readonly clearButton: Button;
  private readonly applyButton: Button;

  constructor(grid: Locator, protected readonly column: string) {
    super(grid);
    this.clearButton = new Button(this.root.getByRole(BUTTON, { name: CLEAR }));
    this.applyButton = new Button(this.root.getByRole(BUTTON, { name: FILTER }));
  }

  private columnMenuButton(): Button {
    return new Button(this.root.getByRole(LINK, { name: `${this.column} ${COLUMN_MENU_ROLE}` }));
  }

  async open(): Promise<void> {
    await this.columnMenuButton().click();
  }

  abstract assertOpen(): Promise<void>;
  abstract assertClosed(): Promise<void>;

  async assertClearButton(): Promise<void> {
    await this.clearButton.assertText(CLEAR);
    await this.clearButton.assertBackgroundColor(CLEAR_BUTTON_BG_COLOR);
    await this.clearButton.assertTextColor(CLEAR_BUTTON_TEXT_COLOR);
  }

  async assertApplyButton(): Promise<void> {
    await this.applyButton.assertText(FILTER);
    await this.applyButton.assertBackgroundColor(FILTER_BUTTON_BG_COLOR);
    await this.applyButton.assertTextColor(FILTER_BUTTON_TEXT_COLOR);
  }

  async apply(): Promise<void> {
    await this.applyButton.click();
  }

  async clear(): Promise<void> {
    await this.clearButton.click();
  }
}
