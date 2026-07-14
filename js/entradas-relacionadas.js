(function(){

function ready(fn){
  if(document.readyState!="loading"){
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


  var box=document.createElement("div");

  box.id="dxn-related-float";

  box.style.display="none";


  box.innerHTML=`

    <div class="dxn-rel-header">
      <span>📌 También te puede interesar</span>
      <button id="dxn-close">✖</button>
    </div>

    <div id="dxn-related-list"></div>

  `;


  document.body.appendChild(box);



  window.dxnRelCallback=function(json){

    if(!json.feed || !json.feed.entry) return;


    var list=document.getElementById("dxn-related-list"),
        current=location.href.split("?")[0],
        items=[];



    json.feed.entry.forEach(function(post){

      var url="";
      var img="https://via.placeholder.com/120x120?text=DXN";


      post.link.forEach(function(l){

        if(l.rel=="alternate"){
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



    if(items.length===0) return;



    items.sort(function(){

      return 0.5-Math.random();

    });



    items=items.slice(0,3);



    var html="";


    items.forEach(function(it){

      html+=`

      <a class="dxn-rel-item" href="${it.u}">

        <img 
        class="dxn-rel-thumb"
        src="${it.i}"
        loading="lazy">

        <span class="dxn-rel-title">
          ${it.t}
        </span>

      </a>

      `;

    });



    list.innerHTML=html;



    window.addEventListener("scroll",function(){

      if(closed || shown) return;


      if(body.getBoundingClientRect().bottom < window.innerHeight){

        box.style.display="block";

        shown=true;

      }


    });


  };



  var s=document.createElement("script");


  s.src="/feeds/posts/default/-/"
  +encodeURIComponent(tag)
  +"?alt=json-in-script&callback=dxnRelCallback&max-results=8";


  document.body.appendChild(s);



  document.addEventListener("click",function(e){

    if(e.target.id=="dxn-close"){

      closed=true;

      box.style.display="none";

    }

  });


});


})();
