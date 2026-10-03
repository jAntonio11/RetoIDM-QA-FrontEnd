import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletoPage extends BasePage {
  readonly mensajeConfirmacion: Locator;
  readonly botonVolver: Locator;

  constructor(page: Page) {
    super(page);
    this.mensajeConfirmacion = page.getByTestId('complete-header');
    this.botonVolver = page.getByTestId('back-to-products');
  }
}
