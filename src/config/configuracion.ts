/**
 * Configuración de la ejecución. Cada valor se puede cambiar con una variable de entorno.
 * Ejemplo (PowerShell): $env:HEADLESS="false"; npm test
 */
export type TipoNavegador = 'chromium' | 'firefox' | 'webkit';

const leer = (clave: string, porDefecto: string): string => process.env[clave]?.trim() || porDefecto;

export const configuracion = {
  urlBase: leer('URL_BASE', 'https://www.saucedemo.com/'),
  navegador: leer('NAVEGADOR', 'chromium').toLowerCase() as TipoNavegador,
  canal: leer('CANAL', ''),
  headless: leer('HEADLESS', 'true') !== 'false',
  slowMo: Number(leer('SLOWMO', '0')),
  timeout: Number(leer('TIMEOUT', '15000')),
  trazaEnFallo: leer('TRAZA_EN_FALLO', 'true') === 'true',
  passwordPorDefecto: leer('SAUCE_PASSWORD', 'secret_sauce'),
  ventana: { width: 1366, height: 768 }
};
