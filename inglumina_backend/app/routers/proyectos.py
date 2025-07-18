from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import SessionLocal
from fastapi import HTTPException

router = APIRouter(prefix="/proyectos", tags=["proyectos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.ProyectoOut])
def get_proyectos(db: Session = Depends(get_db)):
    return db.query(models.Proyecto).all()

@router.post("/", response_model=schemas.ProyectoOut)
def create_proyecto(proyecto: schemas.ProyectoCreate, db: Session = Depends(get_db)):
    db_proyecto = models.Proyecto(**proyecto.dict())
    db.add(db_proyecto)
    db.commit()
    db.refresh(db_proyecto)
    return db_proyecto

@router.delete("/{id}")
def eliminar_proyecto(id: int, db: Session = Depends(get_db)):
    proyecto = db.query(models.Proyecto).filter(models.Proyecto.id_proyecto == id).first()
    if not proyecto:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    db.delete(proyecto)
    db.commit()
    return {"mensaje": "Proyecto eliminado correctamente"}


