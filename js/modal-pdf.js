function openPDFModal(pdfUrl){
  const modal=document.getElementById("pdfModal");
  const iframe=document.getElementById("pdfViewer");
  if(!modal||!iframe)return;
  iframe.src=pdfUrl;
  modal.style.display="flex";
  modal.scrollIntoView({behavior:"smooth",block:"center"});

  // Oculta Smartsupp si está activo
  if(typeof smartsupp==="function"){
    smartsupp("chat:hide");
  }
}

function closePDFModal(event){
  const modal=document.getElementById("pdfModal");
  const iframe=document.getElementById("pdfViewer");
  if(!modal||!iframe)return;
  if(event.target.id==="pdfModal"||event.target.classList.contains("pdf-close")){
    modal.style.display="none";
    iframe.src="";

    // Muestra Smartsupp de nuevo al cerrar
    if(typeof smartsupp==="function"){
      smartsupp("chat:show");
    }
  }
}
