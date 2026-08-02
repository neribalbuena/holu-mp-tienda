export const Filters = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="filters-container">
      <span className="filters-label">Categorías:</span>
      <button
        className={`filter-btn ${selectedCategory === 'Todas' ? 'active' : ''}`}
        onClick={() => onSelectCategory('Todas')}
      >
        Todas
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};