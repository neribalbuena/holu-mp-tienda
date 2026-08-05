import { useState } from 'react';
import { PRODUCTS } from './data/products';
import { useCart } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { Pagination } from './components/Pagination';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import './App.css';

export function App() {
  // Hook con la lógica del carrito
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    buyNow,
    updateQuantity,
    removeFromCart,
    totalAmount,
    totalItemsCount,
  } = useCart();

  // Estados locales para Búsqueda, Categoría, Paginación y Modal de Login
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const ITEMS_PER_PAGE = 4; // Mostramos 4 productos por página

  // 1. Obtener lista de categorías únicas para los botones de filtro
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  // 2. Filtrar productos según la búsqueda y la categoría seleccionada
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 3. Paginación: calcular cuántas páginas hay y qué productos mostrar
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Al cambiar de categoría o búsqueda, volvemos a la página 1
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="app-container">
      {/* Barra de Navegación Superior */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        totalItemsCount={totalItemsCount}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Contenido Principal */}
      <main className="main-content">
        {/* Filtros por Categoría Renderiza Filters, pasándole la lista de categorías, cuál está activa, y la función a llamar cuando se selecciona una nueva. */}
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Grilla de Productos */}
        {currentProducts.length > 0 ? (
          <div className="products-grid">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onBuyNow={buyNow}
              />
            ))}
          </div>
        ) : (
          <p className="no-products">
            No se encontraron productos que coincidan con tu búsqueda. 🔍
          </p>
        )}

        {/* Botones de Paginación */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>

      {/* Paneles Flotantes (Modal de Login y Carrito Lateral) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        totalAmount={totalAmount}
      />
    </div>
  );
}

export default App;
