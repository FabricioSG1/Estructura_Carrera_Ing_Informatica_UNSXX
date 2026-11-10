import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { EffectComposer } from
    'three/addons/postprocessing/EffectComposer.js';

import { RenderPass } from
    'three/addons/postprocessing/RenderPass.js';

import { UnrealBloomPass } from
    'three/addons/postprocessing/UnrealBloomPass.js';

import { OutputPass } from
    'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from
    'three/addons/postprocessing/ShaderPass.js';

import { FXAAShader } from
    'three/addons/shaders/FXAAShader.js';
import {cargarPersonaje,actualizarPersonaje} from "./Persona.js";
import { cargarPizarrasYPupitres } from "./PizarrasYPupitres.js";
import { cargarMesasPCs } from "./MesasPCs.js";
import { cargarPCs } from "./PCs.js";
import { cargarMonitores } from "./Monitores.js";
import { crearSimboloInformacion } from './Interacciones.js';
import { crearSimbolosInstitucionales }
from './InteraccionesInstitucionales/institucional.js';

const pantallaCarga = document.getElementById("pantallaCarga");
const scene = new THREE.Scene();

cargarPizarrasYPupitres(scene);
cargarPersonaje(scene);
cargarMesasPCs(scene);
cargarPCs(scene);
cargarMonitores(scene);
const canvas = document.createElement("canvas");
canvas.width = 2;
canvas.height = 512;
const ctx = canvas.getContext("2d");
// Arriba (azul oscuro)
const gradient = ctx.createLinearGradient(0, 0, 0, 512);
gradient.addColorStop(0, "#2d3973");
// Centro
gradient.addColorStop(0.5, "#325a89");
// Horizonte
gradient.addColorStop(1, "#A9D4F7");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 2, 512);
const skyTexture = new THREE.CanvasTexture(canvas);
scene.background = skyTexture;
function cambiarCielo(colorArriba, colorCentro, colorHorizonte) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, colorArriba);
    gradient.addColorStop(0.5, colorCentro);
    gradient.addColorStop(1, colorHorizonte);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    skyTexture.needsUpdate = true;
}
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-2.51, 8.80, 49.11);
camera.lookAt(-15, 5, 0);

// ===============================
// SISTEMA DE TELETRANSPORTE
// ===============================

const destinosCampus = {
    "Aula Bit 1": new THREE.Vector3(35, 3, -73),
    "Aula Bit 3": new THREE.Vector3(20, 3, -19),
    "Aula Bit 4": new THREE.Vector3(5, 10, -18),
    "Laboratorio de Software II": new THREE.Vector3(35, 10, -28),
    "Laboratorio de Hardware": new THREE.Vector3(33, 10, -42),
    "Laboratorio de Seguridad Informática": new THREE.Vector3(34, 10, -73),
    "Laboratorio R.V. R.A. y Videojuegos": new THREE.Vector3(8, 17, -19),
    "Laboratorio de Computación Móvil": new THREE.Vector3(36, 17, -27),
    "Aula Bit 5": new THREE.Vector3(34, 17, -44),
    "Laboratorio de Software I": new THREE.Vector3(34, 17, -72),
    "Sala de Defensas": new THREE.Vector3(9, 17, -80)
};

// Recuperar el aula seleccionada en el mapa
const destinoGuardado = localStorage.getItem("destinoCampus");
if (destinoGuardado && destinosCampus[destinoGuardado]) {
    // Teletransportar la cámara
    camera.position.copy(destinosCampus[destinoGuardado]);
    console.log("Teletransportado a:", destinoGuardado);
    console.log("Coordenadas:", camera.position);
    // Eliminar el destino para evitar repetir el teletransporte
    localStorage.removeItem("destinoCampus");
}

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
//
// ===============================
// POSTPROCESAMIENTO
// ===============================

const composer = new EffectComposer(renderer);

// Renderizar la escena
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Efecto de resplandor
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.10, // Intensidad
    0.4,  // Radio
    0.85  // Umbral
);

composer.addPass(bloomPass);

// ===============================
// EFECTO FXAA
// Suavizado de bordes
// ===============================

const fxaaPass = new ShaderPass(FXAAShader);

fxaaPass.material.uniforms[
    'resolution'
].value.set(
    1.5 / (window.innerWidth * renderer.getPixelRatio()),
    1.5 / (window.innerHeight * renderer.getPixelRatio())
);

