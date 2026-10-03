import { Page } from '@playwright/test';
import { CarritoPage } from './CarritoPage';
import { CheckoutCompletoPage } from './CheckoutCompletoPage';
import { CheckoutInformacionPage } from './CheckoutInformacionPage';
import { CheckoutResumenPage } from './CheckoutResumenPage';
import { Encabezado } from './componentes/Encabezado';
import { MensajeError } from './componentes/MensajeError';
import { LoginPage } from './LoginPage';
import { ProductosPage } from './ProductosPage';

/** Punto único de acceso a las páginas de la aplicación durante un escenario. */
export class Paginas {
  readonly login: LoginPage;
  readonly productos: ProductosPage;
  readonly carrito: CarritoPage;
  readonly checkoutInformacion: CheckoutInformacionPage;
  readonly checkoutResumen: CheckoutResumenPage;
  readonly checkoutCompleto: CheckoutCompletoPage;
  readonly encabezado: Encabezado;
  readonly mensajeError: MensajeError;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.productos = new ProductosPage(page);
    this.carrito = new CarritoPage(page);
    this.checkoutInformacion = new CheckoutInformacionPage(page);
    this.checkoutResumen = new CheckoutResumenPage(page);
    this.checkoutCompleto = new CheckoutCompletoPage(page);
    this.encabezado = new Encabezado(page);
    this.mensajeError = new MensajeError(page);
  }
}
