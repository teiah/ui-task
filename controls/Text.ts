import { Locator } from '@playwright/test';
import { FormControl } from './FormControl';

export class Text extends FormControl {
  constructor(locator: Locator) {
    super(locator);
  }
}
