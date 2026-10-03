import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  readonly titulo: Locator;

  protected constructor(protected readonly page: Page) {
    this.titulo = page.getByTestId('title');
  }

  /** Expresión para ubicar un texto exacto (evita confundir productos con nombres parecidos). */
  protected textoExacto(texto: string): RegExp {
    const escapado = texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^\\s*${escapado}\\s*$`);
  }

  protected convertirMonto(texto: string | null): number {
    const coincidencia = (texto ?? '').match(/\$\s*([0-9]+(?:\.[0-9]+)?)/);
    if (!coincidencia) {
      throw new Error(`No se encontró un monto en el texto: "${texto}"`);
    }
    return Number(coincidencia[1]);
  }
}
