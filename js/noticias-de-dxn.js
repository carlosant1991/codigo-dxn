(function(){
'use strict';

var ticker=document.getElementById('dxn-news-ticker');
var track=document.getElementById('dxn-news-track');

if(!ticker||!track)return;

var noticiasURL='https://cdn.jsdelivr.net/gh/carlosant1991/codigo-dxn@main/noticias.json';

function mostrarMensaje(texto){

  track.innerHTML=
    '<span class="dxn-news-item">'+
    '<span class="dxn-news-title">'+
    texto+
    '</span>'+
    '</span>';

  track.style.animation='none';

}

function escaparHTML(texto){

  return String(texto||'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');

}

function mostrarNoticias(noticias){

  if(!noticias.length){

    mostrarMensaje('No hay noticias disponibles');

    return;

  }

  var html='';

  noticias.forEach(function(noticia){

    html+=
      '<a class="dxn-news-item" href="'+
      escaparHTML(noticia.url)+
      '" target="_blank" rel="noopener noreferrer">'+

      '<span class="dxn-news-type">['+
      escaparHTML(noticia.tipo)+
      ']</span>'+

      '<span class="dxn-news-title">'+
      escaparHTML(noticia.titulo)+
      '</span>'+

      (noticia.fecha?
        '<span class="dxn-news-date"> · '+
        escaparHTML(noticia.fecha)+
        '</span>'
      :'')+

      '</a>';

  });

  /*
   * Duplicamos las noticias para conseguir
   * un desplazamiento horizontal continuo.
   */

  track.innerHTML=html+html;

  track.style.animation='';

}

function cargarNoticias(pais){

  fetch(noticiasURL+'?v='+Date.now(),{
    cache:'no-store'
  })

  .then(function(response){

    if(!response.ok){

      throw new Error(
        'No se pudo cargar noticias.json'
      );

    }

    return response.json();

  })

  .then(function(data){

    var todas=Array.isArray(data.noticias)
      ?data.noticias
      :[];

    /*
     * Noticias específicas del país.
     */

    var noticiasPais=todas.filter(function(noticia){

      return String(noticia.pais||'')
        .toUpperCase()===pais;

    });

    /*
     * Noticias globales de DXN.
     */

    var noticiasGlobales=todas.filter(function(noticia){

      return String(noticia.pais||'')
        .toUpperCase()==='GLOBAL';

    });

    /*
     * Primero las noticias locales,
     * después las globales.
     */

    var noticias=noticiasPais.concat(
      noticiasGlobales
    );

    /*
     * Evitar duplicados.
     */

    var vistos={};

    noticias=noticias.filter(function(noticia){

      var clave=
        String(noticia.titulo||'')+
        '|' +
        String(noticia.url||'');

      if(vistos[clave])return false;

      vistos[clave]=true;

      return true;

    });

    /*
     * Máximo 12 noticias.
     */

    noticias=noticias.slice(0,12);

    mostrarNoticias(noticias);

  })

  .catch(function(error){

    console.warn(
      'Noticias DXN:',
      error
    );

    mostrarMensaje(
      'No hay noticias disponibles'
    );

  });

}

function detectarPais(){

  return fetch(
    'https://ipapi.co/json/?v='+Date.now(),
    {
      cache:'no-store'
    }
  )

  .then(function(response){

    if(!response.ok){

      throw new Error(
        'No se pudo detectar el país'
      );

    }

    return response.json();

  })

  .then(function(data){

    return String(
      data.country_code||''
    ).toUpperCase();

  });

}

function iniciar(){

  detectarPais()

  .then(function(pais){

    if(!pais){

      mostrarMensaje(
        'No hay noticias disponibles'
      );

      return;

    }

    cargarNoticias(pais);

  })

  .catch(function(error){

    console.warn(
      'Detección de país:',
      error
    );

    mostrarMensaje(
      'No hay noticias disponibles'
    );

  });

}

iniciar();

})();
