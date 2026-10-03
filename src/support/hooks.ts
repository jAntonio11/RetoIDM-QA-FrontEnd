import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, chromium, firefox, selectors, webkit } from '@playwright/test';
import { configuracion } from '../config/configuracion';
import { Paginas } from '../pages/Paginas';
import { CustomWorld } from './world';

setDefaultTimeout(60_000);

let navegador: Browser;

BeforeAll(async function () {
  selectors.setTestIdAttribute('data-test');
  const tipos = { chromium, firefox, webkit };
  navegador = await (tipos[configuracion.navegador] ?? chromium).launch({
    headless: configuracion.headless,
    slowMo: configuracion.slowMo,
    channel: configuracion.canal || undefined
  });
});

Before(async function (this: CustomWorld) {
  this.sesion = await navegador.newContext({ viewport: configuracion.ventana });
  this.sesion.setDefaultTimeout(configuracion.timeout);
  if (configuracion.trazaEnFallo) {
    await this.sesion.tracing.start({ screenshots: true, snapshots: true });
  }
  this.page = await this.sesion.newPage();
  this.paginas = new Paginas(this.page);
});

After(async function (this: CustomWorld, { pickle, result }) {
  const fallo = result?.status === Status.FAILED;

  if (fallo && this.page) {
    const captura = await this.page.screenshot({ fullPage: true });
    this.attach(captura, 'image/png');
  }

  if (configuracion.trazaEnFallo && this.sesion) {
    const nombre = pickle.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '_');
    await this.sesion.tracing.stop(fallo ? { path: `reports/trazas/${nombre}.zip` } : undefined);
  }

  await this.sesion?.close();
});

AfterAll(async function () {
  await navegador?.close();
});
