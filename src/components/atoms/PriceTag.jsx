import React from 'react';

/**
 * Atom: PriceTag
 * Etiqueta de precio formateada en pesos chilenos ($ CLP) con estilo corporativo naranja
 */
export const PriceTag = ({ price, size = 'md', className = '' }) => {
  const numericPrice = typeof price === 'number' ? price : Number(price) || 0;
  const formatted = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(numericPrice);

  const fontSize = size === 'lg' ? '1.5rem' : size === 'sm' ? '1rem' : '1.25rem';

  return (
    <span className={`price-tag ${className}`} style={{ fontSize }}>
      {formatted}
    </span>
  );
};

export default PriceTag;
