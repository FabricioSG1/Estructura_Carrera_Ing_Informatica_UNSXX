export function crearPanelAcreditacion(controls) {

    const panel = document.getElementById("panelAcreditacion");
    const botonCerrar = document.getElementById("cerrarAcreditacion");

    if (!panel || !botonCerrar) {
        console.error("No se encontró el panel de Acreditación.");

        return {
            abrir: () => {},
            cerrar: () => {},
            estaAbierto: () => false
        };
    }

    let panelAbierto = false;

    // CAMBIAR ENTRE SECCIONES
    function cambiarSeccion(nombre) {

        document.querySelectorAll(".seccion-acreditacion").forEach(seccion => {
            seccion.classList.remove("activa");
        });

        document.querySelectorAll(".nav-acreditacion").forEach(boton => {
            boton.classList.remove("activo");
        });

        const seccionSeleccionada = document.getElementById(
            "acreditacion-" + nombre
        );

        if (seccionSeleccionada) {
            seccionSeleccionada.classList.add("activa");
        }

        const botonSeleccionado = document.querySelector(
            `.nav-acreditacion[data-acreditacion="${nombre}"]`
        );

        if (botonSeleccionado) {
            botonSeleccionado.classList.add("activo");
        }

        panel.querySelector(".acreditacion-contenedor").scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // BOTONES DE NAVEGACIÓN
    document.querySelectorAll(".nav-acreditacion").forEach(boton => {

        boton.addEventListener("click", () => {
            cambiarSeccion(boton.dataset.acreditacion);
        });

    });


    // BOTÓN DE LA PORTADA
    document.querySelectorAll(".btn-acreditacion").forEach(boton => {

        boton.addEventListener("click", () => {
            cambiarSeccion(boton.dataset.acreditacion);
        });

    });


    // ABRIR PANEL
    function abrir() {

        panelAbierto = true;
        panel.style.display = "flex";

        cambiarSeccion("inicio");

        controls.unlock();

    }


    // CERRAR PANEL
    function cerrar() {

        panelAbierto = false;
        panel.style.display = "none";

        controls.lock();

    }


    botonCerrar.addEventListener("click", cerrar);


    // CERRAR CON ESCAPE
    function detectarEscape(event) {

        if (event.key === "Escape" && panelAbierto) {
            cerrar();
        }

    }

    document.addEventListener("keydown", detectarEscape);


    // FUNCIONES DISPONIBLES
    return {
        abrir,
        cerrar,
        estaAbierto: () => panelAbierto
    };

}