(function(){

function ready(fn){
  if(document.readyState!="loading"){
    fn();
  }else{
    document.addEventListener("DOMContentLoaded",fn);
  }
}


ready(function(){

  const body=document.querySelector(".post-body");
  if(!body)return;


  const labels=document.querySelectorAll(".post-labels .label-link");
  if(!labels.length)return;


  const tag=labels[0].textContent.trim();

  let closed=false;



  // Crear caja flotante
  const box=document.createElement("div");

  box.id="dxn-related-float";

  box.style.display="none";

  box.innerHTML=`
    <div class="dxn-rel-header">
      <span>📌 También te puede interesar</span>
      <button id="dxn-close" aria-label="Cerrar">✖</button>
    </div>

    <div id="dxn-related-list"></div>
  `;


  document.body.appendChild(box);



  // Cargar entradas relacionadas
  window.dxnRelCallback=function(json){

    if(!json.feed || !json.feed.entry)return;


    const list=document.getElementById("dxn-related-list");

    const current=location.href.split("?")[0];

    let items=[];


    json.feed.entry.forEach(function(post){


      let url="";
      let img="https://via.placeholder.com/120x120?text=DXN";


      post.link.forEach(function(l){

        if(l.rel==="alternate"){
          url=l.href;
        }

      });



      if(url && url!==current){


        if(post.media$thumbnail){

          img=post.media$thumbnail.url.replace(
            "s72-c",
            "s160"
          );

        }


        items.push({

          t:post.title.$t,
          u:url,
          i:img

        });


      }


    });



    if(!items.length)return;



    // Orden aleatorio
    items.sort(function(){

      return Math.random()-0.5;

    });


    // Mostrar solo 3
    items=items.slice(0,3);



    let html="";


    items.forEach(function(item){


      html+=`

      <a class="dxn-rel-item" href="${item.u}">

        <img 
        class="dxn-rel-thumb"
        src="${item.i}"
        loading="lazy"
        alt="${item.t}">

        <span class="dxn-rel-title">
        ${item.t}
        </span>

      </a>

      `;


    });



    list.innerHTML=html;



    /*
       Mostrar cuando llega al FINAL
       de la publicación
    */


    const marker=document.createElement("div");

    marker.id="dxn-related-trigger";

    body.appendChild(marker);



    const observer=new IntersectionObserver(function(entries){

      entries.forEach(function(entry){

        if(entry.isIntersecting && !closed){

          box.style.display="block";

          observer.disconnect();

        }

      });


    },{
      threshold:0.1
    });



    observer.observe(marker);



  };





  // Solicitud de entradas relacionadas
  const script=document.createElement("script");


  script.src="/feeds/posts/default/-/"
  +encodeURIComponent(tag)
  +"?alt=json-in-script&callback=dxnRelCallback&max-results=8";


  document.body.appendChild(script);





  // Botón cerrar

  document.addEventListener("click",function(e){

    if(e.target.id==="dxn-close"){

      closed=true;

      box.style.display="none";

    }

  });



});


})();
