import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import AuthLayout from '../components/templates/AuthLayout';
import AdminLayout from '../components/templates/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Páginas
import Index from '../pages/Index';
import Productos from '../pages/Productos';
import ProductoDetalle from '../pages/ProductoDetalle';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Admin from '../pages/Admin';
import Carrito from '../pages/Carrito';
import Perfil from '../pages/Perfil';
import Nosotros from '../pages/Nosotros';
import NotFound from '../pages/NotFound';

/**
 * AppRouter: Enrutador central con las 9 rutas obligatorias más ruta institucional
 */
export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas con MainLayout */}
      <Route element={<MainLayout />}>
        {/* 1. Ruta / (Inicio) */}
        <Route path="/" element={<Index />} />

        {/* 2. Ruta /productos (Catálogo) */}
        <Route path="/productos" element={<Productos />} />

        {/* 3. Ruta /producto/:id (Detalle de Producto) */}
        <Route path="/producto/:id" element={<ProductoDetalle />} />

        {/* Ruta institucional /nosotros */}
        <Route path="/nosotros" element={<Nosotros />} />

        {/* 7. Ruta /carrito (Carrito y Facturación) */}
        <Route path="/carrito" element={<Carrito />} />

        {/* 8. Ruta /perfil (Mi Perfil) */}
        <Route path="/perfil" element={<Perfil />} />

        {/* 9. Ruta 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Rutas de Autenticación con AuthLayout */}
      <Route element={<AuthLayout />}>
        {/* 4. Ruta /login */}
        <Route path="/login" element={<Login />} />

        {/* 5. Ruta /registro */}
        <Route path="/registro" element={<Registro />} />
      </Route>

      {/* 6. Ruta Protegida /admin con AdminLayout */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
