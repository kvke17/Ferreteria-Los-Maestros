import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page: Nosotros (Sobre Nosotros)
 * Preserva íntegramente la información institucional del proyecto original con la imagen Nosotros.png
 */
export const Nosotros = () => {
  return (
    <div className="page-nosotros">
      <section className="seccion">
        <h2>¿Quiénes somos?</h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--texto-oscuro)', lineHeight: 1.7 }}>
          Somos una ferretería online con productos a un muy buen costo y atención personalizada.
        </p>

        <article className="card-articulo" style={{ marginTop: '24px' }}>
          <h3 style={{ color: 'var(--azul-oscuro)', fontSize: '1.3rem', marginBottom: '12px' }}>
            Nuestra Pasión por la Construcción y el Hogar
          </h3>
          <p style={{ color: 'var(--texto-oscuro)', lineHeight: 1.7, marginBottom: '20px' }}>
            Nos especializamos en brindar soluciones integrales tanto para profesionales del rubro como para aficionados al bricolaje. Contamos con un amplio catálogo en herramientas eléctricas, manuales, fontanería, electricidad y acabados a precios altamente competitivos.
          </p>

          <img
            src="/images/Nosotros.png"
            alt="Equipo Ferretería Los Maestros"
            className="logonosotros"
            style={{
              width: '100%',
              maxWidth: '380px',
              height: 'auto',
              display: 'block',
              margin: '20px auto',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            }}
          />

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link to="/productos" className="btn-ferreteria-primary">
              Ver Nuestro Catálogo
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Nosotros;
