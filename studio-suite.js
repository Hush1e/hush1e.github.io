
document.querySelectorAll('.studio-contents a').forEach(a=>a.addEventListener('click',()=>{
 const target=document.getElementById(a.hash.slice(1));
 if(target){for(let p=target.parentElement;p;p=p.parentElement){if(p.tagName==='DETAILS')p.open=true;} target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
 if(matchMedia('(max-width:760px)').matches)a.closest('details').open=false;
}));
