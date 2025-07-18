
from fastapi import FastAPI
from .routers import clientes
from .routers import leads
from .routers import proyectos
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # puedes ajustar según necesidad
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clientes.router)
app.include_router(leads.router)
app.include_router(proyectos.router)

@app.get("/")
def home():
    return {"mensaje": "API INGlumina CRM operativa"}
