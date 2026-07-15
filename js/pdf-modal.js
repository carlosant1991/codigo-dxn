function openPDFModal(pdfUrl){
  const modal=document.getElementById("pdfModal");
  const iframe=document.getElementById("pdfViewer");
  if(!modal||!iframe)return;
  iframe.src=pdfUrl;
  modal.style.display="flex";
  modal.scrollIntoView({behavior:"smooth",block:"center"});
}

function closePDFModal(event){
  const modal=document.getElementById("pdfModal");
  const iframe=document.getElementById("pdfViewer");
  if(!modal||!iframe)return;
  if(event.target.id==="pdfModal"||event.target.classList.contains("pdf-close")){
    modal.style.display="none";
    iframe.src="";
  }
}
