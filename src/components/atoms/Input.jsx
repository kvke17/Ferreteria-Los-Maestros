import React from 'react';

/**
 * Atom: Input
 * Campo de entrada estilizado con foco corporativo naranja y borde de error
 */
export const Input = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  isInvalid = false,
  className = '',
  ...props
}) => {
  const invalidStyle = isInvalid
    ? { borderColor: 'var(--rojo-error)', boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.15)' }
    : {};

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`form-input-custom ${className}`}
      style={invalidStyle}
      {...props}
    />
  );
};

export default Input;
