# PLAN DE PRUEBAS UNITARIAS Y ASEGURAMIENTO DE CALIDAD
## Proyecto: Migración a React SPA - Ferretería Los Maestros

---

### 1. Resumen Ejecutivo y Objetivos
El presente documento define la estrategia, matriz de cobertura y resultados del plan de aseguramiento de calidad (QA) para la migración de **Ferretería Los Maestros** desde su arquitectura estática previa hacia una Single Page Application (SPA) moderna desarrollada con React, Vite y Vitest.

#### Objetivos Clave:
- Garantizar la no regresión funcional en la transición hacia React.
- Validar la fidelidad de diseño, paleta corporativa y adaptabilidad responsiva.
- Asegurar la integridad del flujo de autenticación, control de accesos protegidos (`ProtectedRoute`) y persistencia en `localStorage`.
- Verificar la correcta implementación de campos de contexto obligatorios de la ferretería (RUT, Tipo de Cliente, Giro comercial, Unidades de medida).
- Estandarizar las pruebas unitarias bajo el patrón estricto **AAA (Arrange, Act, Assert)**.

---

### 2. Entorno y Stack Tecnológico de Pruebas
| Componente / Herramienta | Versión / Detalle | Propósito |
| :--- | :--- | :--- |
| **Framework de Pruebas** | Vitest `^2.1.1` | Ejecución ultrarrápida y nativa sobre ESM en Vite |
| **Testing Library** | `@testing-library/react` `^16.0.1` | Renderizado e interacción centrada en el usuario |
| **Matchers DOM** | `@testing-library/jest-dom` `^6.5.0` | Aserciones semánticas para el DOM |
| **Ambiente Virtual** | `jsdom` `^25.0.0` | Emulación de APIs del navegador (Window, Document, LocalStorage) |
| **Patrón Estructural** | AAA (Arrange - Act - Assert) | Organización clara de precondiciones, acciones y aserciones |

---

### 3. Matriz de Pruebas Unitarias (10 Pruebas Requeridas)

A continuación se detalla la matriz de pruebas unitarias implementadas en `src/tests/`, cumpliendo el 100% de los requerimientos de la rúbrica académica:

| ID | Nombre de la Prueba | Archivo de Prueba | Componente(s) Evaluado(s) | Precondiciones (Arrange) | Acción Ejecutada (Act) | Resultado Esperado (Assert) | Estado |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **T01** | Renderizado del Navbar y Enlaces | `Navbar.test.jsx` | `Navbar`, `hud-nav` | Renderizar `Navbar` con `MemoryRouter` y providers | Consultar banner, logo, marca y menú de navegación | El header HUD se encuentra en el documento con enlaces a Inicio, Productos, Nosotros, Carrito, Login y Registro | **PASÓ (100%)** |
| **T02** | Renderizado del Catálogo y Tarjetas | `Catalog.test.jsx` | `Productos`, `ProductCard`, `ProductGrid` | `ProductProvider` inicializado con catálogo | Renderizar página `/productos` | Se muestran las tarjetas con títulos 'Martillo Rojo', 'Taladro Percutor 500W' y 'Serrucho Carpintero 20"' | **PASÓ (100%)** |
| **T03** | Filtrado Reactivo de Catálogo | `Catalog.test.jsx` | `SearchBar`, `FilterGroup`, `Productos` | Catálogo completo disponible en pantalla | 1. Escribir 'Taladro' en buscador.<br>2. Filtrar por categoría 'Construcción' | 1. Se visualiza solo el Taladro.<br>2. Se visualiza el cemento y se ocultan productos de otras categorías | **PASÓ (100%)** |
| **T04** | Añadir Producto al Carrito | `Cart.test.jsx` | `ProductCard`, `CartContext`, `Navbar` | Carrito en cero; tarjeta de Martillo disponible | Simular clic en botón 'Añadir al carrito' | El contador badge en el Navbar incrementa de 0 a 1 visiblemente | **PASÓ (100%)** |
| **T05** | Eliminar Producto y Actualizar Total | `Cart.test.jsx` | `Carrito`, `CartItemRow`, `CartSummary` | Carrito con 2 Martillos ($10.000 total) | Clic en el botón eliminar de la fila | El producto se remueve, el total pasa a $0 y muestra mensaje 'Tu carrito está vacío' | **PASÓ (100%)** |
| **T06** | Error de Credenciales en Login | `Auth.test.jsx` | `LoginForm`, `AuthContext` | Formulario de Login vacío | Ingresar correo y clave erróneos y enviar formulario | Se genera una alerta de rol `alert` indicando credenciales inválidas | **PASÓ (100%)** |
| **T07** | Login Exitoso y Sesión en LocalStorage | `Auth.test.jsx` | `LoginForm`, `AuthContext` | Formulario de Login vacío | Ingresar `admin@ferreteria.cl` y `Admin123*` y enviar | Se emite confirmación de éxito y se graba la sesión en `localStorage` con rol `admin` | **PASÓ (100%)** |
| **T08** | Restricción en ProtectedRoute | `ProtectedRoute.test.jsx` | `ProtectedRoute`, `AppRouter` | Usuario sin autenticar (`user = null`) | Intentar navegar directamente a la ruta `/admin` | Acceso denegado a admin y redirección automática hacia `/login` | **PASÓ (100%)** |
| **T09** | Creación de Producto y Fallback de Imagen | `AdminProductCRUD.test.jsx` | `AdminProductTable`, `ProductContext` | Modal de nuevo producto abierto | Crear 'Llave Francesa' sin especificar URL de imagen | El producto se añade al catálogo en memoria con imagen por defecto `/images/LOGO-removebg-preview.png` | **PASÓ (100%)** |
| **T10** | Validación de Campos Obligatorios | `FormValidations.test.jsx` | `RegisterForm`, `AdminProductTable` | Formularios vacíos o con números negativos | 1. Enviar registro vacío.<br>2. Guardar producto con precio y stock negativos | 1. Muestra mensajes de error en campos requeridos.<br>2. Bloquea precio/stock negativos | **PASÓ (100%)** |

