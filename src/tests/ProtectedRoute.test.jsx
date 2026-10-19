import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';

describe('Prueba 8: Restricción de Acceso con ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe bloquear el acceso a /admin y redirigir a /login cuando el usuario no está autenticado', () => {
    // Arrange: Simular intento de ingreso directo a /admin sin sesión
    const initialRoute = '/admin';

    // Act
    renderWithProviders(
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <div>Contenido Secreto de Administración</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Página de Login para Autenticación</div>} />
      </Routes>,
      { initialEntries: [initialRoute] }
    );

    // Assert: Debe mostrar la pantalla de Login y NO el contenido de admin
    expect(screen.getByText('Página de Login para Autenticación')).toBeInTheDocument();
    expect(screen.queryByText('Contenido Secreto de Administración')).not.toBeInTheDocument();
  });
});
