(() => {
'use strict';
document.querySelectorAll('[data-explorer]').forEach(explorer=>{
 const buttons=[...explorer.querySelectorAll('[data-explore]')];
 const panels=[...explorer.querySelectorAll('.explore-panel')];
 function select(id,focus){buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.explore===id)));panels.forEach(p=>p.hidden=p.id!==id);if(focus){const panel=document.getElementById(id);panel.focus({preventScroll:true});panel.scrollIntoView({behavior:'instant',block:'nearest'});}}
 buttons.forEach(b=>b.addEventListener('click',()=>select(b.dataset.explore,true)));
 explorer.classList.add('explorer-ready');select(buttons[0].dataset.explore,false);
});
function revealAnchor(){if(!location.hash)return;let target;try{target=document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch{return;}if(!target)return;let parent=target;while(parent){if(parent.tagName==='DETAILS')parent.open=true;if(parent.classList.contains('explore-panel')&&parent.hidden){const button=document.querySelector('[data-explore="'+parent.id+'"]');button?.click();}parent=parent.parentElement;}target.scrollIntoView({behavior:'instant',block:'start'});}
window.addEventListener('hashchange',revealAnchor);revealAnchor();
})();
