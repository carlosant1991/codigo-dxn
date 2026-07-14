window.addEventListener("load",function(){

(function(){

const referrer=document.referrer;
const host=location.hostname;
const visitanteNuevo=!referrer||!referrer.includes(host);

if(!visitanteNuevo||sessionStorage.getItem("mensajeDXN")) return;

setTimeout(async()=>{

let datos=null;

try{
const r=await fetch("https://ipinfo.io/json?token=ff207427979a44");
if(r.ok) datos=await r.json();
}catch(e){}

if(!datos||!datos.country){
try{
const r=await fetch("https://ipapi.co/json/");
if(r.ok) datos=await r.json();
}catch(e){}
}

const ciudad=datos?.city||"tu ciudad";

const codigoPais=(datos?.country||datos?.country_code||navigator.language.slice(-2)||"").toLowerCase();

const bandera=codigoPais
?`https://flagcdn.com/48x36/${codigoPais}.png`
:"https://i.ibb.co/yhTXVZN/dxn-globe.png";

const aviso=document.createElement("div");

aviso.className="dxn-bienvenida";

aviso.innerHTML=`
<img
src="https://i.ibb.co/B5m59WLm/datuk-lim-siow-jin.jpg"
alt="Dr. Lim Siow Jin"
class="dxn-avatar">

<span>
Nos visita de <b>${ciudad}</b>

<img
src="${bandera}"
alt="Bandera"
class="dxn-bandera">

— Buenos Días
</span>
`;

document.body.appendChild(aviso);

setTimeout(()=>{

aviso.style.opacity="0";

setTimeout(()=>{
aviso.remove();
},1000);

},7000);

sessionStorage.setItem("mensajeDXN","true");

},6500);

})();

});
