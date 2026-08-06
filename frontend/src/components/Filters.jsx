export const Filters = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="filters-container">
      <span className="filters-label">Categorías:</span>
      <button
        //si la categoría seleccionada = todas le agrega active 
        className={`filter-btn ${selectedCategory === 'Todas' ? 'active' : ''}`}
        onClick={() => onSelectCategory('Todas')}
      >
        Todas
      </button>
      
      {categories.map((category) => (
        <button
          //Recorre el array categories con map y genera un botón por cada un
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
