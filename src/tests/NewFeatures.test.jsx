import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import ProductCard from '../components/organisms/ProductCard';
import Productos from '../pages/Productos';
import Carrito from '../pages/Carrito';
import MaterialCalculator from '../components/molecules/MaterialCalculator';

describe('Nuevas Funcionalidades: Control de Stock, Calculadora de Materiales y Despacho', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe mostrar badge de últimas unidades cuando el stock es menor a 5 y deshabilitar botón cuando es 0', () => {
    // Arrange: Producto con poco stock (stock = 3)
    const lowStockProduct = {
      id: 'low-1',
      nombre: 'Huincha de Medir 5m',
      precio: 4500,
      stock: 3,
      categoria: 'Herramientas Manuales',
      imagen: '/images/martillo.jpg',
      unidadMedida: 'Unidad',
    };

    // Arrange: Producto agotado (stock = 0)
    const outOfStockProduct = {
      id: 'out-1',
      nombre: 'Disco de Corte Metal 4 1/2"',
      precio: 1200,
      stock: 0,
      categoria: 'Herramientas Eléctricas',
      imagen: '/images/martillo.jpg',
      unidadMedida: 'Unidad',
    };

    // Act
    const { rerender } = renderWithProviders(<ProductCard product={lowStockProduct} />);

    // Assert: Alerta de últimas unidades
    expect(screen.getByText(/¡Últimas 3 unidades!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Añadir Huincha de Medir 5m al carrito/i })).toBeEnabled();

    // Act: Renderizar producto agotado
    rerender(<ProductCard product={outOfStockProduct} />);

    // Assert: Badge de agotado y botón deshabilitado
    expect(screen.getByTestId('stock-badge-out')).toBeInTheDocument();
    const disabledBtn = screen.getByTestId('btn-add-disabled-out-1');
    expect(disabledBtn).toBeInTheDocument();
    expect(disabledBtn).toBeDisabled();
    expect(disabledBtn).toHaveTextContent('Agotado');
  });

  it('debe calcular reactivamente los materiales de construcción según los m² ingresados', () => {
    // Arrange & Act
    renderWithProviders(<MaterialCalculator defaultArea={20} />);

    // Assert: Para radier de 20 m², calcula 20 * 0.8 = 16 sacos de cemento
    expect(screen.getByText(/Calculadora de Materiales por Superficie/i)).toBeInTheDocument();
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText(/Cemento Especial Estructural/i)).toBeInTheDocument();

    // Act: Cambiar a Pintura
    const paintBtn = screen.getByRole('button', { name: /Pintura de Muros/i });
    fireEvent.click(paintBtn);

    // Assert: Muestra galones de pintura
    expect(screen.getByText(/Galones de Pintura \(Látex o Esmalte\)/i)).toBeInTheDocument();
  });

  it('debe actualizar el total a pagar en tiempo real al seleccionar despacho estándar o express', () => {
    // Arrange: Carrito con un producto de $10.000
    const sampleCart = [
      {
        id: 'item-1',
        nombre: 'Caja Herramientas Plástica',
        precio: 10000,
        cantidad: 1,
        stock: 5,
        imagen: '/images/martillo.jpg',
        unidadMedida: 'Unidad',
      },
    ];
    localStorage.setItem('ferreteria_cart', JSON.stringify(sampleCart));

    // Act
    renderWithProviders(<Carrito />);

    // Assert inicial: Retiro en tienda ($0 adicional) -> Total $10.000
    expect(screen.getByText(/Resumen de Compra/i)).toBeInTheDocument();
    expect(screen.getAllByText(/10\.000/)[0]).toBeInTheDocument();

    // Act: Cambiar a despacho estándar (+$4.990) -> Total $14.990
    const standardOption = screen.getByText(/Despacho a domicilio estándar/i);
    fireEvent.click(standardOption);

    // Assert: Total actualizado a $14.990
    expect(screen.getByText(/14\.990/)).toBeInTheDocument();

    // Act: Cambiar a despacho express obras (+$8.990) -> Total $18.990
    const expressOption = screen.getByText(/Despacho express para obras\/contratistas/i);
    fireEvent.click(expressOption);

    // Assert: Total actualizado a $18.990
    expect(screen.getByText(/18\.990/)).toBeInTheDocument();
  });

  it('debe filtrar productos por disponibilidad (ocultar agotados)', () => {
    // Arrange & Act
    renderWithProviders(<Productos />);

    // Por defecto el producto agotado 'Broca Concreto SDS Plus 8mm' está en catálogo
    expect(screen.getByText('Broca Concreto SDS Plus 8mm')).toBeInTheDocument();

    // Act: Activar filtro de solo stock disponible
    const stockCheckbox = screen.getByLabelText(/Solo productos con stock disponible/i);
    fireEvent.click(stockCheckbox);

    // Assert: El producto sin stock se oculta
    expect(screen.queryByText('Broca Concreto SDS Plus 8mm')).not.toBeInTheDocument();
    // Productos con stock siguen visibles
    expect(screen.getByText('Martillo Rojo')).toBeInTheDocument();
  });
});
