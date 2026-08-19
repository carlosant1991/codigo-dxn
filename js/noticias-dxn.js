(function(){
'use strict';

var track=document.getElementById('dxn-news-track');
if(!track)return;

var items=track.querySelectorAll('.dxn-news-item');
if(!items.length)return;

var html=track.innerHTML;
track.insertAdjacentHTML('beforeend',html);

track.addEventListener('touchstart',function(){
track.style.animationPlayState='paused';
},{passive:true});

track.addEventListener('touchend',function(){
track.style.animationPlayState='';
},{passive:true});

})();
