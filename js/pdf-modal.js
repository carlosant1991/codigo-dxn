function openPDFModal(pdfUrl){
  const modal=document.getElementById("pdfModal");
  const iframe=document.getElementById("pdfViewer");
  iframe.src=pdfUrl;
  modal.style.display="flex";
  modal.scrollIntoView({behavior:"smooth",block:"center"});
}

function closePDFModal(event){
  const modal=document.getElementById("pdfModal");
  if(event.target.id==="pdfModal"||event.target.classList.contains("pdf-close")){
    modal.style.display="none";
    document.getElementById("pdfViewer").src="";
  }
}
