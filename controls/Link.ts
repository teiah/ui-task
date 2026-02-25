import { FormControl } from './FormControl';

export class Link extends FormControl {
  async click(): Promise<void> {
    await this.locator.click();
  }
}
