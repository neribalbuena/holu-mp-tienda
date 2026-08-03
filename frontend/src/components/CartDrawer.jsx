import { useState } from 'react';
import { crearPreferenciaMercadoPago } from '../services/api';

export const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  totalAmount
}) => {
  const [loading, setLoading] = useState(false);

  // Si el panel no está abierto, no renderiza nada
  if (!isOpen) return null;

  // Función para procesar la compra con Mercado Pago
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setLoading(true);
    // 1. Preparamos el formato que pide el backend
    const itemsParaMP = cart.map((item) => ({
      title: item.title,
      unit_price: item.price,
      quantity: item.cantidad
    }));

    // 2. Pedimos el link de pago a nuestra API
    const initPoint = await crearPreferenciaMercadoPago(itemsParaMP);
    setLoading(false);

    // 3. Si nos devuelve el link, redirigimos al usuario a la web de Mercado Pago
    if (initPoint) {
      window.location.href = initPoint;
    }
  };

  return (
    <div className="drawer-overlay">
      <div className="drawer-content">
        <div className="drawer-header">
          <h3>🛒 Tu Carrito</h3>
          <button className="drawer-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <p className="cart-empty-text">El carrito está vacío 😔</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p>$ {item.price.toLocaleString('es-AR')} c/u</p>
                  
                  <div className="cart-item-qty">
                    <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <p className="cart-item-subtotal">
                    $ {(item.price * item.cantidad).toLocaleString('es-AR')}
                  </p>
                  <button 
                    className="btn-remove" 
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-total-row">
              <span>Total:</span>
              <strong>$ {totalAmount.toLocaleString('es-AR')} ARS</strong>
            </div>

            <button 
              className="btn-checkout" 
              onClick={handleCheckout} 
              disabled={loading}
            >
              {loading ? 'Cargando pago...' : '💳 Pagar con Mercado Pago'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
