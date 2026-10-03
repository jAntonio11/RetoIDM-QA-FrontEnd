import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductosPage extends BasePage {
  readonly productos: Locator;

  constructor(page: Page) {
    super(page);
    this.productos = page.getByTestId('inventory-item');
  }

  producto(nombre: string): Locator {
    return this.productos.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: this.textoExacto(nombre) })
    });
  }

  botonAgregar(nombre: string): Locator {
    return this.producto(nombre).getByRole('button', { name: 'Add to cart' });
  }

  botonQuitar(nombre: string): Locator {
    return this.producto(nombre).getByRole('button', { name: 'Remove' });
  }

  async agregarAlCarrito(nombre: string): Promise<void> {
    await this.botonAgregar(nombre).click();
  }
}
