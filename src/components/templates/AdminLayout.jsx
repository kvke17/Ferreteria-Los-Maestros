import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import { ShieldIcon } from '../../assets/icons/Icons';
import useAuth from '../../hooks/useAuth';

/**
 * Template: AdminLayout
 * Plantilla especializada para el panel de administración y CRUD de inventario
 */
export const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: 'var(--azul-oscuro)',
          color: '#ffffff',
          padding: '16px 24px',
          borderBottom: '3px solid var(--naranja-rojo)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                backgroundColor: 'var(--naranja-rojo)',
                color: '#fff',
                padding: '6px',
                borderRadius: '8px',
                display: 'inline-flex',
              }}
            >
              <ShieldIcon size={20} />
            </span>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '700' }}>
                Panel de Administración - Gestión de Catálogo
              </h2>
              <small style={{ color: '#93c5fd' }}>
                Sesión activa como: <strong>{user?.nombre || 'Administrador'}</strong> ({user?.email})
              </small>
            </div>
          </div>

          <div>
            <Link
              to="/productos"
              style={{
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '6px 14px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.85rem',
              }}
            >
              Ver Catálogo Público →
            </Link>
          </div>
        </div>
      </div>

      <main className="main-content" style={{ marginTop: '20px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
