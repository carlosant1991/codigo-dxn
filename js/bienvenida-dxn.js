//<![CDATA[
window.addEventListener("load",function(){

(function(){

const e=document.referrer,
      t=location.hostname,
      n=!e||!e.includes(t);

if(n&&!sessionStorage.getItem("mensajeDXN")){

setTimeout(async()=>{

let e=null;

try{

let t=await fetch("https://ipinfo.io/json?token=ff207427979a44");

if(t.ok)e=await t.json();

}catch(e){}

if(!e||!e.country){

try{

let t=await fetch("https://ipapi.co/json/");

if(t.ok)e=await t.json();

}catch(e){}

}

const t=e?.city||"tu ciudad",

n=(e?.country||e?.country_code||navigator.language.slice(-2)||"").toLowerCase(),

o=n
?`https://flagcdn.com/48x36/${n}.png`
:"https://i.ibb.co/yhTXVZN/dxn-globe.png";

const a=document.createElement("div");

a.className="dxn-bienvenida";

a.innerHTML=`

<img
class="dxn-avatar"
src="https://i.ibb.co/B5m59WLm/datuk-lim-siow-jin.jpg"
alt="Dr. Lim Siow Jin">

<span>

Nos visita de <b>${t}</b>

<img
class="dxn-bandera"
src="${o}"
alt="Bandera">

- Buenos Días

</span>

`;

document.body.appendChild(a);


setTimeout(()=>{

a.style.opacity="0";

setTimeout(()=>a.remove(),1000);

},7000);


sessionStorage.setItem("mensajeDXN","true");


},6500);

}

})();

});
//]]>
