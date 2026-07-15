document.addEventListener("DOMContentLoaded",()=>{

  document.addEventListener("contextmenu",e=>{
    e.preventDefault();
    mostrarAviso("Contenido Protegido");
  });

  document.addEventListener("selectstart",e=>e.preventDefault());

  function mostrarAviso(texto){
    let aviso=document.getElementById("msg-dxn-protegido");

    if(!aviso){
      aviso=document.createElement("div");
      aviso.id="msg-dxn-protegido";
      document.body.appendChild(aviso);
    }

    aviso.textContent=texto;
    aviso.style.opacity="1";

    clearTimeout(aviso.timer);
    aviso.timer=setTimeout(()=>{
      aviso.style.opacity="0";
    },2000);
  }

});
