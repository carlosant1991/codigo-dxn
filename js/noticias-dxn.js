(function(){
'use strict';

var ticker=document.getElementById('dxn-news-ticker');
var track=document.getElementById('dxn-news-track');

if(!ticker||!track)return;

var noticiasURL='https://cdn.jsdelivr.net/gh/carlosant1991/codigo-dxn@main/noticias.json';

function mostrarMensaje(texto){
  track.innerHTML=
    '<span class="dxn-news-item">'+
    '<span class="dxn-news-title">'+texto+'</span>'+
    '</span>';

  track.style.animation='none';
}

function mostrarNoticias(noticias){

  if(!noticias||!noticias.length){
    mostrarMensaje('No hay noticias actualizadas');
    return;
  }

  var html='';

  noticias.forEach(function(noticia){

    html+=
      '<a class="dxn-news-item" href="'+
      noticia.url+
      '" target="_self">'+

      '<span class="dxn-news-type">['+
      noticia.tipo+
      ']</span>'+

      '<span class="dxn-news-title">'+
      noticia.titulo+
      '</span>'+

      (noticia.fecha?
      '<span class="dxn-news-date">· '+noticia.fecha+'</span>':
      '')+

      '</a>';

  });

  track.innerHTML=html+html;

  track.style.animation='';

}

function cargarNoticias(){

  fetch(noticiasURL+'?v='+Date.now(),{
    cache:'no-store'
  })

  .then(function(response){

    if(!response.ok){
      throw new Error('No se pudo cargar noticias.json');
    }

    return response.json();

  })

  .then(function(data){

    var noticias=data.noticias||[];

    mostrarNoticias(noticias);

  })

  .catch(function(error){

    console.warn('Noticias DXN:',error);

    mostrarMensaje('No hay noticias actualizadas');

  });

}

function detectarPais(){

  return fetch('https://ipapi.co/json/',{
    cache:'no-store'
  })

  .then(function(response){

    if(!response.ok){
      throw new Error('No se pudo detectar el país');
    }

    return response.json();

  })

  .then(function(data){

    return data.country_code||'';

  });

}

function iniciar(){

  detectarPais()

  .then(function(pais){

    if(pais==='PE'){

      cargarNoticias();

    }else{

      mostrarMensaje('No hay noticias disponibles');

    }

  })

  .catch(function(){

    mostrarMensaje('No hay noticias disponibles');

  });

}

track.addEventListener('touchstart',function(){

  track.style.animationPlayState='paused';

},{passive:true});

track.addEventListener('touchend',function(){

  track.style.animationPlayState='';

},{passive:true});

iniciar();

})();
