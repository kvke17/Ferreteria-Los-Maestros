import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

/**
 * Template: AuthLayout
 * Plantilla centrada para formularios de autenticación (Login y Registro)
 */
export const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%' }}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
