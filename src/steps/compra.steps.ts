import { Given as Dado, Then as Entonces, When as Cuando } from '@cucumber/cucumber';
import { expect } from '../support/aserciones';
import { CustomWorld } from '../support/world';

Dado('inicia el proceso de compra', async function (this: CustomWorld) {
  await this.paginas.carrito.irAlCheckout();
  await expect(this.paginas.checkoutInformacion.titulo).toHaveText('Checkout: Your Information');
});

Cuando(
  'registra sus datos de envío con nombre {string}, apellido {string} y código postal {string}',
  async function (this: CustomWorld, nombre: string, apellido: string, codigoPostal: string) {
    await this.paginas.checkoutInformacion.registrarDatos({ nombre, apellido, codigoPostal });
  }
);

Cuando('confirma la compra', async function (this: CustomWorld) {
  const { checkoutResumen } = this.paginas;
  await expect(checkoutResumen.titulo).toHaveText('Checkout: Overview');
  await checkoutResumen.finalizarCompra();
});

Entonces('se muestra la confirmación {string}', async function (this: CustomWorld, mensaje: string) {
  const { checkoutCompleto } = this.paginas;
  await expect(checkoutCompleto.titulo).toHaveText('Checkout: Complete!');
  await expect(checkoutCompleto.mensajeConfirmacion).toHaveText(mensaje);
});

Entonces('el carrito queda vacío', async function (this: CustomWorld) {
  await expect(this.paginas.encabezado.contadorCarrito).toBeHidden();
});

Entonces('el subtotal es igual a la suma de los precios de los productos', async function (this: CustomWorld) {
  const { checkoutResumen } = this.paginas;
  await expect(checkoutResumen.titulo).toHaveText('Checkout: Overview');
  expect(await checkoutResumen.montoSubtotal()).toBe(await checkoutResumen.sumaDePrecios());
});

Entonces('el total es igual al subtotal más los impuestos', async function (this: CustomWorld) {
  const { checkoutResumen } = this.paginas;
  const subtotal = await checkoutResumen.montoSubtotal();
  const impuesto = await checkoutResumen.montoImpuesto();
  expect(await checkoutResumen.montoTotal()).toBe(checkoutResumen.redondear(subtotal + impuesto));
});

Entonces('permanece en el formulario de datos de envío', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/checkout-step-one\.html$/);
  await expect(this.paginas.checkoutInformacion.titulo).toHaveText('Checkout: Your Information');
});
