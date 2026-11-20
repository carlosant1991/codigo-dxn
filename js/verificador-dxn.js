(function () {
  const SPONSOR_CODE = "818279053";
  const WHATSAPP_NUM = "51962080861";
  const REGISTER_URL = `https://eworld.dxn2u.com/auth/register/distributor/?sponsor_code=${SPONSOR_CODE}`;
  const API_URL = "https://eworld.dxn2u.com/s/apinewreg/beforesubmitcheck";

  const cssRules = `
    #dxn-verificador-previo {
      max-width: 540px;
      margin: 18px auto 24px auto;
      padding: 22px 20px;
      background: #f8fafc;
      border: 1.5px solid #dbeafe;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0, 51, 102, 0.06);
      font-family: 'Roboto', sans-serif;
      color: #1e293b;
      box-sizing: border-box;
      text-align: left;
    }
    #dxn-verificador-previo * { box-sizing: border-box; }
    .dxn-vp-titulo {
      font-family: 'Poppins', sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #003366;
      margin: 0 0 6px 0;
      text-align: center;
    }
    .dxn-vp-subtitulo {
      font-size: 0.9rem;
      line-height: 1.5;
      color: #475569;
      margin: 0 0 16px 0;
      text-align: justify;
    }
    .dxn-vp-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 14px;
    }
    .dxn-vp-col { flex: 1 1 210px; }
    .dxn-vp-label {
      display: block;
      font-family: 'Poppins', sans-serif;
      font-size: 0.84rem;
      font-weight: 600;
      color: #003366;
      margin-bottom: 5px;
    }
    .dxn-vp-label span { color: #dc2626; }
    .dxn-vp-control {
      width: 100%;
      height: 44px;
      padding: 0 12px;
      font-family: 'Roboto', sans-serif;
      font-size: 0.94rem;
      color: #0f172a;
      background-color: #ffffff;
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .dxn-vp-control:focus {
      border-color: #003366;
      box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.12);
    }
    .dxn-vp-control.is-invalid {
      border-color: #dc2626;
      background-color: #fef2f2;
    }
    .dxn-vp-control.is-valid {
      border-color: #16a34a;
      background-color: #f0fdf4;
    }
    .dxn-vp-btn {
      width: 100%;
      height: 44px;
      background-color: #003366;
      color: #ffffff;
      font-family: 'Poppins', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: background-color 0.2s, transform 0.1s;
    }
    .dxn-vp-btn:hover { background-color: #002244; }
    .dxn-vp-btn:active { transform: scale(0.99); }
    .dxn-vp-btn:disabled {
      background-color: #94a3b8;
      cursor: not-allowed;
    }
    .dxn-vp-resultado {
      display: none;
      margin-top: 14px;
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 0.89rem;
      line-height: 1.5;
      text-align: justify;
    }
    .dxn-vp-resultado.error {
      display: block;
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #991b1b;
    }
    .dxn-vp-resultado.success {
      display: block;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #166534;
    }
    .dxn-vp-resultado.warning {
      display: block;
      background: #fffbeb;
      border: 1px solid #fde68a;
      color: #92400e;
    }
    .dxn-vp-res-header {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 0.94rem;
      margin-bottom: 4px;
    }
    .dxn-vp-accion {
      display: block;
      margin-top: 10px;
      padding: 9px 14px;
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.86rem;
      font-weight: 600;
      text-align: center;
      text-decoration: none;
      color: #ffffff !important;
      cursor: pointer;
      border: none;
      width: 100%;
    }
    .dxn-vp-accion.whatsapp { background-color: #25d366; }
    .dxn-vp-accion.whatsapp:hover { background-color: #1ebe5d; }
    .dxn-vp-accion.azul { background-color: #003366; }
    .dxn-vp-spinner {
      width: 16px;
      height: 16px;
      border: 2.5px solid rgba(255, 255, 255, 0.35);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: dxn-vp-spin 0.75s linear infinite;
    }
    @keyframes dxn-vp-spin { to { transform: rotate(360deg); } }
    @keyframes dxn-pulso-azul {
      0% { box-shadow: 0 0 0 0 rgba(0, 51, 102, 0.55); }
      70% { box-shadow: 0 0 0 12px rgba(0, 51, 102, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 51, 102, 0); }
    }
    .dxn-destacar-boton { animation: dxn-pulso-azul 1.4s ease-out 2; }
    @media (max-width: 480px) {
      #dxn-verificador-previo { padding: 18px 14px; }
    }
  `;

  function inyectarEstilos() {
    if (!document.getElementById("dxn-vp-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "dxn-vp-styles";
      styleEl.textContent = cssRules;
      document.head.appendChild(styleEl);
    }
  }

  function initVerificadorDxn() {
    inyectarEstilos();

    const paisSelect = document.getElementById("dxnVpPais");
    const docInput = document.getElementById("dxnVpDoc");
    const btnVerificar = document.getElementById("dxnVpBtn");
    const cajaResultado = document.getElementById("dxnVpResultado");

    if (!paisSelect || !docInput || !btnVerificar || !cajaResultado) return;

    function limpiarEstado() {
      paisSelect.classList.remove("is-invalid", "is-valid");
      docInput.classList.remove("is-invalid", "is-valid");
      cajaResultado.className = "dxn-vp-resultado";
      cajaResultado.innerHTML = "";
    }

    function mostrarAlerta(tipo, titulo, contenidoHtml) {
      cajaResultado.className = `dxn-vp-resultado ${tipo}`;
      cajaResultado.innerHTML = `
        <div class="dxn-vp-res-header">${titulo}</div>
        <div>${contenidoHtml}</div>
      `;
    }

    function resaltarBotonAzulAbajo() {
      const btnAzul = document.querySelector("#contenedor-boton-formulario .abrir-formulario");
      if (btnAzul) {
        btnAzul.classList.remove("dxn-destacar-boton");
        void btnAzul.offsetWidth;
        btnAzul.classList.add("dxn-destacar-boton");
      }
    }

    async function verificarDocumentoDxn() {
      const pais = paisSelect.value;
      const documento = docInput.value.trim().toUpperCase();

      limpiarEstado();

      if (!pais) {
        paisSelect.classList.add("is-invalid");
        mostrarAlerta(
          "warning",
          "⚠️ Selecciona un país",
          "Por favor, elige tu país en la lista antes de verificar tu documento."
        );
        paisSelect.focus();
        return;
      }

      if (!documento) {
        docInput.classList.add("is-invalid");
        mostrarAlerta(
          "warning",
          "⚠️ Ingresa tu número de documento",
          "Por favor, escribe tu número de identidad, CI o pasaporte antes de consultar."
        );
        docInput.focus();
        return;
      }

      btnVerificar.disabled = true;
      btnVerificar.innerHTML = `<span class="dxn-vp-spinner"></span> Verificando en DXN eWorld...`;

      try {
        const formData = new FormData();
        formData.append("icno", documento);
        formData.append("country_id", pais);

        const respuesta = await fetch(API_URL, {
          method: "POST",
          headers: {
            "accept": "application/json, text/plain, */*"
          },
          body: formData,
          mode: "cors",
          credentials: "omit"
        });

        if (!respuesta.ok) {
          throw new Error(`HTTP ${respuesta.status}`);
        }

        const dataJson = await respuesta.json();

        if (dataJson && typeof dataJson.error_icno === "boolean") {
          if (dataJson.error_icno === false) {
            docInput.classList.add("is-valid");
            mostrarAlerta(
              "success",
              "✅ ¡Excelente! Tu documento está libre y apto para registrarte",
              `El documento <strong>${documento}</strong> no tiene registro previo en DXN. Ahora haz clic en el botón azul de abajo <strong>"👆 Clic para llenar el Formulario"</strong> para completar tu afiliación ahora mismo 👇`
            );
            resaltarBotonAzulAbajo();
          } else {
            docInput.classList.add("is-invalid");
            const textoWa = encodeURIComponent(`Hola, verifiqué mi documento (${documento}) en el blog de DXN y me sale que ya está registrado. ¿Me puedes ayudar a revisar el estado de mi código?`);

            mostrarAlerta(
              "error",
              "⛔ Documento ya registrado en DXN",
              `Su documento de Identidad ya está en uso. Si ya tuviste un código anteriormente y deseas saber si está activo o cómo reactivarlo, escríbenos para ayudarte:
               <a href="https://wa.me/${WHATSAPP_NUM}?text=${textoWa}" target="_blank" rel="noopener noreferrer" class="dxn-vp-accion whatsapp">
                 💬 Consultar estado de mi código por WhatsApp
               </a>`
            );
          }
        } else {
          throw new Error("Formato de respuesta inesperado");
        }
      } catch (error) {
        mostrarAlerta(
          "warning",
          "ℹ️ Verificación directa en el portal oficial",
          `No se pudo completar la consulta automática en este momento. Puedes verificar tu documento y registrarte directamente en el formulario oficial de DXN (Patrocinador: <strong>${SPONSOR_CODE}</strong>):
           <a href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer" class="dxn-vp-accion azul">
             Ir al Formulario Oficial DXN eWorld &rarr;
           </a>`
        );
      } finally {
        btnVerificar.disabled = false;
        btnVerificar.innerHTML = "Comprobar Disponibilidad";
      }
    }

    btnVerificar.addEventListener("click", verificarDocumentoDxn);

    docInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        verificarDocumentoDxn();
      }
    });

    paisSelect.addEventListener("change", function () {
      if (paisSelect.value !== "" && docInput.value.trim() !== "") {
        verificarDocumentoDxn();
      } else {
        limpiarEstado();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVerificadorDxn);
  } else {
    initVerificadorDxn();
  }
})();
