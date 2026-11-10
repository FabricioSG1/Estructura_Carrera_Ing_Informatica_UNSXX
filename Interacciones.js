import * as THREE from 'three';

export function crearSimboloInformacion(scene, camera, controls, canvas) {

    // INFORMACIÓN DE LAS 11 AULAS
    const aulas = [
        {
            id: "aulaBit1",
            nombre: "Aula Bit 1",
            posicion: [35, 3, -80],
            imagen: "./Imágenes/Aula1.jpeg",
            descripcion: "El Aula Bit 1 es un espacio destinado al desarrollo de clases teóricas de la Carrera de Ingeniería Informática. En este ambiente, los estudiantes adquieren conocimientos fundamentales mediante explicaciones, exposiciones y actividades académicas.",
            areas: [
                "Desarrollo de clases teóricas.",
                "Explicación de conceptos informáticos.",
                "Exposiciones y actividades académicas."
            ]
        },
        {
            id: "aulaBit3",
            nombre: "Aula Bit 3",
            posicion: [14, 3, -19],
            imagen: "./Imágenes/Aula2.jpeg",
            descripcion: "El Aula Bit 3 es un ambiente de formación académica donde los estudiantes reciben clases teóricas, fortalecen sus conocimientos y participan en actividades orientadas al aprendizaje de los fundamentos de la informática.",
            areas: [
                "Enseñanza de fundamentos informáticos.",
                "Clases y exposiciones.",
                "Intercambio de conocimientos."
            ]
        },
        {
            id: "aulaBit4",
            nombre: "Aula Bit 4",
            posicion: [12, 10, -19.34],
            imagen: "./Imágenes/Aula3.jpeg",
            descripcion: "El Aula Bit 4 está destinada al desarrollo de actividades académicas y clases teóricas. Es un espacio donde los estudiantes profundizan sus conocimientos mediante explicaciones, presentaciones y actividades de formación profesional.",
            areas: [
                "Clases teóricas.",
                "Presentaciones académicas.",
                "Formación profesional."
            ]
        },
        {
            id: "softwareII",
            nombre: "Laboratorio de Software II",
            posicion: [35.35, 11, -20.41],
            imagen: "./Imágenes/Aula4.jpeg",
            descripcion: "El Laboratorio de Software II es un espacio orientado al desarrollo de proyectos informáticos. Aquí los estudiantes pueden aplicar sus conocimientos en programación, diseño de sistemas, gestión de bases de datos y construcción de soluciones de software.",
            areas: [
                "Desarrollo de sistemas informáticos.",
                "Programación y diseño de software.",
                "Trabajo con bases de datos.",
                "Implementación de proyectos."
            ]
        },
        {
            id: "hardware",
            nombre: "Laboratorio de Hardware",
            posicion: [33.32, 11, -49.41],
            imagen: "./Imágenes/Aula5.jpeg",
            descripcion: "El Laboratorio de Hardware permite a los estudiantes conocer y trabajar con los componentes físicos de los equipos informáticos. En este espacio se pueden realizar actividades prácticas relacionadas con el funcionamiento, ensamblaje, mantenimiento y diagnóstico de computadoras.",
            areas: [
                "Reconocimiento de componentes informáticos.",
                "Ensamblaje de computadoras.",
                "Mantenimiento preventivo y correctivo.",
                "Diagnóstico de equipos."
            ]
        },
        {
            id: "seguridad",
            nombre: "Laboratorio de Seguridad Informática",
            posicion: [36.06, 11, -79.50],
            imagen: "./Imágenes/Aula6.jpeg",
            descripcion: "Este laboratorio está orientado al estudio de la seguridad de la información y la protección de los sistemas informáticos. Los estudiantes pueden desarrollar conocimientos relacionados con la seguridad de redes, identificación de vulnerabilidades y prevención de amenazas digitales.",
            areas: [
                "Seguridad informática y de redes.",
                "Análisis de vulnerabilidades.",
                "Protección de sistemas y datos.",
                "Ciberseguridad."
            ]
        },
        {
            id: "rvra",
            nombre: "Laboratorio R.V.R.A. y Videojuegos",
            posicion: [16.5, 17, -19.41],
            imagen: "./Imágenes/Aula7.jpeg",
            descripcion: "El Laboratorio de Realidad Virtual, Realidad Aumentada y Videojuegos es un espacio destinado a la exploración y desarrollo de experiencias digitales interactivas. Los estudiantes pueden aplicar conocimientos de programación, modelado tridimensional y creación de entornos virtuales.",
            areas: [
                "Desarrollo de videojuegos.",
                "Realidad virtual y aumentada.",
                "Modelado y visualización 3D.",
                "Programación de experiencias interactivas."
            ]
        },
        {
            id: "computacionMovil",
            nombre: "Laboratorio de Computación Móvil",
            posicion: [36.54, 17, -19.76],
            imagen: "./Imágenes/Aula8.PNG",
            descripcion: "En este laboratorio, los estudiantes de la mención Computación Móvil desarrollan sus conocimientos en la creación de aplicaciones para dispositivos móviles. Es un espacio orientado al diseño de interfaces, programación de aplicaciones y exploración de tecnologías móviles.",
            areas: [
                "Desarrollo de aplicaciones móviles.",
                "Diseño de interfaces para dispositivos.",
                "Programación móvil.",
                "Tecnologías móviles emergentes."
            ]
        },
        {
            id: "aulaBit5",
            nombre: "Aula Bit 5",
            posicion: [33.63, 17, -49.07],
            imagen: "./Imágenes/Aula9.PNG",
            descripcion: "El Aula Bit 5 es un espacio destinado a la formación teórica de los estudiantes de Ingeniería Informática. En este ambiente se desarrollan clases, explicaciones, exposiciones y actividades que permiten fortalecer los conocimientos adquiridos durante la carrera.",
            areas: [
                "Desarrollo de clases teóricas.",
                "Exposiciones y presentaciones.",
                "Actividades de aprendizaje."
            ]
        },
        {
            id: "softwareI",
            nombre: "Laboratorio de Software I",
            posicion: [35.72, 17, -79.81],
            imagen: "./Imágenes/Aula10.jpeg",
            descripcion: "El Laboratorio de Software I está orientado al aprendizaje y aplicación de los fundamentos de la programación. En este espacio, los estudiantes pueden desarrollar algoritmos, escribir código y resolver problemas mediante herramientas informáticas.",
            areas: [
                "Fundamentos de programación.",
                "Diseño de algoritmos.",
                "Desarrollo de programas.",
                "Resolución de problemas informáticos."
            ]
        },
        {
            id: "salaDefensas",
            nombre: "Sala de Defensas",
            posicion: [17.59, 17, -80.81],
            imagen: "./Imágenes/Aula11.jpeg",
            descripcion: "La Sala de Defensas es un ambiente destinado a la presentación y exposición de trabajos académicos de la Carrera de Ingeniería Informática. En este espacio, los estudiantes pueden presentar sus proyectos, investigaciones y trabajos finales ante docentes y tribunales evaluadores.",
            areas: [
                "Defensas de proyectos de grado.",
                "Presentaciones de trabajos de investigación.",
                "Exposiciones académicas.",
                "Evaluaciones y actividades institucionales."
            ]
        }
    ];


    // ELEMENTOS HTML
    const mensaje = document.getElementById('mensajeInteraccion');
    const ventana = document.getElementById('ventanaInformacion');
    const botonCerrar = document.getElementById('cerrarVentana');
    const contenido = document.getElementById('contenidoInformacion');

    if (!mensaje || !ventana || !botonCerrar || !contenido) {
        console.error('No se encontraron los elementos HTML de la ventana.');

        return {
            actualizar: () => {},
            estaVentanaAbierta: () => false
        };
    }


    // CONFIGURACIÓN GENERAL
    const raycaster = new THREE.Raycaster();
    const centroPantalla = new THREE.Vector2(0, 0);
    const distanciaInteraccion = 4.5;

    const simbolos = [];

    let simboloCercano = null;
    let ventanaAbierta = false;


    // CREAR UN SÍMBOLO
    function crearSimbolo(aula) {

        const grupo = new THREE.Group();

        const alturaInicial = aula.posicion[1];

        grupo.position.set(...aula.posicion);

        const geometriaCirculo = new THREE.CylinderGeometry(
            1.1, 1.1, 0.18, 64
        );

        const materialCirculo = new THREE.MeshStandardMaterial({
            color: 0x0878ff,
            metalness: 0.5,
            roughness: 0.25
        });

        const circulo = new THREE.Mesh(
            geometriaCirculo,
            materialCirculo
        );

        circulo.rotation.x = Math.PI / 2;
        grupo.add(circulo);


        // SIGNO DE INTERROGACIÓN
        const canvasSigno = document.createElement('canvas');

        canvasSigno.width = 256;
        canvasSigno.height = 256;

        const ctx = canvasSigno.getContext('2d');

        ctx.font = 'bold 300px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffdf00';
        ctx.fillText('?', 128, 150);

        const texturaSigno = new THREE.CanvasTexture(canvasSigno);

        const materialSigno = new THREE.MeshBasicMaterial({
            map: texturaSigno,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        const geometriaSigno = new THREE.PlaneGeometry(1.5, 1.5);

        const signo = new THREE.Mesh(
            geometriaSigno,
            materialSigno
        );

        signo.position.set(0, 0, 0.16);

        grupo.add(signo);

        scene.add(grupo);


        // GUARDAR DATOS DEL SÍMBOLO
        simbolos.push({
            ...aula,
            grupo: grupo,
            alturaInicial: alturaInicial,
            posicion: new THREE.Vector3(...aula.posicion)
        });

    }


    // CREAR TODOS LOS SÍMBOLOS
    aulas.forEach(crearSimbolo);


    // ABRIR VENTANA DE INFORMACIÓN
    function abrirVentana(simbolo) {

        ventanaAbierta = true;

        contenido.dataset.aula = simbolo.id;

        contenido.innerHTML = `

            <div class="informacion-aula">

                <h3>${simbolo.nombre}</h3>

                <img
                    src="${simbolo.imagen}"
                    alt="${simbolo.nombre}"
                    class="imagen-aula"
                    onerror="this.style.display='none'"
                >

                <h4>Descripción</h4>

                <p>${simbolo.descripcion}</p>

                <h4>Actividades y áreas de trabajo</h4>

                <ul>
                    ${simbolo.areas.map(area => `<li>${area}</li>`).join('')}
                </ul>

            </div>

        `;

        ventana.style.display = 'flex';

        mensaje.style.display = 'none';

        controls.unlock();

        console.log("Información abierta:", simbolo.nombre);

    }


    // CERRAR VENTANA
    function cerrarVentana() {

        ventanaAbierta = false;

        simboloCercano = null;

        ventana.style.display = 'none';

        controls.lock();

        console.log('Ventana de información cerrada');

    }

    botonCerrar.addEventListener('click', cerrarVentana);


    // DETECTAR CLIC SOBRE LOS SÍMBOLOS
    function detectarClic(event) {

        if (event.button !== 0) return;
        if (!simboloCercano || ventanaAbierta) return;
        if (!controls.isLocked) return;

        raycaster.setFromCamera(centroPantalla, camera);

        const intersecciones = raycaster.intersectObjects(
            simboloCercano.grupo.children,
            true
        );

        if (intersecciones.length > 0) {

            abrirVentana(simboloCercano);

        }

    }

    document.addEventListener('mousedown', detectarClic);


    // ACTUALIZAR SÍMBOLOS
    function actualizar(tiempo) {

        // ANIMAR LOS SÍMBOLOS
        simbolos.forEach(simbolo => {

            simbolo.grupo.rotation.y += 0.01;

            simbolo.grupo.position.y =
                simbolo.alturaInicial +
                Math.sin(tiempo * 2) * 0.15;

        });


        if (ventanaAbierta) return;


        // BUSCAR EL SÍMBOLO MÁS CERCANO
        simboloCercano = null;

        let distanciaMinima = distanciaInteraccion;

        simbolos.forEach(simbolo => {

            const distancia = camera.position.distanceTo(
                simbolo.posicion
            );

            if (distancia <= distanciaMinima) {

                distanciaMinima = distancia;

                simboloCercano = simbolo;

            }

        });


        // MOSTRAR MENSAJE DE INTERACCIÓN
        mensaje.style.display = simboloCercano ? 'block' : 'none';

    }


    // FUNCIONES QUE SE RETORNAN
    return {

        actualizar,

        estaVentanaAbierta: () => ventanaAbierta,

        destruir: () => {
            document.removeEventListener('mousedown', detectarClic);
            botonCerrar.removeEventListener('click', cerrarVentana);
        }

    };

}