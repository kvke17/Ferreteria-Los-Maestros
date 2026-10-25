import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';

export const AllProviders = ({ children, initialEntries = ['/'] }) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

export const renderWithProviders = (ui, { initialEntries = ['/'], ...options } = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders initialEntries={initialEntries}>{children}</AllProviders>
    ),
    ...options,
  });
};
