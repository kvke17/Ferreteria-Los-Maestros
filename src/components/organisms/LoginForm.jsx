import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../atoms/Button';

/**
 * Organism: LoginForm
 * Formulario de inicio de sesión con React Bootstrap adaptado al CSS original,
 * validación en tiempo real y soporte para credenciales mockeadas.
 */
export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Validaciones en tiempo real
  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      if (!value.trim()) {
        error = 'El correo electrónico es requerido.';
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        error = 'Ingrese un formato de correo electrónico válido.';
      }
    }
    if (name === 'password') {
      if (!value) {
        error = 'La contraseña es requerida.';
      } else if (value.length < 6) {
        error = 'La contraseña debe tener al menos 6 caracteres.';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    if (authError) setAuthError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validateField('email', formData.email);
    const passErr = validateField('password', formData.password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    const result = login(formData.email, formData.password);

    if (result.success) {
      setSuccessMsg('¡Inicio de sesión exitoso! Redirigiendo...');
      setAuthError('');

      // Redirigir a la página previa o a /admin si es administrador
      const origin = location.state?.from?.pathname || (result.user.rol === 'admin' ? '/admin' : '/');
      setTimeout(() => {
        navigate(origin, { replace: true });
      }, 700);
    } else {
      setAuthError(result.message || 'Credenciales incorrectas.');
    }
  };

  const fillMockAdmin = () => {
    setFormData({
      email: 'admin@ferreteria.cl',
      password: 'Admin123*',
    });
    setErrors({});
    setAuthError('');
  };

  return (
    <div className="form-container-box">
      <h1
        style={{
          textAlign: 'center',
          color: 'var(--azul-oscuro)',
          marginBottom: '20px',
          fontSize: '1.8rem',
          fontWeight: '700',
        }}
      >
        INICIO DE SESIÓN
      </h1>

      {authError && (
        <Alert variant="danger" role="alert" dismissible onClose={() => setAuthError('')}>
          {authError}
        </Alert>
      )}

      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <Form.Group className="mb-3" controlId="login-email">
          <Form.Label className="form-label-custom">Correo Electrónico *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="ejemplo@duocuc.cl o admin@ferreteria.cl"
            value={formData.email}
            onChange={handleChange}
            isInvalid={Boolean(errors.email)}
            className="form-input-custom"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Contraseña */}
        <Form.Group className="mb-4" controlId="login-password">
          <Form.Label className="form-label-custom">Contraseña *</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={formData.password}
            onChange={handleChange}
            isInvalid={Boolean(errors.password)}
            className="form-input-custom"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Botón de Envío */}
        <Button type="submit" variant="primary" style={{ width: '100%', padding: '12px' }}>
          Iniciar Sesión
        </Button>

        {/* Credenciales de Prueba Mockeadas */}
        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: 'var(--azul-claro)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            border: '1px solid #bfdbfe',
          }}
        >
          <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: 'var(--azul-medio)' }}>
            🔑 Credenciales de Prueba (Admin):
          </p>
          <p style={{ margin: 0, color: 'var(--azul-medio)' }}>
            <strong>Email:</strong> admin@ferreteria.cl | <strong>Clave:</strong> Admin123*
          </p>
          <button
            type="button"
            onClick={fillMockAdmin}
            style={{
              marginTop: '6px',
              background: 'none',
              border: 'none',
              color: 'var(--naranja-rojo)',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'underline',
              fontSize: '0.82rem',
            }}
          >
            Autocompletar credenciales de Administrador
          </button>
        </div>

        {/* Enlaces inferiores */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ margin: '0 0 8px' }}>
            <Link to="/registro" style={{ color: 'var(--azul-medio)', textDecoration: 'none', fontWeight: '500' }}>
              ¿No tienes cuenta? Regístrate aquí
            </Link>
          </p>
          <p style={{ margin: 0 }}>
            <Link to="/" style={{ color: 'var(--texto-mutado)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Volver a la página principal
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
