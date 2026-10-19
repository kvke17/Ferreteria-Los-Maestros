import React from 'react';
import { SearchIcon, CloseIcon } from '../../assets/icons/Icons';

/**
 * Molecule: SearchBar
 * Barra de búsqueda interactiva en tiempo real con ícono y botón para limpiar
 */
export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Buscar productos, herramientas, materiales...',
  className = '',
}) => {
  return (
    <div
      className={`search-bar-container ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '12px',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          color: 'var(--texto-mutado)',
        }}
      >
        <SearchIcon size={18} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar productos"
        className="form-input-custom"
        style={{
          paddingLeft: '38px',
          paddingRight: value ? '36px' : '12px',
          width: '100%',
        }}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          style={{
            position: 'absolute',
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--texto-mutado)',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
          }}
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
