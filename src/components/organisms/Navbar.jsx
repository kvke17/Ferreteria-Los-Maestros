import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CartIcon, UserIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon, ShieldIcon } from '../../assets/icons/Icons';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useTheme from '../../hooks/useTheme';

/**
 * Organism: Navbar
 * Encabezado fijo tipo HUD con identidad visual de la ferretería,
 * menú colapsable responsive para móviles, contador de carrito y alternador de tema.
 */
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header id="encabezado" role="banner">
      <div className="hud-container">
        {/* Barra superior con Marca y Acciones rápidas */}
        <div className="hud-top-bar">
          <Link to="/" className="brand-wrapper" onClick={closeMenu}>
            <img
              src="/images/LOGO-removebg-preview.png"
              alt="Logo Ferretería Los Maestros"
              className="brand-logo-small"
              onError={(e) => {
                // Fallback si la imagen no carga
                e.currentTarget.style.display = 'none';
              }}
            />
            <div>
              <h1>Ferreteria Los Maestros</h1>
              <p><b>La mejor ferreteria</b></p>
            </div>
          </Link>

          {/* Acciones de Cabecera: Tema, Carrito, Botón Hamburguesa */}
          <div className="hud-actions">
            {/* Alternador de Tema */}
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>

            {/* Acceso Directo Carrito con Badge */}
            <Link
              to="/carrito"
              className="cart-hud-link"
              onClick={closeMenu}
              aria-label={`Carrito con ${cartCount} productos`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                textDecoration: 'none',
              }}
            >
              <CartIcon size={20} />
              {cartCount > 0 && (
                <span
                  className="cart-badge-counter"
                  data-testid="cart-badge"
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: 'var(--naranja-rojo)',
                    color: '#ffffff',
                    borderRadius: '10px',
                    padding: '1px 6px',
                    fontSize: '0.72rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Botón de Menú Hamburguesa para Móviles */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir o cerrar menú de navegación"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        {/* Navegación Principal (Colapsable en móviles) */}
        <nav className={`hud-nav ${isMenuOpen ? 'open' : ''}`} aria-label="Navegación principal">
          <ul>
            <li>
              <NavLink to="/" end onClick={closeMenu}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/productos" onClick={closeMenu}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/nosotros" onClick={closeMenu}>
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink to="/carrito" onClick={closeMenu}>
                Carrito {cartCount > 0 ? `(${cartCount})` : ''}
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/perfil" onClick={closeMenu}>
                    <UserIcon size={16} /> Mi Perfil
                  </NavLink>
                </li>
                {isAdmin && (
                  <li>
                    <NavLink
                      to="/admin"
                      onClick={closeMenu}
                      style={{
                        backgroundColor: 'rgba(255, 71, 26, 0.25)',
                        border: '1px solid var(--naranja-rojo)',
                      }}
                    >
                      <ShieldIcon size={15} /> Panel Admin
                    </NavLink>
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      background: 'rgba(220, 38, 38, 0.25)',
                      border: '1px solid rgba(220, 38, 38, 0.5)',
                      color: '#ffffff',
                      borderRadius: '20px',
                      padding: '6px 14px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/registro" onClick={closeMenu}>
                    Registro
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
