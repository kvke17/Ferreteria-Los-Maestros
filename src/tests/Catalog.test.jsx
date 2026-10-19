import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import Productos from '../pages/Productos';

describe('Pruebas 2 y 3: Catálogo y Filtrado Reactivo', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe renderizar el catálogo y verificar la presencia de las tarjetas de productos iniciales', () => {
    // Arrange
    const expectedProducts = [
      'Martillo Rojo',
      'Taladro Percutor 500W',
      'Serrucho Carpintero 20"',
    ];

    // Act
    renderWithProviders(<Productos />);

    // Assert
    expect(screen.getByText('Nuestros Productos')).toBeInTheDocument();
    expectedProducts.forEach((productTitle) => {
      expect(screen.getByText(productTitle)).toBeInTheDocument();
    });
  });

  it('debe filtrar reactivamente los productos al escribir en el buscador o seleccionar una categoría', () => {
    // Arrange
    renderWithProviders(<Productos />);
    const searchInput = screen.getByPlaceholderText(/Buscar por nombre, herramienta o marca/i);

    // Act - Escribir en el buscador
    fireEvent.change(searchInput, { target: { value: 'Taladro' } });

    // Assert - Solo el Taladro debe ser visible
    expect(screen.getByText('Taladro Percutor 500W')).toBeInTheDocument();
    expect(screen.queryByText('Martillo Rojo')).not.toBeInTheDocument();
    expect(screen.queryByText('Serrucho Carpintero 20"')).not.toBeInTheDocument();

    // Act - Limpiar búsqueda y filtrar por categoría "Construcción"
    fireEvent.change(searchInput, { target: { value: '' } });
    const categoryButton = screen.getByRole('button', { name: /^Construcción$/i });
    fireEvent.click(categoryButton);

    // Assert - Solo materiales de Construcción deben mostrarse
    expect(screen.getByText('Cemento Especial Alta Resistencia')).toBeInTheDocument();
    expect(screen.queryByText('Martillo Rojo')).not.toBeInTheDocument();
  });
});
