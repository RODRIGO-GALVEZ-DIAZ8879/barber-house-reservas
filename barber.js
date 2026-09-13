const services = [
    {
        id: 1,
        name: "Corte clásico",
        duration: "45 min",
        price: 30,
        icon: "✂️",
        description: "Corte moderno con acabado impecable y atención personalizada."
    },
    {
        id: 2,
        name: "Barba premium",
        duration: "30 min",
        price: 25,
        icon: "🪒",
        description: "Ajuste de barba con precisión y perfilado artesanal."
    },
    {
        id: 3,
        name: "Facial grooming",
        duration: "20 min",
        price: 35,
        icon: "🧴",
        description: "Limpieza y cuidado facial para una apariencia rejuvenecida."
    },
    {
        id: 4,
        name: "Corte + barba",
        duration: "60 min",
        price: 50,
        icon: "💈",
        description: "Paquete completo para un look brillante y bien cuidado."
    },
    {
        id: 5,
        name: "Arreglo de cejas",
        duration: "15 min",
        price: 18,
        icon: "✨",
        description: "Definición y limpieza para resaltar tu mirada."
    },
    {
        id: 6,
        name: "Perfilado de bigote",
        duration: "20 min",
        price: 20,
        icon: "🧵",
        description: "Diseño y definición para un acabado elegante."
    }
];

const barbers = [
    { id: 1, name: "Luis Álvarez", specialty: "Cortes clásicos", avatar: "LA" },
    { id: 2, name: "Carlos Rojas", specialty: "Barba y perfilado", avatar: "CR" },
    { id: 3, name: "Marco Silva", specialty: "Styling moderno", avatar: "MS" }
];

const defaultReservations = [
    {
        id: 1,
        code: "BR-9F3K2",
        cliente: "Ana Gómez",
        telefono: "987654321",
        servicio: "Corte clásico",
        barbero: "Luis Álvarez",
        barberoId: 1,
        servicioId: 1,
        fecha: "2026-09-15",
        hora: "10:00",
        estado: "Pendiente"
    },
    {
        id: 2,
        code: "BR-2X1Q8",
        cliente: "Sergio Ruiz",
        telefono: "912345678",
        servicio: "Barba premium",
        barbero: "Carlos Rojas",
        barberoId: 2,
        servicioId: 2,
        fecha: "2026-09-15",
        hora: "11:30",
        estado: "Confirmada"
    },
    {
        id: 3,
        code: "BR-7L4M9",
        cliente: "Diego Pérez",
        telefono: "998765432",
        servicio: "Corte + barba",
        barbero: "Marco Silva",
        barberoId: 3,
        servicioId: 4,
        fecha: "2026-09-16",
        hora: "14:00",
        estado: "Completada"
    }
];

const STORAGE_KEY = "barber-house-reservations";

function loadReservations() {
    try {
        const savedReservations = localStorage.getItem(STORAGE_KEY);

        if (!savedReservations) {
            return [...defaultReservations];
        }

        const parsed = JSON.parse(savedReservations);
        return Array.isArray(parsed) && parsed.length ? parsed : [...defaultReservations];
    } catch (error) {
        return [...defaultReservations];
    }
}

let reservations = loadReservations();

function persistReservations() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

const reservationForm = document.getElementById("reservation-form");
const reservationMessage = document.getElementById("reservation-message");
const servicesList = document.getElementById("services-list");
const barbersList = document.getElementById("barbers-list");
const serviceSelect = document.getElementById("servicio");
const barberSelect = document.getElementById("barbero");
const searchForm = document.getElementById("search-form");
const searchResult = document.getElementById("search-result");
const searchCodeInput = document.getElementById("search-code");
const adminSearchInput = document.getElementById("admin-search");
const reservationsTable = document.getElementById("reservations-table");

function generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "BR-";

    for (let i = 0; i < 5; i += 1) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
}

function formatDate(dateString) {
    return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(new Date(`${dateString}T00:00:00`));
}

