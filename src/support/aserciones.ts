import { expect as expectBase } from '@playwright/test';
import { configuracion } from '../config/configuracion';

/** Validaciones con espera automática, usando el tiempo máximo configurado. */
export const expect = expectBase.configure({ timeout: configuracion.timeout });
