# Barber House — Sistema de reservas

Sistema web completo para la gestión de reservas de una barbería premium: servicios, barberos, reservas con validación, búsqueda por código y panel administrativo con control de estados.

## ✨ Características

- **Reserva de citas** con validación en tiempo real (nombre, teléfono, fecha/hora futura y disponibilidad del barbero) y **resaltado visual de los campos con error**.
- **Código único** de reserva generado automáticamente (formato `BR-XXXXX`) con **animación y sonido de confirmación** al crearla.
- **Consulta de reservas** por código desde la sección de consulta.
- **Panel administrativo** con resumen en vivo (total, pendientes, confirmadas y completadas), tabla dinámica con filas alternadas, buscador, cambio de estado y **exportación a CSV**.
- **Modo claro / oscuro** con botón de alternancia en la cabecera y preferencia guardada en `localStorage` (el hero se mantiene oscuro en modo claro para dar contraste).
- **Persistencia local** con `localStorage`: las reservas y el tema se conservan al recargar la página.
- **Animaciones al hacer scroll**: las secciones y tarjetas aparecen en cascada cuando entran en pantalla (con `IntersectionObserver` y soporte de `prefers-reduced-motion`).
- **Diseño responsive premium** con tema oscuro, acentos dorados, botones con efecto de brillo, favicon propio y botón flotante "volver arriba".

## 📁 Estructura del proyecto

```
├── activadaa1.html          # Estructura y contenido de la aplicación
├── CSS/
│   └── activadaa1.css       # Estilos, diseño responsive y apariencia visual
├── barber.js                # Lógica: servicios, barberos, reservas y panel admin
└── README.md
```

## 🚀 Cómo abrir el proyecto

```bash
# Opción 1: hacer doble clic en activadaa1.html

# Opción 2: levantar un servidor local
python -m http.server 8000
# o
npx serve .
```

## 🧪 Servicios incluidos

| Servicio | Duración | Precio |
|---|---|---|
| Corte clásico | 45 min | $30.00 |
| Barba premium | 30 min | $25.00 |
| Facial grooming | 20 min | $35.00 |
| Corte + barba | 60 min | $50.00 |
| Arreglo de cejas | 15 min | $18.00 |
| Perfilado de bigote | 20 min | $20.00 |

## 👨‍🦱 Equipo

- **Luis Álvarez** — Cortes clásicos
- **Carlos Rojas** — Barba y perfilado
- **Marco Silva** — Styling moderno

---
© 2026 Barber House • Sistema de reservas profesional