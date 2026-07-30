(function () {
"use strict";

// ==========================================================
// PAÍSES DEL SELECT OFICIAL DE REGISTRO DXN
// ==========================================================
const paisesRegistroOnline = new Set([
"AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ",
"BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BV","BR","IO",
"BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CX","CC","KM","CG",
"CD","CK","CR","HR","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE",
"ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR",
"GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS",
"DI","ID","IQ","IE","IM","IL","IT","CI","JM","JP","JE","JO","KZ","KE","KI","KR",
"XK","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","AN","MK","MG",
"MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME",
"MS","MA","MZ","NA","NR","NL","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM",
"PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","RE","RO","RW",
"BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG",
"SK","SI","SB","SO","ZA","GS","SS","ES","RK","SD","SR","SJ","SZ","SE","CH","SY",
"TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA",
"AE","GB","US","UY","UZ","VU","VE","VN","VG","VI","WF","YE","ZM","ZW"
]);

// ==========================================================
// NOMBRES DE PAÍSES
// ==========================================================
const nombresPaises = {
PE: "Perú",
BO: "Bolivia",
BR: "Brasil",
AR: "Argentina",
MX: "México",
EC: "Ecuador",
CL: "Chile",
CO: "Colombia",
VE: "Venezuela",
US: "Estados Unidos",
ES: "España",
IN: "India",
MY: "Malasia",
PH: "Filipinas",
TH: "Tailandia",
TR: "Turquía",
DE: "Alemania",
FR: "Francia",
IT: "Italia",
GB: "Reino Unido",
CA: "Canadá",
AU: "Australia",
JP: "Japón",
CN: "China",
KR: "Corea del Sur"
};

// ==========================================================
// BANDERA
// ==========================================================
function obtenerBandera(codigo) {

```
if (!codigo || codigo.length !== 2) {
  return "🌎";
}

return codigo
  .toUpperCase()
  .replace(/./g, function (letra) {
    return String.fromCodePoint(
      127397 + letra.charCodeAt(0)
    );
  });
```

}

// ==========================================================
// MOSTRAR RESULTADO
// ==========================================================
function mostrarEstado(codigoPais) {

```
codigoPais = (codigoPais || "").toUpperCase();

console.log(
  "🌎 País detectado por DXN:",
  codigoPais
);

const estado =
  document.getElementById("estado-registro-dxn");

const cta =
  document.querySelector(".cta-dxn-final");

const formulario =
  document.getElementById(
    "contenedor-formulario-general"
  );

if (!estado) {

  console.error(
    "❌ No se encontró #estado-registro-dxn"
  );

  return;
}

const nombrePais =
  nombresPaises[codigoPais] ||
  codigoPais ||
  "tu país";

const bandera =
  obtenerBandera(codigoPais);

// ========================================================
// REGISTRO ONLINE DISPONIBLE
// ========================================================
if (paisesRegistroOnline.has(codigoPais)) {

  console.log(
    "✅ Registro Online disponible en:",
    nombrePais
  );

  if (cta) {
    cta.style.display = "";
  }

  if (formulario) {
    formulario.style.display = "";
  }

  estado.style.display = "block";
  estado.style.background = "#eaf7ee";
  estado.style.border = "1px solid #28a745";
  estado.style.color = "#155724";

  estado.innerHTML =
    bandera +
    " <b>Registro Online disponible en " +
    nombrePais +
    "</b><br>" +
    "Puedes completar tu registro online en DXN.";

}

// ========================================================
// REGISTRO ONLINE NO DISPONIBLE
// ========================================================
else {

  console.log(
    "⚠️ Registro Online no disponible en:",
    nombrePais
  );

  if (cta) {
    cta.style.display = "none";
  }

  if (formulario) {
    formulario.style.display = "none";
  }

  estado.style.display = "block";
  estado.style.background = "#fff4e5";
  estado.style.border = "1px solid #f0ad4e";
  estado.style.color = "#7a4b00";

  estado.innerHTML =
    "🌎 <b>Registro Online no disponible</b><br>" +
    "No tenemos registro online en " +
    "<b>" + nombrePais + "</b>.<br>" +
    "Comunícate con un distribuidor independiente de confianza.";
}
```

}

// ==========================================================
// DETECTAR PAÍS
// ==========================================================
function detectarPais() {

```
console.log(
  "🌎 Iniciando detección del país..."
);

fetch(
  "https://ipapi.co/json/",
  {
    cache: "no-store"
  }
)
.then(function (respuesta) {

  if (!respuesta.ok) {
    throw new Error(
      "Error HTTP: " +
      respuesta.status
    );
  }

  return respuesta.json();
})
.then(function (datos) {

  console.log(
    "📍 Respuesta de geolocalización:",
    datos
  );

  const codigoPais =
    datos.country_code;

  mostrarEstado(codigoPais);

})
.catch(function (error) {

  console.error(
    "❌ Error detectando país:",
    error
  );

  // Si falla la geolocalización,
  // dejamos el formulario visible.
  const estado =
    document.getElementById(
      "estado-registro-dxn"
    );

  const cta =
    document.querySelector(
      ".cta-dxn-final"
    );

  const formulario =
    document.getElementById(
      "contenedor-formulario-general"
    );

  if (estado) {
    estado.style.display = "none";
  }

  if (cta) {
    cta.style.display = "";
  }

  if (formulario) {
    formulario.style.display = "";
  }
});
```

}

// ==========================================================
// ESPERAR A QUE TODA LA PÁGINA ESTÉ CARGADA
// ==========================================================
window.addEventListener(
"load",
function () {

```
  console.log(
    "✅ Página cargada. Ejecutando control DXN."
  );

  detectarPais();

}
```

);

})();
