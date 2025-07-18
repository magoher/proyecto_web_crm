# INGlumina CRM – Proyecto Web Final

CRM WEBSITE for INGlumina project 3.0

Este proyecto es un sistema CRM completo creado para el curso de Programación Web. Permite gestionar clientes, leads y proyectos, y además consume una API externa útil para la gestión de oportunidades.

---

## 🎯 Objetivo

Construir una aplicación web funcional que:
- Tenga frontend en HTML/CSS/JS
- Use FastAPI como backend con endpoints RESTful
- Guarde información en una base de datos local
- Se conecte a una API externa pública
- Permita enviar y visualizar datos en la interfaz

---

##  Tecnologías utilizadas

| Área      | Tecnología           |
|-----------|----------------------|
| Frontend  | HTML, CSS, JavaScript |
| Backend   | FastAPI (Python)     |
| Base de datos | SQLite (o MySQL opcional) |
| ORM       | SQLAlchemy           |
| API externa | JSONPlaceholder (tareas simuladas) |
| Control de versiones | Git y GitHub |

---

## 🧩 Funcionalidades

### 🧑‍💼 Gestión de Clientes
- Crear y visualizar clientes
- Campos: nombre, correo, teléfono, empresa

### 🎯 Gestión de Leads
- Crear y visualizar leads
- Campos: nombre, correo, interés, estado, fecha

### 🧱 Gestión de Proyectos
- Crear proyectos asociados a clientes
- Campos: nombre, descripción, fechas, presupuesto, estado

### 🔄 API externa de Tareas
- Conexión a `https://jsonplaceholder.typicode.com/todos`
- Se muestran tareas con título, estado y una fecha simulada de vencimiento
- Permite buscar por palabras clave

---

## 🚀 ¿Cómo ejecutar el proyecto?

### 1. Cloná el repositorio

```bash
git clone https://github.com/tu_usuario/proyecto_web_crm.git
cd proyecto_web_crm
