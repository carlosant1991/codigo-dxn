(function () {
"use strict";

// ============================================================
// PAÍSES PRESENTES EN EL SELECT OFICIAL DE REGISTRO DXN
// ============================================================
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

// ============================================================
// NOMBRES DE PAÍSES
// ============================================================
const nombresPaises = {
AF:"Afganistán", AL:"Albania", DZ:"Argelia", AS:"Samoa Americana",
AD:"Andorra", AO:"Angola", AI:"Anguila", AQ:"Antártida",
AG:"Antigua y Barbuda", AR:"Argentina", AM:"Armenia", AW:"Aruba",
AU:"Australia", AT:"Austria", AZ:"Azerbaiyán", BS:"Bahamas",
BH:"Baréin", BD:"Bangladés", BB:"Barbados", BY:"Bielorrusia",
BE:"Bélgica", BZ:"Belice", BJ:"Benín", BM:"Bermudas",
BT:"Bután", BO:"Bolivia", BA:"Bosnia y Herzegovina", BW:"Botsuana",
BR:"Brasil", BN:"Brunéi", BG:"Bulgaria", BF:"Burkina Faso",
BI:"Burundi", KH:"Camboya", CM:"Camerún", CA:"Canadá",
CV:"Cabo Verde", KY:"Islas Caimán", CF:"República Centroafricana",
TD:"Chad", CL:"Chile", CX:"Isla de Navidad", CC:"Islas Cocos",
KM:"Comoras", CG:"Congo", CD:"República Democrática del Congo",
CK:"Islas Cook", CR:"Costa Rica", HR:"Croacia", CY:"Chipre",
CZ:"República Checa", DK:"Dinamarca", DJ:"Yibuti", DM:"Dominica",
DO:"República Dominicana", EC:"Ecuador", EG:"Egipto",
SV:"El Salvador", GQ:"Guinea Ecuatorial", ER:"Eritrea",
EE:"Estonia", ET:"Etiopía", FK:"Islas Malvinas", FO:"Islas Feroe",
FJ:"Fiyi", FI:"Finlandia", FR:"Francia", GF:"Guayana Francesa",
PF:"Polinesia Francesa", TF:"Territorios Australes Franceses",
GA:"Gabón", GM:"Gambia", GE:"Georgia", DE:"Alemania",
GH:"Ghana", GI:"Gibraltar", GR:"Grecia", GL:"Groenlandia",
GD:"Granada", GP:"Guadalupe", GU:"Guam", GT:"Guatemala",
GG:"Guernsey", GN:"Guinea", GW:"Guinea-Bisáu", GY:"Guyana",
HT:"Haití", HM:"Islas Heard y McDonald", VA:"Ciudad del Vaticano",
HN:"Honduras", HK:"Hong Kong", HU:"Hungría", IS:"Islandia",
DI:"India", ID:"Indonesia", IQ:"Irak", IE:"Irlanda",
IM:"Isla de Man", IL:"Israel", IT:"Italia", CI:"Costa de Marfil",
JM:"Jamaica", JP:"Japón", JE:"Jersey", JO:"Jordania",
KZ:"Kazajistán", KE:"Kenia", KI:"Kiribati", KR:"Corea del Sur",
XK:"Kosovo", KW:"Kuwait", KG:"Kirguistán", LA:"Laos",
LV:"Letonia", LB:"Líbano", LS:"Lesoto", LR:"Liberia",
LY:"Libia", LI:"Liechtenstein", LT:"Lituania", LU:"Luxemburgo",
MO:"Macao", AN:"Antillas Neerlandesas", MK:"Macedonia del Norte",
MG:"Madagascar", MW:"Malaui", MY:"Malasia", MV:"Maldivas",
ML:"Malí", MT:"Malta", MH:"Islas Marshall", MQ:"Martinica",
MR:"Mauritania", MU:"Mauricio", YT:"Mayotte", MX:"México",
FM:"Micronesia", MD:"Moldavia", MC:"Mónaco", MN:"Mongolia",
ME:"Montenegro", MS:"Montserrat", MA:"Marruecos", MZ:"Mozambique",
NA:"Namibia", NR:"Nauru", NL:"Países Bajos", NC:"Nueva Caledonia",
NZ:"Nueva Zelanda", NI:"Nicaragua", NE:"Níger", NG:"Nigeria",
NU:"Niue", NF:"Isla Norfolk", MP:"Islas Marianas del Norte",
NO:"Noruega", OM:"Omán", PK:"Pakistán", PW:"Palaos",
PS:"Palestina", PA:"Panamá", PG:"Papúa Nueva Guinea",
PY:"Paraguay", PE:"Perú", PH:"Filipinas", PN:"Islas Pitcairn",
PL:"Polonia", PT:"Portugal", PR:"Puerto Rico", QA:"Catar",
RE:"Reunión", RO:"Rumanía", RW:"Ruanda", BL:"San Bartolomé",
SH:"Santa Elena", KN:"San Cristóbal y Nieves", LC:"Santa Lucía",
MF:"San Martín", PM:"San Pedro y Miquelón",
VC:"San Vicente y las Granadinas", WS:"Samoa", SM:"San Marino",
ST:"Santo Tomé y Príncipe", SA:"Arabia Saudita", SN:"Senegal",
RS:"Serbia y Montenegro", SC:"Seychelles", SL:"Sierra Leona",
SG:"Singapur", SK:"Eslovaquia", SI:"Eslovenia",
SB:"Islas Salomón", SO:"Somalia", ZA:"Sudáfrica",
GS:"Georgia del Sur y Sandwich del Sur", SS:"Sudán del Sur",
ES:"España", RK:"Sri Lanka", SD:"Sudán", SR:"Surinam",
SJ:"Svalbard y Jan Mayen", SZ:"Esuatini", SE:"Suecia",
CH:"Suiza", SY:"Siria", TW:"Taiwán", TJ:"Tayikistán",
TZ:"Tanzania", TH:"Tailandia", TL:"Timor Oriental", TG:"Togo",
TK:"Tokelau", TO:"Tonga", TT:"Trinidad y Tobago", TN:"Túnez",
TR:"Turquía", TM:"Turkmenistán", TC:"Islas Turcas y Caicos",
TV:"Tuvalu", UG:"Uganda", UA:"Ucrania", AE:"Emiratos Árabes Unidos",
GB:"Reino Unido", US:"Estados Unidos", UY:"Uruguay",
UZ:"Uzbekistán", VU:"Vanuatu", VE:"Venezuela", VN:"Vietnam",
VG:"Islas Vírgenes Británicas", VI:"Islas Vírgenes de EE. UU.",
WF:"Wallis y Futuna", YE:"Yemen", ZM:"Zambia", ZW:"Zimbabue"
};

// ============================================================
// GENERAR BANDERA
// ============================================================
function obtenerBandera(codigo) {
if (!codigo || codigo.length !== 2) return "🌎";

```
return codigo
  .toUpperCase()
  .replace(/./g, letra =>
    String.fromCodePoint(127397 + letra.charCodeAt())
  );
```

}

// ============================================================
// MOSTRAR ESTADO DEL REGISTRO
// ============================================================
function mostrarEstado(codigoPais) {

```
const estado = document.getElementById("estado-registro-dxn");
const cta = document.querySelector(".cta-dxn-final");
const formulario = document.getElementById("contenedor-formulario-general");

if (!estado) return;

codigoPais = (codigoPais || "").toUpperCase();

const nombrePais =
  nombresPaises[codigoPais] || "tu país";

const bandera =
  obtenerBandera(codigoPais);

// ==========================================================
// REGISTRO ONLINE DISPONIBLE
// ==========================================================
if (paisesRegistroOnline.has(codigoPais)) {

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
    "</b><br/>" +
    "Puedes completar tu registro online en DXN.";

}

// ==========================================================
// REGISTRO ONLINE NO DISPONIBLE
// ==========================================================
else {

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
    "🌎 <b>Registro Online no disponible</b><br/>" +
    "No tenemos registro online en " +
    (codigoPais
      ? "<b>" + nombrePais + "</b>"
      : "tu país") +
    ".<br/>" +
    "Comunícate con un distribuidor independiente de confianza.";
}
```

}

// ============================================================
// DETECTAR PAÍS MEDIANTE IP
// ============================================================
function detectarPais() {

```
fetch("https://ipapi.co/json/")
  .then(function (respuesta) {

    if (!respuesta.ok) {
      throw new Error("No se pudo detectar el país");
    }

    return respuesta.json();
  })
  .then(function (datos) {

    mostrarEstado(datos.country_code);

  })
  .catch(function () {

    // Si no se puede detectar el país,
    // se mantiene visible el formulario original.
    const estado =
      document.getElementById("estado-registro-dxn");

    const cta =
      document.querySelector(".cta-dxn-final");

    const formulario =
      document.getElementById("contenedor-formulario-general");

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

// ============================================================
// EJECUTAR CUANDO EL DOCUMENTO ESTÉ LISTO
// ============================================================
if (document.readyState === "loading") {

```
document.addEventListener(
  "DOMContentLoaded",
  detectarPais
);
```

} else {

```
detectarPais();
```

}

})();