composer.addPass(fxaaPass);

// Preparar la imagen final
const outputPass = new OutputPass();
composer.addPass(outputPass);

composer.setSize(window.innerWidth, window.innerHeight);
//
const controls = new PointerLockControls(camera, document.body);

// =====================================
// INTERACCIÓN CON EL MAPA DEL CAMPUS
// =====================================

const posicionMapa = new THREE.Vector3(
    -12.29,
    7.20,
    49.07
);

const distanciaMapa = 6;

let objetosMapa = [];

const raycasterMapa = new THREE.Raycaster();
const centroPantallaMapa = new THREE.Vector2(0, 0);

// Aviso de interacción
const avisoMapa = document.createElement("div");

avisoMapa.id = "avisoMapa";
avisoMapa.textContent = "Haz clic en el mapa para interactuar";

avisoMapa.style.cssText = `
    position: fixed;
    bottom: 110px;
    left: 50%;
    transform: translateX(-50%);
    padding: 14px 25px;
    background: rgba(15, 25, 40, 0.88);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 10px;
    font-family: Arial, sans-serif;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0.4px;
    z-index: 1000;
    display: none;
    pointer-events: none;
    backdrop-filter: blur(8px);
`;

document.body.appendChild(avisoMapa);

// SISTEMA DE INTERACCIONES
const interaccion = crearSimboloInformacion(
    scene,
    camera,
    controls,
    renderer.domElement
);
// SISTEMA DE SÍMBOLOS INSTITUCIONALES
const simbolosInstitucionales = crearSimbolosInstitucionales(
    scene,
    camera,
    controls
);
//
const textureLoader = new THREE.TextureLoader();
const texturaNube = textureLoader.load("Imágenes/Nube.png");
const materialNube = new THREE.MeshBasicMaterial({
    map: texturaNube,
    transparent: true,
    depthWrite: false
});
const nubes = [];
for (let i = 0; i < 80  ; i++) {
    const nube = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        materialNube.clone()
    );
    nube.position.set(
        Math.random() * 200 - 100,   // X
        40  + Math.random() * 15,     // Y
        Math.random() * 200 - 100    // Z
    );
    // Cada nube con un tamaño distinto
    const escala = 0.8 + Math.random() * 1.8;
    nube.scale.set(escala, escala, escala);
    scene.add(nube);
    nubes.push({
        mesh: nube,
        velocidad: 0.005 + Math.random() * 0.01
    });
}

