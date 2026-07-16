document.addEventListener("click",function(e){
  const enlace=e.target.closest('a[href="#"]');
  if(enlace)e.preventDefault();
});
