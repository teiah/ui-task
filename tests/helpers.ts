import { expect, Locator } from '@playwright/test';
import { BACKGROUND_COLOR, COLOR } from '../constants';

export async function assertCount(locator: Locator, expected: number): Promise<void> {
  await expect(locator).toHaveCount(expected);
}

export async function assertPlaceholder(locator: Locator, expected: string): Promise<void> {
  await expect(locator).toHaveAttribute('placeholder', expected);
}

export async function assertButtonText(locator: Locator, expected: string): Promise<void> {
  await expect(locator).toHaveText(expected);
}

export async function assertButtonStyle(locator: Locator, bgColor: string, textColor: string): Promise<void> {
  await expect(locator).toHaveCSS(BACKGROUND_COLOR, bgColor);
  await expect(locator).toHaveCSS(COLOR, textColor);
}
