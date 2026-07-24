document.addEventListener("DOMContentLoaded", async function() {
                  try {
                    const res = await fetch("https://ipapi.co/json/");
                    const data = await res.json();
                    if (data && data.country_code === "PE") initDXNStore();
                  } catch(e) { console.log("Geo error:", e); }
                });

                function initDXNStore(){
                  const container = document.getElementById("dxn-store-container");
                  container.innerHTML = `
                    <button id="openStoreBtn">Ver Productos DXN Perú 🇵🇪</button>
                    <div id="storeModal" class="store-modal">
                      <div class="store-content">
                        <span class="close-store" aria-label="Cerrar">&times;</span>
                        <h2>Productos de Alimentos y Bebidas 🇵🇪</h2>
                        <div class="store-grid" id="storeGrid"></div>
                      </div>
                    </div>
                  `;

                    const products = {
                      alimentosYBebidas: [
                        {name:"Lingzhi Black Coffee", desc:"Café negro puro con antioxidantes.", price:"S/ 76", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8zKLA-npzqSrPcf28vP3c7BWcP_lWI4NlkBPxa9Q1bDCX-bLsZmR4U0GDuP6nUAR1Q7pt_WACZOUGsvyvOb5GzbsevN2givKdfm4bu1X5oWkwEgsYsLaUtXRU-mPxPlP68sTJKdB_O_4D1CHSlCwJqygX14SQ_hNAnastkO5zmFUlgLz6R7QoZz0_Qt8Q/s1600/Caf%C3%A9%20negro.jpg"},
                        {name:"Lingzhi Coffee 3 in 1", desc:"Energía instantánea con ganoderma.", price:"S/ 76", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCO0hewwZLiamj-3PqEMl0iRMePK_J3ZtyZESRG_gDhoBxxoHp2GORmDSjOHRDGg9S_GMJSTId5beB0TxWGUR6t3hFJKwbQVxz4zSpTcGJdD9NGqmasSohy-wTR2K5eUM0QYMHq-Y3iI9NB1pBrCjRhW4_noNnuJgNZdVjU7qc7QctMNv1DIp8tnZMD87-/s1600/Lingzhi-Coffee%203%20in%201.jpg"},
                        {name:"Cocozhi", desc:"Delicioso chocolate caliente con ganoderma.", price:"S/ 97", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6xji_abj5R4jeGaq_FVP6N31zJkEeMN09M4LQYv_n0NzUWFghz6NVkW-CmeE4KXw8OdNi-cFLghTdeX0AmHr-E3-V9vPdbN9YAeH5i06za80k7f5eNtB05PBtZ1bSLFz6lq_smpO6zE5v0qbRkTwjB-MYGaEqsnGtITV0_C8tvPO2QZZGv0LD2KlR9win/s1600/Cocozhidxn-peru.jpg"},
                        {name:"Zhi Mocha", desc:"Deliciosa fusión de café, chocolate y Ganoderma.", price:"S/ 92", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSj_gc4skVfhLM5u3MyMX9cKmMG_GZc3DCfl-VG8RXuO3JZ53PNjPrIU4edh15ndRIA3Z9HIpORW-1K6_dNd6qhiy_oruyY11TJjh14Kw75j_Oozr22-74b6-HOxDXE5CD9QuRk_7x6yCEQ4a3Z3Fk0JJWE6RHKD3NOpk2whyphenhypheni18UcNoGFr_0RJ_mHWBdu/s1600/zhi-mochadxn.jpg"},
                        {name:"Zhi Café Classic", desc:"Café clásico enriquecido con Ganoderma.", price:"S/ 79", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhxYA0DBGD9FTw1uYHbJXcKvM0mZ_b1bgBMENY4-PslclufBa0gP0d7OBnSpKeXuThIKi1mQfN165QlAo7P1Aka7VGYzpPd_s43mn4T2mxq6PCuQFbo72Gly_y2gF7QHgaaEci7_MgWJC0NSVsGixQ-O402pYrseoVCJ3cagsYs-zNGpuBX6FwCAHTjSsHr/s1600/zhi%20caf%C3%A9-classic.jpg"},
                        {name:"Vita Café", desc:"Bebida energética con café, Ganoderma y ginseng.", price:"S/ 97", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZNRCkV_SlLY-UaBZtDCoV7SuORxJlN8FzSEkmlq5eB1KA2D3qGOrh0_U9hBQ1VMgqpBao-shsGJVRZrI2-f_3wkrRFhXjuw_sQuB4gZ1ZzHvPmSUK3bvpjnTnKOTJVy0MvdnKhvun3SobKrz9EGvT7tYi1XxQRLwEfRe8X2d4nFDXldi1VnxZEw1dbd8G/s1600/vita%20caf%C3%A9-dxn.jpg"},
                        {name:"Spica Tea", desc:"Infusión herbal con Ganoderma.", price:"S/ 76", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtSsw6ypjFUWEjTGs6OjWlh6yXjYTyRqr_ajdLU2M9rx6AT9j_kR1u1FDbfKIZ2vX5wpzd7K36ey-pGwEeWB19l39PkapEpxpwZg22sG1eGwF5gaEtZUjjxv6LLq0q6JtbZrnicUeu5j4_jnK__n_esQcqx7lm8L37XgGWiHJOdxVgITMCv-t4Px9k87q1/s1600/Spica-tea-dxn.jpg"},
                        {name:"White Coffee Zhino", desc:"Café cremoso con Ganoderma.", price:"S/ 97", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiuW_MQGar0qv1yWV8rc_YJJ801HfsyImtJQlmjJdXDfDNRyAihGDPpfLm49C7g5TlFEmA8TDf436NqIwDqR3Ppl0ZZZQTER9NYPJgCs0OPoQJvRSFdmXcgdQXpLIufRPAa7y84vSLvT7SSwKNHff8phkmGrwwG5NXXd1dJ2TW1gTfnnKur67bF9I8nBu3h/s1600/white%20coffee-zhino.jpg"},
                        {name:"Tea Latte", desc:"Mezcla de té y leche con Ganoderma.", price:"S/ 97", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjk_6XV2FzRWST7zE781ZdDMMtUGjl25yqRz1qrN2nQz7y3dPI4RZP5qK2dgZGQapOZ0uMb024ZU3U7lxsHpuYRGD2y3l5wi9orPorI8RR3_SjHCYQnWG_O0tGveCjPF8M0wW7MK7YokzN65uFqDatran-FQPZkVLwLla8q6-bx-OnaCzQxwTQ6jr3adToy/s1600/Tea-Latte-dxn.jpg"},
                        {name:"Spirulina Cereal", desc:"Superalimento con alto contenido de proteínas.", price:"S/ 168", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiypLVtU7BBwmZXizJe6nt1IYw7x487yIaU7UjQTwvkGxTzHCRkYZ6ssLtrECdbMTfFfkL8ZFC19bKqa3zV6Nct1An-rS-eTrkgByp51gY2BkHJjB4gDrRWKVjtucuDNKHh2Cr1tXInGOlsrjj1uFjvmK-9Bwd91IbtqYD9xi9c6ZL1UByM_Ja-qNSd54O7/s1600/Spirulina-Cereal-dxn.jpg"},
                        {name:"Cordyceps Cereal", desc:"Mejora energía, pulmones y rendimiento físico.", price:"S/ 194", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4RxDX3OwmBjfzFabtPXdfrp5KGkLq4SaIWszQdRxVUIj-0rmiWkDR2pPUTjE6s-rhTCPcxjFrRh6qZmWkYZsWXI3mDM-jFu334MSJBUyUEkCvn35FI7Q4XsiHN1MI7K-vWn5d_cAAOxTfU6q70-I5ZpJs3G6iAKaeIQCWOSFT2BkmCLd2_xqOg8VkphuL/s1600/Cordyceps-cerealdxn.jpg"},
                        {name:"Morinzhi", desc:"Jugo de fruta de noni y Roselle.", price:"S/ 81", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0ythd0T-4qGPLpvup2qc8KgEMderiS3l6wGBcDi68d7SFCj63kLbnVKhrkmp_0O_M-uLk98sqyLvZOlaHjAXoV2NimIfRhCb6fNZ_Pj2z3NTQtD7f1EzE1xolXT_3DrnD5a6OmrnV2wmXAxiCqpUf7PxOgkAt9m2ZaBTr05gmG32i2VhKuH1bodAZetk1/s1600/Morinzhi-dxn.jpg"},
                        {name:"Morinzyme", desc:"Jugo fermentado de noni.", price:"S/ 81", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhATnHv34ZdzPwKQIjTUxUNBD2pzXoCQ2ATL5zHOnFFM9SscCQWklOiup_CnyqegMkm_CslmCdLMIiZN6lzlIsJMDeGCq28I1emsQzrk3g2FJUAFl1Svh8fELKkpj_1Ds4pdevYalsujGSP7qE_tIDC6BP-B7JgHgwG3D7ougiqEDpL1eToQqM-hx6rckMr/s1600/Morinzyme-dxn.jpg"},
                        {name:"Zhi Mint Plus", desc:"Caramelos refrescantes con menta y Ganoderma.", price:"S/ 163", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgg-5ZjnNsZRtLNAHeLyOOxoVeKEq1-HY7yAFDt5snVzgJLMxYqGtd1-Mw8PuYbYN6B9u_H_H67iH2G2sfVygQqVIdDo0WZQxpqSDRssakTmFXSrzlqGf5-tjqiuEkII9lp8877o41cHmeEY_PMgxLGuSBwwIO-AnwD3B1ng07GkQcEh7gLUh2xuGAmRZw8/s1600/zhi-mint-plus.jpg"},
                        {name:"Oocha", desc:"Premezcla de té Oolong.", price:"S/ 97", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLxLN1jBhWsi6m7iLWLPDFh9G7i8RCj4CMBgAOiiN3G2-UjbYxAQDpvdp3QZp8LA81QbyEsaog8oTnAoFYC5HC3mYX6Dsajoi0UazqR8wqDQNQdPB26GwaJA7aqDZYE3r2zWfEUNlbVaWpf3PhMFBByiW8DZTzDul5RBwC1mdVhHWdX_TZiC3-ui-MyMHe/s1600/dxn-oocha.jpg"},
                        {name:"Lemonzhi", desc:"Bebida saludable de limón y té con Ganoderma.", price:"S/ 64", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK5SgphJzjwysL6p2VgK6x_XFkQnMCk7Wb-wMGpaCdCqyofUOC4T2wE7zqrk1s0Tm6jf7cZ4hOm3jMKGHyAR9uRO7sGTmS-gb5TKbuHCtSb14jyYoiYJZmMGlq4mRZsVSO0M2Dw6zlf5L3sKT8jFt2nHLvOLpSsnjV7AQxjHaDfhakWlonJ99S9SrRuqWa/s1600/dxn_lemonzhi.jpg"}
                      ]
                    };

                    const grid = document.getElementById("storeGrid");
                  products.alimentosYBebidas.forEach(p => {
                    grid.innerHTML += `
                      <div class="store-item">
                        <img src="${p.img}" alt="${p.name}">
                        <h4>${p.name}</h4>
                        <p>${p.desc}</p>
                        <div class="price">${p.price}</div>
                        <a class="shop-whatsapp" target="_blank"
                           href="https://wa.me/51962080861?text=Hola,%20quiero%20comprar%20${encodeURIComponent(p.name)}%20(${encodeURIComponent(p.price)})">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""> Comprar
                        </a>
                      </div>`;
                  });

        const btn = document.getElementById("openStoreBtn");
        const modal = document.getElementById("storeModal");
        const close = modal.querySelector(".close-store");

        btn.onclick = ()=>modal.style.display="flex";
        close.onclick = ()=>modal.style.display="none";
        window.onclick = e=>{ if(e.target===modal) modal.style.display="none"; };

        // --- Flotante escritorio
        let offsetTopOriginal = btn.getBoundingClientRect().top + window.scrollY;
        function handleScroll(){
          if(window.innerWidth > 768){
            // Escritorio: cuando paso el botón, se hace flotante
            if(window.scrollY > offsetTopOriginal) btn.classList.add("floating");
            else btn.classList.remove("floating");
          } else {
            // Móviles: aparece solo al bajar un poco
            if(window.scrollY > 50) btn.classList.remove("hidden");
            else btn.classList.add("hidden");
          }
        }

        // Detectar scroll y resize
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", ()=>{
          offsetTopOriginal = btn.getBoundingClientRect().top + window.scrollY;
          handleScroll();
        });
        handleScroll();
              }
