import { expect, Locator } from '@playwright/test';

export async function assertCount(locator: Locator, expected: number): Promise<void> {
  await expect(locator).toHaveCount(expected);
}
