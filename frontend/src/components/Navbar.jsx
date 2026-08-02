import { UserMenu } from './UserMenu';

export const Navbar = ({ 
  searchTerm, 
  setSearchTerm, 
  totalItemsCount, 
  onToggleCart, 
  onOpenAuth 
}) => {
  return (
    <header className="navbar">
      {/* 1. Logo o Nombre de la Tienda */}
      <div className="navbar-logo">
        <h2>🛒 Mi Tienda</h2>
      </div>

      {/* 2. Barra de Búsqueda */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="🔍 Buscar productos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 3. Acciones: Carrito Flotante y Menú de Perfil */}
      <div className="navbar-actions">
        {/* Ícono de Carrito con Círculo y Contador */}
        <button className="cart-icon-btn" onClick={onToggleCart} title="Ver Carrito">
          🛒
          {totalItemsCount > 0 && (
            <span className="cart-badge">{totalItemsCount}</span>
          )}
        </button>

        {/* Menú Desplegable de Usuario */}
        <UserMenu onOpenAuth={onOpenAuth} />
      </div>
    </header>
  );
};