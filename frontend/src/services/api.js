//Declara una función asíncrona que recibe el array de ítems del carrito
export const crearPreferenciaMercadoPago = async (cartItems) => {
  try {
    //fetch es la api nativa del navegador para hacer peticiones HTTP
    const response = await fetch('https://holu-mp-tienda-1.onrender.com/create_preference', {
      //se están enviando datos P0ST
      method: 'POST',
      headers: {
        //le avisa al servidor q la petición viene en formato JSON
        'Content-Type': 'application/json',
      },
      //debe ser string json el cuerpo d una petición http
      body: JSON.stringify({ items: cartItems }),
    });
 //convierto a js usable
    const data = await response.json();
//si la respuesta trae el link de pago lo devuelve 
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
