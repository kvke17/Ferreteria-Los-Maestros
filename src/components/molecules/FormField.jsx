import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

/**
 * Molecule: FormField
 * Agrupa etiqueta, campo de texto/select y mensaje de error con validación visual
 */
export const FormField = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  as = 'input',
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <div className={`form-field-group ${className}`} style={{ marginBottom: '16px' }}>
      {label && (
        <Label htmlFor={id || name} required={required}>
          {label}
        </Label>
      )}

      {as === 'select' ? (
        <select
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="form-select-custom"
          style={
            error
              ? { borderColor: 'var(--rojo-error)', boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.15)' }
              : {}
          }
          {...props}
        >
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="form-input-custom"
          rows={3}
          style={
            error
              ? { borderColor: 'var(--rojo-error)', boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.15)' }
              : {}
          }
          {...props}
        />
      ) : (
        <Input
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          isInvalid={Boolean(error)}
          {...props}
        />
      )}

      {error && (
        <p className="form-error-msg" role="alert">
          <span style={{ fontWeight: 'bold' }}>•</span> {error}
        </p>
      )}

      {helpText && !error && (
        <small style={{ color: 'var(--texto-mutado)', fontSize: '0.8rem', display: 'block', marginTop: '4px' }}>
          {helpText}
        </small>
      )}
    </div>
  );
};

export default FormField;
