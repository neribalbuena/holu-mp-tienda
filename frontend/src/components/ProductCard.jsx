export const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        
        {/* Formateamos el precio a pesos argentinos ($) */}
        <div className="product-price">
          $ {product.price.toLocaleString('es-AR')} ARS
        </div>

        {/* Botones de Acción */}
        <div className="product-actions">
          <button className="btn-buy-now" onClick={() => onBuyNow(product)}>
            ⚡ Comprar Ahora
          </button>
          <button className="btn-add-cart" onClick={() => onAddToCart(product)}>
            🛒 + Agregar
          </button>
        </div>
      </div>
    </div>
  );
};