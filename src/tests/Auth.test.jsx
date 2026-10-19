import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import LoginForm from '../components/organisms/LoginForm';

describe('Pruebas 6 y 7: Autenticación, Manejo de Errores y Sesión en localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe mostrar mensaje de error al ingresar credenciales incorrectas en el Login', async () => {
    // Arrange
    renderWithProviders(<LoginForm />);
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passInput = screen.getByLabelText(/Contraseña/i);
    const submitBtn = screen.getByRole('button', { name: /Iniciar Sesión/i });

    // Act
    fireEvent.change(emailInput, { target: { value: 'usuario_invalido@correo.cl' } });
    fireEvent.change(passInput, { target: { value: 'ClaveErronea123' } });
    fireEvent.click(submitBtn);

    // Assert
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent(/Credenciales inválidas/i);
    });
  });

  it('debe iniciar sesión exitosamente con credenciales mockeadas y almacenar la sesión en localStorage', async () => {
    // Arrange
    renderWithProviders(<LoginForm />);
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passInput = screen.getByLabelText(/Contraseña/i);
    const submitBtn = screen.getByRole('button', { name: /Iniciar Sesión/i });

    // Act - Ingresar credenciales mockeadas requeridas
    fireEvent.change(emailInput, { target: { value: 'admin@ferreteria.cl' } });
    fireEvent.change(passInput, { target: { value: 'Admin123*' } });
    fireEvent.click(submitBtn);

    // Assert
    await waitFor(() => {
      const sessionData = localStorage.getItem('ferreteria_session');
      expect(sessionData).not.toBeNull();
      const parsed = JSON.parse(sessionData);
      expect(parsed.email).toBe('admin@ferreteria.cl');
      expect(parsed.rol).toBe('admin');
    });
  });
});
