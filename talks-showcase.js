document.querySelectorAll('.video-screen').forEach(screen=>{
  const preview=screen.querySelector('.video-preview');
  preview.addEventListener('click',()=>{
    document.querySelectorAll('.video-screen iframe').forEach(frame=>{
      const previous=frame.parentElement;
      frame.remove();
      previous.querySelector('.video-preview').hidden=false;
    });
    const frame=document.createElement('iframe');
    frame.title=screen.dataset.title;
    frame.src=`https://www.youtube-nocookie.com/embed/${screen.dataset.video}?start=${screen.dataset.start}&autoplay=1&rel=0`;
    frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen=true;
    frame.referrerPolicy='strict-origin-when-cross-origin';
    preview.hidden=true;
    screen.append(frame);
    frame.focus();
  });
});
