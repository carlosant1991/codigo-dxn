function faq(e){
  let d=e.nextElementSibling,
      a=e.classList.contains("a");

  document.querySelectorAll("#acordeon div").forEach(x=>x.style.maxHeight=null);

  document.querySelectorAll("#acordeon h3").forEach(x=>{
    x.classList.remove("a");
    x.setAttribute("aria-expanded","false");
  });

  if(!a){
    d.style.maxHeight=d.scrollHeight+"px";
    e.classList.add("a");
    e.setAttribute("aria-expanded","true");
  }
}
