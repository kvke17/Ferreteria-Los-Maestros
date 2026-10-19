import React from 'react';
import ProductCard from './ProductCard';

/**
 * Organism: ProductGrid
 * Cuadrícula responsive adaptable para catálogo y productos destacados
 */
export const ProductGrid = ({ products = [], emptyMessage = 'No se encontraron productos disponibles.' }) => {
  if (products.length === 0) {
    return (
      <div
        className="empty-products-box"
        style={{
          textAlign: 'center',
          padding: '50px 20px',
          backgroundColor: 'var(--blanco)',
          borderRadius: '12px',
          border: '1px dashed var(--borde-suave)',
          margin: '20px 0',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔧</div>
        <h3 style={{ color: 'var(--azul-oscuro)', marginBottom: '8px' }}>Sin resultados</h3>
        <p style={{ color: 'var(--texto-mutado)', maxWidth: '400px', margin: '0 auto' }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid" data-testid="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
