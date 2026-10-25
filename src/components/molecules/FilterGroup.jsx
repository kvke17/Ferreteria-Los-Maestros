import React from 'react';
import { HeartIcon } from '../../assets/icons/Icons';

/**
 * Molecule: FilterGroup
 * Filtro interactivo de productos por categoría, marca, disponibilidad (stock),
 * rango de precio y lista de favoritos.
 */
export const FilterGroup = ({
  categories = [],
  selectedCategory = 'Todas',
  onSelectCategory,
  brands = [],
  selectedBrand = 'Todas',
  onSelectBrand,
  onlyInStock = false,
  onToggleOnlyInStock,
  maxPrice,
  currentMaxPrice,
  onMaxPriceChange,
  showOnlyWishlist = false,
  onToggleWishlistFilter,
  onResetFilters,
}) => {
  return (
    <div
      className="filter-group-card"
      style={{
        backgroundColor: 'var(--blanco)',
        padding: '22px',
        borderRadius: '12px',
        border: '1px solid var(--borde-suave)',
        boxShadow: 'var(--sombra-card)',
        marginBottom: '25px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--azul-oscuro)', fontWeight: '700' }}>
          Filtros de Catálogo
        </h4>
        <button
          type="button"
          onClick={onResetFilters}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--naranja-rojo)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600',
            textDecoration: 'underline',
          }}
        >
          Limpiar todos los filtros
        </button>
      </div>

      {/* 1. Categorías */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--texto-mutado)', marginBottom: '8px' }}>
          Categoría:
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Todas', ...categories].map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid var(--naranja-rojo)' : '1px solid var(--borde-suave)',
                  backgroundColor: isSelected ? 'var(--naranja-rojo)' : 'var(--gris-fondo)',
                  color: isSelected ? '#ffffff' : 'var(--texto-oscuro)',
                  fontWeight: isSelected ? '600' : 'normal',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Marcas Típicas de Ferretería */}
      {brands.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--texto-mutado)', marginBottom: '8px' }}>
            Marca de Ferretería:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Todas', ...brands].map((brand) => {
              const isSelected = selectedBrand === brand;
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => onSelectBrand && onSelectBrand(brand)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid var(--azul-medio)' : '1px solid var(--borde-suave)',
                    backgroundColor: isSelected ? 'var(--azul-medio)' : 'var(--gris-fondo)',
                    color: isSelected ? '#ffffff' : 'var(--texto-oscuro)',
                    fontWeight: isSelected ? '700' : 'normal',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Disponibilidad (Stock), Rango de Precio y Favoritos */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', paddingTop: '10px', borderTop: '1px solid var(--borde-suave)' }}>
        {/* Checkbox de Disponibilidad */}
        <div>
          <label
            htmlFor="filter-stock-checkbox"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: '600',
              color: 'var(--azul-oscuro)',
              backgroundColor: onlyInStock ? '#dcfce7' : 'var(--gris-fondo)',
              padding: '6px 12px',
              borderRadius: '8px',
              border: onlyInStock ? '1px solid #86efac' : '1px solid var(--borde-suave)',
              transition: 'all 0.2s ease',
            }}
          >
            <input
              id="filter-stock-checkbox"
              type="checkbox"
              checked={onlyInStock}
              onChange={onToggleOnlyInStock}
              style={{
                accentColor: 'var(--verde-exito)',
                width: '16px',
                height: '16px',
                cursor: 'pointer',
              }}
            />
            <span>Solo productos con stock disponible</span>
          </label>
        </div>

        {/* Control Deslizante de Precio */}
        <div style={{ flex: '1 1 220px', minWidth: '180px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
            <span style={{ color: 'var(--texto-mutado)', fontWeight: '600' }}>Precio Máximo:</span>
            <span style={{ fontWeight: '700', color: 'var(--naranja-rojo)' }}>
              ${Number(currentMaxPrice || 0).toLocaleString('es-CL')}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPrice || 100000}
            step="1000"
            value={currentMaxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--naranja-rojo)', cursor: 'pointer' }}
          />
        </div>

        {/* Botón de Solo Favoritos */}
        <div>
          <button
            type="button"
            onClick={onToggleWishlistFilter}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: showOnlyWishlist ? '2px solid #ef4444' : '1px solid var(--borde-suave)',
              backgroundColor: showOnlyWishlist ? '#fee2e2' : 'transparent',
              color: showOnlyWishlist ? '#b91c1c' : 'var(--texto-oscuro)',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <HeartIcon size={16} color={showOnlyWishlist ? '#ef4444' : 'currentColor'} filled={showOnlyWishlist} />
            {showOnlyWishlist ? 'Mostrando Favoritos' : 'Solo Favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterGroup;