function renderServices() {
    servicesList.innerHTML = services
        .map(
            (service) => `
        <article class="service-card reveal">
          <div class="service-icon" aria-hidden="true">${service.icon}</div>
          <h3>${escapeHtml(service.name)}</h3>
          <p>${escapeHtml(service.description)}</p>
          <div class="card-meta">
            <span>${escapeHtml(service.duration)}</span>
            <strong>$${service.price.toFixed(2)}</strong>
          </div>
        </article>
      `
        )
        .join("");
}

function renderBarbers() {
    barbersList.innerHTML = barbers
        .map(
            (barber) => `
        <article class="barber-card reveal">
          <div class="avatar" aria-hidden="true">${escapeHtml(barber.avatar)}</div>
          <h3>${escapeHtml(barber.name)}</h3>
          <p>${escapeHtml(barber.specialty)}</p>
          <div class="card-meta">
            <span>Especialista</span>
            <strong>Disponible</strong>
          </div>
        </article>
      `
        )
        .join("");
}

function renderSelectOptions() {
    serviceSelect.innerHTML = services
        .map((service) => `<option value="${service.id}">${escapeHtml(service.name)}</option>`)
        .join("");

    barberSelect.innerHTML = barbers
        .map((barber) => `<option value="${barber.id}">${escapeHtml(barber.name)}</option>`)
        .join("");
}

function updateSummary() {
    const total = reservations.length;
    const pending = reservations.filter((item) => item.estado === "Pendiente").length;
    const confirmed = reservations.filter((item) => item.estado === "Confirmada").length;
    const completed = reservations.filter((item) => item.estado === "Completada").length;

    document.getElementById("summary-total").textContent = total;
    document.getElementById("summary-pending").textContent = pending;
    document.getElementById("summary-confirmed").textContent = confirmed;
    document.getElementById("summary-completed").textContent = completed;
}

