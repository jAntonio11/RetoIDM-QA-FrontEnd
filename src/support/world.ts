import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { Paginas } from '../pages/Paginas';

/** Estado de cada escenario: su propia sesión de navegador y sus páginas. */
export class CustomWorld extends World {
  sesion!: BrowserContext;
  page!: Page;
  paginas!: Paginas;

  constructor(opciones: IWorldOptions) {
    super(opciones);
  }
}

setWorldConstructor(CustomWorld);
