(function(){
"use strict";

function iniciarLector(){
  if(!("speechSynthesis" in window))return;

  var post=document.querySelector(".post-body.post-content");
  if(!post||document.getElementById("lectorArticulo"))return;

  var caja=document.createElement("div");
  caja.id="lectorArticulo";
  caja.innerHTML=
    '<button type="button" id="lectorPlay" aria-label="Escuchar artículo">▶ <span>ESCUCHAR ARTÍCULO</span></button>'+
    '<div class="lector-controles" hidden>'+
      '<button type="button" id="lectorPause" aria-label="Pausar lectura">⏸</button>'+
      '<button type="button" id="lectorStop" aria-label="Detener lectura">■</button>'+
      '<select id="lectorRate" aria-label="Velocidad de lectura">'+
        '<option value="0.8">0.8x</option>'+
        '<option value="1" selected>1x</option>'+
        '<option value="1.2">1.2x</option>'+
        '<option value="1.5">1.5x</option>'+
      '</select>'+
      '<span id="lectorEstado" aria-live="polite"></span>'+
    '</div>';

  post.parentNode.insertBefore(caja,post);

  var play=document.getElementById("lectorPlay"),
      controles=caja.querySelector(".lector-controles"),
      pause=document.getElementById("lectorPause"),
      stop=document.getElementById("lectorStop"),
      rate=document.getElementById("lectorRate"),
      estado=document.getElementById("lectorEstado"),
      synth=window.speechSynthesis,
      voz=null,
      fragmentos=[],
      indice=0,
      detenido=true;

  function obtenerTexto(){
    var clon=post.cloneNode(true);

    clon.querySelectorAll(
      "script,style,noscript,iframe,video,audio,button,input,textarea,select,form,"+
      "[aria-hidden='true'],.comments,.comentarios,.post-share-buttons,"+
      ".share-buttons,.social-share,.related-posts,.entradas-relacionadas"
    ).forEach(function(el){
      el.remove();
    });

    return(clon.innerText||clon.textContent||"")
      .replace(/\s+/g," ")
      .replace(/[\u200B-\u200D\uFEFF]/g,"")
      .trim();
  }

  function dividirTexto(texto){
    var max=1600,
        partes=[],
        actual="",
        oraciones=texto.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g)||[];

    oraciones.forEach(function(oracion){
      oracion=oracion.trim();
      if(!oracion)return;

      if((actual+" "+oracion).trim().length>max){
        if(actual)partes.push(actual.trim());
        actual=oracion;
      }else{
        actual+=(actual?" ":"")+oracion;
      }
    });

    if(actual)partes.push(actual.trim());

    return partes;
  }

  function detectarIdioma(texto){
    var palabras={
      es:["el","la","los","las","que","de","para","con","una","este","esta","del","por","como","sobre","entre","también"],
      en:["the","and","that","for","with","this","from","are","you","is","of","to","how","was","about","between","also"],
      pt:["o","a","os","as","que","de","para","com","uma","este","esta","do","por","como","sobre","entre","também"],
      fr:["le","la","les","des","que","pour","avec","une","est","dans","du","et","comme","sur","entre","aussi"],
      de:["der","die","das","und","für","mit","eine","ist","den","von","zu","wie","über","zwischen","auch"],
      it:["il","la","gli","che","per","con","una","questo","sono","del","di","come","sul","tra","anche"]
    };

    var limpio=texto.toLowerCase(),
        resultado="",
        mayor=0;

    Object.keys(palabras).forEach(function(idioma){
      var puntos=0;

      palabras[idioma].forEach(function(palabra){
        var coincidencias=limpio.match(
          new RegExp("\\b"+palabra+"\\b","g")
        );

        if(coincidencias)puntos+=coincidencias.length;
      });

      if(puntos>mayor){
        mayor=puntos;
        resultado=idioma;
      }
    });

    return mayor>=3?resultado:"";
  }

  function idiomaNavegador(){
    var idioma=(navigator.language||"").toLowerCase();

    if(!idioma)return"";

    idioma=idioma.split("-")[0];

    return["es","en","pt","fr","de","it"].indexOf(idioma)>-1
      ?idioma
      :"";
  }

  function seleccionarVoz(idioma){
    var voces=synth.getVoices();

    if(!voces.length||!idioma)return null;

    var exactas=voces.filter(function(v){
      return v.lang&&v.lang.toLowerCase()===idioma;
    });

    if(exactas.length){
      return exactas.find(function(v){
        return v.default;
      })||exactas[0];
    }

    var compatibles=voces.filter(function(v){
      return v.lang&&
        v.lang.toLowerCase().split("-")[0]===idioma;
    });

    if(compatibles.length){
      return compatibles.find(function(v){
        return v.default;
      })||compatibles[0];
    }

    return null;
  }

  function cargarVoz(){
    var texto=obtenerTexto(),
        idioma=detectarIdioma(texto);

    if(!idioma){
      idioma=idiomaNavegador();
    }

    if(!idioma){
      voz=null;
      return false;
    }

    voz=seleccionarVoz(idioma);

    return!!voz;
  }

  function preparar(){
    var texto=obtenerTexto();

    if(!texto){
      estado.textContent="Sin texto";
      return false;
    }

    fragmentos=dividirTexto(texto);
    indice=0;

    cargarVoz();

    if(!voz){
      estado.textContent="No hay una voz disponible para este idioma";
      return false;
    }

    return fragmentos.length>0;
  }

  function reproducirFragmento(){
    if(detenido)return;

    if(indice>=fragmentos.length){
      estado.textContent="Finalizado";
      indice=0;
      detenido=true;
      play.querySelector("span").textContent="ESCUCHAR DE NUEVO";
      controles.hidden=true;
      return;
    }

    var lectura=new SpeechSynthesisUtterance(fragmentos[indice]);

    if(voz)lectura.voice=voz;

    lectura.rate=parseFloat(rate.value);
    lectura.pitch=1;
    lectura.volume=1;

    estado.textContent="Leyendo...";

    lectura.onend=function(){
      indice++;
      reproducirFragmento();
    };

    lectura.onerror=function(){
      if(!detenido){
        indice++;
        reproducirFragmento();
      }
    };

    synth.speak(lectura);
  }

  play.addEventListener("click",function(){
    if(synth.paused){
      detenido=false;
      synth.resume();
      estado.textContent="Leyendo...";
      play.querySelector("span").textContent="REPRODUCIENDO";
      return;
    }

    if(synth.speaking)return;

    if(!fragmentos.length&&!preparar())return;

    detenido=false;
    controles.hidden=false;
    play.querySelector("span").textContent="REPRODUCIENDO";
    reproducirFragmento();
  });

  pause.addEventListener("click",function(){
    if(synth.speaking&&!synth.paused){
      synth.pause();
      estado.textContent="Pausado";
      play.querySelector("span").textContent="CONTINUAR";
    }else if(synth.paused){
      synth.resume();
      estado.textContent="Leyendo...";
      play.querySelector("span").textContent="REPRODUCIENDO";
    }
  });

  stop.addEventListener("click",function(){
    detenido=true;
    synth.cancel();
    indice=0;
    estado.textContent="";
    play.querySelector("span").textContent="ESCUCHAR DE NUEVO";
    controles.hidden=true;
  });

  rate.addEventListener("change",function(){
    if(!synth.speaking)return;

    var pausado=synth.paused;

    detenido=true;
    synth.cancel();
    detenido=false;

    if(!pausado)reproducirFragmento();
  });

  if("onvoiceschanged" in synth){
    synth.onvoiceschanged=function(){
      if(!voz)cargarVoz();
    };
  }

  cargarVoz();
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",iniciarLector);
}else{
  iniciarLector();
}

})();
