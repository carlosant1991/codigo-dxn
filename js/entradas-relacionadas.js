(function(){

function ready(fn){
  if(document.readyState !== "loading"){
    fn();
  }else{
    document.addEventListener("DOMContentLoaded",fn);
  }
}


ready(function(){

  var body=document.querySelector(".post-body");
  if(!body) return;


  var labels=document.querySelectorAll(".post-labels .label-link");
  if(!labels.length) return;


  var tag=labels[0].textContent.trim();


  var closed=false;
  var shown=false;


  // Guardar estado solo para esta entrada
  var storageKey="dxnRelatedClosed_"+location.pathname;



  // Si ya fue cerrado en esta entrada no cargar

  if(sessionStorage.getItem(storageKey)){
    return;
  }



  // Crear ventana flotante

  var box=document.createElement("div");

  box.id="dxn-related-float";

  box.style.display="none";


  box.innerHTML=`

    <div class="dxn-rel-header">

      <span>📌 También te puede interesar</span>

      <button id="dxn-close" aria-label="Cerrar">
        ✖
      </button>

    </div>


    <div id="dxn-related-list"></div>

  `;


  document.body.appendChild(box);





  // Callback de Blogger

  window.dxnRelCallback=function(json){


    if(!json.feed || !json.feed.entry){
      return;
    }


    var list=document.getElementById("dxn-related-list");

    var current=location.href.split("?")[0];

    var items=[];



    json.feed.entry.forEach(function(post){


      var url="";
      var img="https://via.placeholder.com/120x120?text=DXN";



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



    if(!items.length){
      return;
    }



    items.sort(function(){

      return Math.random()-0.5;

    });



    items=items.slice(0,3);



    var html="";



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





    // Detectar llegada al final real del post-body

    window.addEventListener("scroll",function(){


      if(closed || shown){
        return;
      }



      var postBottom =
      body.offsetTop + body.offsetHeight;



      var currentPosition =
      window.scrollY + window.innerHeight;



      if(currentPosition >= postBottom - 50){


        box.style.display="block";

        shown=true;


      }



    });


  };





  // Cargar entradas relacionadas

  var s=document.createElement("script");


  s.src="/feeds/posts/default/-/"
  +encodeURIComponent(tag)
  +"?alt=json-in-script&callback=dxnRelCallback&max-results=8";


  document.body.appendChild(s);





  // Cerrar definitivamente en esta entrada

  document.addEventListener("click",function(e){


    if(e.target.id==="dxn-close"){


      closed=true;


      box.style.display="none";


      sessionStorage.setItem(
        storageKey,
        "true"
      );


    }


  });



});


})();
