import { Page } from '@playwright/test';

export abstract class BasePage {
  protected abstract readonly url: string;

  constructor(protected readonly page: Page) {}

  abstract isLoaded(): Promise<void>;

  static async open<T extends BasePage>(
    this: new (page: Page) => T,
    page: Page
  ): Promise<T> {
    const instance = new this(page);
    await instance.goTo();
    return instance;
  }

  async goTo(): Promise<void> {
    await this.page.goto(this.url);
    await this.isLoaded();
  }
}
