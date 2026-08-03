export const crearPreferenciaMercadoPago = async (cartItems) => {
  try {
    const response = await fetch('https://holu-mp-tienda-1.onrender.com/api/create_preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }),
    });
    
    const data = await response.json();
    
    // Verificamos si Render nos devolvió el link de pago correctamente
    if (data.init_point) {
      return data.init_point;
    } else {
      console.error("No se pudo obtener el link de pago", data);
      alert("Hubo un error al generar el pago. Intentalo de nuevo.");
      return null;
    }
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    alert("No se pudo conectar con el servidor de pagos.");
    return null;
  }
};
