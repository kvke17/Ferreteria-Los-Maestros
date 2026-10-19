import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page: NotFound (404)
 * Vista estilizada con temática de ferretería para páginas no encontradas
 */
export const NotFound = () => {
  return (
    <div className="page-not-found" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <section className="seccion" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '10px' }}>⚠️ 🔨</div>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--naranja-rojo)', fontWeight: '800', margin: 0 }}>
          404
        </h1>
        <h2 style={{ color: 'var(--azul-oscuro)', margin: '10px 0 16px', fontSize: '1.6rem' }}>
          ¡Página Fuera de Construcción!
        </h2>
        <p style={{ color: 'var(--texto-mutado)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '28px' }}>
          La herramienta, sección o enlace que estás buscando no existe en nuestros planos o ha sido trasladada a otro estante.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-ferreteria-primary" style={{ padding: '12px 24px' }}>
            Volver a la Página Principal
          </Link>
          <Link to="/productos" className="btn-ferreteria-secondary" style={{ padding: '12px 24px' }}>
            Explorar Catálogo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
