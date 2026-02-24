import { expect, Locator } from '@playwright/test';

export async function assertCount(locator: Locator, expected: number): Promise<void> {
  await expect(locator).toHaveCount(expected);
}

export async function assertText(locator: Locator, expected: string): Promise<void> {
  await expect(locator).toHaveText(expected);
}

export async function assertPlaceholder(locator: Locator, expected: string): Promise<void> {
  await expect(locator).toHaveAttribute('placeholder', expected);
}

export async function assertButtonStyle(locator: Locator, cssClass: string): Promise<void> {
  await expect(locator).toHaveClass(new RegExp(cssClass));
}

export async function assertHidden(locator: Locator): Promise<void> {
  await expect(locator).toBeHidden();
}