// =======================
// ESTRELLAS
// =======================
const cantidadEstrellas = 1500;
const geometriaEstrellas = new THREE.BufferGeometry();
const posiciones = [];
for (let i = 0; i < cantidadEstrellas; i++) {
    posiciones.push(
        Math.random() * 600 - 300,   // X
        Math.random() * 250 + 80,    // Y
        Math.random() * 600 - 300    // Z
    );

}
geometriaEstrellas.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(posiciones, 3)
);
const materialEstrellas = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2,
    transparent: true,
    opacity: 0,     // Comienzan invisibles
    sizeAttenuation: true
});
const estrellas = new THREE.Points(
    geometriaEstrellas,
    materialEstrellas
);
scene.add(estrellas);
const coords = document.getElementById("coords");
const light = new THREE.DirectionalLight(0xfff2cc, 4);
light.position.set(140, 87, 5);
light.castShadow = true;
scene.add(light);
// Configuraciones de iluminación
const ambientes = {
    dia: {
        posicion: new THREE.Vector3(140, 87, 5),
        colorLuz: 0xfff2cc,
        intensidad: 4,
        colorAmbiental: 0xcfe8ff,
        intensidadAmbiental: 1.1,
        estrellas: 0,
        nubes: 1,
        colorSol: 0xfff2cc,
        escalaSol: 1,
        cielo: {
            arriba: "#2d3973",
            centro: "#325a89",
            horizonte: "#A9D4F7"
        }
    },
    atardecer: {
        posicion: new THREE.Vector3(-41,87,-218),
        colorLuz: 0xffa54d,
        intensidad: 3.5,
        colorAmbiental: 0xffb47d,
        intensidadAmbiental: 0.8,
        estrellas: 0.25,
        nubes: 1,
        colorSol: 0xff9440,
        escalaSol: 1.2,
        cielo:{
            arriba:"#3b2140",
            centro:"#b05b4f",
            horizonte:"#ffb36b"
        }
    },
    noche:{
        posicion:new THREE.Vector3(-140, 87, 5),
        colorLuz:0xbfd6ff,
        intensidad:0.9,
        colorAmbiental:0x1d2748,
        intensidadAmbiental:0.25,
        estrellas:1,
        nubes:0,
        colorSol:0xe8f3ff,
        escalaSol:0.7,
        cielo:{
            arriba:"#030611",
            centro:"#07152d",
            horizonte:"#132548"
        }
    }
};
const btnExplorar = document.getElementById("btnExplorar");
const panelBienvenida =
document.getElementById("panelBienvenida");
const barraSuperior = document.getElementById("barraSuperior");
const menuInferior = document.getElementById("menuInferior");
const mensaje = document.getElementById("mensajeExplorador");
const mensajeControles = document.getElementById("mensajeControles");
controls.addEventListener("unlock", () => {

    if (
        interaccion.estaVentanaAbierta() ||
        simbolosInstitucionales.estaPanelAbierto()
    ) return;

    barraSuperior.classList.remove("ocultarSuperior");
    menuInferior.classList.remove("ocultarInferior");
    panelBienvenida.classList.remove("ocultarPanel");

});
btnExplorar.addEventListener("click", () => {
    controls.lock();
    barraSuperior.classList.add("ocultarSuperior");
    menuInferior.classList.add("ocultarInferior");
    panelBienvenida.classList.add("ocultarPanel");
    mensaje.style.opacity = "1";
    mensajeControles.style.opacity = "1";
    setTimeout(() => {
        mensaje.style.opacity = "0";
        mensajeControles.style.opacity = "0";
    }, 4000);

});
const ambient = new THREE.AmbientLight(0xcfe8ff, 1.1);
scene.add(ambient);
const loader = new GLTFLoader();
let mixer;
let escenario;
const hojas = [];
const cajasColision = [

    new THREE.Box3(
        new THREE.Vector3(-26, 0, -3),
        new THREE.Vector3(-14, 23, 26)
    ),

    new THREE.Box3(
        new THREE.Vector3(-15, 0, -3),
        new THREE.Vector3(-9, 23, 12)
    ),
    new THREE.Box3(
        new THREE.Vector3(-97, -23, -6.2),
        new THREE.Vector3(60, 0.8, 26)
    ),
    new THREE.Box3(
        new THREE.Vector3(-97, -23, 23),
        new THREE.Vector3(60, 5, 71)
    ),  
    new THREE.Box3(
        new THREE.Vector3(-97, -23, -106),
        new THREE.Vector3(60, 0.5, -6.2)
    ),  
    new THREE.Box3(
        new THREE.Vector3(-65, 0, -3),
        new THREE.Vector3(-26, 27, 26)
    ),
    new THREE.Box3(
        new THREE.Vector3(-47, 0, -14),
        new THREE.Vector3(-20, 9, -3)
    ),
    new THREE.Box3(
        new THREE.Vector3(-27, 0, -9),
        new THREE.Vector3(-10, 18, -3)
    ),
    new THREE.Box3(
        new THREE.Vector3(59, 0, -107),
        new THREE.Vector3(61, 55, 72)
    ),
    new THREE.Box3(
        new THREE.Vector3(-100, 0, -107),
        new THREE.Vector3(-96, 55, 72)
    ),
    new THREE.Box3(
        new THREE.Vector3(-100, 0, 70),
        new THREE.Vector3(61, 55, 75)
    ),
    new THREE.Box3(
        new THREE.Vector3(-100, 40, -110),
        new THREE.Vector3(61, 59, 75)
    ),
    new THREE.Box3(
        new THREE.Vector3(-100, 0, -110),
        new THREE.Vector3(61, 55, -105)
    ),

];
const velocidad = 0.2;
const teclas = {
    w: false,
    a: false,
    s: false,
    d: false,
    q: false,
    e: false
};

const geometriaSol = new THREE.SphereGeometry(6, 32, 32);

const materialSol = new THREE.MeshBasicMaterial({
    color: 0xfff2cc
});

const sol = new THREE.Mesh(geometriaSol, materialSol);

