(function(){

/*======================
 CONFIGURACIÓN
======================*/

const PRECIOS={

PE:{nombre:"Perú",url:"https://drive.google.com/file/d/1pZcKFseSmUwE5gOrc-UnZkQ1yFkPXndr/preview"},
BO:{nombre:"Bolivia",url:"https://drive.google.com/file/d/18ukGnITLcWUUMDZpj3EIow9TPYCV4hAZ/preview"},
EC:{nombre:"Ecuador",url:"https://drive.google.com/file/d/1ia_nJv2TwxqQVrHuFPuORg0cLuGa0rtn/preview"},
CO:{nombre:"Colombia",url:"https://drive.google.com/file/d/1ZrTxfWgVzctGqU_JcojP1hTv8GveAq4B/preview"},
AR:{nombre:"Argentina",url:"https://drive.google.com/file/d/1BKm_qPhudwKahKuMdQAkLpQ960Ie2tqL/preview"},
BR:{nombre:"Brasil",url:"https://drive.google.com/file/d/17hCCkTUeVZmgc_1l1OQCLJFgiPASj1Jf/preview"},
CL:{nombre:"Chile",url:"https://drive.google.com/file/d/1oIzyX_aBVdwpo3K2IhStddiMuDRP86fy/preview"},
MX:{nombre:"México",url:"https://drive.google.com/file/d/1kCrQec_4mmugLW4ApkLcTHy5ey5MQrT4/preview"},
PA:{nombre:"Panamá",url:"https://drive.google.com/file/d/1sBatwtyn7qdbEbTLQzDnSW-2pCiOkHhu/preview"},
US:{nombre:"Estados Unidos",url:"https://drive.google.com/file/d/12yxQ6XaDdPLDZWb1iSf5P_dkhYOw0x6U/preview"},
CA:{nombre:"Canadá",url:"https://drive.google.com/file/d/1XID7X2AXkHUMo3gNaJ5kgXPEfvmEi5M4/preview"},
ES:{nombre:"España",url:"https://drive.google.com/file/d/14BGdQf0ZJUIEUfHjpmSSFqZQlH76WtMn/preview"},
IT:{nombre:"Italia",url:"https://drive.google.com/file/d/1dwwPu7eG8z2c4hpQXRJrz11GiiQoAV_V/preview"},
MY:{nombre:"Malasia",url:"https://drive.google.com/file/d/1zHbYusxC-pH9WnmGDD_7tEADujGNh039/preview"},
MA:{nombre:"Marruecos",url:"https://drive.google.com/file/d/1_Hb-mxhG2MzWx1wbVdFtuoYIDByZxf29/preview"},
PL:{nombre:"Polonia",url:"https://drive.google.com/file/d/1hdnyPU07z_hFklJlPXAhqr4iYz4KFzR_/preview"},
LT:{nombre:"Lituania",url:"https://drive.google.com/file/d/1aoM5r_CF6As1m_eerNM2ddL9Ct8ZIA8R/preview"},
LV:{nombre:"Letonia",url:"https://drive.google.com/file/d/1VQl6dETKUdoI2I6Km-zRoP6K_nfwotbZ/preview"},
FI:{nombre:"Finlandia",url:"https://drive.google.com/file/d/1G4qjMjt_WhbOZ8WjsG_2fmjZ-SZFzRMp/preview"},
EE:{nombre:"Estonia",url:"https://drive.google.com/file/d/1KKdqqlzZxIh8sbFN4Fk6fA5-Ve7e0xbB/preview"},
HU:{nombre:"Hungría",url:"https://drive.google.com/file/d/1KLLggk7x926G3LoO7SKW7HgVJ9Go_byb/preview"},
SK:{nombre:"Eslovaquia",url:"https://drive.google.com/file/d/1f-c_JAb7sQHe1Hnd1tx6uOwMbsSbF9QF/preview"},
NZ:{nombre:"Nueva Zelanda",url:"https://drive.google.com/file/d/1zdx-Li7pXrfVc6Bw6zqnIxrHO10k5S-l/preview"},
AU:{nombre:"Australia",url:"https://drive.google.com/file/d/1wZPk1mEK5BANQ1uVOWVJFlubigXO2qF1/preview"},
TR:{nombre:"Turquía",url:"https://drive.google.com/file/d/1axvMsoKPPAZfb6A9twklLnlmXMOAWEJQ/preview"},
IN:{nombre:"India",url:"https://drive.google.com/file/d/1KJiMe68ZXdBK1FXiY1WspZOJEEHHa4j0/preview"},
NO:{nombre:"Noruega",url:"https://drive.google.com/file/d/1QtGDvDWrYyCGULxD1JLBMlxtW7K7KQJB/preview"},
DE:{nombre:"Alemania",url:"https://drive.google.com/file/d/1rg8VnUQBxt8I1jEEd57TQJtLW40oYoH-/preview"},
EG:{nombre:"Egipto",url:"https://drive.google.com/file/d/1vm8oVKir7XqPs4KDiQ30hn-R2skMTOje/preview"}

};

/*======================
 ELEMENTOS
======================*/

const btn=document.getElementById("btnListaPrecios");
const overlay=document.getElementById("mensajeOverlay");
const opciones=document.getElementById("opcionesConfirmacion");
const campoPais=document.getElementById("campoPais");
const iframe=document.getElementById("iframePrecios");
const modal=document.getElementById("modalPrecios");
const cerrar=document.getElementById("btnCerrarModal");
const texto=document.getElementById("textoConfirmacion");

let paisDetectado=null;

/*======================
 DETECTAR PAÍS
======================*/

async function detectarPais(){

try{

const r=await fetch("https://ipinfo.io/json?token=ff207427979a44");

if(r.ok){

const d=await r.json();

if(d.country) return d.country;

}

}catch(e){}

try{

const r=await fetch("https://ipapi.co/json/");

if(r.ok){

const d=await r.json();

if(d.country) return d.country;

}

}catch(e){}

return null;

}

detectarPais().then(p=>paisDetectado=p);

/*======================
 FUNCIONES
======================*/

function ocultarSmartsupp(){

try{

const s=document.querySelector("#smartsupp-widget-container");

if(s) s.style.display="none";

}catch(e){}

}

function mostrarSmartsupp(){

try{

const s=document.querySelector("#smartsupp-widget-container");

if(s) s.style.display="block";

}catch(e){}

}

function mostrarOverlay(codigo){

const datos=PRECIOS[codigo];

const bandera=`https://flagcdn.com/24x18/${codigo.toLowerCase()}.png`;

texto.innerHTML=`Esta es la Lista de Precios de <strong>${datos.nombre}</strong>
<img src="${bandera}" style="width:24px;height:18px;vertical-align:middle;border-radius:3px;margin-left:6px;" alt="Bandera ${datos.nombre}">`;

overlay.style.display="block";

overlay.style.opacity=1;

opciones.style.display="block";

}

function mostrarSeleccionPais(){

overlay.style.display="block";

overlay.style.opacity=1;

texto.innerText="No encontramos lista para tu país detectado. Selecciona o escribe el tuyo:";

campoPais.style.display="block";

}
/*======================
 BOTÓN LISTA DE PRECIOS
======================*/

btn.addEventListener("click",()=>{

document.getElementById("selectPais").value="";
document.getElementById("inputPais").value="";

campoPais.style.display="none";
overlay.style.opacity=0;
overlay.style.display="none";
opciones.style.display="none";

modal.style.display="flex";

btn.style.opacity=0;

setTimeout(()=>{
btn.style.display="none";
},500);

ocultarSmartsupp();

if(paisDetectado && PRECIOS[paisDetectado]){

iframe.src=PRECIOS[paisDetectado].url;

setTimeout(()=>{
mostrarOverlay(paisDetectado);
},500);

}else{

mostrarSeleccionPais();

}

});

/*======================
 BOTÓN SÍ
======================*/

document.getElementById("btnSi").addEventListener("click",()=>{

overlay.style.opacity=0;

setTimeout(()=>{
overlay.style.display="none";
},500);

});

/*======================
 BOTÓN NO
======================*/

document.getElementById("btnNo").addEventListener("click",()=>{

campoPais.style.display="block";

opciones.style.display="none";

});

/*======================
 BUSCAR PAÍS
======================*/

document.getElementById("btnBuscarPais").addEventListener("click",()=>{

const paisSelect=document.getElementById("selectPais").value;

const paisTexto=document.getElementById("inputPais").value.trim();

if(paisSelect && PRECIOS[paisSelect]){

iframe.src=PRECIOS[paisSelect].url;

overlay.style.opacity=0;

setTimeout(()=>{
overlay.style.display="none";
},500);

return;

}

if(paisTexto){

window.location.href=
"https://wa.me/51962080861?text=Hola,%20quisiera%20la%20lista%20de%20precios%20de:%20"+
encodeURIComponent(paisTexto);

return;

}

alert("> Selecciona un país o escribe uno.");

});

/*======================
 CERRAR MODAL
======================*/

cerrar.addEventListener("click",()=>{

modal.style.display="none";

iframe.src="";

btn.style.display="block";

setTimeout(()=>{
btn.style.opacity=1;
},50);

mostrarSmartsupp();

});

})();  
