                        (async () => {
                          const numeroWhatsApp = "51962080861";
                          const token = "ff207427979a44";
                          const apiUrl = `https://ipinfo.io/json?token=${token}`;
                          const boton = document.getElementById("btn-whatsapp-dxn");

                          const bandera = (codigo) =>
                            String.fromCodePoint(...[...codigo.toUpperCase()].map(c => 127397 + c.charCodeAt()));

                          // 🌎 Lista de países oficiales DXN (Latinoamérica, Europa, Asia y África)
                          const paisesDXN = {
                            // América Latina
                            AR: "Argentina", BO: "Bolivia", BR: "Brasil", CL: "Chile", CO: "Colombia",
                            CR: "Costa Rica", DO: "República Dominicana", EC: "Ecuador", GT: "Guatemala",
                            HN: "Honduras", MX: "México", NI: "Nicaragua", PA: "Panamá", PE: "Perú",
                            PY: "Paraguay", SV: "El Salvador", UY: "Uruguay", VE: "Venezuela",
                            // Norteamérica
                            US: "Estados Unidos", CA: "Canadá",
                            // Europa
                            ES: "España", DE: "Alemania", NO: "Noruega", IT: "Italia", FR: "Francia",
                            PT: "Portugal", PL: "Polonia", CZ: "República Checa", HU: "Hungría", RO: "Rumania",
                            SK: "Eslovaquia", GB: "Reino Unido", NL: "Países Bajos", AT: "Austria",
                            // Asia
                            MY: "Malasia", SG: "Singapur", TH: "Tailandia", ID: "Indonesia", PH: "Filipinas",
                            IN: "India", VN: "Vietnam", CN: "China", JP: "Japón", KR: "Corea del Sur",
                            TW: "Taiwán", HK: "Hong Kong", BN: "Brunéi", KH: "Camboya", LA: "Laos",
                            MM: "Myanmar", NP: "Nepal", PK: "Pakistán", BD: "Bangladesh", LK: "Sri Lanka",
                            AE: "Emiratos Árabes Unidos", SA: "Arabia Saudita", QA: "Qatar", KW: "Kuwait",
                            OM: "Omán", BH: "Bahréin",
                            // África
                            ZA: "Sudáfrica", NG: "Nigeria", EG: "Egipto", GH: "Ghana", KE: "Kenia",
                            MA: "Marruecos", TZ: "Tanzania", UG: "Uganda",
                            // Oceanía
                            AU: "Australia", NZ: "Nueva Zelanda"
                          };

                          try {
                            const res = await fetch(apiUrl);
                            const data = await res.json();
                            const codigoPais = data.country || "XX";
                            const nombrePais = paisesDXN[codigoPais] || "tu país";
                            const flag = codigoPais !== "XX" ? bandera(codigoPais) : "🌎";

                            boton.innerHTML = `💬 Información de Centro de Servicio en <b>${nombrePais}</b> ${flag}`;

                            boton.addEventListener("click", () => {
                              const mensaje = `Hola 👋, soy de ${nombrePais}. Quisiera información sobre los Centros de Servicio DXN en mi país.`;
                              const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
                              window.open(enlace, "_blank");
                            });
                          } catch (e) {
                            console.error("Error al detectar el país:", e);
                            boton.innerHTML = "💬 Información de Centro de Servicio 🌎";
                            boton.addEventListener("click", () => {
                              const mensaje = `Hola 👋, quiero información sobre los Centros de Servicio DXN.`;
                              const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
                              window.open(enlace, "_blank");
                            });
                          }
                        })();
