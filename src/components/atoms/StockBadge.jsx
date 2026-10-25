import React from 'react';
import Badge from './Badge';

/**
 * Atom: StockBadge
 * Insignia visual y reactiva para el control de inventario y stock disponible.
 * - Verde/Neutro (stock >= 5): Stock normal
 * - Amarillo/Aviso (0 < stock < 5): ¡Últimas unidades disponibles!
 * - Rojo/Peligro (stock <= 0): Agotado
 */
export const StockBadge = ({ stock = 0, showCount = true, className = '' }) => {
  const numericStock = Number(stock) || 0;

  if (numericStock <= 0) {
    return (
      <Badge variant="danger" className={className} data-testid="stock-badge-out">
        Agotado
      </Badge>
    );
  }

  if (numericStock < 5) {
    return (
      <Badge variant="lowstock" className={className} data-testid="stock-badge-low">
        ⚠️ ¡Últimas {showCount ? `${numericStock} ` : ''}unidades!
      </Badge>
    );
  }

  return (
    <Badge variant="stock" className={className} data-testid="stock-badge-normal">
      ✓ {showCount ? `${numericStock} disponibles` : 'En Stock'}
    </Badge>
  );
};

export default StockBadge;
