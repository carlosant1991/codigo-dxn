(function(){
  'use strict';

  var track=document.getElementById('dxn-news-track');
  if(!track)return;

  var items=track.innerHTML;
  track.innerHTML=items+items;
})();
