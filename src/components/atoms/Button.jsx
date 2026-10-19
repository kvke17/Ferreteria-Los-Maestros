import React from 'react';

/**
 * Atom: Button
 * Botón base con variantes de la ferretería (primario degradado naranja, secundario azul marino, outline, danger)
 */
export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  let variantClass = 'btn-ferreteria-primary';
  if (variant === 'secondary') variantClass = 'btn-ferreteria-secondary';
  if (variant === 'outline') variantClass = 'btn-ferreteria-outline';
  if (variant === 'danger') variantClass = 'btn btn-danger';

  let sizeStyle = {};
  if (size === 'sm') {
    sizeStyle = { padding: '6px 12px', fontSize: '0.85rem' };
  } else if (size === 'lg') {
    sizeStyle = { padding: '14px 28px', fontSize: '1.1rem' };
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${variantClass} ${className}`}
      style={sizeStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
