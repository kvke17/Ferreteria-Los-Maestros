import React from 'react';

/**
 * Atom: Label
 * Etiqueta para formularios con indicador visual de campo obligatorio
 */
export const Label = ({
  htmlFor,
  children,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <label htmlFor={htmlFor} className={`form-label-custom ${className}`} {...props}>
      {children}
      {required && <span style={{ color: 'var(--rojo-error)', marginLeft: '4px' }}>*</span>}
    </label>
  );
};

export default Label;
