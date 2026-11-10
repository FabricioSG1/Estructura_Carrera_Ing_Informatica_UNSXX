
/*
    ZONAS INTERACTIVAS DEL MAPA

    Este archivo NO modifica el teletransporte.
    Cuando se selecciona un aula, activa el botón
    correspondiente que ya crea mapa.js.
*/

const zonasMapa = document.getElementById("zonasMapa");

// Coordenadas expresadas en porcentajes de cada imagen.
// x = izquierda, y = arriba, w = ancho, h = alto.

const zonasPorPiso = [

    // PLANTA BAJA
    [
        {
            nombre: "Aula Bit 3",
            x: 5.5, y: 6.5, w: 22, h: 33
        },
        {
            nombre: "Aula Bit 1",
            x: 60, y: 40, w: 23, h: 29
        },
        {
            nombre: "Data Center",
            x: 28, y: 10, w: 24, h: 30,
            disponible: false
        },
        {
            nombre: "Museo de Computadoras",
            x: 5, y: 40, w: 23, h: 38,
            disponible: false
        }
    ],

    // PRIMER PISO
    [
        {
            nombre: "Aula Bit 4",
            x: 5, y: 6, w: 23, h: 33
        },
        {
            nombre: "Laboratorio de Software II",
            x: 59, y: 6, w: 24, h: 33
        },
        {
            nombre: "Laboratorio de Hardware",
            x: 5, y: 41, w: 23, h: 34
        },
        {
            nombre: "Laboratorio de Seguridad Informática",
            x: 59, y: 41, w: 24, h: 34
        }
    ],

    // SEGUNDO PISO
    [
        {
            nombre: "Laboratorio R.V. R.A. y Videojuegos",
            x: 5, y: 6, w: 23, h: 33
        },
        {
            nombre: "Laboratorio de Computación Móvil",
            x: 59, y: 6, w: 24, h: 33
        },
        {
            nombre: "Aula Bit 5",
            x: 5, y: 41, w: 23, h: 34
        },
        {
            nombre: "Laboratorio de Software I",
            x: 59, y: 41, w: 24, h: 34
        },
        {
            nombre: "Sala de Defensas",
            x: 29, y: 6, w: 23, h: 33
        }
    ]
];

function crearZonasInteractivas() {

    zonasMapa.innerHTML = "";

    const zonas = zonasPorPiso[pisoActual];

    zonas.forEach(zona => {

        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "zonaAula";
        boton.title = zona.nombre;
        boton.setAttribute("aria-label", zona.nombre);

        boton.style.left = zona.x + "%";
        boton.style.top = zona.y + "%";
        boton.style.width = zona.w + "%";
        boton.style.height = zona.h + "%";

        if (zona.disponible === false) {

            boton.classList.add("noDisponible");
            boton.disabled = true;

        } else {

            boton.addEventListener("click", () => {

                // Buscar el botón original de mapa.js
                const botonOriginal = Array.from(
                    document.querySelectorAll("#listaCursos .btnCurso")
                ).find(b => b.textContent.trim() === zona.nombre);

                // Ejecutar el teletransporte original
                if (botonOriginal) {
                    botonOriginal.click();
                } else {
                    console.warn(
                        "No se encontró el botón original:",
                        zona.nombre
                    );
                }

            });

        }

        zonasMapa.appendChild(boton);

    });

}


// Actualizar las zonas cuando cambia el piso
document.querySelectorAll(".btnPiso").forEach(boton => {

    boton.addEventListener("click", () => {
        crearZonasInteractivas();
    });

});

document.getElementById("flechaIzquierda")
    .addEventListener("click", crearZonasInteractivas);

document.getElementById("flechaDerecha")
    .addEventListener("click", crearZonasInteractivas);


// Mostrar las zonas iniciales
crearZonasInteractivas();
