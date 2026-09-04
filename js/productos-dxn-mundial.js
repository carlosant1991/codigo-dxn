(function(){

  const LINKS={
    latam:"https://www.dxn2ulatam.com/product/?lang=es-419",
    europa:"https://www.dxn2u.eu/product/?lang=en",
    asia:"https://www.dxn2uasia.com/product/?lang=en",
    africa:"https://www.dxn2uafrica.com/product/?lang=en",
    oceania:"https://www.dxnaus.com.au/product/index.php",
    usa:"https://www.dxnusa.com/product/?lang=en",
    canada:"https://dxncanada.ca/products/",
    medio_oriente:"https://www.dxnarabia.com/product/index.php?lang=en",
    turquia:"https://www.dxnturkey.com/product/?lang=tr"
  };

  const REGIONES={
    latam:["AR","BO","BR","CL","CO","CR","CU","DO","EC","GT","HN","MX","NI","PA","PE","PY","SV","UY","VE"],
    europa:["AL","AT","BE","BG","BY","CH","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GR","HR","HU","IE","IS","IT","LT","LU","LV","MD","MK","MT","NL","NO","PL","PT","RO","RS","SE","SI","SK","UA"],
    asia:["CN","IN","ID","JP","KR","MY","PH","SG","TH","VN","BD","PK","LK","NP","KH","LA","MM"],
    africa:["DZ","AO","BJ","BW","CM","CI","EG","ET","GH","KE","MA","NG","RW","SN","TN","TZ","UG","ZA","ZM","ZW"],
    oceania:["AU","NZ","PG","FJ"],
    medio_oriente:["AE","SA","QA","KW","BH","OM","JO","IQ","IL","LB","SY","YE"]
  };

  function detectarRegion(c){
    if(c==="US") return "usa";
    if(c==="CA") return "canada";
    if(c==="TR") return "turquia";
    if(REGIONES.latam.includes(c)) return "latam";
    if(REGIONES.europa.includes(c)) return "europa";
    if(REGIONES.asia.includes(c)) return "asia";
    if(REGIONES.africa.includes(c)) return "africa";
    if(REGIONES.oceania.includes(c)) return "oceania";
    if(REGIONES.medio_oriente.includes(c)) return "medio_oriente";
    return "asia";
  }

  function mostrar(codigoPais,nombrePais){
    const r=detectarRegion(codigoPais);
    document.getElementById("dxn-region-text").innerHTML=
  `Puedes ver los Productos Disponibles en <strong>${nombrePais}</strong> dando clic en:<br><br>
   <a href="${LINKS[r]}" target="_blank" class="btn color-azuloscuro" style="margin-top:6px">VER PRODUCTOS</a>`;
    document.getElementById("dxn-flag").innerHTML=
      `<img src="https://flagcdn.com/w40/${codigoPais.toLowerCase()}.png" style="border-radius:4px">`;
    document.getElementById("dxn-region-box").style.display="block";
  }

  /* IPINFO → usa fallback automático con ipapi para obtener el nombre completo */
  fetch("https://ipinfo.io/json?token=ff207427979a44")
    .then(r=>r.json())
    .then(d=>{
      fetch("https://ipapi.co/json/")
        .then(r=>r.json())
        .then(p=>mostrar(d.country,p.country_name));
    })
    .catch(()=>{
      fetch("https://ipapi.co/json/")
        .then(r=>r.json())
        .then(p=>mostrar(p.country_code,p.country_name));
    });

  })();
