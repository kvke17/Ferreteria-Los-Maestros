import React from 'react';
import Badge from '../atoms/Badge';

export const DELIVERY_OPTIONS = [
  {
    id: 'pickup',
    nombre: 'Retiro en tienda',
    precio: 0,
    etiqueta: 'Gratis',
    tiempo: 'Listo en 2 hrs',
    icono: '🏬',
    descripcion: 'Retira sin costo en nuestro mesón de atención al maestro.',
  },
  {
    id: 'standard',
    nombre: 'Despacho a domicilio estándar',
    precio: 4990,
    etiqueta: '+$4.990',
    tiempo: '24 a 48 hrs hábiles',
    icono: '🚚',
    descripcion: 'Entrega segura con camión de carga ligera a tu hogar o taller.',
  },
  {
    id: 'express',
    nombre: 'Despacho express para obras/contratistas',
    precio: 8990,
    etiqueta: '+$8.990',
    tiempo: 'Mismo día (Prioritario)',
    icono: '⚡',
    descripcion: 'Despacho prioritario directo al pie de obra para faenas en curso.',
  },
];

/**
 * Molecule: DeliverySelector
 * Selector y cotizador dinámico de modalidad de entrega y despacho de ferretería.
 */
export const DeliverySelector = ({ selectedDelivery = 'pickup', onSelectDelivery }) => {
  return (
    <div
      className="delivery-selector-widget"
      style={{
        backgroundColor: 'var(--gris-fondo)',
        padding: '16px',
        borderRadius: '10px',
        marginBottom: '18px',
        border: '1px solid var(--borde-suave)',
      }}
    >
      <label
        style={{
          display: 'block',
          fontWeight: '700',
          fontSize: '0.9rem',
          color: 'var(--azul-oscuro)',
          marginBottom: '10px',
        }}
      >
        Modalidad de Entrega / Despacho:
      </label>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {DELIVERY_OPTIONS.map((option) => {
          const isSelected = selectedDelivery === option.id;
          return (
            <div
              key={option.id}
              onClick={() => onSelectDelivery(option.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                border: isSelected ? '2px solid var(--naranja-rojo)' : '1px solid var(--borde-suave)',
                backgroundColor: isSelected ? 'var(--blanco)' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 2px 8px rgba(255, 71, 26, 0.12)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="radio"
                  id={`delivery-${option.id}`}
                  name="delivery-option"
                  checked={isSelected}
                  onChange={() => onSelectDelivery(option.id)}
                  style={{ accentColor: 'var(--naranja-rojo)', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1.05rem' }}>{option.icono}</span>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--azul-oscuro)' }}>
                      {option.nombre}
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--texto-mutado)', display: 'block' }}>
                    {option.descripcion} ({option.tiempo})
                  </span>
                </div>
              </div>

              <div>
                <Badge
                  variant={option.precio === 0 ? 'stock' : 'category'}
                  style={{
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    backgroundColor: option.precio === 0 ? '#dcfce7' : 'var(--azul-claro)',
                    color: option.precio === 0 ? '#15803d' : 'var(--azul-medio)',
                  }}
                >
                  {option.etiqueta}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliverySelector;
