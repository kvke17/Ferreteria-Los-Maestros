import React from 'react';
import PriceTag from '../atoms/PriceTag';
import { PlusIcon, MinusIcon, TrashIcon } from '../../assets/icons/Icons';

/**
 * Molecule: CartItemRow
 * Fila interactiva para producto dentro del carrito de compras
 */
export const CartItemRow = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleDecrement = () => {
    if (item.cantidad > 1) {
      onUpdateQuantity(item.id, item.cantidad - 1);
    } else {
      onRemove(item.id);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.cantidad + 1);
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      onUpdateQuantity(item.id, val);
    }
  };

  return (
    <div
      className="cart-item-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        borderBottom: '1px solid var(--borde-suave)',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      {/* Miniatura y Datos */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 240px' }}>
        <img
          src={item.imagen}
          alt={item.nombre}
          style={{
            width: '64px',
            height: '64px',
            objectFit: 'contain',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--borde-suave)',
            padding: '4px',
          }}
        />
        <div>
          <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--azul-oscuro)' }}>{item.nombre}</h4>
          <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--texto-mutado)' }}>
            Unidad: {item.unidadMedida || 'Unidad'}
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--texto-mutado)' }}>
            Unitario: <PriceTag price={item.precio} size="sm" />
          </p>
        </div>
      </div>

      {/* Controles de Cantidad */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={handleDecrement}
          aria-label={`Disminuir cantidad de ${item.nombre}`}
          style={{
            background: 'var(--azul-claro)',
            border: 'none',
            color: 'var(--azul-medio)',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <MinusIcon size={14} />
        </button>

        <input
          type="number"
          min="1"
          max={item.stock || 99}
          value={item.cantidad}
          onChange={handleInputChange}
          aria-label={`Cantidad de ${item.nombre}`}
          style={{
            width: '50px',
            textAlign: 'center',
            padding: '6px 4px',
            borderRadius: '6px',
            border: '1px solid var(--borde-suave)',
            fontWeight: '600',
            backgroundColor: 'transparent',
            color: 'var(--texto-oscuro)',
          }}
        />

        <button
          type="button"
          onClick={handleIncrement}
          aria-label={`Aumentar cantidad de ${item.nombre}`}
          style={{
            background: 'var(--azul-claro)',
            border: 'none',
            color: 'var(--azul-medio)',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <PlusIcon size={14} />
        </button>
      </div>

      {/* Subtotal */}
      <div style={{ minWidth: '100px', textAlign: 'right' }}>
        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--texto-mutado)' }}>Subtotal</span>
        <PriceTag price={item.precio * item.cantidad} size="md" />
      </div>

      {/* Botón Eliminar */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={`Eliminar ${item.nombre} del carrito`}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--rojo-error)',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease',
        }}
        title="Eliminar producto"
      >
        <TrashIcon size={18} />
      </button>
    </div>
  );
};

export default CartItemRow;
