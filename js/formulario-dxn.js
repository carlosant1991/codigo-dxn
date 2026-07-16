async function mostrarFormulario() {

  const formulario = document.getElementById("formulario-dxn");
  if(!formulario) return;

  const boton = document.querySelector(".abrir-formulario");

  formulario.innerHTML = "";

  const idiomaNavegador =
    (navigator.language || navigator.userLanguage || "").toLowerCase();

  try {

    const respuesta = await fetch(
      "https://ipinfo.io/json?token=ff207427979a44"
    );

    const datos = await respuesta.json();

    const pais = (datos.country || "").toUpperCase();

    const paisesEspanolPortugues = [
      "AR","BO","CL","CO","CR","CU","DO","EC","SV","GQ",
      "GT","HN","MX","NI","PA","PY","PE","PR","ES",
      "UY","VE","PT","BR"
    ];

    const esEspanolOPortugues =
      idiomaNavegador.startsWith("es") ||
      idiomaNavegador.startsWith("pt") ||
      paisesEspanolPortugues.includes(pais);

    /* Botón cerrar */

    const cerrar = document.createElement("button");

    cerrar.className = "dxn-btn-cerrar";
    cerrar.innerHTML = "✕ Cerrar";

    cerrar.onclick = function(){

      formulario.innerHTML = "";
      formulario.style.display = "none";
      formulario.style.opacity = "0";

      if(boton){
        boton.style.display = "inline-block";
      }

    };

    /* Iframe */

    const iframe = document.createElement("iframe");

    iframe.className = "dxn-form-iframe";

    iframe.src = esEspanolOPortugues
      ? "https://docs.google.com/forms/d/e/1FAIpQLSfBKAZagbE5StHEt86ANSvLoGWY2aj8eK0I-GlgA_Etq3Rh9Q/viewform?embedded=true"
      : "https://form.jotform.com/201675134003645";

    iframe.onload = () => {

      try{

        iframe.style.height =
          iframe.contentWindow.document.body.scrollHeight + "px";

      }catch(e){

        iframe.style.height = "2300px";

      }

    };

    formulario.appendChild(cerrar);
    formulario.appendChild(iframe);

    formulario.style.display = "block";

    setTimeout(() => {

      formulario.style.opacity = "1";

      formulario.scrollIntoView({

        behavior:"smooth",
        block:"start"

      });

    },80);

    if(boton){

      boton.style.display = "none";

    }

  } catch(error){

    console.error(
      "Error al obtener país o mostrar formulario:",
      error
    );

    alert(
      "Hubo un problema al cargar el formulario. Por favor, inténtalo nuevamente."
    );

  }

}

/* Mostrar automáticamente cuando no exista botón */

window.addEventListener("load",function(){

  if(
    document.getElementById("formulario-dxn") &&
    !document.querySelector(".abrir-formulario")
  ){

    mostrarFormulario();

  }

});
