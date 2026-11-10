const pisos = [
    {
        nombre: "PLANTA BAJA",
        imagen: "Imágenes/PlantaBaja.jpg",
        cursos: ["Aula Bit 1","Aula Bit 3"]
    },

    {
        nombre: "PRIMER PISO",
        imagen: "Imágenes/PrimerPiso.jpg",
        cursos: [
            "Aula Bit 4","Laboratorio de Software II","Laboratorio de Hardware",
            "Laboratorio de Seguridad Informática"]
    },

    {
        nombre: "SEGUNDO PISO",
        imagen: "Imágenes/SegundoPiso.jpg",
        cursos: [
            "Laboratorio R.V. R.A. y Videojuegos","Laboratorio de Computación Móvil","Aula Bit 5",
            "Laboratorio de Software I","Sala de Defensas"]
    }

];


let pisoActual = 0;
const mapaPiso = document.getElementById("mapaPiso");
const nombrePiso = document.getElementById("nombrePiso");
const botonesPiso = document.querySelectorAll(".btnPiso");
const flechaIzquierda = document.getElementById("flechaIzquierda");
const flechaDerecha = document.getElementById("flechaDerecha");
const listaCursos = document.getElementById("listaCursos");

function cambiarPiso(numero) {
    pisoActual = numero;
    // Cambiar imagen
    mapaPiso.src = pisos[pisoActual].imagen;
    mapaPiso.alt = "Mapa " + pisos[pisoActual].nombre;
    // Cambiar nombre
    nombrePiso.textContent = pisos[pisoActual].nombre;
    // Actualizar botón del piso
    botonesPiso.forEach((boton, indice) => {
        boton.classList.remove("activo");
        if (indice === pisoActual) {
            boton.classList.add("activo");
        }
    });

    // Crear botones de cursos
    mostrarCursos();
}

function mostrarCursos() {
    // Limpiar botones anteriores
    listaCursos.innerHTML = "";
    // Obtener cursos del piso actual
    const cursos = pisos[pisoActual].cursos;
    // Crear un botón por cada curso
    cursos.forEach((curso) => {
        const boton = document.createElement("button");
        boton.classList.add("btnCurso");
        boton.textContent = curso;
        // Por ahora solo mostramos qué curso seleccionó
        boton.addEventListener("click", () => {

    if (curso === "Aula Bit 1") {
        localStorage.setItem("destinoCampus", "Aula Bit 1");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Aula Bit 3") {
        localStorage.setItem("destinoCampus", "Aula Bit 3");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Aula Bit 4") {
        localStorage.setItem("destinoCampus", "Aula Bit 4");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Laboratorio de Software II") {
        localStorage.setItem("destinoCampus", "Laboratorio de Software II");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Laboratorio de Hardware") {
        localStorage.setItem("destinoCampus", "Laboratorio de Hardware");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Laboratorio de Seguridad Informática") {
        localStorage.setItem("destinoCampus", "Laboratorio de Seguridad Informática");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Laboratorio R.V. R.A. y Videojuegos") {
        localStorage.setItem("destinoCampus", "Laboratorio R.V. R.A. y Videojuegos");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Laboratorio de Computación Móvil") {
        localStorage.setItem("destinoCampus", "Laboratorio de Computación Móvil");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Aula Bit 5") {
        localStorage.setItem("destinoCampus", "Aula Bit 5");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Laboratorio de Software I") {
        localStorage.setItem("destinoCampus", "Laboratorio de Software I");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }
    if (curso === "Sala de Defensas") {
        localStorage.setItem("destinoCampus", "Sala de Defensas");
        console.log("Destino guardado:", localStorage.getItem("destinoCampus"));
        window.location.href = "index.html";
    }

});
        listaCursos.appendChild(boton);
    });
}

// BOTONES DE PISOS
botonesPiso.forEach((boton, indice) => {
    boton.addEventListener("click", () => {
        cambiarPiso(indice);
    });
});

// FLECHA IZQUIERDA
flechaIzquierda.addEventListener("click", () => {
    pisoActual--;
    if (pisoActual < 0) {
        pisoActual = pisos.length - 1;
    }
    cambiarPiso(pisoActual);
});

// FLECHA DERECHA
flechaDerecha.addEventListener("click", () => {
    pisoActual++;
    if (pisoActual >= pisos.length) {
        pisoActual = 0;
    }
    cambiarPiso(pisoActual);
});
// Cargar cursos del primer piso al iniciar
mostrarCursos();