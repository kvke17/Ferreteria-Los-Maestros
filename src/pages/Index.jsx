import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/organisms/ProductGrid';

/**
 * Page: Index (Inicio)
 * Vista principal de la tienda respetando fielmente el contenido original:
 * Bienvenida, Acceso al catálogo, Sobre la tienda, Video institucional y Productos destacados.
 */
export const Index = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter((p) => p.destacado).slice(0, 3);

  return (
    <div className="page-index">
      {/* Sección Superior: Dos columnas como en index.html original */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Columna Izquierda: Bienvenido y Logo */}
        <section className="seccion" style={{ flex: '1 1 320px', marginBotton: 0 }}>
          <h2>Bienvenido</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--texto-oscuro)' }}>
            Ofrecemos una amplia variedad de herramientas, materiales de construcción y artículos para el hogar con la mejor calidad y precios altamente competitivos. Nos enfocamos en brindar un servicio confiable tanto a profesionales como a quienes buscan realizar sus propios proyectos en casa.
          </p>

          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <Link to="/productos" className="btn-ferreteria-primary" style={{ padding: '12px 28px', fontSize: '1.05rem' }}>
              Ir al Catálogo de Productos
            </Link>
          </div>

          <article className="card-articulo" style={{ marginTop: '24px' }}>
            <h3 style={{ color: 'var(--azul-oscuro)', fontSize: '1.25rem', marginBottom: '8px' }}>
              Sobre nuestra tienda
            </h3>
            <p style={{ color: 'var(--texto-mutado)', margin: '0 0 12px' }}>
              Ofrecemos productos de ferretería a un buen precio con garantía directa de fábrica.
            </p>
            <img
              src="/images/LOGO-removebg-preview.png"
              alt="Logo Ferretería"
              className="logoindex"
              style={{
                width: '100%',
                maxWidth: '220px',
                height: 'auto',
                display: 'block',
                margin: '10px auto',
              }}
            />
          </article>
        </section>

        {/* Columna Derecha: Conócenos y Video Corporativo */}
        <section className="seccion" style={{ flex: '1 1 320px', marginBottom: 0 }}>
          <h2>Conócenos</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--texto-oscuro)' }}>
            Descubre más sobre nuestro equipo y cómo trabajamos día a día para entregarte los mejores materiales para tus proyectos y construcciones.
          </p>

          <article className="card-articulo" style={{ textAlign: 'center', marginTop: '24px' }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <video
                width="100%"
                controls
                style={{ display: 'block', borderRadius: '8px', backgroundColor: '#000000' }}
              >
                <source src="/images/tu-video.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--texto-mutado)', marginTop: '12px', fontWeight: '500' }}>
              Video corporativo - Maestros de la Construcción
            </p>
          </article>
        </section>
      </div>

      {/* Sección Destacados de la Tienda */}
      <section className="seccion" style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <h2>Herramientas Destacadas</h2>
          <Link to="/productos" className="btn-ferreteria-outline" style={{ fontSize: '0.85rem' }}>
            Ver todas las ofertas →
          </Link>
        </div>
        <p style={{ color: 'var(--texto-mutado)', marginTop: '-8px' }}>
          Los productos preferidos por maestros carpinteros, soldadores y electricistas.
        </p>

        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
};

export default Index;
