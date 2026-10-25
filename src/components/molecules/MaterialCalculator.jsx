import React, { useState } from 'react';
import Badge from '../atoms/Badge';

/**
 * Molecule: MaterialCalculator
 * Calculadora reactiva de materiales de construcción por superficie en metros cuadrados (m²).
 * Implementación 100% nativa con useState para facilitar su defensa oral.
 */
export const MaterialCalculator = ({ defaultArea = 15, onApplyCategory }) => {
  const [area, setArea] = useState(defaultArea);
  const [rubro, setRubro] = useState('radier'); // 'radier' | 'pintura' | 'tabique' | 'ceramica'
  const [isOpen, setIsOpen] = useState(true);

  const numericArea = Math.max(1, Number(area) || 1);

  // Estimaciones basadas en normas de construcción estándar
  const calculations = {
    radier: [
      {
        material: 'Cemento Especial Estructural (25 Kg)',
        cantidad: Math.ceil(numericArea * 0.8),
        unidad: 'sacos',
        detalle: 'Estimado para radier de 10cm de espesor (0.8 sacos/m²)',
        categoriaFiltro: 'Construcción',
      },
      {
        material: 'Arena Gruesa Limpia',
        cantidad: (numericArea * 0.05).toFixed(2),
        unidad: 'm³',
        detalle: 'Proporción 1:2:3 para mezcla de hormigón',
        categoriaFiltro: 'Construcción',
      },
      {
        material: 'Gravilla / Ripio',
        cantidad: (numericArea * 0.08).toFixed(2),
        unidad: 'm³',
        detalle: 'Árido de soporte estructural',
        categoriaFiltro: 'Construcción',
      },
      {
        material: 'Malla Acma Electrosoldada',
        cantidad: Math.ceil(numericArea / 13),
        unidad: 'planchas',
        detalle: 'Plancha estándar de 2.60 x 5.00m (13 m²)',
        categoriaFiltro: 'Fijaciones',
      },
    ],
    pintura: [
      {
        material: 'Galones de Pintura (Látex o Esmalte)',
        cantidad: Math.max(1, Math.ceil(numericArea / 35)),
        unidad: 'galones',
        detalle: 'Rendimiento estándar ~35 m² por galón a 2 manos',
        categoriaFiltro: 'Construcción',
      },
      {
        material: 'Pasta Muro para Empaste',
        cantidad: Math.max(1, Math.ceil(numericArea / 20)),
        unidad: 'tinas (5 kg)',
        detalle: 'Sellado y nivelación de grietas/irregularidades',
        categoriaFiltro: 'Construcción',
      },
      {
        material: 'Cinta Enmascarar (Masking Tape)',
        cantidad: Math.max(1, Math.ceil(numericArea / 15)),
        unidad: 'rollos (40m)',
        detalle: 'Protección de marcos, zócalos y molduras',
        categoriaFiltro: 'Herramientas Manuales',
      },
    ],
    tabique: [
      {
        material: 'Placas de Volcanita / Yeso-Cartón',
        cantidad: Math.ceil((numericArea * 1.05) / 2.88),
        unidad: 'placas',
        detalle: 'Plancha 1.20 x 2.40m (2.88 m²) con 5% de merma',
        categoriaFiltro: 'Construcción',
      },
      {
        material: 'Tornillos Yeso-Cartón 1 5/8" (Cajas)',
        cantidad: Math.ceil((Math.ceil((numericArea * 1.05) / 2.88) * 30) / 100),
        unidad: 'cajas x 100 un.',
        detalle: '~30 tornillos por placa para fijación sobre montantes',
        categoriaFiltro: 'Fijaciones',
      },
      {
        material: 'Cinta de Juntas para Tabique',
        cantidad: (numericArea * 1.5).toFixed(1),
        unidad: 'metros lineales',
        detalle: 'Tratamiento de junturas y uniones',
        categoriaFiltro: 'Construcción',
      },
    ],
    ceramica: [
      {
        material: 'Cajas de Cerámica / Porcelanato',
        cantidad: Math.ceil((numericArea * 1.1) / 1.5),
        unidad: 'cajas (1.5 m² c/u)',
        detalle: 'Incluye 10% de holgura por cortes, esquinas y merma',
        categoriaFiltro: 'Construcción',
      },
      {
        material: 'Adhesivo Cerámico en Polvo (Sacos 25 Kg)',
        cantidad: Math.ceil(numericArea / 5),
        unidad: 'sacos',
        detalle: 'Rendimiento promedio de 1 saco cada 5 m²',
        categoriaFiltro: 'Construcción',
      },
      {
        material: 'Frague / Fragüe para Juntas',
        cantidad: Math.max(1, Math.ceil(numericArea / 8)),
        unidad: 'kilos',
        detalle: 'Sellado impermeable entre piezas cerámicas',
        categoriaFiltro: 'Construcción',
      },
    ],
  };

  const currentResults = calculations[rubro] || [];

  return (
    <article
      className="card-articulo material-calculator-widget"
      style={{
        backgroundColor: 'var(--blanco)',
        border: '2px solid var(--azul-claro)',
        borderRadius: '14px',
        padding: '22px',
        marginBottom: '26px',
        boxShadow: '0 6px 22px rgba(0, 34, 68, 0.07)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.6rem' }}>📐</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--azul-oscuro)', fontWeight: '700' }}>
              Calculadora de Materiales por Superficie ($m^2$)
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--texto-mutado)' }}>
              Estima los sacos de cemento, galones de pintura o tornillos requeridos para tu proyecto.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn-ferreteria-outline"
          style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? 'Ocultar Calculadora ▲' : 'Desplegar Calculadora ▼'}
        </button>
      </div>

      {isOpen && (
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--borde-suave)' }}>
          {/* Selector de Rubro de Construcción */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: 'var(--azul-medio)', marginBottom: '8px' }}>
              1. Selecciona el Tipo de Trabajo / Obra:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'radier', label: '🏗️ Radier / Hormigón' },
                { id: 'pintura', label: '🎨 Pintura de Muros' },
                { id: 'tabique', label: '🧱 Tabiquería y Volcanita' },
                { id: 'ceramica', label: '🪨 Cerámica y Pisos' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRubro(item.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: rubro === item.id ? '2px solid var(--naranja-rojo)' : '1px solid var(--borde-suave)',
                    backgroundColor: rubro === item.id ? 'var(--naranja-rojo)' : 'var(--gris-fondo)',
                    color: rubro === item.id ? '#ffffff' : 'var(--texto-oscuro)',
                    fontWeight: rubro === item.id ? '700' : '500',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ingreso de Metros Cuadrados */}
          <div
            style={{
              backgroundColor: 'var(--gris-fondo)',
              padding: '16px',
              borderRadius: '10px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <label htmlFor="area-input" style={{ fontWeight: '700', color: 'var(--azul-oscuro)', margin: 0 }}>
                Superficie a cubrir ($m^2$):
              </label>
              <input
                id="area-input"
                type="number"
                min="1"
                max="1000"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                style={{
                  width: '90px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '2px solid var(--naranja-rojo)',
                  fontWeight: '700',
                  fontSize: '1.05rem',
                  textAlign: 'center',
                  color: 'var(--azul-oscuro)',
                  backgroundColor: '#ffffff',
                }}
              />
              <span style={{ color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>metros cuadrados</span>
            </div>

            {/* Accesos rápidos */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--texto-mutado)', marginRight: '4px' }}>Ajuste rápido:</span>
              {[10, 25, 50, 100].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setArea(val)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--borde-suave)',
                    backgroundColor: area == val ? 'var(--azul-medio)' : '#ffffff',
                    color: area == val ? '#ffffff' : 'var(--azul-oscuro)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  {val} m²
                </button>
              ))}
            </div>
          </div>

          {/* Tarjetas de Resultados */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--azul-oscuro)', fontWeight: '700' }}>
                Cantidades Estimadas para {numericArea} m²:
              </h4>
              <Badge variant="category">Cálculo reactivo automático</Badge>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '14px',
              }}
            >
              {currentResults.map((res, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--blanco)',
                    border: '1px solid var(--borde-suave)',
                    borderRadius: '10px',
                    padding: '14px',
                    borderLeft: '4px solid var(--naranja-rojo)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <strong style={{ display: 'block', color: 'var(--azul-oscuro)', fontSize: '0.92rem', marginBottom: '4px' }}>
                    {res.material}
                  </strong>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--naranja-rojo)' }}>
                      {res.cantidad}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--azul-medio)' }}>
                      {res.unidad}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--texto-mutado)', lineHeight: 1.3 }}>
                    {res.detalle}
                  </p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--texto-mutado)', marginTop: '14px', marginBottom: 0, fontStyle: 'italic' }}>
              * Valores aproximados de referencia basados en rendimientos estándar de la construcción chilena. Considera siempre un 5% a 10% adicional por mermas en obra.
            </p>
          </div>
        </div>
      )}
    </article>
  );
};

export default MaterialCalculator;
