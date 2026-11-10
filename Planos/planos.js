
export function crearPlano(piso) {

    const estilos = `
        <style>
            .pasillos {
                fill: #244c78;
                stroke: #244c78;
                stroke-width: 3;
            }

            .ambiente {
                cursor: pointer;
                outline: none;
            }

            .habitacion {
                fill: #f6cd48;
                stroke: #26364c;
                stroke-width: 2;
                transition: fill .2s, stroke .2s;
            }
            
                        /* COLOR DEL PRIMER PISO */
            .plano-svg.primer-piso
            .ambiente:not(.no-disponible) .habitacion {
                fill: #54b9bd;
            }

            .plano-svg.primer-piso
            .ambiente.disponible:hover .habitacion,
            .plano-svg.primer-piso
            .ambiente.disponible:focus .habitacion {
                fill: #8be0dc;
            }

            /* COLOR DEL SEGUNDO PISO */
            .plano-svg.segundo-piso
            .ambiente:not(.no-disponible) .habitacion {
                fill: #8796e8;
            }

            .plano-svg.segundo-piso
            .ambiente.disponible:hover .habitacion,
            .plano-svg.segundo-piso
            .ambiente.disponible:focus .habitacion {
                fill: #b5c0ff;
            }

            .ambiente.disponible:hover .habitacion,
            .ambiente.disponible:focus .habitacion {
                fill: #ffe58a;
                stroke: #ffffff;
                stroke-width: 5;
            }

            .ambiente.no-disponible {
                cursor: not-allowed;
            }

            .ambiente.no-disponible .habitacion {
                fill: #858d9a;
                stroke: #4e596b;
            }

            .ambiente.sin-destino {
                cursor: default;
            }

            .texto-aula {
                fill: #17243a;
                font-family: Arial, sans-serif;
                font-size: 22px;
                font-weight: bold;
                text-anchor: middle;
                dominant-baseline: middle;
                pointer-events: none;
            }

            .texto-pequeno {
                fill: #26364c;
                font-family: Arial, sans-serif;
                font-size: 12px;
                font-weight: bold;
                text-anchor: middle;
                pointer-events: none;
            }

            .ambiente.no-disponible .texto-aula,
            .ambiente.no-disponible .texto-pequeno {
                fill: #ffffff;
            }

            .pared {
                fill: none;
                stroke: #26364c;
                stroke-width: 2;
            }

            .entrada {
                fill: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 23px;
                font-weight: bold;
            }
        </style>
    `;

    const inicio = (ancho, alto, contenido, tema = "") => `
        <svg class="plano-svg ${tema}"
            viewBox="0 0 ${ancho} ${alto}"
            xmlns="http://www.w3.org/2000/svg"
            role="img">
            ${estilos}
            <rect width="${ancho}" height="${alto}" fill="#ffffff"/>
            ${contenido}
        </svg>
    `;

    // =========================================
    // PLANTA BAJA
    // =========================================

    if (piso === 0) {

        return inicio(1151, 789, `

            <!-- PASILLOS -->
            <path class="pasillos"
                d="
                    M 600 83
                    H 678
                    V 320
                    H 690
                    V 550
                    H 950
                    V 616
                    H 688
                    V 733
                    H 562
                    V 616
                    H 319
                    V 318
                    H 255
                    V 280
                    H 600 Z
                "/>

            <!-- AULA BIT 3 -->
            <g class="ambiente disponible"
               data-destino="Aula Bit 3"
               tabindex="0" role="button">

                <rect class="habitacion"
                    x="61" y="49" width="252" height="263"/>

                <text class="texto-aula" x="187" y="236">
                    AULA BIT 3
                </text>
            </g>

            <!-- DATA CENTER -->
            <g class="ambiente no-disponible">
                <rect class="habitacion"
                    x="321" y="84" width="274" height="229"/>

                <text class="texto-aula" x="458" y="247">
                    DATA
                </text>
                <text class="texto-aula" x="458" y="282">
                    CENTER
                </text>
                <text class="texto-pequeno" x="458" y="300">
                    NO DISPONIBLE
                </text>
            </g>

            <!-- AULA BIT 2 -->
            <g class="ambiente no-disponible">
                <rect class="habitacion"
                    x="685" y="49" width="260" height="265"/>

                <text class="texto-aula" x="815" y="257">
                    AULA BIT 2
                </text>
                <text class="texto-pequeno" x="815" y="282">
                    NO DISPONIBLE
                </text>
            </g>

            <!-- MUSEO -->
            <g class="ambiente no-disponible">
                <path class="habitacion"
                    d="
                        M 48 318
                        H 255
                        V 383
                        H 317
                        V 617
                        H 62
                        V 438
                        H 48 Z
                    "/>

                <text class="texto-aula" x="184" y="455">
                    MUSEO DE
                </text>
                <text class="texto-aula" x="184" y="489">
                    COMPUTADORAS
                </text>
                <text class="texto-pequeno" x="184" y="516">
                    NO DISPONIBLE
                </text>
            </g>

            <!-- ESPACIO CENTRAL -->
            <rect x="323" y="434"
                width="280" height="114"
                fill="#20375f"
                stroke="#26364c"
                stroke-width="2"/>

            <!-- AULA BIT 1 -->
            <g class="ambiente disponible"
               data-destino="Aula Bit 1"
               tabindex="0" role="button">

                <path class="habitacion"
                    d="
                        M 690 319
                        H 962
                        V 439
                        H 948
                        V 544
                        H 690 Z
                    "/>

                <text class="texto-aula" x="819" y="445">
                    AULA BIT 1
                </text>
            </g>

            <!-- ENTRADA -->
            <text class="entrada" x="960" y="592">
                ENTRADA
            </text>

        `);
    }

    // =========================================
    // PRIMER PISO
    // =========================================

    if (piso === 1) {

        return inicio(1103, 829, `

            <!-- PASILLOS -->
            <path class="pasillos"
                d="
                    M 280 338
                    H 810
                    V 408
                    H 752
                    V 595
                    H 1040
                    V 668
                    H 752
                    V 797
                    H 615
                    V 668
                    H 352
                    V 405
                    H 280 Z
                "/>

            <!-- LABORATORIO SEGURIDAD -->
            <g class="ambiente disponible sin-destino">
                <rect class="habitacion"
                    x="65" y="41" width="280" height="291"/>

                <text class="texto-aula" x="205" y="171">
                    LABORATORIO
                </text>
                <text class="texto-aula" x="205" y="205">
                    DE SEGURIDAD
                </text>
                <text class="texto-aula" x="205" y="239">
                    INFORMÁTICA
                </text>
            </g>

            <!-- LABORATORIO HARDWARE -->
            <g class="ambiente disponible"
               data-destino="Laboratorio de Hardware"
               tabindex="0" role="button">

                <rect class="habitacion"
                    x="353" y="80" width="394" height="252"/>

                <text class="texto-aula" x="550" y="196">
                    LABORATORIO
                </text>
                <text class="texto-aula" x="550" y="230">
                    DE HARDWARE
                </text>
            </g>

            <!-- LABORATORIO SOFTWARE II -->
            <g class="ambiente disponible"
               data-destino="Laboratorio de Software II"
               tabindex="0" role="button">

                <rect class="habitacion"
                    x="751" y="41" width="287" height="291"/>

                <text class="texto-aula" x="895" y="181">
                    LABORATORIO
                </text>
                <text class="texto-aula" x="895" y="215">
                    DE SOFTWARE II
                </text>
            </g>

            <!-- LABORATORIO ROBOTICA -->
            <g class="ambiente no-disponible">
                <path class="habitacion"
                    d="
                        M 51 338
                        H 278
                        V 407
                        H 350
                        V 668
                        H 67
                        V 470
                        H 51 Z
                    "/>
                <text class="texto-pequeno" x="202" y="555">
                    NO DISPONIBLE
                </text>
                <text class="texto-aula" x="202" y="492">
                    LABORATORIO
                </text>
                <text class="texto-aula" x="202" y="526">
                    DE ROBÓTICA
                </text>
                
            </g>

            <!-- ESPACIO CENTRAL -->
            <rect x="353" y="465"
                width="306" height="128"
                fill="#20375f"
                stroke="#26364c"
                stroke-width="2"/>

            <!-- AULA BIT 4 -->
            <g class="ambiente disponible"
               data-destino="Aula Bit 4"
               tabindex="0" role="button">

                <path class="habitacion"
                    d="
                        M 752 340
                        H 1055
                        V 474
                        H 1039
                        V 590
                        H 752 Z
                    "/>

                <text class="texto-aula" x="900" y="475">
                    AULA BIT 4
                </text>
            </g>

        `, "primer-piso");
    }

    // =========================================
    // SEGUNDO PISO
    // =========================================

    if (piso === 2) {

        return inicio(1159, 912, `

            <!-- PASILLOS -->
            <path class="pasillos"
                d="
                    M 255 29
                    H 360
                    V 720
                    H 850
                    V 29
                    H 895
                    V 45
                    H 1085
                    V 348
                    H 1127
                    V 493
                    H 1087
                    V 709
                    H 790
                    V 494
                    H 847
                    V 357
                    H 293
                    V 423
                    H 369
                    V 492
                    H 641
                    V 693
                    H 783
                    V 842
                    H 640
                    V 400
                    H 529
                    V 493
                    H 293
                    V 724
                    H 252
                    V 706
                    H 65
                    V 493
                    H 25
                    V 356
                    H 293
                    V 423
                    H 255 Z
                "/>

            <!-- SOFTWARE I -->
            <g class="ambiente disponible"
               data-destino="Laboratorio de Software I"
               tabindex="0" role="button">

                <path class="habitacion"
                    d="
                        M 65 45
                        H 255
                        V 29
                        H 360
                        V 348
                        H 65 Z
                    "/>

                <text class="texto-aula" x="212" y="220">
                    LABORATORIO
                </text>
                <text class="texto-aula" x="212" y="258">
                    DE SOFTWARE I
                </text>
            </g>

            <!-- AULA BITS -->
            <g class="ambiente disponible sin-destino">
                <rect class="habitacion"
                    x="368" y="84" width="412" height="264"/>

                <text class="texto-aula" x="574" y="241">
                    AULA BITS
                </text>
            </g>

            <!-- COMPUTACION MOVIL -->
            <g class="ambiente disponible"
               data-destino="Laboratorio de Computación Móvil"
               tabindex="0" role="button">

                <path class="habitacion"
                    d="
                        M 895 45
                        H 1085
                        V 348
                        H 788
                        V 29
                        H 895 Z
                    "/>

                <text class="texto-aula" x="937" y="220">
                    LABORATORIO DE
                </text>
                <text class="texto-aula" x="937" y="258">
                    COMPUTACIÓN
                </text>
                <text class="texto-aula" x="937" y="296">
                    MÓVIL
                </text>
            </g>

            <!-- SALA DE DEFENSAS -->
            <g class="ambiente disponible"
               data-destino="Sala de Defensas"
               tabindex="0" role="button">

                <path class="habitacion"
                    d="
                        M 25 356
                        H 293
                        V 423
                        H 369
                        V 724
                        H 252
                        V 706
                        H 65
                        V 493
                        H 25 Z
                    "/>

                <text class="texto-aula" x="195" y="502">
                    SALA DE
                </text>
                <text class="texto-aula" x="195" y="541">
                    DEFENSAS
                </text>
            </g>

            <!-- ESPACIOS CENTRALES -->
            <rect x="369" y="493"
                width="160" height="127"
                fill="#20375f"
                stroke="#26364c"
                stroke-width="2"/>

            <rect x="535" y="493"
                width="156" height="127"
                fill="#20375f"
                stroke="#26364c"
                stroke-width="2"/>

            <!-- LABORATORIO RV RA Y VIDEOJUEGOS -->
            <g class="ambiente disponible"
               data-destino="Laboratorio R.V. R.A. y Videojuegos"
               tabindex="0" role="button">

                <path class="habitacion"
                    d="
                        M 847 357
                        H 1127
                        V 493
                        H 1087
                        V 709
                        H 790
                        V 494
                        H 847 Z
                    "/>

                <text class="texto-aula" x="958" y="538">
                    LABORATORIO
                </text>
                <text class="texto-aula" x="958" y="576">
                    R.V. R.A.
                </text>
                <text class="texto-aula" x="958" y="614">
                    Y VIDEOJUEGOS
                </text>
            </g>

            <!-- ESPACIO INFERIOR -->
            <rect x="640" y="700"
                width="143" height="142"
                fill="#d7e5f2"
                stroke="#26364c"
                stroke-width="2"/>

        `, "segundo-piso");
    }

    return "";
}
