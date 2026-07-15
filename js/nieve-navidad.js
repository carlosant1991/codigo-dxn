(function(){
  if(new Date().getMonth()!==11) return;

  const b=document.body;

  function n(){
    const s=document.createElement("div"),
          t=2+Math.random()*3;

    s.style.cssText=
      "position:fixed;top:-10px;left:"+Math.random()*100+
      "vw;width:"+t+"px;height:"+t+
      "px;background:#fff;border-radius:50%;box-shadow:0 0 4px rgba(0,0,0,.15);pointer-events:none;z-index:9999;transition:transform 7s linear";

    b.appendChild(s);

    setTimeout(()=>{s.style.transform="translateY(100vh)"},20);
    setTimeout(()=>{s.remove()},7100);
  }

  setInterval(n,300);

})();
