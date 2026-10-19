import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useProducts from '../hooks/useProducts';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import { UserIcon, ShieldIcon, HeartIcon } from '../assets/icons/Icons';

/**
 * Page: Perfil (Mi Perfil)
 * Muestra información del usuario autenticado (datos personales y comerciales del rubro),
 * su rol y acceso directo a favoritos.
 */
export const Perfil = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { products, wishlist } = useProducts();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <section className="seccion" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ color: 'var(--azul-oscuro)' }}>Acceso a Mi Perfil</h2>
        <p style={{ color: 'var(--texto-mutado)', margin: '14px auto 24px', maxWidth: '400px' }}>
          Para visualizar tu información comercial y pedidos guardados, por favor inicia sesión o crea tu cuenta.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/login" className="btn-ferreteria-primary">
            Iniciar Sesión
          </Link>
          <Link to="/registro" className="btn-ferreteria-outline">
            Registrarme
          </Link>
        </div>
      </section>
    );
  }

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page-perfil">
      <section className="seccion">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <h2>Mi Perfil de Cliente</h2>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              backgroundColor: 'var(--rojo-error)',
              color: '#ffffff',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.88rem',
            }}
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Tarjeta de Datos de Usuario */}
        <div
          style={{
            backgroundColor: 'var(--azul-claro)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #bfdbfe',
            marginBottom: '30px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--azul-medio)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserIcon size={32} />
            </div>
            <div>
              <h3 style={{ margin: 0, color: 'var(--azul-oscuro)', fontSize: '1.4rem' }}>
                {user.nombre}
              </h3>
              <p style={{ margin: '4px 0 0', color: 'var(--azul-medio)', fontSize: '0.9rem' }}>
                {user.email}
              </p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Badge variant={user.rol === 'admin' ? 'category' : 'stock'}>
                {user.rol === 'admin' ? 'Administrador Maestro' : 'Cliente Registrado'}
              </Badge>
            </div>
          </div>

          <hr style={{ borderColor: 'rgba(0, 34, 68, 0.1)', margin: '16px 0' }} />

          {/* Grilla de Datos Personales y Comerciales */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--texto-mutado)', display: 'block' }}>
                RUT / Identificación:
              </span>
              <strong style={{ color: 'var(--azul-oscuro)' }}>{user.rut || 'No informado'}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--texto-mutado)', display: 'block' }}>
                Tipo de Cliente (Rubro):
              </span>
              <strong style={{ color: 'var(--azul-oscuro)' }}>{user.tipoCliente || 'Particular'}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--texto-mutado)', display: 'block' }}>
                Giro u Oficio:
              </span>
              <strong style={{ color: 'var(--azul-oscuro)' }}>{user.giro || 'Construcción'}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--texto-mutado)', display: 'block' }}>
                Teléfono de Contacto:
              </span>
              <strong style={{ color: 'var(--azul-oscuro)' }}>{user.telefono || '+569...'}</strong>
            </div>
          </div>

          {user.rol === 'admin' && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #93c5fd' }}>
              <Link to="/admin" className="btn-ferreteria-primary" style={{ fontSize: '0.9rem' }}>
                <ShieldIcon size={16} /> Ir al Panel de Control de Administrador
              </Link>
            </div>
          )}
        </div>

        {/* Sección de Favoritos / Wishlist */}
        <article className="card-articulo">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <HeartIcon size={20} color="#ef4444" filled />
            <h3 style={{ margin: 0, color: 'var(--azul-oscuro)', fontSize: '1.2rem' }}>
              Mi Lista de Favoritos ({wishlistedProducts.length})
            </h3>
          </div>

          {wishlistedProducts.length === 0 ? (
            <p style={{ color: 'var(--texto-mutado)', margin: 0 }}>
              No has añadido productos a tu lista de favoritos aún. Puedes guardarlos haciendo clic en el corazón en el catálogo.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
              {wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  style={{
                    border: '1px solid var(--borde-suave)',
                    borderRadius: '8px',
                    padding: '12px',
                    textAlign: 'center',
                    backgroundColor: 'var(--blanco)',
                  }}
                >
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    style={{ height: '80px', objectFit: 'contain', marginBottom: '8px' }}
                    onError={(e) => {
                      e.currentTarget.src = '/images/LOGO-removebg-preview.png';
                    }}
                  />
                  <h4 style={{ fontSize: '0.95rem', margin: '0 0 6px', color: 'var(--azul-oscuro)' }}>{p.nombre}</h4>
                  <Link
                    to={`/producto/${p.id}`}
                    style={{ fontSize: '0.85rem', color: 'var(--naranja-rojo)', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    Ver detalle →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
    </div>
  );
};

export default Perfil;