// La colocas donde está la luz
sol.position.copy(light.position);

scene.add(sol);

loader.load(
    'EscenaOficial.glb',
    function (gltf) {
        escenario = gltf.scene;
        scene.add(escenario);
        // El escenario completo se utilizará para detectar el clic
        objetosMapa = [];

        console.log("Escenario preparado para detectar el mapa 3D");

        console.log("Partes del mapa detectadas:", objetosMapa.length);
        escenario.traverse((obj) => {
    if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
    }
});
console.log("Escena Oficial cargado correctamente");
pantallaCarga.style.opacity = "0";

setTimeout(() => {
    pantallaCarga.style.display = "none";
}, 500);
const edificio1 = escenario.getObjectByName("Edificio 1");
const edificio2 = escenario.getObjectByName("Edificio 2");

if(edificio1){
    cajasColision.push(
        new THREE.Box3().setFromObject(edificio1)
    );
}

if(edificio2){
    cajasColision.push(
        new THREE.Box3().setFromObject(edificio2)
    );
}
        if (gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(gltf.scene);
            gltf.animations.forEach((clip) => {
                mixer.clipAction(clip).play();
            });
        }
    }
);
window.addEventListener("keydown", (e) => {
    const t = e.key.toLowerCase();
    if (t in teclas)
        teclas[t] = true;
});
window.addEventListener("keyup", (e) => {
    const t = e.key.toLowerCase();
    if (t in teclas)
        teclas[t] = false;
});
const btnDia = document.getElementById("btnDia");
const btnAtardecer = document.getElementById("btnAtardecer");
btnDia.addEventListener("click", () => {
    cambiarAmbiente(ambientes.dia);
});
btnAtardecer.addEventListener("click", () => {
    cambiarAmbiente(ambientes.atardecer);
});
btnNoche.addEventListener("click", () => {
    cambiarAmbiente(ambientes.noche);
});

const clock = new THREE.Clock();

let ambienteActual = ambientes.dia;
let ambienteDestino = ambientes.dia;
let animando = false;
let tiempoInicio = 0;
const duracion = 3;
let origenPos = new THREE.Vector3();
let destinoPos = new THREE.Vector3();
let origenColorLuz = new THREE.Color();
let destinoColorLuz = new THREE.Color();
let origenIntensidad = 0;
let destinoIntensidad = 0;
let origenEstrellas = 0;
let destinoEstrellas = 0;
let origenColorAmbiental = new THREE.Color();
let destinoColorAmbiental = new THREE.Color();
let origenIntensidadAmbiental = 0;
let destinoIntensidadAmbiental = 0;

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    const tiempo = clock.getElapsedTime();
    // Detectar proximidad al mapa
    const distanciaAlMapa = camera.position.distanceTo(posicionMapa);

    if (controls.isLocked && distanciaAlMapa <= distanciaMapa) {
        avisoMapa.style.display = "block";
    } else {
        avisoMapa.style.display = "none";
    }
    interaccion.actualizar(tiempo);
    simbolosInstitucionales.actualizar(tiempo);
    if (mixer)
        mixer.update(delta);
    actualizarPersonaje(delta);
    hojas.forEach((hoja) => {
        hoja.mesh.rotation.y =
            hoja.baseY +
            Math.sin(tiempo * 0.8 + hoja.offset) * 0.15;
    });
    if (controls.isLocked) {

    // Guardamos la posición antes de movernos
    const posicionAnterior = camera.position.clone();

    if (teclas.w)
        controls.moveForward(velocidad);
    if (teclas.s)
        controls.moveForward(-velocidad);
    if (teclas.a)
        controls.moveRight(-velocidad);
    if (teclas.d)
        controls.moveRight(velocidad);
    if (teclas.q)
        camera.position.y += velocidad;
    if (teclas.e)
        camera.position.y -= velocidad;

    // Si entramos al edificio, volvemos atrás
    for (const caja of cajasColision) {

    if (caja.containsPoint(camera.position)) {
        camera.position.copy(posicionAnterior);
        break;
    }

}

}
    /*coords.innerHTML = `
    X: ${camera.position.x.toFixed(2)}<br>
    Y: ${camera.position.y.toFixed(2)}<br>
    Z: ${camera.position.z.toFixed(2)}
    `;*/

