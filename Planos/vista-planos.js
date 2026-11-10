
import { crearPlano } from "./planos.js";

const contenedorPlano = document.getElementById("contenedorPlano");
const imagenOriginal = document.getElementById("mapaPiso");

// Detectar el piso seleccionado mediante el botón activo
function obtenerPisoActual() {
    const botonActivo = document.querySelector(".btnPiso.activo");

    return botonActivo
        ? Number(botonActivo.dataset.piso)
        : 0;
}

// Dibujar el plano
function actualizarPlano() {

    const piso = obtenerPisoActual();

    contenedorPlano.innerHTML = crearPlano(piso);

    conectarHabitaciones();
}

// Conectar cada habitación con el teletransporte original
function conectarHabitaciones() {

    const habitaciones = contenedorPlano.querySelectorAll(
        ".ambiente.disponible[data-destino]"
    );

    habitaciones.forEach(habitacion => {

        function seleccionarAula() {

            const nombre = habitacion.dataset.destino;

            const botonOriginal = Array.from(
                document.querySelectorAll("#listaCursos .btnCurso")
            ).find(boton => boton.textContent.trim() === nombre);

            if (botonOriginal) {
                botonOriginal.click();
            } else {
                console.warn("No se encontró el destino:", nombre);
            }
        }

        habitacion.addEventListener("click", seleccionarAula);

        habitacion.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                seleccionarAula();
            }

        });

    });
}

// Escuchar cambios de piso
document.querySelectorAll(".btnPiso").forEach(boton => {
    boton.addEventListener("click", actualizarPlano);
});

// Escuchar las flechas
document.getElementById("flechaIzquierda")
    .addEventListener("click", () => {
        setTimeout(actualizarPlano, 0);
    });

document.getElementById("flechaDerecha")
    .addEventListener("click", () => {
        setTimeout(actualizarPlano, 0);
    });
// Dibujar el primer plano
actualizarPlano();
