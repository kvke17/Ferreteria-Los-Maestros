import React, { useState } from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../atoms/Button';

/**
 * Organism: RegisterForm
 * Formulario de registro con React Bootstrap, adaptado al CSS corporativo,
 * con campos obligatorios de contexto de ferretería (Tipo de Cliente, RUT, Giro u Oficio)
 * y validaciones completas en tiempo real.
 */
export const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '+569',
    fenac: '',
    tipoCliente: 'Particular', // Particular | Contratista | Empresa
    giro: 'Construcción', // Carpintería | Electricidad | Gasfitería | Construcción
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Validaciones de campo
  const validateField = (name, value, allValues = formData) => {
    let error = '';

    if (name === 'nombre') {
      if (!value.trim()) {
        error = 'El nombre completo es obligatorio.';
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
        error = 'El nombre debe contener solo letras.';
      }
    }

    if (name === 'rut') {
      if (!value.trim()) {
        error = 'El RUT es obligatorio.';
      } else if (!/^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}\-[0-9kK]$/.test(value.trim())) {
        error = 'El RUT debe tener un formato válido (ej: 12.345.678-9).';
      }
    }

    if (name === 'email') {
      if (!value.trim()) {
        error = 'El correo electrónico es obligatorio.';
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
        error = 'Ingrese un correo electrónico válido.';
      }
    }

    if (name === 'password') {
      if (!value) {
        error = 'La contraseña es obligatoria.';
      } else if (value.length < 6) {
        error = 'La contraseña debe tener al menos 6 caracteres.';
      }
    }

    if (name === 'confirmPassword') {
      if (!value) {
        error = 'Debe confirmar su contraseña.';
      } else if (value !== allValues.password) {
        error = 'Las contraseñas no coinciden.';
      }
    }

    if (name === 'telefono') {
      if (!value.trim()) {
        error = 'El teléfono es obligatorio.';
      } else if (!/^\+56[0-9]{9}$/.test(value.trim())) {
        error = 'El teléfono debe comenzar con +56 y contener 9 dígitos (ej: +56912345678).';
      }
    }

    if (name === 'fenac') {
      if (!value) {
        error = 'La fecha de nacimiento es obligatoria.';
      } else {
        const fechaNac = new Date(value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
          edad--;
        }
        if (edad < 18) {
          error = 'Debes tener al menos 18 años para registrarte.';
        }
      }
    }

    if (name === 'tipoCliente' && !value) {
      error = 'Seleccione el tipo de cliente.';
    }

    if (name === 'giro' && !value) {
      error = 'Seleccione su giro u oficio.';
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    const error = validateField(name, value, updatedForm);
    setErrors((prev) => ({ ...prev, [name]: error }));

    // Si cambia password, revalidar confirmPassword
    if (name === 'password' && formData.confirmPassword) {
      const confErr = validateField('confirmPassword', formData.confirmPassword, updatedForm);
      setErrors((prev) => ({ ...prev, confirmPassword: confErr }));
    }

    if (generalError) setGeneralError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field], formData);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGeneralError('Por favor complete todos los campos requeridos correctamente.');
      return;
    }

    const res = register(formData);
    if (res.success) {
      setSuccessMsg('¡Registro completado exitosamente! Bienvenido a Ferretería Los Maestros.');
      setGeneralError('');
      setTimeout(() => {
        navigate('/perfil');
      }, 1000);
    } else {
      setGeneralError(res.message);
    }
  };

  return (
    <div className="form-container-box" style={{ maxWidth: '650px' }}>
      <h1
        style={{
          textAlign: 'center',
          color: 'var(--azul-oscuro)',
          marginBottom: '8px',
          fontSize: '1.8rem',
          fontWeight: '700',
        }}
      >
        CREA TU CUENTA
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--texto-mutado)', fontSize: '0.9rem', marginBottom: '24px' }}>
        Únete a Ferretería Los Maestros y accede a beneficios exclusivos para particulares y profesionales.
      </p>

      {generalError && (
        <Alert variant="danger" role="alert" dismissible onClose={() => setGeneralError('')}>
          {generalError}
        </Alert>
      )}

      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        {/* Nombre Completo */}
        <Form.Group className="mb-3" controlId="reg-nombre">
          <Form.Label className="form-label-custom">Nombre Completo *</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Ej: Juan Pérez Martínez"
            value={formData.nombre}
            onChange={handleChange}
            isInvalid={Boolean(errors.nombre)}
            className="form-input-custom"
            required
          />
          <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
        </Form.Group>

        {/* Fila: RUT y Teléfono */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="reg-rut">
              <Form.Label className="form-label-custom">RUT / Identificación Tributaria *</Form.Label>
              <Form.Control
                type="text"
                name="rut"
                placeholder="12.345.678-9"
                value={formData.rut}
                onChange={handleChange}
                isInvalid={Boolean(errors.rut)}
                className="form-input-custom"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.rut}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="reg-telefono">
              <Form.Label className="form-label-custom">Teléfono de Contacto *</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                placeholder="+56912345678"
                value={formData.telefono}
                onChange={handleChange}
                isInvalid={Boolean(errors.telefono)}
                className="form-input-custom"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Fila: Contexto Ferretero Obligatorio */}
        <Row style={{ backgroundColor: 'var(--azul-claro)', padding: '12px 6px', borderRadius: '8px', marginBottom: '16px' }}>
          <Col md={6}>
            <Form.Group className="mb-2" controlId="reg-tipoCliente">
              <Form.Label className="form-label-custom" style={{ color: 'var(--azul-oscuro)' }}>
                Tipo de Cliente (Rubro) *
              </Form.Label>
              <Form.Select
                name="tipoCliente"
                value={formData.tipoCliente}
                onChange={handleChange}
                className="form-select-custom"
                isInvalid={Boolean(errors.tipoCliente)}
                required
              >
                <option value="Particular">Particular (Hogar / Bricolaje)</option>
                <option value="Contratista">Contratista Independiente</option>
                <option value="Empresa">Empresa Constructora / Maestranza</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.tipoCliente}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-2" controlId="reg-giro">
              <Form.Label className="form-label-custom" style={{ color: 'var(--azul-oscuro)' }}>
                Giro u Oficio Principal *
              </Form.Label>
              <Form.Select
                name="giro"
                value={formData.giro}
                onChange={handleChange}
                className="form-select-custom"
                isInvalid={Boolean(errors.giro)}
                required
              >
                <option value="Construcción">Construcción General</option>
                <option value="Carpintería">Carpintería / Mueblería</option>
                <option value="Electricidad">Electricidad e Iluminación</option>
                <option value="Gasfitería">Gasfitería / Fontanería</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.giro}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Fila: Email y Fecha de Nacimiento */}
        <Row>
          <Col md={7}>
            <Form.Group className="mb-3" controlId="reg-email">
              <Form.Label className="form-label-custom">Correo Electrónico *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="ejemplo@correo.cl"
                value={formData.email}
                onChange={handleChange}
                isInvalid={Boolean(errors.email)}
                className="form-input-custom"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3" controlId="reg-fenac">
              <Form.Label className="form-label-custom">Fecha de Nacimiento *</Form.Label>
              <Form.Control
                type="date"
                name="fenac"
                value={formData.fenac}
                onChange={handleChange}
                isInvalid={Boolean(errors.fenac)}
                className="form-input-custom"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.fenac}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Fila: Contraseñas */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="reg-password">
              <Form.Label className="form-label-custom">Contraseña *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                isInvalid={Boolean(errors.password)}
                className="form-input-custom"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="reg-confirmPassword">
              <Form.Label className="form-label-custom">Confirmar Contraseña *</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Repita su contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={Boolean(errors.confirmPassword)}
                className="form-input-custom"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" style={{ width: '100%', padding: '12px' }}>
          Registrarme
        </Button>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ margin: '0 0 8px' }}>
            <Link to="/login" style={{ color: 'var(--azul-medio)', textDecoration: 'none', fontWeight: '500' }}>
              ¿Ya tienes cuenta? Inicia sesión aquí
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

export default RegisterForm;
