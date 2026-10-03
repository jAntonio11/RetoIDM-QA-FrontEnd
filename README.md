# Reto QA Frontend – Sauce Demo con Playwright + Cucumber + TypeScript

Suite de pruebas automatizadas E2E para [Sauce Demo](https://www.saucedemo.com/) construida con **Playwright**, **Cucumber (Gherkin en español)** y **TypeScript**, aplicando el patrón **Page Object Model**.

> Historia de usuario: *Como cliente de Sauce Demo, quiero poder iniciar sesión, agregar productos al carrito y completar una compra, para poder adquirir los productos que necesito.*

## Stack

| Herramienta | Versión | Uso |
|---|---|---|
| Node.js | 22 LTS o superior | Ejecución |
| TypeScript | 5.9 | Lenguaje |
| Playwright | 1.5x / 1.6x | Automatización del navegador |
| Cucumber (`@cucumber/cucumber`) | 13 | Escenarios Gherkin y reportes |

## Estructura del proyecto

```text
qa-frontend-playwright/
├── package.json
├── tsconfig.json
├── cucumber.js                     ← configuración de Cucumber (rutas, reportes, idioma)
├── docs/informe-estrategia.md      ← informe de estrategia y patrones
├── .github/workflows/pruebas-ui.yml
├── features/                       ← escenarios en Gherkin (español)
│   ├── login.feature
│   ├── carrito.feature
│   └── compra.feature
└── src/
    ├── config/configuracion.ts     ← URL, navegador, modo visible, tiempos
    ├── pages/                      ← Page Objects
    │   ├── BasePage.ts
    │   ├── LoginPage.ts
    │   ├── ProductosPage.ts
    │   ├── CarritoPage.ts
    │   ├── CheckoutInformacionPage.ts
    │   ├── CheckoutResumenPage.ts
    │   ├── CheckoutCompletoPage.ts
    │   ├── Paginas.ts              ← acceso único a todas las páginas
    │   └── componentes/
    │       ├── Encabezado.ts
    │       └── MensajeError.ts
    ├── steps/                      ← step definitions
    │   ├── login.steps.ts
    │   ├── carrito.steps.ts
    │   └── compra.steps.ts
    └── support/
        ├── world.ts                ← estado de cada escenario
        ├── hooks.ts                ← apertura/cierre del navegador y evidencias
        └── aserciones.ts
```

## Requisitos previos

- Node.js 22 o superior (`node -v`)
- npm (incluido con Node.js)

## Instalación

```bash
npm install
npx playwright install chromium
```

## Ejecución

```bash
npm test                 # suite completa (sin ventana del navegador)
npm run test:smoke       # solo pruebas de humo
npm run test:headed      # viendo el navegador, en cámara lenta
npm run test:paralelo    # 3 escenarios en paralelo
npm run typecheck        # revisión de tipos de TypeScript

# Por etiqueta
npx cucumber-js --tags @locked_out_user
npx cucumber-js --tags "@compra and not @negativo"
```

### Variables de configuración (opcionales)

| Variable | Valor por defecto | Descripción |
|---|---|---|
| `URL_BASE` | `https://www.saucedemo.com/` | URL de la aplicación |
| `NAVEGADOR` | `chromium` | `chromium`, `firefox` o `webkit` |
| `CANAL` | *(vacío)* | `chrome` o `msedge` para usar el navegador instalado en el equipo |
| `HEADLESS` | `true` | `false` para ver el navegador |
| `SLOWMO` | `0` | Pausa en milisegundos entre acciones |
| `TIMEOUT` | `15000` | Espera máxima de cada acción y validación |
| `TRAZA_EN_FALLO` | `true` | Guarda la traza de Playwright cuando un escenario falla |
| `SAUCE_PASSWORD` | `secret_sauce` | Contraseña usada en el paso de inicio de sesión previo |

En PowerShell: `$env:HEADLESS="false"; npm test` · En Bash: `HEADLESS=false npm test`

### Tags disponibles

`@smoke` · `@positivo` · `@negativo` · `@e2e` · `@login` · `@carrito` · `@compra` · `@standard_user` · `@locked_out_user`

## Reportes y evidencias

| Archivo | Contenido |
|---|---|
| `reports/cucumber-report.html` | Reporte HTML con cada paso; incluye captura de pantalla si el escenario falla |
| `reports/cucumber-report.json` | Resultado en JSON (para Jenkins, Xray, etc.) |
| `reports/trazas/*.zip` | Traza de Playwright de los escenarios fallidos. Se abre con `npx playwright show-trace reports/trazas/<archivo>.zip` |

## Cobertura de criterios de aceptación

| # | Criterio | Feature | Escenarios |
|---|---|---|---|
| 1 | Iniciar sesión con credenciales válidas | `login.feature` | `standard_user` |
| 2 | No iniciar sesión con credenciales inválidas | `login.feature` | `locked_out_user` + 4 casos de datos inválidos |
| 3 | Agregar un producto al carrito | `carrito.feature` | agregar producto |
| 4 | Ver los productos agregados en el carrito | `carrito.feature` | ver productos y precios, quitar producto |
| 5 | Completar la compra hasta la confirmación | `compra.feature` | compra completa, montos del resumen, 3 validaciones de datos de envío |

**Total: 14 escenarios.**

## Informe de estrategia

Ver [`docs/informe-estrategia.md`](docs/informe-estrategia.md).
