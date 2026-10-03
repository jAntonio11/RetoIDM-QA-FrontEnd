import { Locator, Page } from '@playwright/test';

/** Mensaje de error que la aplicación muestra en los formularios (inicio de sesión y checkout). */
export class MensajeError {
  readonly texto: Locator;

  constructor(page: Page) {
    this.texto = page.getByTestId('error');
  }
}
