const articleSearch=document.querySelector('#article-search');
let readingTopic='All';
function filterReading(){
  const query=articleSearch.value.trim().toLowerCase();
  let count=0;
  document.querySelectorAll('[data-topic]').forEach(card=>{
    card.hidden=!(readingTopic==='All'||card.dataset.topic===readingTopic)||!card.dataset.search.toLowerCase().includes(query);
    if(!card.hidden)count++;
  });
  document.querySelector('#article-count').textContent=`${count} article${count===1?'':'s'}${readingTopic==='All'?'':` in ${readingTopic.toLowerCase()}`}`;
  document.querySelector('#no-articles').hidden=count!==0;
}
articleSearch?.addEventListener('input',filterReading);
document.querySelectorAll('[data-reading-filter]').forEach(button=>button.addEventListener('click',()=>{
  readingTopic=button.dataset.readingFilter;
  document.querySelectorAll('[data-reading-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  filterReading();
}));
document.querySelector('#clear-articles')?.addEventListener('click',()=>{
  articleSearch.value='';readingTopic='All';
  document.querySelectorAll('[data-reading-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.readingFilter==='All')));
  filterReading();articleSearch.focus();
});
