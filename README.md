# Test Login Project

Proyecto de automatización de pruebas **End-to-End (E2E)** con [Playwright](https://playwright.dev/) y **TypeScript** que valida el formulario de inicio de sesión del sitio de práctica [Practice Test Automation](https://practicetestautomation.com/practice-test-login/).

El proyecto está organizado con el patrón **Page Object Model (POM)**, que separa la lógica de interacción con la página (localizadores y acciones) de la definición de los casos de prueba.

---

## Tabla de contenido

- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución de las pruebas](#ejecución-de-las-pruebas)
- [Casos de prueba](#casos-de-prueba)
- [Page Objects](#page-objects)
- [Configuración de Playwright](#configuración-de-playwright)
- [Reportes y evidencias](#reportes-y-evidencias)
- [Integración continua (GitHub Actions)](#integración-continua-github-actions)
- [Notas y buenas prácticas](#notas-y-buenas-prácticas)

---

## Tecnologías

| Herramienta | Versión | Uso |
|---|---|---|
| [@playwright/test](https://playwright.dev/) | ^1.65.0 | Framework de pruebas E2E y runner |
| TypeScript | (incluido en Playwright) | Lenguaje de las pruebas |
| [@types/node](https://www.npmjs.com/package/@types/node) | ^26.6.6 | Tipos de Node.js |
| [@faker-js/faker](https://fakerjs.dev/) | ^10.6.0 | Generación de datos de prueba (instalado, aún sin uso) |
| GitHub Actions | — | Ejecución automática de las pruebas (CI) |

---

## Estructura del proyecto

```
test_login_project/
├── .github/
│   └── workflows/
│       └── playwright.yml        # Pipeline de CI en GitHub Actions
├── PageObjects/
│   ├── Login/
│   │   └── LoginPage.ts          # Localizadores, acciones y validaciones del login
│   └── URL_Page.ts               # Navegación a la página de login
├── tests/
│   └── LoginUser/
│       └── UserLogin.spec.ts     # Casos de prueba del login
├── playwright.config.ts          # Configuración de Playwright
├── package.json                  # Dependencias del proyecto
└── .gitignore
```

Carpetas generadas automáticamente al ejecutar las pruebas (ignoradas por git):

- `test-results/` → capturas de pantalla, videos y trazas de cada prueba.
- `playwright-report/` → reporte HTML de la última ejecución.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) en versión LTS (18 o superior).
- npm (incluido con Node.js).
- Conexión a internet (las pruebas se ejecutan contra un sitio público).

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/k43lgeorge666/Test_Login_Project.git
cd Test_Login_Project

# 2. Instalar dependencias
npm install

# 3. Instalar el navegador Chromium que usa Playwright
npx playwright install chromium
```

---

## Ejecución de las pruebas

```bash
# Ejecutar todas las pruebas
npx playwright test

# Ejecutar solo las pruebas de login
npx playwright test tests/LoginUser

# Ejecutar una prueba concreta por su nombre
npx playwright test -g "Login User Successful"

# Ejecutar en modo UI interactivo (útil para depurar)
npx playwright test --ui

# Ejecutar en modo debug paso a paso
npx playwright test --debug

# Abrir el reporte HTML de la última ejecución
npx playwright show-report
```

> En local las pruebas se ejecutan **con el navegador visible y maximizado**. Para simular el comportamiento de CI (sin ventana) se puede definir la variable `CI`:
>
> ```powershell
> # PowerShell
> $env:CI = "1"; npx playwright test
> ```
>
> ```bash
> # Bash
> CI=1 npx playwright test
> ```

---

## Casos de prueba

Archivo: [`tests/LoginUser/UserLogin.spec.ts`](tests/LoginUser/UserLogin.spec.ts)

Datos utilizados:

| Constante | Valor | Descripción |
|---|---|---|
| `username` | `student` | Usuario válido |
| `password` | `Password123` | Contraseña válida |
| `wrong_user` | `admin1` | Usuario inválido |
| `wrong_passwd` | `pass` | Contraseña inválida |
| `success_url` | `https://practicetestautomation.com/logged-in-successfully/` | URL esperada tras un login correcto |
| `waiting_time` | `5000` | Pausa en milisegundos entre pasos |

### 1. Login User Successful

Verifica que un usuario con credenciales válidas pueda iniciar sesión.

1. Abrir la página de login.
2. Ingresar `student` / `Password123` y pulsar **Submit**.
3. Validar que la URL sea exactamente `https://practicetestautomation.com/logged-in-successfully/` (validación en el test).
4. Validar que la URL contenga `logged-in-successfully` y que se muestre el mensaje *"Congratulations student. You successfully logged in!"* (validación en el Page Object).

> La URL se valida dos veces con fines de ejemplo: una con la URL exacta en el test y otra con una expresión regular dentro de `LoginPage`.

### 2. Provide incorrect username

Verifica el mensaje de error al usar un usuario inexistente.

1. Abrir la página de login.
2. Ingresar `admin1` / `Password123` y pulsar **Submit**.
3. Validar que el mensaje de error sea visible y su texto sea *"Your username is invalid!"*.

### 3. Provide incorrect password

Verifica el mensaje de error al usar una contraseña incorrecta.

1. Abrir la página de login.
2. Ingresar `student` / `pass` y pulsar **Submit**.
3. Validar que el mensaje de error sea visible y su texto sea *"Your password is invalid!"*.

---

## Page Objects

### `URL_Page` — [`PageObjects/URL_Page.ts`](PageObjects/URL_Page.ts)

| Método | Descripción |
|---|---|
| `GetURL()` | Navega a `https://practicetestautomation.com/practice-test-login/` |

### `LoginPage` — [`PageObjects/Login/LoginPage.ts`](PageObjects/Login/LoginPage.ts)

**Localizadores**

| Propiedad | Selector | Elemento |
|---|---|---|
| `Username_field` | `#username` | Campo de usuario |
| `Password_field` | `#password` | Campo de contraseña |
| `Submit_button` | `#submit` | Botón de envío |
| `Success_Message` | `getByText("Congratulations student. You successfully logged in!")` | Mensaje de login exitoso |
| `Incorrect_user_message` | `#error` | Mensaje de error de usuario |
| `Incorrect_password_message` | `#error` | Mensaje de error de contraseña |

> Los mensajes de error usan `#error` en lugar de `getByText(...)` porque la página muestra el mismo texto también en sus instrucciones (dentro de una etiqueta `<b>`). Con `getByText` el localizador encontraría 2 elementos y Playwright fallaría por *strict mode violation*.

**Métodos**

| Método | Descripción |
|---|---|
| `Login_User_account(user, passwd)` | Rellena usuario y contraseña y pulsa **Submit** |
| `Verify_user_success_login()` | Valida que la URL contenga `logged-in-successfully` y que el mensaje de éxito sea visible |
| `Verify_incorrect_username()` | Valida que el error sea visible con el texto *"Your username is invalid!"* |
| `Verify_incorrect_password()` | Valida que el error sea visible con el texto *"Your password is invalid!"* |

---

## Configuración de Playwright

Archivo: [`playwright.config.ts`](playwright.config.ts)

| Opción | Valor | Descripción |
|---|---|---|
| `testDir` | `./tests` | Carpeta donde se buscan las pruebas |
| `fullyParallel` | `true` | Las pruebas se ejecutan en paralelo |
| `forbidOnly` | `true` en CI | Falla si se deja un `test.only` en el código |
| `retries` | `2` en CI, `0` en local | Reintentos de pruebas fallidas |
| `workers` | `1` en CI | Un solo worker en CI |
| `reporter` | `html` | Genera el reporte HTML |
| `headless` | `false` en local, `true` en CI | Navegador visible en local, sin ventana en CI |
| `viewport` | `null` en local, `1280x720` en CI | Ventana maximizada en local, tamaño fijo en CI |
| `trace` | `on-first-retry` | Guarda la traza al reintentar una prueba fallida |
| `screenshot` | `on` | Captura de pantalla de cada prueba |
| `video` | `on` | Video de cada prueba |
| `projects` | `chromium` | Solo se ejecuta en Chromium, con `--start-maximized` |

La detección del entorno se hace con la variable `process.env.CI`, que GitHub Actions define automáticamente.

---

## Reportes y evidencias

Después de cada ejecución:

- **Reporte HTML** en `playwright-report/`; se abre con `npx playwright show-report`.
- **Capturas de pantalla y videos** de cada prueba en `test-results/<nombre-de-la-prueba>/`.
- **Trazas** (solo en reintentos) que se pueden abrir con `npx playwright show-trace <archivo.zip>`.

---

## Integración continua (GitHub Actions)

Archivo: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)

El pipeline se ejecuta en cada **push** o **pull request** a las ramas `main` o `master`:

1. Descarga el código (`actions/checkout`).
2. Instala Node.js LTS (`actions/setup-node`).
3. Instala las dependencias con `npm ci`.
4. Instala los navegadores con `npx playwright install --with-deps`.
5. Ejecuta las pruebas con `npx playwright test`.
6. Publica el reporte `playwright-report/` como artifact durante 30 días (aunque las pruebas fallen).

---

## Notas y buenas prácticas

- **`await` obligatorio:** todas las llamadas a métodos asíncronos de los Page Objects deben llevar `await`. Si no, las validaciones no hacen fallar la prueba.
- **Esperas fijas:** las pruebas usan `page.waitForTimeout(5000)` entre pasos para que la ejecución sea fácil de seguir visualmente. No son necesarias, porque Playwright espera automáticamente a que los elementos estén listos. Si se eliminan, cada prueba tarda unos 10 segundos menos.
- **Validaciones en el Page Object:** la práctica recomendada es centralizar las validaciones en los Page Objects para reutilizarlas y mantenerlas en un solo lugar.
- **Credenciales:** las credenciales son públicas, pertenecen al sitio de práctica y no son datos sensibles.
