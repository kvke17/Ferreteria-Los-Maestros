import React from 'react';

/**
 * Atom: Badge
 * Insignia para categorías, stock o estados
 */
export const Badge = ({
  children,
  variant = 'category', // 'category' | 'stock' | 'lowstock' | 'danger'
  className = '',
  ...props
}) => {
  let badgeClass = 'badge-ferreteria-category';
  if (variant === 'stock') badgeClass = 'badge-ferreteria-stock';
  if (variant === 'lowstock') badgeClass = 'badge-ferreteria-lowstock';
  if (variant === 'danger') badgeClass = 'badge bg-danger';

  return (
    <span className={`badge-ferreteria ${badgeClass} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
