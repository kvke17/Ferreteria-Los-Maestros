import React from 'react';
import AdminProductTable from '../components/organisms/AdminProductTable';

/**
 * Page: Admin (Panel de Control de Inventario)
 * Ruta protegida para administradores para gestión de productos en memoria
 */
export const Admin = () => {
  return (
    <div className="page-admin">
      <section className="seccion">
        <AdminProductTable />
      </section>
    </div>
  );
};

export default Admin;
