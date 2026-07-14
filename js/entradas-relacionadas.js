(function(){

  function ready(fn){
    if(document.readyState!="loading"){ fn(); }
    else document.addEventListener("DOMContentLoaded",fn);
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

    var css=document.createElement("style");
    css.innerHTML=`
      #dxn-related-float{position:fixed;left:20px;bottom:65px;width:320px;max-width:92%;background:#fff;border-radius:14px;box-shadow:0 6px 22px rgba(0,0,0,.22);border:1px solid rgba(0,51,102,.12);z-index:999999;font-family:inherit;animation:dxnFadeUp .35s ease}@keyframes dxnFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}.dxn-rel-header{background:#003366;color:#fff;padding:10px 12px;border-radius:14px 14px 0 0;display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:14px;letter-spacing:.2px}#dxn-close{background:none;border:0;color:#fff;font-size:17px;cursor:pointer;transition:.2s}#dxn-close:hover{opacity:.7}#dxn-related-list{padding:10px;display:flex;flex-direction:column;gap:8px}.dxn-rel-item{display:flex;gap:8px;align-items:center;text-decoration:none;color:#333;border-radius:8px;padding:6px;transition:.2s ease}.dxn-rel-item:hover{background:#f2f6fb;transform:translateX(2px)}.dxn-rel-thumb{width:60px;height:60px;border-radius:6px;object-fit:cover;flex-shrink:0}.dxn-rel-title{font-size:13px;line-height:1.3;font-weight:600;color:#003366}.dxn-rel-item:hover .dxn-rel-title{color:#0055aa}@media(max-width:600px){#dxn-related-float{left:50%;transform:translateX(-50%);bottom:90px;width:92%}}
    `;
    document.head.appendChild(css);

    window.dxnRelCallback=function(json){
      if(!json.feed||!json.feed.entry) return;

      var list=document.getElementById("dxn-related-list"),
          current=location.href.split("?")[0],
          items=[];

      json.feed.entry.forEach(function(post){
        var url="", img="https://via.placeholder.com/120x120?text=DXN";
        post.link.forEach(function(l){
          if(l.rel=="alternate") url=l.href;
        });

        if(url && url!==current){
          if(post.media$thumbnail)
            img=post.media$thumbnail.url.replace("s72-c","s160");

          items.push({t:post.title.$t,u:url,i:img});
        }
      });

      if(items.length===0) return;

      items.sort(function(){return 0.5-Math.random()});
      items=items.slice(0,3);

      var html="";
      items.forEach(function(it){
        html+=`
          <a class="dxn-rel-item" href="${it.u}">
            <img class="dxn-rel-thumb" src="${it.i}" loading="lazy">
            <span class="dxn-rel-title">${it.t}</span>
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
    s.src="/feeds/posts/default/-/"+encodeURIComponent(tag)+"?alt=json-in-script&callback=dxnRelCallback&max-results=8";
    document.body.appendChild(s);

    document.addEventListener("click",function(e){
      if(e.target.id=="dxn-close"){
        closed=true;
        box.style.display="none";
      }
    });

  });

})();
