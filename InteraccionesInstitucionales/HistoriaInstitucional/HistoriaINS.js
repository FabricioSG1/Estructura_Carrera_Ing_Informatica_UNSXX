// =====================================
// HISTORIA E IDENTIDAD INSTITUCIONAL
// =====================================

export function crearPanelHistoria(controls) {

    const panel = document.getElementById("panelHistoria");
    const botonCerrar = document.getElementById("cerrarHistoria");

    if (!panel || !botonCerrar) {
        console.error("No se encontró el panel de Historia Institucional.");

        return {
            abrir: () => {},
            cerrar: () => {},
            estaAbierto: () => false
        };
    }

    let panelAbierto = false;

    // =====================================
    // CAMBIAR ENTRE SECCIONES
    // =====================================

    function cambiarSeccion(nombre) {

        document.querySelectorAll(".seccion-historia").forEach(seccion => {
            seccion.classList.remove("activa");
        });

        document.querySelectorAll(".nav-historia").forEach(boton => {
            boton.classList.remove("activo");
        });

        const seccionSeleccionada = document.getElementById(
            "historia-" + nombre
        );

        if (seccionSeleccionada) {
            seccionSeleccionada.classList.add("activa");
        }

        const botonSeleccionado = document.querySelector(
            `.nav-historia[data-historia="${nombre}"]`
        );

        if (botonSeleccionado) {
            botonSeleccionado.classList.add("activo");
        }
    }

    // =====================================
    // BOTONES DE NAVEGACIÓN
    // =====================================

    document.querySelectorAll(".nav-historia").forEach(boton => {

        boton.addEventListener("click", () => {
            cambiarSeccion(boton.dataset.historia);
        });

    });

    // =====================================
    // BOTÓN DE LA PORTADA
    // =====================================

    document.querySelectorAll(".btn-historia").forEach(boton => {

        boton.addEventListener("click", () => {

            const destino = boton.dataset.historia;

            cambiarSeccion(destino);

            panel.querySelector(".historia-contenedor").scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });

    // =====================================
    // ABRIR PANEL
    // =====================================

    function abrir() {

        panelAbierto = true;
        panel.style.display = "flex";

        cambiarSeccion("inicio");

        panel.querySelector(".historia-contenedor").scrollTop = 0;

        controls.unlock();

    }

    // =====================================
    // CERRAR PANEL
    // =====================================

    function cerrar() {

        panelAbierto = false;
        panel.style.display = "none";

        controls.lock();

    }

    botonCerrar.addEventListener("click", cerrar);

    // =====================================
    // CERRAR CON TECLA ESCAPE
    // =====================================

    function detectarEscape(event) {

        if (event.key === "Escape" && panelAbierto) {
            cerrar();
        }

    }

    document.addEventListener("keydown", detectarEscape);

    // =====================================
    // FUNCIONES DISPONIBLES
    // =====================================

    return {
        abrir,
        cerrar,
        estaAbierto: () => panelAbierto
    };

}
