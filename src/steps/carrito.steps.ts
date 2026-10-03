import { DataTable, Given as Dado, Then as Entonces, When as Cuando } from '@cucumber/cucumber';
import { expect } from '../support/aserciones';
import { CustomWorld } from '../support/world';

Cuando('agrega el producto {string} al carrito', async function (this: CustomWorld, producto: string) {
  await this.paginas.productos.agregarAlCarrito(producto);
});

Dado('que agregó al carrito los productos:', async function (this: CustomWorld, tabla: DataTable) {
  for (const [producto] of tabla.raw()) {
    await this.paginas.productos.agregarAlCarrito(producto);
  }
  await expect(this.paginas.encabezado.contadorCarrito).toHaveText(String(tabla.raw().length));
});

Cuando('ingresa al carrito de compras', async function (this: CustomWorld) {
  await this.paginas.encabezado.irAlCarrito();
  await expect(this.paginas.carrito.titulo).toHaveText('Your Cart');
});

Cuando('quita el producto {string} del carrito', async function (this: CustomWorld, producto: string) {
  await this.paginas.carrito.quitar(producto);
});

Entonces('el carrito indica {int} producto(s)', async function (this: CustomWorld, cantidad: number) {
  await expect(this.paginas.encabezado.contadorCarrito).toHaveText(String(cantidad));
});

Entonces('el producto {string} figura como agregado', async function (this: CustomWorld, producto: string) {
  await expect(this.paginas.productos.botonQuitar(producto)).toBeVisible();
});

Entonces('visualiza en el carrito los productos:', async function (this: CustomWorld, tabla: DataTable) {
  const { carrito } = this.paginas;
  const esperados = tabla.hashes();

  await expect(carrito.productos).toHaveCount(esperados.length);
  for (const { producto, precio } of esperados) {
    await expect(carrito.producto(producto)).toBeVisible();
    await expect(carrito.precioDe(producto)).toHaveText(precio);
  }
});

Entonces('el producto {string} ya no está en el carrito', async function (this: CustomWorld, producto: string) {
  await expect(this.paginas.carrito.producto(producto)).toHaveCount(0);
});
