import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutResumenPage extends BasePage {
  readonly preciosProductos: Locator;
  readonly subtotal: Locator;
  readonly impuesto: Locator;
  readonly total: Locator;
  readonly botonFinalizar: Locator;

  constructor(page: Page) {
    super(page);
    this.preciosProductos = page.getByTestId('inventory-item-price');
    this.subtotal = page.getByTestId('subtotal-label');
    this.impuesto = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.botonFinalizar = page.getByTestId('finish');
  }

  async sumaDePrecios(): Promise<number> {
    const precios = await this.preciosProductos.allTextContents();
    return this.redondear(precios.reduce((suma, precio) => suma + this.convertirMonto(precio), 0));
  }

  async montoSubtotal(): Promise<number> {
    return this.convertirMonto(await this.subtotal.textContent());
  }

  async montoImpuesto(): Promise<number> {
    return this.convertirMonto(await this.impuesto.textContent());
  }

  async montoTotal(): Promise<number> {
    return this.convertirMonto(await this.total.textContent());
  }

  async finalizarCompra(): Promise<void> {
    await this.botonFinalizar.click();
  }

  redondear(valor: number): number {
    return Math.round(valor * 100) / 100;
  }
}
