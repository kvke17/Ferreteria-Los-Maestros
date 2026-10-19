import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

/**
 * Template: MainLayout
 * Estructura general de la aplicación: Encabezado HUD superior + Contenedor Principal (<Outlet />) + Pie de página
 */
export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="main-content" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