if (animando) {
    let t = (clock.getElapsedTime() - tiempoInicio) / duracion;
    if (t > 1) {
        t = 1;
        animando = false;
        ambienteActual = ambienteDestino;
    }
    // Movimiento del sol y de la luz
    light.position.lerpVectors(origenPos, destinoPos, t);
    sol.position.copy(light.position);
    // Color de la luz
    light.color.copy(
        origenColorLuz.clone().lerp(destinoColorLuz, t)
    );
    // Intensidad
    light.intensity =
        THREE.MathUtils.lerp(origenIntensidad,destinoIntensidad,t);
    // Luz ambiental
    ambient.color.copy(
        origenColorAmbiental.clone().lerp(destinoColorAmbiental, t)
    );
    ambient.intensity =
        THREE.MathUtils.lerp(origenIntensidadAmbiental,destinoIntensidadAmbiental,t);
        materialEstrellas.opacity =
THREE.MathUtils.lerp(
    origenEstrellas,
    destinoEstrellas,
    t
);
    // Color del sol
    materialSol.color.copy(light.color);
    // Colores del cielo
    const arriba = new THREE.Color(ambienteActual.cielo.arriba)
        .lerp(new THREE.Color(ambienteDestino.cielo.arriba), t);
    const centro = new THREE.Color(ambienteActual.cielo.centro)
        .lerp(new THREE.Color(ambienteDestino.cielo.centro), t);
    const horizonte = new THREE.Color(ambienteActual.cielo.horizonte)
        .lerp(new THREE.Color(ambienteDestino.cielo.horizonte), t);
    cambiarCielo(
        "#" + arriba.getHexString(),
        "#" + centro.getHexString(),
        "#" + horizonte.getHexString()
    );

}

// NUBES
nubes.forEach((nube) => {
    // Siempre miran a la cámara
    nube.mesh.lookAt(camera.position);
    // Movimiento
    nube.mesh.position.x += nube.velocidad;
    // Cuando salen vuelven al inicio
    if (nube.mesh.position.x > 120) {
        nube.mesh.position.x = -120;
        nube.mesh.position.z = Math.random() * 200 - 100;
        nube.mesh.position.y = 40 + Math.random() * 15;
    }
});
    estrellas.rotation.y += 0.00005;
    composer.render();


}

const cajaEdificio = new THREE.Box3(
    new THREE.Vector3(-26, 0, -3),   // esquina mínima
    new THREE.Vector3(-14, 23, 26)    // esquina máxima
    
);


/*cajasColision.forEach(caja => {
    scene.add(new THREE.Box3Helper(caja, 0xff0000));
});*/


// =====================================
// INTERACCIÓN CON EL MAPA DEL CAMPUS
// =====================================

document.addEventListener("mousedown", (event) => {

    // Solo clic izquierdo
    if (event.button !== 0) return;

    // Comprobar que estamos explorando
    if (!controls.isLocked) return;

    // Comprobar distancia al mapa
    const distancia = camera.position.distanceTo(posicionMapa);

    if (distancia <= distanciaMapa) {

        console.log("Mapa del campus seleccionado");

        avisoMapa.style.display = "none";

        window.location.href = "./mapa.html";

    }

});


function cambiarAmbiente(nuevoAmbiente){
    ambienteDestino = nuevoAmbiente;
    animando = true;
    tiempoInicio = clock.getElapsedTime();
    origenPos.copy(light.position);
    destinoPos.copy(nuevoAmbiente.posicion);
    origenColorLuz.copy(light.color);
    destinoColorLuz.setHex(nuevoAmbiente.colorLuz);
    origenIntensidad = light.intensity;
    destinoIntensidad = nuevoAmbiente.intensidad;
    origenColorAmbiental.copy(ambient.color);
    destinoColorAmbiental.setHex(nuevoAmbiente.colorAmbiental);
    origenIntensidadAmbiental = ambient.intensity;
    destinoIntensidadAmbiental = nuevoAmbiente.intensidadAmbiental;
    origenEstrellas = materialEstrellas.opacity;
    destinoEstrellas = nuevoAmbiente.estrellas;
}
animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);

    fxaaPass.material.uniforms[
        'resolution'
    ].value.set(
        1 / (window.innerWidth * renderer.getPixelRatio()),
        1 / (window.innerHeight * renderer.getPixelRatio())
    );
});
