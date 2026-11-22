const launchNavigator=document.querySelector('#launch-navigator');
launchNavigator?.addEventListener('click',()=>{
  const player=document.querySelector('#navigator-player');
  const frame=player.querySelector('iframe');
  const expanded=launchNavigator.getAttribute('aria-expanded')!=='true';
  if(expanded&&!frame.getAttribute('src'))frame.src=frame.dataset.src;
  player.hidden=!expanded;
  launchNavigator.setAttribute('aria-expanded',String(expanded));
  launchNavigator.textContent=expanded?'Hide playable game ↑':'Load playable game ↓';
});

const missionDialog=document.querySelector('#mission-preview-dialog');
document.querySelectorAll('[data-mission-preview]').forEach(button=>{
  button.addEventListener('click',()=>{
    const card=button.closest('.mission-card');
    const original=button.querySelector('img');
    const image=missionDialog.querySelector('#mission-preview-image');
    image.src=original.src;image.alt=original.alt;
    missionDialog.querySelector('h2').textContent=card.querySelector('h3').textContent;
    const play=missionDialog.querySelector('#mission-preview-play');
    play.href=card.querySelector('a.button').href;
    play.textContent=card.querySelector('a.button').textContent;
    missionDialog.showModal();
  });
});
document.querySelector('#close-mission-preview')?.addEventListener('click',()=>missionDialog.close());
missionDialog?.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();missionDialog.close();}});
missionDialog?.addEventListener('click',event=>{if(event.target===missionDialog){const r=missionDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)missionDialog.close();}});
