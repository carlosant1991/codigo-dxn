function openPDFModal(pdfUrl) {
  const modal = document.getElementById("pdfModal");
  const iframe = document.getElementById("pdfViewer");
  if (!modal || !iframe) return;
  
  iframe.src = pdfUrl;
  modal.style.display = "flex";
  modal.scrollIntoView({ behavior: "smooth", block: "center" });

  // Ocultar Denser.ai al abrir el modal
  const denserElements = document.querySelectorAll(
    '#denser-custom-wrapper, iframe[src*="denser"], div[class*="denser"], #denser-widget-container, denser-chat'
  );
  denserElements.forEach(function(el) {
    el.style.setProperty("display", "none", "important");
  });
}

function closePDFModal(event) {
  const modal = document.getElementById("pdfModal");
  const iframe = document.getElementById("pdfViewer");
  if (!modal || !iframe) return;

  if (event.target.id === "pdfModal" || event.target.classList.contains("pdf-close")) {
    modal.style.display = "none";
    iframe.src = "";

    // Volver a mostrar Denser.ai al cerrar el modal
    const denserElements = document.querySelectorAll(
      '#denser-custom-wrapper, iframe[src*="denser"], div[class*="denser"], #denser-widget-container, denser-chat'
    );
    denserElements.forEach(function(el) {
      el.style.setProperty("display", "block", "important");
    });
  }
}
