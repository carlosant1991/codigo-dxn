/*!
 * ============================================================
 * PROMOCIÓN DXN AGOSTO 2026
 * Versión 2.0
 * Autor: ChatGPT
 * ============================================================
 *
 * Funciones:
 *
 * ✔ Espera 2 minutos.
 * ✔ Solo visitantes de Perú.
 * ✔ Vigencia:
 *      01/08/2026
 *      31/08/2026
 * ✔ Una vez por sesión.
 * ✔ Caché del país por 24 horas.
 * ✔ Precarga de imágenes.
 * ✔ Vanilla JavaScript.
 *
 * ============================================================
 */

(function () {

"use strict";

/*==============================================================
CONFIGURACIÓN
==============================================================*/

const CONFIG = {

    fechaInicio: new Date("2026-08-01T00:00:00-05:00"),

    fechaFin: new Date("2026-09-01T00:00:00-05:00"),

    espera: 120000, // 2 minutos

    intervaloCarrusel:7000,

    tokenIPInfo:"ff207427979a44",

    whatsapp:"51962080861",

    cachePaisHoras:24,

    claveSesion:"promoDXNAgosto2026",

    clavePais:"promoDXNPais",

    imagenes:[

        "https://cdn.jsdelivr.net/gh/carlosant1991/codigo-dxn@main/img/promo-pasta-dxn.jpg",

        "https://cdn.jsdelivr.net/gh/carlosant1991/codigo-dxn@main/img/promo-shampoo-dxn.jpg"

    ]

};

/*==============================================================
ESTADO
==============================================================*/

const STATE={

    overlay:null,

    modal:null,

    slider:null,

    slides:[],

    dots:[],

    indice:0,

    autoplay:null,

    cargadas:false

};

/*==============================================================
UTILIDADES
==============================================================*/

function ahora(){

    return new Date();

}

function periodoActivo(){

    const fecha=ahora();

    return fecha>=CONFIG.fechaInicio &&
           fecha<CONFIG.fechaFin;

}

function yaMostrado(){

    try{

        return sessionStorage.getItem(CONFIG.claveSesion)==="1";

    }catch(e){

        return false;

    }

}

function marcarMostrado(){

    try{

        sessionStorage.setItem(CONFIG.claveSesion,"1");

    }catch(e){}

}

/*==============================================================
CACHE DEL PAÍS
==============================================================*/

function guardarPais(pais){

    try{

        const datos={

            pais:pais,

            vence:

                Date.now()+

                CONFIG.cachePaisHoras*

                60*

                60*

                1000

        };

        localStorage.setItem(

            CONFIG.clavePais,

            JSON.stringify(datos)

        );

    }catch(e){}

}

function obtenerPaisCache(){

    try{

        const datos=JSON.parse(

            localStorage.getItem(

                CONFIG.clavePais

            )

        );

        if(!datos) return null;

        if(Date.now()>datos.vence){

            localStorage.removeItem(

                CONFIG.clavePais

            );

            return null;

        }

        return datos.pais;

    }

    catch(e){

        return null;

    }

}

/*==============================================================
CONSULTAR IPINFO
==============================================================*/

async function obtenerPais(){

    const cache=obtenerPaisCache();

    if(cache){

        return cache;

    }

    try{

        const respuesta=await fetch(

            "https://ipinfo.io/json?token="+

            CONFIG.tokenIPInfo,

            {

                cache:"no-store"

            }

        );

        if(!respuesta.ok){

            return null;

        }

        const datos=

            await respuesta.json();

        if(datos.country){

            guardarPais(

                datos.country

            );

            return datos.country;

        }

    }

    catch(error){

        console.error(

            "IPInfo:",

            error

        );

    }

    return null;

}

/*==============================================================
PRECARGAR IMÁGENES
==============================================================*/

function precargarImagen(url){

    return new Promise(function(resolve,reject){

        const img=new Image();

        img.onload=function(){

            resolve(img);

        };

        img.onerror=function(){

            reject(url);

        };

        img.src=url;

    });

}

async function precargarTodo(){

    if(STATE.cargadas){

        return true;

    }

    try{

        await Promise.all(

            CONFIG.imagenes.map(

                precargarImagen

            )

        );

        STATE.cargadas=true;

        return true;

    }

    catch(e){

        console.error(

            "Error cargando imágenes",

            e

        );

        return false;

    }

}

/*==============================================================
VERIFICAR SI DEBE MOSTRARSE
==============================================================*/

async function comprobarPromocion(){

    if(!periodoActivo()){

        return;

    }

    if(yaMostrado()){

        return;

    }

    const pais=

        await obtenerPais();

    if(pais!=="PE"){

        return;

    }

    const imagenes=

        await precargarTodo();

    if(!imagenes){

        return;

    }

    /*
    En este punto sabemos que:

    ✔ Estamos en agosto.

    ✔ Es Perú.

    ✔ No se mostró.

    ✔ Las imágenes están cargadas.

    En la Parte 2 construiremos
    el popup completo.
    */

    crearPopup();

}

/*==============================================================
INICIO
==============================================================*/

function iniciar(){

    if(!periodoActivo()){

        return;

    }

    if(yaMostrado()){

        return;

    }

    setTimeout(

        comprobarPromocion,

        CONFIG.espera

    );

}

document.addEventListener(

    "DOMContentLoaded",

    iniciar

);
/*==============================================================
CREAR POPUP
==============================================================*/

function crearPopup(){

    if(document.getElementById("promo-dxn-agosto-overlay")){

        return;

    }

    const overlay=document.createElement("div");

    overlay.id="promo-dxn-agosto-overlay";

    overlay.setAttribute(
        "aria-hidden",
        "false"
    );

    overlay.innerHTML=`

<div id="promo-dxn-agosto-modal">

<button
id="promo-dxn-agosto-close"
type="button"
aria-label="Cerrar">

×

</button>

<div id="promo-dxn-agosto-slider">

${crearSlides()}

<button
class="promo-dxn-arrow promo-dxn-prev"
type="button"
aria-label="Anterior">

‹

</button>

<button
class="promo-dxn-arrow promo-dxn-next"
type="button"
aria-label="Siguiente">

›

</button>

</div>

<div id="promo-dxn-agosto-dots">

${crearDots()}

</div>

<div id="promo-dxn-agosto-info">

<h3>

PARA MÁS INFORMACIÓN SOBRE LAS PROMOCIONES

</h3>

<a
id="promo-dxn-whatsapp"
href="https://wa.me/${CONFIG.whatsapp}?text=Hola,%20quisiera%20información%20sobre%20las%20promociones%20DXN."
target="_blank"
rel="noopener">

ESCRÍBAME POR WHATSAPP

</a>

</div>

</div>

`;

    document.body.appendChild(
        overlay
    );

    STATE.overlay=overlay;

    STATE.modal=overlay.querySelector(
        "#promo-dxn-agosto-modal"
    );

    STATE.slider=overlay.querySelector(
        "#promo-dxn-agosto-slider"
    );

    STATE.slides=[
        ...overlay.querySelectorAll(
            ".promo-dxn-slide"
        )
    ];

    STATE.dots=[
        ...overlay.querySelectorAll(
            ".promo-dxn-dot"
        )
    ];

    mostrarSlide(0);

    requestAnimationFrame(function(){

        overlay.classList.add(
            "promo-visible"
        );

    });

    iniciarCarrusel();

}

/*==============================================================
CREAR SLIDES
==============================================================*/

function crearSlides(){

    return CONFIG.imagenes.map(function(url,index){

        return `

<div class="promo-dxn-slide">

<img

src="${url}"

alt="Promoción DXN Agosto 2026"

loading="${index===0?"eager":"lazy"}"

decoding="async"

draggable="false"

>

</div>

`;

    }).join("");

}

/*==============================================================
CREAR INDICADORES
==============================================================*/

function crearDots(){

    return CONFIG.imagenes.map(function(){

        return `

<button

class="promo-dxn-dot"

type="button"

aria-label="Promoción"

></button>

`;

    }).join("");

}

/*==============================================================
MOSTRAR SLIDE
==============================================================*/

function mostrarSlide(indice){

    STATE.indice=indice;

    STATE.slides.forEach(function(slide,i){

        slide.classList.toggle(

            "promo-slide-active",

            i===indice

        );

    });

    STATE.dots.forEach(function(dot,i){

        dot.classList.toggle(

            "promo-dot-active",

            i===indice

        );

    });

}

/*==============================================================
SIGUIENTE
==============================================================*/

function siguienteSlide(){

    let indice=STATE.indice+1;

    if(indice>=STATE.slides.length){

        indice=0;

    }

    mostrarSlide(indice);

}

/*==============================================================
ANTERIOR
==============================================================*/

function anteriorSlide(){

    let indice=STATE.indice-1;

    if(indice<0){

        indice=STATE.slides.length-1;

    }

    mostrarSlide(indice);

}
/*==============================================================
INICIAR CARRUSEL
==============================================================*/

function iniciarCarrusel(){

    eventosCarrusel();

    iniciarAutoplay();

}

/*==============================================================
AUTOPLAY
==============================================================*/

function iniciarAutoplay(){

    detenerAutoplay();

    STATE.autoplay=setInterval(function(){

        siguienteSlide();

    },CONFIG.intervaloCarrusel);

}

function detenerAutoplay(){

    if(STATE.autoplay){

        clearInterval(STATE.autoplay);

        STATE.autoplay=null;

    }

}

/*==============================================================
REINICIAR AUTOPLAY
==============================================================*/

function reiniciarAutoplay(){

    detenerAutoplay();

    iniciarAutoplay();

}

/*==============================================================
EVENTOS DEL CARRUSEL
==============================================================*/

function eventosCarrusel(){

    const btnPrev=STATE.overlay.querySelector(

        ".promo-dxn-prev"

    );

    const btnNext=STATE.overlay.querySelector(

        ".promo-dxn-next"

    );

    const btnCerrar=STATE.overlay.querySelector(

        "#promo-dxn-agosto-close"

    );

    /*=========================
      Flecha izquierda
    =========================*/

    btnPrev.addEventListener(

        "click",

        function(){

            anteriorSlide();

            reiniciarAutoplay();

        }

    );

    /*=========================
      Flecha derecha
    =========================*/

    btnNext.addEventListener(

        "click",

        function(){

            siguienteSlide();

            reiniciarAutoplay();

        }

    );

    /*=========================
      Indicadores
    =========================*/

    STATE.dots.forEach(function(dot,index){

        dot.addEventListener(

            "click",

            function(){

                mostrarSlide(index);

                reiniciarAutoplay();

            }

        );

    });

    /*=========================
      Pausar al pasar el mouse
    =========================*/

    STATE.modal.addEventListener(

        "mouseenter",

        detenerAutoplay

    );

    STATE.modal.addEventListener(

        "mouseleave",

        iniciarAutoplay

    );

    /*=========================
      Swipe para móviles
    =========================*/

    let inicioX=0;

    let finX=0;

    STATE.slider.addEventListener(

        "touchstart",

        function(e){

            inicioX=e.changedTouches[0].clientX;

        },

        {

            passive:true

        }

    );

    STATE.slider.addEventListener(

        "touchend",

        function(e){

            finX=e.changedTouches[0].clientX;

            const distancia=

                finX-inicioX;

            if(Math.abs(distancia)<40){

                return;

            }

            if(distancia>0){

                anteriorSlide();

            }

            else{

                siguienteSlide();

            }

            reiniciarAutoplay();

        },

        {

            passive:true

        }

    );

    /*=========================
      Botón cerrar
    =========================*/

    btnCerrar.addEventListener(

        "click",

        cerrarPopup

    );

}
/*==============================================================
CERRAR POPUP
==============================================================*/

function cerrarPopup(){

    marcarMostrado();

    detenerAutoplay();

    if(!STATE.overlay){

        return;

    }

    STATE.overlay.classList.remove(

        "promo-visible"

    );

    setTimeout(function(){

        if(STATE.overlay){

            STATE.overlay.remove();

        }

        limpiarEstado();

    },350);

}

/*==============================================================
LIMPIAR MEMORIA
==============================================================*/

function limpiarEstado(){

    STATE.overlay=null;

    STATE.modal=null;

    STATE.slider=null;

    STATE.slides=[];

    STATE.dots=[];

    STATE.indice=0;

    detenerAutoplay();

}

/*==============================================================
EVENTOS GLOBALES
==============================================================*/

function registrarEventosGlobales(){

    document.addEventListener(

        "keydown",

        teclaESC

    );

}

/*==============================================================
ESC
==============================================================*/

function teclaESC(e){

    if(e.key==="Escape"){

        cerrarPopup();

    }

}

/*==============================================================
CLIC FUERA DEL MODAL
==============================================================*/

document.addEventListener(

    "click",

    function(e){

        if(!STATE.overlay){

            return;

        }

        if(

            e.target===STATE.overlay

        ){

            cerrarPopup();

        }

    }

);

/*==============================================================
WHATSAPP
==============================================================*/

document.addEventListener(

    "click",

    function(e){

        const boton=e.target.closest(

            "#promo-dxn-whatsapp"

        );

        if(!boton){

            return;

        }

        marcarMostrado();

    }

);

/*==============================================================
VISIBILIDAD DE LA PÁGINA
==============================================================*/

document.addEventListener(

    "visibilitychange",

    function(){

        if(!STATE.overlay){

            return;

        }

        if(document.hidden){

            detenerAutoplay();

        }

        else{

            iniciarAutoplay();

        }

    }

);

/*==============================================================
REDIMENSIONAR
==============================================================*/

window.addEventListener(

    "resize",

    function(){

        if(!STATE.overlay){

            return;

        }

        mostrarSlide(

            STATE.indice

        );

    }

);

/*==============================================================
REGISTRAR EVENTOS
==============================================================*/

registrarEventosGlobales();

/*==============================================================
FIN
==============================================================*/

})();
