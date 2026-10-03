import { Locator, Page } from '@playwright/test';

/** Barra superior presente en todas las páginas después de iniciar sesión. */
export class Encabezado {
  readonly contadorCarrito: Locator;
  readonly enlaceCarrito: Locator;

  constructor(page: Page) {
    this.contadorCarrito = page.getByTestId('shopping-cart-badge');
    this.enlaceCarrito = page.getByTestId('shopping-cart-link');
  }

  async irAlCarrito(): Promise<void> {
    await this.enlaceCarrito.click();
  }
}
