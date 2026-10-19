# Ferretería Los Maestros - React Single Page Application (SPA)

Proyecto migrado exitosamente desde su versión web estática original (HTML/CSS/JS) hacia una Single Page Application (SPA) modular construida con **React**, **Vite**, **React Router**, **React Bootstrap** y **Vitest**, preservando estrictamente la identidad visual, paleta corporativa y tipografía original.

---

## 🛠️ Tecnologías Empleadas
- **React 18** & **Vite**: Arquitectura SPA moderna con compilación ultrarrápida.
- **Atomic Design Methodology**: Componentes desacoplados en Átomos, Moléculas, Organismos y Templates.
- **React Router DOM v6**: Enrutamiento declarativo para las 9 rutas requeridas + ruta institucional.
- **React Bootstrap**: Integración estratégica en formularios complejos (Login, Registro, Checkout) y modales.
- **Context API & Custom Hooks**:
  - `AuthContext` / `useAuth`: Autenticación y control de sesión con persistencia en `localStorage`.
  - `CartContext` / `useCart`: Carrito de compras, cálculo de impuestos (IVA 19%) y contador reactivo.
  - `ProductContext` / `useProducts`: Catálogo en memoria, CRUD de productos, fallback de imágenes y lista de deseos (Wishlist).
  - `ThemeContext` / `useTheme`: Modo Claro / Oscuro con persistencia en `localStorage`.
- **Vitest & React Testing Library**: Suite de pruebas unitarias bajo el patrón **AAA (Arrange, Act, Assert)**.

---

## 🚀 Puesta en Marcha

### 1. Instalación de dependencias
```bash
npm install
```

### 2. Ejecución en desarrollo
```bash
npm run dev
```
La aplicación estará disponible de inmediato en `http://localhost:5173`.

### 3. Ejecución de pruebas unitarias (Vitest)
```bash
# Ejecutar todas las pruebas (100% aprobadas)
npm test

# Modo observador interactivo
npm run test:watch
```

### 4. Compilación para producción
```bash
npm run build
```

---

## 🔑 Credenciales Mockeadas para Evaluación
Para acceder al panel protegido de administración:
- **Email:** `admin@ferreteria.cl`
- **Contraseña:** `Admin123*`
*(En el formulario de login también se dispone de un botón de autocompletado rápido para facilitar la revisión).*

---

## 📁 Arquitectura Atomic Design (`src/`)

```text
src/
├── assets/
│   ├── images/         # Logo, banners y fotos de productos (martillo, taladro, sierra, tornillo, etc.)
│   └── icons/          # Íconos SVG accesibles (Cart, Heart, Search, Theme, etc.)
├── components/
│   ├── atoms/          # Button, Input, Label, Badge, Icon, PriceTag
│   ├── molecules/      # SearchBar, FormField, CartItemRow, FilterGroup
│   ├── organisms/      # Navbar, Footer, ProductCard, ProductGrid, LoginForm, RegisterForm, AdminProductTable, CartSummary
│   └── templates/      # MainLayout, AdminLayout, AuthLayout
├── context/            # AuthContext, CartContext, ProductContext, ThemeContext
├── hooks/              # useAuth, useCart, useProducts, useTheme
├── pages/              # Index, Productos, ProductoDetalle, Login, Registro, Admin, Carrito, Perfil, Nosotros, NotFound
├── routes/             # AppRouter y ProtectedRoute
├── tests/              # 10+ Pruebas unitarias en Vitest bajo patrón AAA
├── styles/             # Variables CSS globales (paleta corporativa) y estilos adaptados
├── App.jsx
└── main.jsx
```

---

## 📋 Matriz y Plan de Pruebas
Consulte el archivo detallado [`plan_de_pruebas.md`](plan_de_pruebas.md) para revisar la matriz completa de pruebas, precondiciones, acciones, aserciones y resultados del aseguramiento de calidad.
