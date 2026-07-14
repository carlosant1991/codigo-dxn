(function(){

function ready(fn){
 if(document.readyState!="loading"){
   fn();
 }else{
   document.addEventListener("DOMContentLoaded",fn);
 }
}


ready(function(){

const body=document.querySelector(".post-body");
if(!body)return;


const labels=document.querySelectorAll(".post-labels .label-link");
if(!labels.length)return;


const tag=labels[0].textContent.trim();

let closed=false;


const box=document.createElement("div");

box.id="dxn-related-float";

box.style.display="none";

box.innerHTML=`
<div class="dxn-rel-header">
<span>📌 También te puede interesar</span>
<button id="dxn-close">✖</button>
</div>

<div id="dxn-related-list"></div>
`;


document.body.appendChild(box);



window.dxnRelCallback=function(json){

if(!json.feed || !json.feed.entry)return;


const list=document.getElementById("dxn-related-list");

const current=location.href.split("?")[0];

let items=[];


json.feed.entry.forEach(post=>{


let url="";

let img="https://via.placeholder.com/120x120?text=DXN";


post.link.forEach(l=>{
 if(l.rel==="alternate"){
   url=l.href;
 }
});


if(url && url!==current){


if(post.media$thumbnail){

 img=post.media$thumbnail.url.replace(
 "s72-c",
 "s160"
 );

}


items.push({

t:post.title.$t,
u:url,
i:img

});


}


});


if(!items.length)return;


items.sort(()=>Math.random()-.5);

items=items.slice(0,3);



let html="";


items.forEach(it=>{

html+=`

<a class="dxn-rel-item" href="${it.u}">

<img class="dxn-rel-thumb"
src="${it.i}"
loading="lazy"
alt="${it.t}">

<span class="dxn-rel-title">
${it.t}
</span>

</a>

`;

});


list.innerHTML=html;



const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting && !closed){

box.style.display="block";

observer.disconnect();

}

});


},{
threshold:0
});


observer.observe(body);


};



const script=document.createElement("script");

script.src="/feeds/posts/default/-/"
+encodeURIComponent(tag)
+"?alt=json-in-script&callback=dxnRelCallback&max-results=8";


document.body.appendChild(script);



document.getElementById("dxn-close")
.onclick=function(){

closed=true;

box.style.display="none";

};


});


})();
