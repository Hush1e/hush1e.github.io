const badgeSearch=document.querySelector('#badge-search');
const directBadges=document.querySelector('#direct-badges');
const moreBadges=document.querySelector('#more-badges');
let badgeTopic='All',badgeLimit=12;
function showBadges(){
  let total=0,shown=0;
  const query=badgeSearch.value.trim().toLowerCase();
  document.querySelectorAll('[data-badge-topic]').forEach(card=>{
    const match=(badgeTopic==='All'||card.dataset.badgeTopic===badgeTopic)&&(!directBadges.checked||card.dataset.badgeDirect==='true')&&card.dataset.badgeSearch.toLowerCase().includes(query);
    if(match)total++;
    card.hidden=!match||total>badgeLimit;
    if(!card.hidden)shown++;
  });
  document.querySelector('#badge-count').textContent=`Showing ${shown} of ${total} credential entries`;
  document.querySelector('#no-badges').hidden=total!==0;
  moreBadges.hidden=shown>=total;
}
badgeSearch?.addEventListener('input',()=>{badgeLimit=12;showBadges();});
directBadges?.addEventListener('change',()=>{badgeLimit=12;showBadges();});
document.querySelectorAll('[data-badge-filter]').forEach(button=>button.addEventListener('click',()=>{
  badgeTopic=button.dataset.badgeFilter;badgeLimit=12;
  document.querySelectorAll('[data-badge-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  showBadges();
}));
document.querySelector('#reset-badges')?.addEventListener('click',()=>{
  badgeSearch.value='';directBadges.checked=false;badgeTopic='All';badgeLimit=12;
  document.querySelectorAll('[data-badge-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.badgeFilter==='All')));
  showBadges();badgeSearch.focus();
});
moreBadges?.addEventListener('click',()=>{badgeLimit+=12;showBadges();});
if(badgeSearch)showBadges();
