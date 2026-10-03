# Informe de estrategia de automatización – Sauce Demo

## 1. Objetivo y alcance

Automatizar el flujo principal de compra de Sauce Demo: inicio de sesión, gestión del carrito y checkout hasta la confirmación, con los usuarios `standard_user` y `locked_out_user`.

Fuera de alcance: pruebas visuales, de rendimiento y de accesibilidad, y los usuarios de prueba con defectos intencionales (`problem_user`, `error_user`, etc.).

## 2. Enfoque

| Pilar | Cómo se aplica |
|---|---|
| **Gherkin declarativo en español** | Los escenarios describen *qué* hace el cliente, no *cómo* (sin clics, selectores ni detalles técnicos). Usan `# language: es` (Característica, Escenario, Dado, Cuando, Entonces). |
| **Una característica por capacidad de negocio** | `login`, `carrito` y `compra`, alineadas con los criterios de aceptación. |
| **Escenarios independientes** | Cada escenario abre una sesión de navegador nueva y limpia (sin cookies ni carrito previo). Pueden ejecutarse en cualquier orden y en paralelo. |
| **Pruebas basadas en datos** | `Esquema del escenario` para credenciales inválidas y campos obligatorios del checkout; tablas de datos para productos y precios. |
| **Validaciones con espera automática** | Las validaciones de Playwright (`toHaveText`, `toBeVisible`…) esperan a que la pantalla esté lista; no se usan pausas fijas. |
| **Evidencias automáticas** | Captura de pantalla adjunta al reporte y traza de Playwright guardada cuando un escenario falla. |
| **Configuración externa** | URL, navegador, modo visible y tiempos se cambian con variables de entorno, sin tocar código. |

## 3. Patrones de diseño

- **Page Object Model (POM)**: cada pantalla tiene su clase (`LoginPage`, `ProductosPage`, `CarritoPage`, `CheckoutInformacionPage`, `CheckoutResumenPage`, `CheckoutCompletoPage`) con sus elementos y acciones. Si cambia la interfaz, se ajusta solo la página afectada.
- **Componentes de página**: elementos que se repiten en varias pantallas (`Encabezado` con el carrito, `MensajeError`) se modelan una sola vez.
- **Herencia (`BasePage`)**: comportamiento común (título de la página, lectura de montos, búsqueda por texto exacto).
- **Fachada de páginas (`Paginas`)**: un único punto de acceso a todas las páginas desde los steps.
- **World de Cucumber**: comparte el navegador y las páginas entre los steps de un mismo escenario sin variables globales.
- **Separación por capas**: *features* (negocio) → *steps* (traducción) → *pages* (interacción) → *config* (entorno).

## 4. Selectores

Se usan los atributos `data-test` que la aplicación expone para pruebas (configurados con `selectors.setTestIdAttribute('data-test')` y consultados con `getByTestId`) y roles accesibles (`getByRole('button', { name: 'Add to cart' })`). No se usan XPath ni clases CSS de estilo, que cambian con más frecuencia.

## 5. Diseño de casos

| Funcionalidad | Positivos | Negativos |
|---|---|---|
| Inicio de sesión | `standard_user` ingresa al catálogo | `locked_out_user` bloqueado; contraseña incorrecta; usuario no registrado; usuario vacío; contraseña vacía |
| Carrito | agregar producto (contador y botón "Remove"); ver productos con precio; quitar producto | – |
| Compra | compra completa con confirmación y carrito vacío; subtotal = suma de precios y total = subtotal + impuestos | sin nombre, sin apellido, sin código postal |

El escenario de montos no fija valores: calcula lo esperado a partir de los precios que muestra la pantalla, así sigue siendo válido aunque cambien los precios.

## 6. Ejecución continua

`.github/workflows/pruebas-ui.yml` instala dependencias y Chromium, revisa los tipos de TypeScript, ejecuta la suite y publica el reporte HTML y las trazas como artefactos.

## 7. Mejoras propuestas

- Reporte enriquecido con Allure o `multiple-cucumber-html-reporter`.
- Ejecución en varios navegadores en la misma corrida (matriz en GitHub Actions).
- Reutilizar la sesión iniciada (`storageState`) para acelerar los escenarios que no prueban el login.
- Pruebas de accesibilidad con `@axe-core/playwright` y comparación visual.