---

### 4. Cobertura de Responsividad (4 Componentes Clave)
En conformidad con el **Requisito 1**, se verificó la adaptabilidad fluida para dispositivos móviles (`viewport <= 768px`) en:
1. **Navbar (HUD Superior):** En pantallas reducidas, los enlaces horizontales se ocultan y dan paso a un menú desplegable accesible mediante botón hamburguesa (`mobile-menu-btn`).
2. **ProductGrid (Catálogo):** Utiliza `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))` adaptándose a una sola columna vertical en smartphones.
3. **Formularios de Registro y Checkout:** Implementación con sistema de grillas reactivas de React Bootstrap (`Row`, `Col md={6}`), reorganizando los campos en bloque vertical en pantallas pequeñas.
4. **Tabla de Inventario de Administración:** Contenedor con `overflow-x: auto` (`Table responsive`) permitiendo desplazamiento horizontal fluido sin desbordar el layout.

---

### 5. Verificación de Campos de Contexto de Ferretería
Se certifica la presencia obligatoria de los siguientes campos técnicos del rubro:
- **En Registro y Checkout (`RegisterForm.jsx`, `CartSummary.jsx`):**
  - **Tipo de Cliente:** *Particular (Hogar/Bricolaje), Contratista Independiente, Empresa Constructora/Maestranza*.
  - **RUT / Identificación:** Validación de formato tributario chileno (ej: `12.345.678-9`).
  - **Giro u Oficio:** *Construcción General, Carpintería / Mueblería, Electricidad e Iluminación, Gasfitería / Fontanería*.
- **En Creación y Detalle de Producto (`AdminProductTable.jsx`, `ProductoDetalle.jsx`):**
  - **Unidad de Medida / Venta:** *Unidad, Kilo, Caja, Metro, Tira*.

---

### 6. Ejecución de la Suite de Pruebas
Para reproducir y validar las pruebas de forma automatizada:

```bash
# Ejecutar todas las pruebas una vez (CI/CD mode)
npm test

# Ejecutar las pruebas en modo observador interactivo
npm run test:watch

# Levantar servidor de desarrollo para inspección visual
npm run dev

# Generar compilación optimizada para producción
npm run build
```

**Resultado de la Ejecución:**
```text
Test Files  7 passed (7)
     Tests  11 passed (11)
  Duration  1.44s
```
*100% de las pruebas aprobadas satisfactoriamente.*
