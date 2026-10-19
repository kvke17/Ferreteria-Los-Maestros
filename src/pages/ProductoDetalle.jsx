import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import PriceTag from '../components/atoms/PriceTag';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import { CartIcon, HeartIcon, CheckIcon } from '../assets/icons/Icons';

/**
 * Page: ProductoDetalle
 * Vista individual del producto conservando la interactividad de cálculo de la versión original
 * (ej: producto_martillo.html / producto_martillo.js) con ficha técnica, stock y unidad de venta.
 */
export const ProductoDetalle = () => {
  const { id } = useParams();
  const { getProductById, isWishlisted, toggleWishlist } = useProducts();
  const { addToCart } = useCart();

  const product = getProductById(id);

  const [quantity, setQuantity] = useState(1);
  const [purchaseMessage, setPurchaseMessage] = useState('');

  const subtotal = useMemo(() => {
    if (!product) return 0;
    return product.precio * quantity;
  }, [product, quantity]);

  if (!product) {
    return (
      <section className="seccion" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ color: 'var(--rojo-error)' }}>Producto no encontrado</h2>
        <p style={{ color: 'var(--texto-mutado)' }}>
          El producto solicitado con identificador "{id}" no existe en nuestro catálogo.
        </p>
        <Link to="/productos" className="btn-ferreteria-primary" style={{ marginTop: '20px' }}>
          Volver al Catálogo
        </Link>
      </section>
    );
  }

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      const maxVal = product.stock || 99;
      setQuantity(Math.min(val, maxVal));
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setPurchaseMessage(`¡Agregado con éxito! Se añadieron ${quantity} ${product.unidadMedida || 'unidad(es)'} de "${product.nombre}" a tu carrito.`);
    setTimeout(() => {
      setPurchaseMessage('');
    }, 4500);
  };

  const favorited = isWishlisted(product.id);

  return (
    <div className="page-producto-detalle">
      <section className="seccion">
        {/* Encabezado y Navegación de Regreso */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <h2>{product.nombre}</h2>
          <Link to="/productos" style={{ color: 'var(--azul-medio)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
            ← Volver al catálogo
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '35px', flexWrap: 'wrap', marginTop: '20px' }}>
          {/* Columna Izquierda: Imagen del Producto y Favoritos */}
          <div
            style={{
              flex: '1 1 320px',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid var(--borde-suave)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              className={`wishlist-btn ${favorited ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Añadir a favoritos"
              style={{ position: 'absolute', top: '12px', right: '12px' }}
            >
              <HeartIcon size={20} color={favorited ? '#ef4444' : 'currentColor'} filled={favorited} />
            </button>

            <img
              src={product.imagen}
              alt={product.nombre}
              style={{
                maxWidth: '100%',
                maxHeight: '340px',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
              onError={(e) => {
                e.currentTarget.src = '/images/LOGO-removebg-preview.png';
              }}
            />
          </div>

          {/* Columna Derecha: Información y Cálculo Interactivo */}
          <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <Badge variant="category">{product.categoria}</Badge>
              <Badge variant={product.stock > 5 ? 'stock' : 'lowstock'}>
                Stock: {product.stock} disponibles
              </Badge>
            </div>

            <h3 style={{ color: 'var(--azul-oscuro)', fontSize: '1.25rem', marginBottom: '10px' }}>
              Descripción Detallada
            </h3>
            <p style={{ color: 'var(--texto-oscuro)', lineHeight: 1.6, marginBottom: '16px' }}>
              {product.descripcion}
            </p>

            {/* Ficha de Precio y Unidad de Medida */}
            <div
              style={{
                backgroundColor: 'var(--azul-claro)',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '20px',
                border: '1px solid #bfdbfe',
              }}
            >
              <p style={{ margin: '0 0 6px', fontSize: '0.95rem' }}>
                <strong>Precio Unitario:</strong> <PriceTag price={product.precio} size="md" />
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--azul-medio)' }}>
                <strong>Unidad de Venta:</strong> {product.unidadMedida || 'Unidad'}
              </p>
            </div>

            {/* Interacción Dinámica JS Original: Selector de cantidad y cálculo */}
            <div
              style={{
                border: '1px solid var(--borde-suave)',
                padding: '18px',
                borderRadius: '10px',
                backgroundColor: 'var(--blanco)',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <label htmlFor="cantidad-input" style={{ fontWeight: '600', color: 'var(--azul-medio)', margin: 0 }}>
                  Cantidad a comprar:
                </label>
                <input
                  type="number"
                  id="cantidad-input"
                  min="1"
                  max={product.stock || 20}
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{
                    width: '70px',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid var(--borde-suave)',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--azul-oscuro)' }}>
                  Total a pagar:
                </span>
                <PriceTag price={subtotal} size="lg" />
              </div>

              <Button
                type="button"
                variant="primary"
                onClick={handleAddToCart}
                style={{ width: '100%', padding: '12px' }}
                data-testid="btn-add-to-cart"
              >
                <CartIcon size={18} /> Calcular y Añadir al Carrito
              </Button>
            </div>

            {/* Mensaje de Confirmación Interactivo */}
            {purchaseMessage && (
              <div
                role="status"
                style={{
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  border: '1px solid #86efac',
                }}
              >
                <CheckIcon size={18} />
                <span>{purchaseMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Ficha Técnica Detallada */}
        {product.fichaTecnica && (
          <article className="card-articulo" style={{ marginTop: '30px' }}>
            <h3 style={{ color: 'var(--azul-oscuro)', marginBottom: '14px' }}>
              Ficha Técnica y Especificaciones
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
              {Object.entries(product.fichaTecnica).map(([clave, valor]) => (
                <div
                  key={clave}
                  style={{
                    backgroundColor: 'var(--gris-fondo)',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--borde-suave)',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--texto-mutado)', textTransform: 'capitalize' }}>
                    {clave}
                  </span>
                  <strong style={{ color: 'var(--azul-oscuro)', fontSize: '0.95rem' }}>{valor}</strong>
                </div>
              ))}
            </div>
          </article>
        )}
      </section>
    </div>
  );
};

export default ProductoDetalle;
