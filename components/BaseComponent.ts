import { Locator, expect } from '@playwright/test';

export abstract class BaseComponent {
  constructor(protected readonly root: Locator) {}

  getLocator(): Locator {
    return this.root;
  }

  async assertVisible(): Promise<void> {
    expect(await this.getLocator().isVisible()).toBe(true);
  }
}
