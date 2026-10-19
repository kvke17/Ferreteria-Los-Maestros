import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'ferreteria_session';
const REGISTERED_USERS_KEY = 'ferreteria_registered_users';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión inicial desde localStorage
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEY);
      if (savedSession) {
        setUser(JSON.parse(savedSession));
      }
    } catch (e) {
      console.error('Error al cargar sesión:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Inicio de sesión contra credenciales mockeadas o usuarios registrados
   */
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Validar contra credenciales de Administrador
    if (cleanEmail === 'admin@ferreteria.cl' && password === 'Admin123*') {
      const adminUser = {
        id: 'admin-1',
        nombre: 'Administrador Maestro',
        email: 'admin@ferreteria.cl',
        rut: '11.111.111-1',
        rol: 'admin',
        tipoCliente: 'Empresa',
        giro: 'Construcción',
        telefono: '+56912345678',
      };
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }

    // 2. Validar contra usuarios registrados localmente
    try {
      const registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
      const found = registered.find(
        (u) => u.email.toLowerCase() === cleanEmail && u.password === password
      );

      if (found) {
        const { password: _, ...safeUser } = found;
        setUser(safeUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
        return { success: true, user: safeUser };
      }
    } catch (e) {
      console.error('Error al verificar usuarios registrados:', e);
    }

    return {
      success: false,
      message: 'Credenciales inválidas. Compruebe su correo y contraseña.',
    };
  };

  /**
   * Registro de nuevo usuario
   */
  const registerUser = (userData) => {
    try {
      const registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
      
      const exists = registered.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
      if (exists) {
        return { success: false, message: 'El correo electrónico ya se encuentra registrado.' };
      }

      const newUser = {
        id: 'user-' + Date.now(),
        ...userData,
        rol: 'cliente',
      };

      registered.push(newUser);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registered));

      // Iniciar sesión automáticamente
      const { password: _, ...safeUser } = newUser;
      setUser(safeUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));

      return { success: true, user: safeUser };
    } catch (e) {
      return { success: false, message: 'Error al registrar el usuario: ' + e.message };
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.rol === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register: registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
