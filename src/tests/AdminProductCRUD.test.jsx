import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import AdminProductTable from '../components/organisms/AdminProductTable';
import { DEFAULT_PRODUCT_IMAGE } from '../context/ProductContext';

describe('Prueba 9: Creación de Producto y Asignación de Imagen por Defecto', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe crear un nuevo producto en memoria y asignarle la imagen por defecto si se deja vacía', async () => {
    // Arrange
    renderWithProviders(<AdminProductTable />);
    const openModalBtn = screen.getByTestId('btn-add-product');
    fireEvent.click(openModalBtn);

    const nameInput = screen.getByLabelText(/Nombre del Producto/i);
    const priceInput = screen.getByLabelText(/Precio \(\$ CLP\)/i);
    const stockInput = screen.getByLabelText(/Stock Inicial/i);
    const unitSelect = screen.getByLabelText(/Unidad de Medida \/ Venta/i);
    const submitBtn = screen.getByTestId('btn-submit-product');

    // Act - Llenar datos sin proporcionar URL de imagen
    fireEvent.change(nameInput, { target: { value: 'Llave Francesa 12 Pulgadas' } });
    fireEvent.change(priceInput, { target: { value: '14500' } });
    fireEvent.change(stockInput, { target: { value: '25' } });
    fireEvent.change(unitSelect, { target: { value: 'Unidad' } });
    fireEvent.click(submitBtn);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Llave Francesa 12 Pulgadas')).toBeInTheDocument();
      const productImg = screen.getByAltText('Llave Francesa 12 Pulgadas');
      expect(productImg).toBeInTheDocument();
      expect(productImg).toHaveAttribute('src', DEFAULT_PRODUCT_IMAGE);
    });
  });
});
