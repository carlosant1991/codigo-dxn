(function(){
  const cont=document.querySelector(".cookie-container");
  if(!cont)return;

  const btn=cont.querySelector("button");

  if(!localStorage.getItem("cookies_accepted")){
    cont.classList.add("active");
  }

  btn?.addEventListener("click",()=>{
    localStorage.setItem("cookies_accepted","true");
    cont.classList.remove("active");
  });
})();
