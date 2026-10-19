import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import Navbar from '../components/organisms/Navbar';

describe('Prueba 1: Barra de Navegación (Navbar)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe renderizar correctamente la barra de navegación con su marca y enlaces principales', () => {
    // Arrange
    const expectedLinks = ['Inicio', 'Productos', 'Nosotros', 'Carrito', 'Login', 'Registro'];

    // Act
    renderWithProviders(<Navbar />);

    // Assert
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(/Ferreteria Los Maestros/i)).toBeInTheDocument();
    expect(screen.getByText(/La mejor ferreteria/i)).toBeInTheDocument();

    const mainNav = screen.getByRole('navigation', { name: /navegación principal/i });
    expect(mainNav).toBeInTheDocument();

    expectedLinks.forEach((linkText) => {
      expect(
        within(mainNav).getByRole('link', { name: new RegExp(`^${linkText}`, 'i') })
      ).toBeInTheDocument();
    });
  });
});
