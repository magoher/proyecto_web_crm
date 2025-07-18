from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import SessionLocal

router = APIRouter(prefix="/leads", tags=["leads"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_leads(db: Session = Depends(get_db)):
    return db.query(models.Lead).all()

@router.post("/")
def create_lead(lead: schemas.LeadCreate, db: Session = Depends(get_db)):
    db_lead = models.Lead(
        nombre=lead.nombre,
        correo=lead.correo,
        telefono=lead.telefono,
        interes=lead.interes,
        estado=lead.estado,
        fecha_registro=lead.fecha_registro
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead
