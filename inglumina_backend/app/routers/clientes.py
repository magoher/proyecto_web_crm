
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import SessionLocal

router = APIRouter(prefix="/clientes", tags=["Clientes"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(models.Cliente).all()

@router.post("/")
def crear_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    nuevo = models.Cliente(**cliente.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo
