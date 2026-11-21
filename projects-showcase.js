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
