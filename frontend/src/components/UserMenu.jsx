import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const UserMenu = ({ onOpenAuth }) => {
  //extraer user o null
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Cartelito para las opciones de decoración
  const handleDummyClick = (opcion) => {
    alert(`La sección "${opcion}" está en mantenimiento.`);
    setIsOpen(false);
  };

  // Si el usuario no está logueado, muestra el botón para iniciar sesión
  if (!user) {
    return (
      <button className="btn-login" onClick={onOpenAuth}>
        🔑 Iniciar Sesión
      </button>
    );
  }

  // Si está logueado, muestra el botón con su nombre y el menú desplegable
  return (
    <div className="user-menu-container">
      <button className="user-button" onClick={() => setIsOpen(!isOpen)}>
        👤 {user.name} ▼
      </button>

      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
          <hr />
          <button onClick={() => handleDummyClick('Mis Compras')}>📦 Mis Compras</button>
          <button onClick={() => handleDummyClick('Configuración')}>⚙️ Ajustes</button>
          <button onClick={() => handleDummyClick('Soporte Técnico')}>🎧 Soporte</button>
          <button onClick={() => handleDummyClick('Centro de Ayuda')}>❓ Ayuda</button>
          <hr />
          <button className="btn-logout" onClick={logout}>
            🚪 Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};
