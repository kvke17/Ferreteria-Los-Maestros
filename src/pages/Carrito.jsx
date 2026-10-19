import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import CartItemRow from '../components/molecules/CartItemRow';
import CartSummary from '../components/organisms/CartSummary';
import Button from '../components/atoms/Button';

/**
 * Page: Carrito de Compras (Checkout)
 * Vista con desglose interactivo de artículos, modificación de cantidades,
 * vaciado de carrito y cálculo de totales con resumen.
 */
export const Carrito = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="page-carrito">
      <section className="seccion">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          <h2>Carrito de Compras</h2>
          {cart.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--rojo-error)',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: '600',
                textDecoration: 'underline',
              }}
            >
              Vaciar carrito completo
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛒</div>
            <h3 style={{ color: 'var(--azul-oscuro)', marginBottom: '8px' }}>Tu carrito está vacío</h3>
            <p style={{ color: 'var(--texto-mutado)', maxWidth: '400px', margin: '0 auto 24px' }}>
              Aún no has agregado herramientas ni materiales a tu orden de compra.
            </p>
            <Link to="/productos" className="btn-ferreteria-primary">
              Explorar Catálogo de Productos
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {/* Listado de Productos */}
            <div style={{ flex: '1 1 500px' }}>
              <div style={{ borderTop: '1px solid var(--borde-suave)' }}>
                {cart.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </div>

            {/* Resumen de Compra y Facturación */}
            <div style={{ flex: '1 1 320px' }}>
              <CartSummary />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Carrito;
