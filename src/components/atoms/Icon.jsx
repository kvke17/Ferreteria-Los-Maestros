import React from 'react';
import * as Icons from '../../assets/icons/Icons';

/**
 * Atom: Icon
 * Permite renderizar cualquier ícono por nombre
 */
export const Icon = ({ name, size = 18, color = 'currentColor', className = '', ...props }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} className={className} {...props} />;
};

export default Icon;
