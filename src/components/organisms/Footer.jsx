import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Organism: Footer
 * Pie de página fiel al diseño original con tono corporativo azul oscuro y enlaces útiles
 */
export const Footer = () => {
  return (
    <footer className="ferreteria-footer">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <p style={{ fontWeight: '600', fontSize: '1.05rem', color: '#ffffff' }}>
          &copy; 2026 Ferretería Los Maestros. Todos los derechos reservados.
        </p>
        <p style={{ margin: '8px 0', fontSize: '0.9rem', color: '#93c5fd' }}>
          La mejor ferretería para profesionales, contratistas y proyectos del hogar.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '12px', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Inicio</Link>
          <Link to="/productos" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Catálogo</Link>
          <Link to="/nosotros" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Nosotros</Link>
          <Link to="/login" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Acceso Empleados</Link>
        </div>
        <p style={{ marginTop: '14px', fontSize: '0.8rem', color: '#64748b' }}>
          Visítanos en nuestras sucursales o contáctanos a soporte@ferreteria.cl | Santiago, Chile
        </p>
      </div>
    </footer>
  );
};

export default Footer;
