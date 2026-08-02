import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado para el usuario (null significa "No logueado")
  const [user, setUser] = useState(null);

  // Función para simular el inicio de sesión
  const login = (email, name) => {
    setUser({
      name: name || 'Neri',
      email: email || 'neri@ejemplo.com',
    });
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook rápido para consumir la sesión en los componentes
export const useAuth = () => useContext(AuthContext);