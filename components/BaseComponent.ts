import { Locator } from '@playwright/test';

export abstract class BaseComponent {
  constructor(protected readonly root: Locator) {}

  find(selector: string): Locator {
    return this.root.locator(selector);
  }
}
