import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mercadopago

app = FastAPI()

# Configuramos CORS para que tu frontend (en Vercel u otro lugar) pueda hablar con este backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción podés poner la URL específica de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Leemos la variable de entorno de forma segura
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

# Verificamos explícitamente para que no falle a ciegas
if not ACCESS_TOKEN:
    raise ValueError("Falta configurar la variable de entorno ACCESS_TOKEN")

# Inicializamos el SDK de Mercado Pago
sdk = mercadopago.SDK(ACCESS_TOKEN)

# Estructura de los datos que llegan desde el carrito de tu frontend
class Item(BaseModel):
    title: str
    quantity: int
    unit_price: float

class PreferenceRequest(BaseModel):
    items: list[Item]

@app.post("/create_preference")
def create_preference(data: PreferenceRequest):
    try:
        # Transformamos los datos al formato que exige Mercado Pago
        items_list = [
            {
                "title": item.title,
                "quantity": item.quantity,
                "unit_price": item.unit_price
            }
            for item in data.items
        ]

        preference_data = {
            "items": items_list,
            "back_urls": {
                "success": "https://tu-tienda.vercel.app/success",
                "failure": "https://tu-tienda.vercel.app/failure",
                "pending": "https://tu-tienda.vercel.app/pending"
            },
            "auto_return": "approved",
        }

        result = sdk.preference().create(preference_data)
        preference = result["response"]
        
        return {"id": preference["id"], "init_point": preference["init_point"]}
    

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Backend de la tienda funcionando correctamente con Mercado Pago"}