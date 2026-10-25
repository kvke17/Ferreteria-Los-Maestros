import React, { createContext, useState, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Mostrar un Toast flotante
   * @param {Object|string} options - Si es string es el mensaje, o un objeto con { title, message, variant, delay }
   * @param {string} [variantFallback='success']
   */
  const showToast = useCallback((options, variantFallback = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    let newToast;

    if (typeof options === 'string') {
      newToast = {
        id,
        title: 'Ferretería Los Maestros',
        message: options,
        variant: variantFallback,
        delay: 3500,
      };
    } else {
      newToast = {
        id,
        title: options.title || 'Ferretería Los Maestros',
        message: options.message || '',
        variant: options.variant || 'success',
        delay: options.delay || 3500,
      };
    }

    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ position: 'fixed', zIndex: 9999, top: '20px', right: '20px' }}
      >
        {toasts.map((t) => {
          const isDarkText = t.variant === 'warning' || t.variant === 'light' || t.variant === 'info';
          return (
            <Toast
              key={t.id}
              onClose={() => removeToast(t.id)}
              show={true}
              delay={t.delay}
              autohide
              bg={t.variant}
              className="shadow-lg"
              style={{ minWidth: '280px', borderRadius: '10px', overflow: 'hidden' }}
            >
              <Toast.Header closeButton>
                <strong className="me-auto" style={{ color: 'var(--azul-oscuro)', fontSize: '0.9rem' }}>
                  {t.title}
                </strong>
                <small className="text-muted">ahora</small>
              </Toast.Header>
              <Toast.Body className={isDarkText ? 'text-dark' : 'text-white'} style={{ fontSize: '0.88rem' }}>
                {t.message}
              </Toast.Body>
            </Toast>
          );
        })}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
