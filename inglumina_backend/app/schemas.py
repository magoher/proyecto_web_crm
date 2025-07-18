
from pydantic import BaseModel
from typing import Optional
from datetime import date

class ClienteCreate(BaseModel):
    nombre: str
    correo: Optional[str] = None
    telefono: Optional[str] = None
    empresa: Optional[str] = None

class ClienteOut(BaseModel):
    id_cliente: int
    nombre: str
    correo: str | None
    telefono: str | None
    empresa: str | None

    class Config:
        orm_mode = True


class LeadCreate(BaseModel):
    nombre: str
    correo: str | None = None
    telefono: str | None = None
    interes: str | None = None
    estado: str | None = "nuevo"
    fecha_registro: str | None = None


class ProyectoCreate(BaseModel):
    nombre_proyecto: str
    descripcion: str | None = None
    fecha_inicio: str | None = None
    fecha_fin: str | None = None
    presupuesto_estimado: float | None = None
    estado: str = "en_proceso"
    id_cliente: int


class ProyectoOut(BaseModel):
    id_proyecto: int
    nombre_proyecto: str
    descripcion: str | None
    fecha_inicio: date | None
    fecha_fin: date | None
    presupuesto_estimado: float | None
    estado: str
    cliente: ClienteOut | None 

    class Config:
        orm_mode = True
