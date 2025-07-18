
from sqlalchemy import Column, Integer, String, Date, Enum, Text, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Cliente(Base):
    __tablename__ = "clientes"
    id_cliente = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    correo = Column(String(100))
    telefono = Column(String(20))
    empresa = Column(String(100))
    fecha_creacion = Column(Date)
    
class Lead(Base):
    __tablename__ = "leads"
    id_lead = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    correo = Column(String(100))
    telefono = Column(String(20))
    interes = Column(String(200))
    estado = Column(Enum('nuevo','contactado','descartado'), default='nuevo')
    fecha_registro = Column(Date)


class Proyecto(Base):
    __tablename__ = "proyectos"
    id_proyecto = Column(Integer, primary_key=True, index=True)
    nombre_proyecto = Column(String(100), nullable=False)
    descripcion = Column(Text)
    fecha_inicio = Column(Date)
    fecha_fin = Column(Date)
    presupuesto_estimado = Column(DECIMAL(12,2))
    estado = Column(Enum('en_proceso','terminado','pausado'), default='en_proceso')
    id_cliente = Column(Integer, ForeignKey('clientes.id_cliente'))

    cliente = relationship("Cliente")
