import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
//recibe si el modal está abierto y una función para cerrarlo 
export const AuthModal = ({ isOpen, onClose }) => {
  //extraer login del contexto 
  const { login } = useAuth();
  //crea estos estados para el formulario 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Si el modal está cerrado, no renderiza nada
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    //evita recargar la pagina al enviar form
    e.preventDefault();
    if (!name || !email) {
      alert('Por favor, completá tu nombre y email.');
      return;
    }
    // Guardamos en el AuthContext
    login(email, name);
    // Limpiamos y cerramos
    setName('');
    setEmail('');
    onClose();
  };

  return (
    //solo visual, el fondo oscuro y la caja blanca del modal, con el btn de cerrar y el título 
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        
        <h2>🔑 Iniciar Sesión</h2>
        <p>Ingresá tus datos para acceder a tu perfil y compras.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Ej: Neri"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="neri@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
