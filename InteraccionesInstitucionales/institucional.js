import * as THREE from 'three';
import { crearPanelHistoria } from './HistoriaInstitucional/HistoriaINS.js';
import { crearPanelAcreditacion } from './Acreditacion/acreditacion.js';
export function crearSimbolosInstitucionales(scene, camera, controls) {
    const simbolos = [];
    const mensajeInteraccion = document.createElement("div");

    mensajeInteraccion.id = "mensajeInstitucional";
    mensajeInteraccion.className = "mensaje-interaccion";
    mensajeInteraccion.innerHTML =
        'Apunta al símbolo y haz <strong>clic izquierdo</strong>';

    mensajeInteraccion.style.display = "none";

    document.body.appendChild(mensajeInteraccion);
    const raycaster = new THREE.Raycaster();
    const centroPantalla = new THREE.Vector2(0, 0);
    const distanciaInteraccion = 5;
    let simboloCercano = null;

    const informacion = [
        {
            id: "historia",
            titulo: "Historia e Identidad Institucional",
            colores: ["#5420a8", "#e6a52e", "#a52dba"],
            posicion: [-13.57, 7, 37.30],
            icono: "historia"
        },
        {
            id: "acreditacion",
            titulo: "Acreditación",
            colores: ["#0878ff", "#00d9ff", "#e9b536"],
            posicion: [5.50, 3, 5.95],
            icono: "acreditacion"
        },
        {
            id: "formacion",
            titulo: "Formación Académica",
            colores: ["#00c9b7", "#2765dc", "#a42bda"],
            posicion: [-28.94, 9.40, 27.35],
            icono: "formacion"
        }
    ];

    function crearTexturaDegradada(colores) {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");

        const gradiente = ctx.createLinearGradient(0, 0, 512, 512);

        colores.forEach((color, i) => {
            gradiente.addColorStop(i / (colores.length - 1), color);
        });

        ctx.fillStyle = gradiente;
        ctx.fillRect(0, 0, 512, 512);

        const reflejo = ctx.createLinearGradient(0, 0, 0, 512);
        reflejo.addColorStop(0, "rgba(255,255,255,0.55)");
        reflejo.addColorStop(0.35, "rgba(255,255,255,0.05)");
        reflejo.addColorStop(0.65, "rgba(0,0,0,0.08)");
        reflejo.addColorStop(1, "rgba(255,255,255,0.25)");

        ctx.fillStyle = reflejo;
        ctx.fillRect(0, 0, 512, 512);

        const textura = new THREE.CanvasTexture(canvas);
        textura.colorSpace = THREE.SRGBColorSpace;

        return textura;
    }

    function crearIcono(tipo) {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = "#ffe28a";
        ctx.fillStyle = "#ffe28a";
        ctx.lineWidth = 17;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (tipo === "historia") {
            ctx.beginPath();
            ctx.moveTo(105, 180);
            ctx.lineTo(256, 85);
            ctx.lineTo(407, 180);
            ctx.closePath();
            ctx.fill();

            ctx.fillRect(115, 180, 282, 30);

            [155, 235, 315].forEach(x => {
                ctx.fillRect(x, 215, 35, 175);
            });

            ctx.fillRect(105, 390, 302, 35);
            ctx.fillRect(75, 425, 362, 22);
            ctx.fillRect(50, 447, 412, 20);
            ctx.clearRect(235, 300, 45, 90);
        }

        if (tipo === "acreditacion") {
            ctx.beginPath();
            ctx.arc(256, 215, 125, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(256, 215, 95, 0, Math.PI * 2);
            ctx.stroke();

            ctx.lineWidth = 28;
            ctx.beginPath();
            ctx.moveTo(185, 215);
            ctx.lineTo(235, 265);
            ctx.lineTo(335, 155);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(185, 325);
            ctx.lineTo(160, 440);
            ctx.lineTo(245, 395);
            ctx.lineTo(256, 325);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(327, 325);
            ctx.lineTo(352, 440);
            ctx.lineTo(267, 395);
            ctx.lineTo(256, 325);
            ctx.fill();
        }

        if (tipo === "formacion") {
            ctx.beginPath();
            ctx.moveTo(256, 185);
            ctx.bezierCurveTo(180, 125, 100, 145, 75, 170);
            ctx.lineTo(75, 365);
            ctx.bezierCurveTo(145, 335, 205, 350, 256, 400);
            ctx.bezierCurveTo(307, 350, 367, 335, 437, 365);
            ctx.lineTo(437, 170);
            ctx.bezierCurveTo(412, 145, 332, 125, 256, 185);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(256, 185);
            ctx.lineTo(256, 400);
            ctx.stroke();

            for (let i = 0; i < 3; i++) {
                const y = 225 + i * 45;

                ctx.beginPath();
                ctx.moveTo(110, y);
                ctx.lineTo(205, y + 15);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(302, y + 15);
                ctx.lineTo(402, y);
                ctx.stroke();
            }
        }

        const textura = new THREE.CanvasTexture(canvas);
        textura.colorSpace = THREE.SRGBColorSpace;

        return textura;
    }

    function crearTitulo(texto, colores) {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#10182e";
        ctx.beginPath();
        ctx.roundRect(25, 25, 974, 206, 45);
        ctx.fill();

        const gradiente = ctx.createLinearGradient(0, 0, 1024, 0);

        colores.forEach((color, i) => {
            gradiente.addColorStop(i / (colores.length - 1), color);
        });

        ctx.strokeStyle = gradiente;
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.roundRect(25, 25, 974, 206, 45);
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 48px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(texto, 512, 128, 900);

        const textura = new THREE.CanvasTexture(canvas);
        textura.colorSpace = THREE.SRGBColorSpace;

        return textura;
    }

    function crearSimbolo(datos) {
        if (!datos.posicion) {
            console.warn("Falta establecer la posición de:", datos.titulo);
            return;
        }

        const grupo = new THREE.Group();
        grupo.position.set(...datos.posicion);

        const geometria = new THREE.CylinderGeometry(1.25, 1.25, 0.22, 96);
        const textura = crearTexturaDegradada(datos.colores);

        const materialLateral = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.95,
            roughness: 0.16
        });

        const materialFrontal = new THREE.MeshStandardMaterial({
            map: textura,
            metalness: 0.85,
            roughness: 0.2
        });

        const circulo = new THREE.Mesh(geometria, [
            materialLateral,
            materialFrontal,
            materialFrontal
        ]);

        circulo.rotation.x = Math.PI / 2;
        grupo.add(circulo);

        const geometriaBorde = new THREE.TorusGeometry(1.25, 0.065, 16, 96);

        const materialBorde = new THREE.MeshStandardMaterial({
            color: 0xffd875,
            metalness: 1,
            roughness: 0.12,
            emissive: new THREE.Color(datos.colores[1]),
            emissiveIntensity: 0.35
        });

        const borde = new THREE.Mesh(geometriaBorde, materialBorde);
        borde.position.z = 0.13;
        grupo.add(borde);

        const texturaIcono = crearIcono(datos.icono);

        const materialIcono = new THREE.MeshBasicMaterial({
            map: texturaIcono,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        const icono = new THREE.Mesh(
            new THREE.PlaneGeometry(1.65, 1.65),
            materialIcono
        );

        icono.position.z = 0.17;
        grupo.add(icono);

        const texturaTitulo = crearTitulo(datos.titulo, datos.colores);

        const materialTitulo = new THREE.MeshBasicMaterial({
            map: texturaTitulo,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        const titulo = new THREE.Mesh(
            new THREE.PlaneGeometry(4.3, 1.075),
            materialTitulo
        );

        titulo.position.set(0, 2.1, 0.1);
        grupo.add(titulo);

        scene.add(grupo);

        simbolos.push({
            id: datos.id,
            titulo: datos.titulo,
            grupo,
            icono,
            posicion: new THREE.Vector3(...datos.posicion),
            alturaInicial: datos.posicion[1],
            tituloMesh: titulo
        });
    }

    informacion.forEach(crearSimbolo);

    const panelFormacion = document.getElementById("panelFormacion");
    const botonCerrarFormacion = document.getElementById("cerrarFormacion");

    let panelAbierto = false;
    const panelHistoria = crearPanelHistoria(controls);
    const panelAcreditacion = crearPanelAcreditacion(controls);
    function abrirPanelFormacion() {
        panelAbierto = true;
        panelFormacion.style.display = "flex";
        controls.unlock();
    }

    function cerrarPanelFormacion() {
        panelAbierto = false;
        panelFormacion.style.display = "none";
        controls.lock();
    }

    botonCerrarFormacion.addEventListener("click", cerrarPanelFormacion);

    function cambiarSeccion(nombre) {
        document.querySelectorAll(".seccion-formacion").forEach(seccion => {
            seccion.classList.remove("activa");
        });

        document.querySelectorAll(".nav-formacion").forEach(boton => {
            boton.classList.remove("activo");
        });

        const seccion = document.getElementById("seccion-" + nombre);

        if (seccion) {
            seccion.classList.add("activa");
        }

        const botonNav = document.querySelector(
            `.nav-formacion[data-seccion="${nombre}"]`
        );

        if (botonNav) {
            botonNav.classList.add("activo");
        }
    }

    document.querySelectorAll("[data-seccion]").forEach(boton => {
        boton.addEventListener("click", () => {
            cambiarSeccion(boton.dataset.seccion);
        });
    });

    document.querySelectorAll(".btn-anio").forEach(boton => {
        boton.addEventListener("click", () => {
            document.querySelectorAll(".btn-anio").forEach(b => {
                b.classList.remove("activo");
            });

            boton.classList.add("activo");

            const anio = boton.dataset.anio;

            const nombres = [
                "Primer año",
                "Segundo año",
                "Tercer año",
                "Cuarto año",
                "Quinto año"
            ];

            document.getElementById("tituloAnio").textContent =
                nombres[Number(anio) - 1];

            mostrarAsignaturas(anio);
        });
    });

    const planEstudios = {
        1: {
            titulo: "Fundamentos y Ciencias Exactas",
            descripcion: "Formación matemática, física, lógica algorítmica, arquitectura de hardware y bases de investigación.",
            troncales: [
                "Álgebra Superior y Lineal",
                "Análisis Matemático I",
                "Física I",
                "Metodología de la Programación",
                "Taller de Programación",
                "Arquitectura de Computadoras y Dispositivos Móviles",
                "Contabilidad Básica y Administración General",
                "Metodología de la Investigación",
                "Inglés Técnico",
                "Filosofía",
                "Historia del Movimiento Obrero I"
            ],
            menciones: [],
            certificacion: ""
        },

        2: {
            titulo: "Ingeniería de Datos y Desarrollo de Software",
            descripcion: "Estructuras de datos, bases de datos, sistemas operativos, análisis de sistemas y desarrollo web.",
            troncales: [
                "Análisis Matemático II",
                "Física II",
                "Estadística y Probabilidad",
                "Desarrollo Web",
                "Taller de Desarrollo de Software",
                "Estructura de Datos",
                "Diseño y Administración de Base de Datos",
                "Análisis y Diseño de Sistemas",
                "Sistemas Operativos",
                "Economía Política",
                "Historia del Movimiento Obrero II"
            ],
            menciones: [],
            certificacion: "Certificación intermedia: Técnico Universitario Medio en Programación de Sistemas Informáticos."
        },

        3: {
            titulo: "Redes, Robótica e Inicio de Menciones",
            descripcion: "Infraestructura de redes, telecomunicaciones, simulación y comienzo de las dos rutas de especialización.",
            troncales: [
                "Redes I",
                "Tecnología y Programación en Robótica Móvil",
                "Telecomunicaciones",
                "Tecnologías Emergentes",
                "Simulación de Sistemas",
                "Investigación Operativa",
                "Legislación Social Boliviana",
                "Formación Social Boliviana"
            ],
            menciones: [
                [
                    "Seguridad Informática",
                    [
                        "Servidores y Seguridad en Redes",
                        "Ciberseguridad y Análisis de Vulnerabilidades",
                        "Seguridad en Sistemas de Información y Base de Datos",
                        "Criptografía y Esteganografía"
                    ]
                ],
                [
                    "Computación Móvil",
                    [
                        "Programación de Dispositivos Móviles",
                        "Desarrollo de Videojuegos para Dispositivos Móviles",
                        "Redes Móviles y Cloud Computing",
                        "Desarrollo de Aplicaciones Móviles para Geolocalización"
                    ]
                ]
            ],
            certificacion: "Certificación intermedia: Técnico Universitario Superior en Sistemas Informáticos."
        },

        4: {
            titulo: "Sistemas Inteligentes y Alta Especialización",
            descripcion: "Inteligencia artificial, ingeniería de software avanzada y profundización técnica según la mención elegida.",
            troncales: [
                "Inteligencia Artificial",
                "Ingeniería de Software",
                "Ingeniería de Sistemas",
                "Programación Gráfica",
                "Electiva I",
                "Política Económica Nacional",
                "Política Nacional"
            ],
            menciones: [
                [
                    "Seguridad Informática",
                    [
                        "Inteligencia de Amenazas y Ethical Hacking",
                        "Informática Forense",
                        "Auditoría Informática",
                        "Sistemas de Gestión de Seguridad de Tecnologías de la Información"
                    ]
                ],
                [
                    "Computación Móvil",
                    [
                        "Realidad Virtual y Aumentada",
                        "Visión Artificial para Dispositivos Móviles",
                        "Taller de Desarrollo de Aplicaciones para Dispositivos Móviles",
                        "Internet de las Cosas"
                    ]
                ]
            ],
            certificacion: ""
        },

        5: {
            titulo: "Graduación, Práctica Profesional y Gestión de Proyectos",
            descripcion: "Investigación de grado, prácticas profesionales e integración de conocimientos para la gestión tecnológica.",
            troncales: [
                "Taller de Graduación",
                "Prácticas Profesionales",
                "Emprendimiento, Preparación, Evaluación y Gestión de Proyectos y Alta Gerencia",
                "Electiva II",
                "Dirección Política",
                "Tesis Política"
            ],
            menciones: [],
            certificacion: "Culminación del plan de estudios: Licenciatura en Ingeniería Informática."
        }
    };

    function mostrarAsignaturas(anio) {
        const datos = planEstudios[Number(anio)];
        const contenedor = document.getElementById("listaAsignaturas");
        const descripcion = document.getElementById("descripcionAnio");
        const certificacion = document.getElementById("certificacionAnio");

        if (!datos || !contenedor) return;

        const ordinales = [
            "",
            "Primer",
            "Segundo",
            "Tercer",
            "Cuarto",
            "Quinto"
        ];

        document.getElementById("tituloAnio").textContent =
            `${ordinales[Number(anio)]} año · ${datos.titulo}`;

        descripcion.textContent = datos.descripcion;
        contenedor.innerHTML = "";

        function agregarGrupo(titulo, materias) {
            const heading = document.createElement("h4");
            heading.className = "encabezado-asignaturas";
            heading.textContent = titulo;
            contenedor.appendChild(heading);

            materias.forEach((materia, indice) => {
                const item = document.createElement("div");
                item.className = "asignatura-item";

                const numero = document.createElement("span");
                numero.textContent = String(indice + 1).padStart(2, "0");

                const nombre = document.createElement("div");
                nombre.textContent = materia;

                item.append(numero, nombre);
                contenedor.appendChild(item);
            });
        }

        agregarGrupo(
            `Asignaturas troncales (${datos.troncales.length})`,
            datos.troncales
        );

        datos.menciones.forEach(([nombre, materias]) => {
            agregarGrupo(`Mención: ${nombre}`, materias);
        });

        certificacion.textContent = datos.certificacion;
    }

    mostrarAsignaturas(1);

    function actualizar(tiempo) {
        simbolos.forEach(simbolo => {
            simbolo.grupo.position.y =
                simbolo.alturaInicial + Math.sin(tiempo * 2) * 0.15;

            simbolo.grupo.rotation.y += 0.008;
        });
        if (panelAbierto || panelHistoria.estaAbierto()) {
        simboloCercano = null;
        mensajeInteraccion.style.display = "none";
        return;
    }

        simboloCercano = null;
        let distanciaMinima = distanciaInteraccion;

        simbolos.forEach(simbolo => {
            const distancia = camera.position.distanceTo(simbolo.posicion);

            if (distancia <= distanciaMinima) {
                distanciaMinima = distancia;
                simboloCercano = simbolo;
            }
        });

        if (mensajeInteraccion) {
            mensajeInteraccion.style.display =
                simboloCercano && controls.isLocked ? "block" : "none";
        }
        if (
    panelAbierto ||
    panelHistoria.estaAbierto() ||
    panelAcreditacion.estaAbierto()
) {
    simboloCercano = null;
    mensajeInteraccion.style.display = "none";
    return;
}
    }

    function detectarClic(event) {
    if (event.button !== 0) return;
    if (!controls.isLocked) return;
    if (!simboloCercano) return;
    if (panelAbierto || panelHistoria.estaAbierto()) return;

    raycaster.setFromCamera(centroPantalla, camera);

    const intersecciones = raycaster.intersectObjects(
        simboloCercano.grupo.children,
        true
    );

    if (simboloCercano.id === "formacion") {

    abrirPanelFormacion();

} else if (simboloCercano.id === "historia") {

    mensajeInteraccion.style.display = "none";
    panelHistoria.abrir();

} else if (simboloCercano.id === "acreditacion") {

    mensajeInteraccion.style.display = "none";
    panelAcreditacion.abrir();

}
}

    document.addEventListener("mousedown", detectarClic);

    return {
        actualizar,
        obtenerSimbolos: () => simbolos,
        estaPanelAbierto: () =>
    panelAbierto ||
    panelHistoria.estaAbierto() ||
    panelAcreditacion.estaAbierto(),

        destruir: () => {
            document.removeEventListener("mousedown", detectarClic);
        }
    };
}