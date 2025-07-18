// Control de ventanas
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");

  document.querySelectorAll("nav ul li a").forEach(link => link.classList.remove("active"));
  document.querySelector(`nav ul li a[onclick*="${sectionId}"]`).classList.add("active");
}

// CRUD todo en un solo DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {

  // ---------------- API EXTERNA - TAREAS ----------------
  const proyectosApiContainer = document.getElementById("proyectos-api-container");
  const buscarProyectoApi = document.getElementById("buscarProyectoApi");

  let proyectosApiData = [];

  const cargarProyectosApi = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/proyectos/");
      const data = await res.json();
      proyectosApiData = data;
      mostrarProyectosApi(data);
    } catch (err) {
      console.error("Error cargando proyectos desde API:", err);
    }
  };

const mostrarProyectosApi = (data) => {
  proyectosApiContainer.innerHTML = "";

  const hoy = new Date();

  data.forEach(p => {
    const fila = document.createElement("tr");

    // Calcular días restantes
    const fechaFin = new Date(p.fecha_fin);
    const diferencia = Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24));

    // Colores de alerta
    let bgColor = "";
    if (diferencia < 0) bgColor = "#ffcccc";       // rojo
    else if (diferencia <= 9) bgColor = "#ffe5cc";  // naranja
    else if (diferencia <= 20) bgColor = "#fff7cc"; // amarillo
    else bgColor = "#e6ffe6";                       // verde

    // Crear select editable
    const selectEstado = document.createElement("select");
    ["en_proceso", "pausado", "terminado"].forEach(estado => {
      const option = document.createElement("option");
      option.value = estado;
      option.text = estado;
      if (estado === p.estado) option.selected = true;
      selectEstado.appendChild(option);
    });

    // Botón guardar
    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar";
    btnGuardar.style.marginLeft = "5px";
    btnGuardar.onclick = async () => {
      const nuevoEstado = selectEstado.value;

      const actualizado = {
        ...p,
        estado: nuevoEstado,
        id_cliente: p.cliente.id_cliente
      };

      try {
        await fetch(`http://127.0.0.1:8000/proyectos/${p.id_proyecto}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(actualizado)
        });
        alert("Proyecto actualizado con éxito");
        cargarProyectosApi(); // refrescar
      } catch (err) {
        alert("Error al actualizar el proyecto");
        console.error(err);
      }
    };

    // Construir fila
    fila.style.backgroundColor = bgColor;
    fila.innerHTML = `
      <td>${p.nombre_proyecto}</td>
      <td>${p.cliente?.nombre || "N/A"}</td>
      <td></td>
      <td>${p.presupuesto_estimado}</td>
      <td>${p.fecha_inicio} - ${p.fecha_fin}</td>
    `;

    fila.children[2].appendChild(selectEstado);
    fila.children[2].appendChild(btnGuardar);

    proyectosApiContainer.appendChild(fila);
  });
};


  buscarProyectoApi?.addEventListener("input", () => {
    const texto = buscarProyectoApi.value.toLowerCase();
    const filtrados = proyectosApiData.filter(p =>
      p.nombre_proyecto.toLowerCase().includes(texto)
    );
    mostrarProyectosApi(filtrados);
  });

  cargarProyectosApi();


  // ---------------------- CLIENTES ----------------------------
  const form = document.getElementById("formulario-cliente");
  const tbody = document.querySelector("#tabla-clientes tbody");

  const cargarClientes = async () => {
    const res = await fetch("http://127.0.0.1:8000/clientes/");
    const data = await res.json();
    tbody.innerHTML = "";
    data.forEach(c => {
      const row = tbody.insertRow();
      row.innerHTML = `
        <td>${c.nombre}</td>
        <td>${c.correo || ""}</td>
        <td>${c.telefono || ""}</td>
        <td>${c.empresa || ""}</td>
      `;
    });
  };

  form?.addEventListener("submit", async e => {
    e.preventDefault();
    const cliente = {
      nombre: document.getElementById("nombreCliente").value,
      correo: document.getElementById("correoCliente").value,
      telefono: document.getElementById("telefonoCliente").value,
      empresa: document.getElementById("empresaCliente").value
    };
    await fetch("http://127.0.0.1:8000/clientes/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cliente)
    });
    form.reset();
    cargarClientes();
    cargarClientesSelect(); // refresca el select de proyectos
  });

  cargarClientes();

  // ---------------------- LEADS ----------------------------
  const formLead = document.getElementById("formulario-lead");
  const tbodyLead = document.querySelector("#tabla-leads tbody");

  const cargarLeads = async () => {
    const res = await fetch("http://127.0.0.1:8000/leads/");
    const data = await res.json();
    tbodyLead.innerHTML = "";
    data.forEach(lead => {
      const row = tbodyLead.insertRow();
      row.innerHTML = `
        <td>${lead.nombre}</td>
        <td>${lead.correo || ""}</td>
        <td>${lead.telefono || ""}</td>
        <td>${lead.interes || ""}</td>
        <td>${lead.estado || ""}</td>
        <td>${lead.fecha_registro || ""}</td>
      `;
    });
  };

  formLead?.addEventListener("submit", async e => {
    e.preventDefault();
    const nuevoLead = {
      nombre: document.getElementById("nombreLead").value,
      correo: document.getElementById("correoLead").value,
      telefono: document.getElementById("telefonoLead").value,
      interes: document.getElementById("interesLead").value,
      estado: document.getElementById("estadoLead").value,
      fecha_registro: new Date().toISOString().split('T')[0]
    };
    await fetch("http://127.0.0.1:8000/leads/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(nuevoLead)
    });
    formLead.reset();
    cargarLeads();
  });

  cargarLeads();

  // ---------------------- PROYECTOS ----------------------------
  const formProyecto = document.getElementById("formulario-proyecto");
  const tbodyProyecto = document.querySelector("#tabla-proyectos tbody");
  const clienteSelect = document.getElementById("clienteProyecto");

  const cargarClientesSelect = async () => {
    const res = await fetch("http://127.0.0.1:8000/clientes/");
    const data = await res.json();
    clienteSelect.innerHTML = "";
    data.forEach(c => {
      const option = document.createElement("option");
      option.value = c.id_cliente;
      option.textContent = c.nombre;
      clienteSelect.appendChild(option);
    });
  };

  const cargarProyectos = async () => {
    const res = await fetch("http://127.0.0.1:8000/proyectos/");
    const data = await res.json();
    tbodyProyecto.innerHTML = "";
data.forEach(p => {
  const row = tbodyProyecto.insertRow();

  row.innerHTML = `
    <td>${p.nombre_proyecto}</td>
    <td>${p.descripcion || ""}</td>
    <td>${p.cliente?.nombre || ""}</td>
    <td>${p.presupuesto_estimado || ""}</td>
    <td>${p.estado || ""}</td>
    <td>${p.fecha_inicio || ""} - ${p.fecha_fin || ""}</td>
    <td></td>
  `;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "🗑️";
  btnEliminar.style.backgroundColor = "#d9534f";
  btnEliminar.style.color = "#fff";
  btnEliminar.onclick = async () => {
    if (confirm("¿Estás segura de que querés eliminar este proyecto?")) {
      try {
        await fetch(`http://127.0.0.1:8000/proyectos/${p.id_proyecto}`, {
          method: "DELETE"
        });
        alert("Proyecto eliminado");
        cargarProyectos(); // recarga la tabla
      } catch (err) {
        alert("Error al eliminar");
        console.error(err);
      }
    }
  };

  row.children[6].appendChild(btnEliminar); // la última celda
});

  };

  formProyecto?.addEventListener("submit", async e => {
    e.preventDefault();
    const nuevoProyecto = {
      nombre_proyecto: document.getElementById("nombreProyecto").value,
      descripcion: document.getElementById("descripcionProyecto").value,
      fecha_inicio: document.getElementById("fechaInicioProyecto").value,
      fecha_fin: document.getElementById("fechaFinProyecto").value,
      presupuesto_estimado: parseFloat(document.getElementById("presupuestoProyecto").value) || 0,
      estado: document.getElementById("estadoProyecto").value,
      id_cliente: parseInt(document.getElementById("clienteProyecto").value)
    };
    await fetch("http://127.0.0.1:8000/proyectos/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(nuevoProyecto)
    });
    formProyecto.reset();
    cargarProyectos();
  });

  cargarClientesSelect();
  cargarProyectos();
});