function renderReservations(list = reservations) {
    if (!list.length) {
        reservationsTable.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; color: var(--muted);">No se encontraron reservas.</td>
      </tr>
    `;
        return;
    }

    reservationsTable.innerHTML = list
        .map(
            (reservation) => `
        <tr>
          <td>${escapeHtml(reservation.code)}</td>
          <td>${escapeHtml(reservation.cliente)}</td>
          <td>${escapeHtml(reservation.servicio)}</td>
          <td>${escapeHtml(reservation.barbero)}</td>
          <td>${formatDate(reservation.fecha)}</td>
          <td>${reservation.hora}</td>
          <td>
            <select class="status-select" data-id="${reservation.id}">
              <option value="Pendiente" ${reservation.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
              <option value="Confirmada" ${reservation.estado === "Confirmada" ? "selected" : ""}>Confirmada</option>
              <option value="Completada" ${reservation.estado === "Completada" ? "selected" : ""}>Completada</option>
              <option value="Cancelada" ${reservation.estado === "Cancelada" ? "selected" : ""}>Cancelada</option>
            </select>
          </td>
        </tr>
      `
        )
        .join("");

    document.querySelectorAll(".status-select").forEach((select) => {
        select.addEventListener("change", (event) => {
            const id = Number(event.target.dataset.id);
            const nuevoEstado = event.target.value;
            updateReservationStatus(id, nuevoEstado);
        });
    });
}

function updateReservationStatus(id, status) {
    reservations = reservations.map((reservation) => {
        if (reservation.id === id) {
            return { ...reservation, estado: status };
        }
        return reservation;
    });

    persistReservations();
    updateSummary();
    renderReservations(filterReservations(adminSearchInput.value));
}

function filterReservations(query = "") {
    const safeQuery = query.trim().toLowerCase();

    if (!safeQuery) return reservations;

    return reservations.filter(
        (reservation) =>
            reservation.code.toLowerCase().includes(safeQuery) ||
            reservation.cliente.toLowerCase().includes(safeQuery)
    );
}

function getStatusClassName(status) {
    const statusMap = {
        Pendiente: "pending",
        Confirmada: "confirmed",
        Completada: "completed",
        Cancelada: "cancelled"
    };

    return statusMap[status] || "pending";
}

function validateReservation(data) {
    const requiredFields = [
        data.cliente,
        data.telefono,
        data.servicioId,
        data.barberoId,
        data.fecha,
        data.hora
    ];

    if (requiredFields.some((field) => !field || String(field).trim() === "")) {
        return "Completa todos los campos obligatorios.";
    }

    if (data.cliente.length < 3 || data.cliente.length > 80) {
        return "El nombre debe tener entre 3 y 80 caracteres.";
    }

    if (!/^[0-9()+ -]{7,20}$/.test(data.telefono)) {
        return "Ingresa un número de teléfono válido.";
    }

    const selectedDate = new Date(`${data.fecha}T${data.hora}:00`);
    const now = new Date();

    if (Number.isNaN(selectedDate.getTime()) || selectedDate <= now) {
        return "La fecha y hora de la reserva no pueden ser anteriores a la actual.";
    }

    const reserved = reservations.some(
        (reservation) =>
            Number(reservation.barberoId) === Number(data.barberoId) &&
            reservation.fecha === data.fecha &&
            reservation.hora === data.hora &&
            ["Pendiente", "Confirmada", "Completada"].includes(reservation.estado)
    );

    if (reserved) {
        return "Ese horario ya está ocupado para el barbero seleccionado.";
    }

    return "";
}

function handleReservationSubmit(event) {
    event.preventDefault();

    const servicioId = Number(serviceSelect.value);
    const barberoId = Number(barberSelect.value);
    const servicio = services.find((item) => item.id === servicioId)?.name || "";
    const barbero = barbers.find((item) => item.id === barberoId)?.name || "";

    const data = {
        cliente: document.getElementById("cliente").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        servicioId,
        barberoId,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        servicio,
        barbero
    };

    const error = validateReservation(data);

    if (error) {
        reservationMessage.textContent = error;
        reservationMessage.className = "form-message error";
        return;
    }

    const newReservation = {
        id: Date.now(),
        code: generateCode(),
        cliente: data.cliente,
        telefono: data.telefono,
        servicio: data.servicio,
        barbero: data.barbero,
        barberoId: data.barberoId,
        servicioId: data.servicioId,
        fecha: data.fecha,
        hora: data.hora,
        estado: "Pendiente"
    };

    reservations.unshift(newReservation);
    persistReservations();
    reservationForm.reset();
    reservationMessage.textContent = `Reserva creada con éxito. Código: ${newReservation.code}`;
    reservationMessage.className = "form-message success";

    updateSummary();
    renderReservations(filterReservations(adminSearchInput.value));
}

function handleSearchReservation(event) {
    event.preventDefault();

    const code = searchCodeInput.value.trim().toUpperCase();

    if (!code) {
        searchResult.textContent = "Ingresa un código válido.";
        searchResult.className = "search-result error";
        return;
    }

    const reservation = reservations.find((item) => item.code.toUpperCase() === code);

    if (!reservation) {
        searchResult.textContent = "No se encontró ninguna reserva con ese código.";
        searchResult.className = "search-result error";
        return;
    }

    searchResult.innerHTML = `
    <strong>Reserva encontrada:</strong><br>
    Cliente: ${escapeHtml(reservation.cliente)}<br>
    Servicio: ${escapeHtml(reservation.servicio)}<br>
    Barbero: ${escapeHtml(reservation.barbero)}<br>
    Fecha: ${escapeHtml(formatDate(reservation.fecha))} • ${escapeHtml(reservation.hora)}<br>
    Estado: <span class="badge ${getStatusClassName(reservation.estado)}">${escapeHtml(reservation.estado)}</span>
  `;
    searchResult.className = "search-result success";
}

function handleAdminSearch(event) {
    const query = event.target.value;
    renderReservations(filterReservations(query));
}

function initDateDefaults() {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const formatted = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");
    document.getElementById("fecha").min = formatted;
    document.getElementById("fecha").value = formatted;
}

function init() {
    renderServices();
    renderBarbers();
    renderSelectOptions();
    initDateDefaults();
    updateSummary();
    renderReservations();

    reservationForm.addEventListener("submit", handleReservationSubmit);
    searchForm.addEventListener("submit", handleSearchReservation);
    adminSearchInput.addEventListener("input", handleAdminSearch);
}

init();