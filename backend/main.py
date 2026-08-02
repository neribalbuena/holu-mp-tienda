import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import mercadopago
from dotenv import load_dotenv

# Cargar variables de entorno del archivo .env
load_dotenv()

# Inicializar FastAPI
app = FastAPI(title="Mi Ecommerce API")

# Permitir solicitudes CORS desde nuestro Frontend (React en localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar el SDK de Mercado Pago con el Access Token
sdk = mercadopago.SDK(os.getenv("MERCADOPAGO_ACCESS_TOKEN"))

# Estructura de datos que esperamos recibir del Frontend
class ItemCart(BaseModel):
    title: str
    price: float
    quantity: int

class PreferencePayload(BaseModel):
    items: List[ItemCart]

@app.get("/")
def home():
    return {"message": "API de Mercado Pago funcionando correctamente 🚀"}

@app.post("/api/create_preference")
def create_preference(payload: PreferencePayload):
    try:
        items_mp = []
        for item in payload.items:
            items_mp.append({
                "title": str(item.title),
                "quantity": int(item.quantity) if item.quantity > 0 else 1,
                "currency_id": "ARS",
                "unit_price": float(item.price)
            })

        preference_data = {
            "items": items_mp,
            "back_urls": {
                "success": "http://localhost:5173/?status=success",
                "failure": "http://localhost:5173/?status=failure",
                "pending": "http://localhost:5173/?status=pending"
            }
        }

        # Crear preferencia de pago en los servidores de Mercado Pago
        preference_response = sdk.preference().create(preference_data)
        
        print("Respuesta MP:", preference_response)

        preference = preference_response.get("response", {})
        
        # Obtener el link de pago (init_point o sandbox_init_point)
        init_link = preference.get("init_point") or preference.get("sandbox_init_point")
        
        return {"init_point": init_link}

    except Exception as e:
        print("Error en backend:", e)
        raise HTTPException(status_code=500, detail=str(e))