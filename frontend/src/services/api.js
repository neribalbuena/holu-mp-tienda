export const crearPreferenciaMercadoPago = async (cartItems) => {
  try {
    const response = await fetch('http://localhost:8000/api/create_preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await response.json();
    
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      console.error("No se pudo obtener el link de pago", data);
    }
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
  }
};