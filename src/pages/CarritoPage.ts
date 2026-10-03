import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CarritoPage extends BasePage {
  readonly productos: Locator;
  readonly botonCheckout: Locator;

  constructor(page: Page) {
    super(page);
    this.productos = page.getByTestId('inventory-item');
    this.botonCheckout = page.getByTestId('checkout');
  }

  producto(nombre: string): Locator {
    return this.productos.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: this.textoExacto(nombre) })
    });
  }

  precioDe(nombre: string): Locator {
    return this.producto(nombre).getByTestId('inventory-item-price');
  }

  async quitar(nombre: string): Promise<void> {
    await this.producto(nombre).getByRole('button', { name: 'Remove' }).click();
  }

  async irAlCheckout(): Promise<void> {
    await this.botonCheckout.click();
  }
}
