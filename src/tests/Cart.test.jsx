import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import Navbar from '../components/organisms/Navbar';
import ProductCard from '../components/organisms/ProductCard';
import Carrito from '../pages/Carrito';

describe('Pruebas 4 y 5: Carrito de Compras, Contador y Totales', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe agregar un producto al carrito y verificar el incremento del contador en el Navbar', () => {
    // Arrange
    const sampleProduct = {
      id: '1',
      nombre: 'Martillo Rojo',
      descripcion: 'Martillo de prueba',
      precio: 5000,
      stock: 10,
      categoria: 'Herramientas Manuales',
      imagen: '/images/martillo.jpg',
      unidadMedida: 'Unidad',
    };

    // Act
    renderWithProviders(
      <>
        <Navbar />
        <ProductCard product={sampleProduct} />
      </>
    );

    const addButton = screen.getByRole('button', { name: /Añadir Martillo Rojo al carrito/i });
    fireEvent.click(addButton);

    // Assert
    const badge = screen.getByTestId('cart-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('1');
  });

  it('debe eliminar un producto del carrito y actualizar el total a pagar', () => {
    // Arrange
    const initialCart = [
      {
        id: '1',
        nombre: 'Martillo Rojo',
        precio: 5000,
        cantidad: 2,
        stock: 10,
        imagen: '/images/martillo.jpg',
        unidadMedida: 'Unidad',
      },
    ];

    // Guardar en localStorage para que CartProvider lo tome
    localStorage.setItem('ferreteria_cart', JSON.stringify(initialCart));

    // Act
    renderWithProviders(<Carrito />);

    // Verificar item y total inicial (5000 * 2 = 10.000)
    expect(screen.getByText('Martillo Rojo')).toBeInTheDocument();
    expect(screen.getAllByText(/10\.000/)[0]).toBeInTheDocument();

    // Eliminar producto
    const deleteButton = screen.getByRole('button', { name: /Eliminar Martillo Rojo del carrito/i });
    fireEvent.click(deleteButton);

    // Assert
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
    expect(screen.queryByText('Martillo Rojo')).not.toBeInTheDocument();
  });
});
