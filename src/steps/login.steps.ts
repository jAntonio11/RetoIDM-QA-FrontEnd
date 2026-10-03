import { Given as Dado, Then as Entonces, When as Cuando } from '@cucumber/cucumber';
import { configuracion } from '../config/configuracion';
import { expect } from '../support/aserciones';
import { CustomWorld } from '../support/world';

Dado('que el cliente se encuentra en la página de inicio de sesión', async function (this: CustomWorld) {
  await this.paginas.login.abrir();
});

Dado('que el cliente inició sesión como {string}', async function (this: CustomWorld, usuario: string) {
  const { login, productos } = this.paginas;
  await login.abrir();
  await login.iniciarSesion(usuario, configuracion.passwordPorDefecto);
  await expect(productos.titulo).toHaveText('Products');
});

Cuando(
  'inicia sesión con el usuario {string} y la contraseña {string}',
  async function (this: CustomWorld, usuario: string, contrasena: string) {
    await this.paginas.login.iniciarSesion(usuario, contrasena);
  }
);

Entonces('ingresa al catálogo de productos', async function (this: CustomWorld) {
  const { productos } = this.paginas;
  await expect(this.page).toHaveURL(/\/inventory\.html$/);
  await expect(productos.titulo).toHaveText('Products');
  await expect(productos.productos.first()).toBeVisible();
});

Entonces('permanece en la página de inicio de sesión', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(configuracion.urlBase);
  await expect(this.paginas.login.botonIngresar).toBeVisible();
});

Entonces('se muestra el mensaje {string}', async function (this: CustomWorld, mensaje: string) {
  await expect(this.paginas.mensajeError.texto).toHaveText(mensaje);
});
