import { Locator, Page } from '@playwright/test';
import { configuracion } from '../config/configuracion';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly campoUsuario: Locator;
  readonly campoPassword: Locator;
  readonly botonIngresar: Locator;

  constructor(page: Page) {
    super(page);
    this.campoUsuario = page.getByTestId('username');
    this.campoPassword = page.getByTestId('password');
    this.botonIngresar = page.getByTestId('login-button');
  }

  async abrir(): Promise<void> {
    await this.page.goto(configuracion.urlBase);
  }

  async iniciarSesion(usuario: string, password: string): Promise<void> {
    await this.campoUsuario.fill(usuario);
    await this.campoPassword.fill(password);
    await this.botonIngresar.click();
  }
}
