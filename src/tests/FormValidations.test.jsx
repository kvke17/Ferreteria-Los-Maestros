import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import RegisterForm from '../components/organisms/RegisterForm';
import AdminProductTable from '../components/organisms/AdminProductTable';

describe('Prueba 10: Validación de Campos Obligatorios en Formularios', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe alertar y no permitir enviar el formulario de registro si los campos requeridos están vacíos', async () => {
    // Arrange
    renderWithProviders(<RegisterForm />);
    const submitBtn = screen.getByRole('button', { name: /^Registrarme$/i });

    // Act - Intentar enviar formulario vacío
    fireEvent.click(submitBtn);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/El nombre completo es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/El RUT es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/El correo electrónico es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('debe validar que precio y stock sean positivos y requeridos al crear un producto', async () => {
    // Arrange
    renderWithProviders(<AdminProductTable />);
    const openModalBtn = screen.getByTestId('btn-add-product');
    fireEvent.click(openModalBtn);

    const nameInput = screen.getByLabelText(/Nombre del Producto/i);
    const priceInput = screen.getByLabelText(/Precio \(\$ CLP\)/i);
    const stockInput = screen.getByLabelText(/Stock Inicial/i);
    const submitBtn = screen.getByTestId('btn-submit-product');

    // Act - Ingresar valores inválidos
    fireEvent.change(nameInput, { target: { value: 'Herramienta de Prueba' } });
    fireEvent.change(priceInput, { target: { value: '-500' } });
    fireEvent.change(stockInput, { target: { value: '-2' } });
    fireEvent.click(submitBtn);

    // Assert
    await waitFor(() => {
      expect(
        screen.getByText(/El precio debe ser un número positivo mayor a 0/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/El stock no puede ser negativo/i)).toBeInTheDocument();
    });
  });
});
