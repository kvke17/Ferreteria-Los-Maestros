import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge';
import PriceTag from '../atoms/PriceTag';
import { HeartIcon, CartIcon } from '../../assets/icons/Icons';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';

/**
 * Organism: ProductCard
 * Tarjeta de producto para el catálogo con imagen, ficha resumen, favoritos y añadir al carrito
 */
export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useProducts();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const favorited = isWishlisted(product.id);

  return (
    <article className="product-card" data-testid={`product-card-${product.id}`}>
      {/* Botón de Lista de Deseos */}
      <button
        type="button"
        className={`wishlist-btn ${favorited ? 'active' : ''}`}
        onClick={handleWishlistClick}
        aria-label={favorited ? `Quitar ${product.nombre} de favoritos` : `Añadir ${product.nombre} a favoritos`}
        title={favorited ? 'En favoritos' : 'Añadir a favoritos'}
      >
        <HeartIcon size={18} color={favorited ? '#ef4444' : 'currentColor'} filled={favorited} />
      </button>

      {/* Imagen */}
      <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="product-card-img-wrapper">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="product-card-img"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/images/LOGO-removebg-preview.png';
            }}
          />
        </div>
      </Link>

      {/* Contenido */}
      <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <Badge variant="category">{product.categoria}</Badge>
        </div>

        <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3
            style={{
              fontSize: '1.15rem',
              color: 'var(--azul-oscuro)',
              margin: '0 0 6px',
              fontWeight: '700',
              lineHeight: 1.3,
            }}
          >
            {product.nombre}
          </h3>
        </Link>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--texto-mutado)',
            margin: '0 0 10px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4,
          }}
        >
          {product.descripcion}
        </p>

        <div style={{ margin: 'auto 0 12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--texto-mutado)', display: 'block', marginBottom: '2px' }}>
            Unidad: <strong>{product.unidadMedida || 'Unidad'}</strong>
          </span>
          <PriceTag price={product.precio} size="md" />
        </div>
      </div>

      {/* Botones de Acción */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <Link
          to={`/producto/${product.id}`}
          className="btn-ferreteria-secondary"
          style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem' }}
        >
          Ver detalles
        </Link>
        <button
          type="button"
          onClick={handleAddToCart}
          className="btn-ferreteria-primary"
          aria-label={`Añadir ${product.nombre} al carrito`}
          title="Añadir al carrito"
          style={{ padding: '8px 12px' }}
        >
          <CartIcon size={16} />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
