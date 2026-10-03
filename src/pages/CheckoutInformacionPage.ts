import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface DatosEnvio {
  nombre: string;
  apellido: string;
  codigoPostal: string;
}

export class CheckoutInformacionPage extends BasePage {
  readonly campoNombre: Locator;
  readonly campoApellido: Locator;
  readonly campoCodigoPostal: Locator;
  readonly botonContinuar: Locator;

  constructor(page: Page) {
    super(page);
    this.campoNombre = page.getByTestId('firstName');
    this.campoApellido = page.getByTestId('lastName');
    this.campoCodigoPostal = page.getByTestId('postalCode');
    this.botonContinuar = page.getByTestId('continue');
  }

  async registrarDatos({ nombre, apellido, codigoPostal }: DatosEnvio): Promise<void> {
    await this.campoNombre.fill(nombre);
    await this.campoApellido.fill(apellido);
    await this.campoCodigoPostal.fill(codigoPostal);
    await this.botonContinuar.click();
  }
}
