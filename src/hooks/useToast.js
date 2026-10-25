import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

/**
 * Hook para disparar notificaciones Toast desde cualquier componente
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Retornar fallback seguro para no quebrar tests o componentes renderizados fuera del provider
    return {
      showToast: () => {},
      removeToast: () => {},
    };
  }
  return context;
};

export default useToast;
