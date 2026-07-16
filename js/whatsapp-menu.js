document.addEventListener("DOMContentLoaded",()=>{
  const btn=document.getElementById("chat-dxn-btn");
  const menu=document.getElementById("chat-dxn-menu");

  if(!btn||!menu)return;

  btn.addEventListener("click",()=>{
    menu.style.display=
      menu.style.display==="block"?"none":"block";
  });

  document.addEventListener("click",(e)=>{
    if(!btn.contains(e.target)&&!menu.contains(e.target)){
      menu.style.display="none";
    }
  });
});
