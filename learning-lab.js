(() => {
'use strict';
const missions = {
 ai: {
  label: 'AI LITERACY', title: 'The convincing answer',
  steps: [
   {title:'The answer sounds certain. Is it supported?', story:'You are preparing a workshop on learning through games. An AI assistant produces an impressive claim. Your next move determines what reaches the audience.', artifactLabel:'SIMULATED AI OUTPUT', artifact:'“A 2025 study found that every student learned twice as fast with an AI tutor. You can use that result in your workshop.”\n\nNo author, title, or source is provided.', clue:'Notice the universal claim (“every student”), the exact improvement, and the missing source. Fluent wording does not establish that a study exists or supports the claim.', question:'What do you do before adding it to your slide?', options:[
    {text:'Use it—the confident wording suggests a reliable result.',title:'Confidence is not evidence.',result:'The slide would repeat an unsupported claim. Generative AI can produce plausible but incorrect information. You need a real source and a check that its findings support the wording.',good:false},
    {text:'Find the original study and check its methods and findings.',title:'You pause the claim at the evidence gate.',result:'A source must exist and support the specific claim. Check who and what was studied, how learning was measured, and the limits of the findings. If you cannot verify it, leave the claim out.',good:true},
    {text:'Ask the same assistant if it is sure, then use its confirmation.',title:'A second confident answer is still not verification.',result:'The assistant may repeat or elaborate on the same unsupported statement. Ask for leads if useful, then independently open the original source and check what it actually says.',good:false}
   ]},
   {title:'You need an example. What belongs in the prompt?',story:'You leave the unverified claim out. Now you want an AI-generated practice activity. You have a class spreadsheet with names, grades, and notes about individual learners.',artifactLabel:'ON YOUR DESK / FICTIONAL DATA INVENTORY',artifact:'Class spreadsheet: identifiable learner records\nGoal: create a sample activity about checking AI claims\nAvailable alternative: make up a small, fictional class',clue:'The activity does not require real learner records. Removing names alone may still leave identifying details. Institutional policy and approved tools matter whenever sensitive information is involved.',question:'How do you create the practice activity?',options:[
    {text:'Paste the complete spreadsheet so the AI has more context.',title:'More context can mean unnecessary exposure.',result:'Real learner records are not needed for this example. Use a fictional dataset and follow institutional rules for approved tools and handling sensitive information.',good:false},
    {text:'Remove names, but keep the detailed individual notes.',title:'Names are not the only identifiers.',result:'Specific circumstances and combinations of details can still identify someone. For this task, a completely fictional class is a better fit than adapting private records.',good:false},
    {text:'Use a fictional class and review the generated activity myself.',title:'You keep the teaching goal and reduce the data risk.',result:'A fictional example supports this task without sharing real learner records. Review the generated activity for accuracy, suitability, and what learners should practice.',good:true}
   ]}
  ], takeaways:[['Verify the evidence','Check the source and its actual findings before repeating an AI-generated claim.'],['Keep people in the loop','Use only the information the task needs and review the resulting activity.']], reflection:'What would you need to verify before using an AI-generated explanation in your own work?', work:'Explore my AI education & research direction',url:'research.html#ai-learning', other:'cyber'
 },
 cyber: {
  label: 'CYBERSECURITY',title:'The urgent message',
  steps:[
   {title:'Your account is “about to close.” What now?',story:'You are getting ready for an online learning event when a message interrupts you. It looks official, but something feels off.',artifactLabel:'SIMULATED INBOX / NOT A REAL MESSAGE',artifact:'From: Support <help@campus-access.example>\nSubject: Final warning: account closes in 10 minutes\n\nUse our verification link now. Enter your password and one-time code to keep access.',clue:'Urgency and a request for secrets are warning signs. A display name or polished logo does not prove a sender is legitimate. The .example address here is fictional; judge the request and verify independently.',question:'Choose your next action.',options:[
    {text:'Use the message’s link quickly to avoid losing access.',title:'The deadline is doing the persuading.',result:'Following a suspicious link can take you to an imitation sign-in page. Pause, avoid sharing credentials, and verify through a trusted route instead.',good:false},
    {text:'Open the known campus portal independently and report the message.',title:'You move the decision to a trusted channel.',result:'Use your known portal or an independently verified support contact—not contact details in the message. Report the suspicious message through the organization’s established process.',good:true},
    {text:'Reply to the sender and ask whether the message is genuine.',title:'The sender cannot independently verify itself.',result:'An attacker can reassure you. Use a known portal or separately verified support contact, and report the suspicious message without engaging with its sender.',good:false}
   ]},
   {title:'A sign-in prompt arrives. You did not sign in.',story:'You check the campus portal through your usual bookmark. While you are there, your phone receives an unexpected multifactor authentication approval request.',artifactLabel:'SIMULATED AUTHENTICATION PROMPT',artifact:'Approve sign-in?\nDevice: Unrecognized browser\n\nYou did not initiate this request.',clue:'An approval prompt is not proof that the request is yours. Multifactor authentication adds protection, but approving an unrequested prompt can let an attacker through.',question:'How do you respond?',options:[
    {text:'Approve it to make the notification go away.',title:'An approval can authorize someone else.',result:'Do not approve authentication requests you did not initiate. Deny the request and use the organization’s trusted support or security process to investigate.',good:false},
    {text:'Deny it and contact the security team through a known channel.',title:'You protect access and start the response.',result:'Deny the request, report it through a trusted channel, and follow your organization’s account-security guidance. If credentials may be exposed, use the genuine service to secure the account.',good:true},
    {text:'Send the code to the person claiming to be support.',title:'The code is part of the lock.',result:'Sharing a verification code can defeat the protection it provides. Keep it private, deny unexpected requests, and reach support independently.',good:false}
   ]}
  ],takeaways:[['Verify through a separate route','Treat urgency as a reason to pause and use a known portal or trusted contact.'],['Protect the second factor','Do not approve unexpected authentication requests or share verification codes.']],reflection:'Which trusted route would you use to report a suspicious request in your own school or workplace?',work:'Explore my cybersecurity coaching & leadership',url:'leadership.html',other:'ai'
 }
};
const stage=document.querySelector('#mission-stage');
if(!stage)return;
let active='ai',step=0,selected=null,finished=false;
const completed=new Set();
const $=(s)=>stage.querySelector(s);
const escapeText=(s)=>s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
function focusHeading(){const h=$('h3');h.focus({preventScroll:true});h.scrollIntoView({behavior:'instant',block:'start'});}
function render(focus=false){
 const m=missions[active];
 document.querySelector('.lab-shell').dataset.theme=active;
 document.querySelectorAll('[data-mission]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mission===active)));
 const top=`<div class="stage-top"><span>${m.label} / ${finished?'REFLECTION':`DECISION ${step+1} OF ${m.steps.length}`}</span><div class="stage-progress" aria-hidden="true">${m.steps.map((_,i)=>`<span class="${finished||i<=step?'done':''}"></span>`).join('')}</div></div>`;
 if(finished){
  stage.innerHTML=top+`<div class="debrief-symbol" aria-hidden="true">◇</div><h3 class="debrief-heading" tabindex="-1">Mission explored. Keep the question.</h3><p class="scene-copy">You worked through <strong>${m.title.toLowerCase()}</strong>. Here are the ideas to take beyond the scenario.</p><ul class="debrief-notes">${m.takeaways.map(([t,d])=>`<li><strong>${t}</strong>${d}</li>`).join('')}</ul><div class="reflection-prompt"><span class="status">PAUSE & REFLECT</span><p>${m.reflection}</p></div><a class="inline-link" href="${m.url}">${m.work} →</a><div class="actions"><button class="button" id="other-mission">Try the ${m.other==='ai'?'AI':'cybersecurity'} mission →</button><button class="button ghost" id="replay-mission">Replay this mission</button></div><p class="small-note">Practice completed, not a certification or measurement of mastery. Try another choice to compare the reasoning.</p>`;
  $('#other-mission').addEventListener('click',()=>start(m.other));
  $('#replay-mission').addEventListener('click',()=>start(active));
 }else{
  const q=m.steps[step];
  stage.innerHTML=top+`<h3 tabindex="-1">${q.title}</h3><p class="scene-copy">${q.story}</p><div class="artifact"><span>${q.artifactLabel}</span><p>${escapeText(q.artifact)}</p></div><details class="clue"><summary>Inspect the clues</summary><p>${q.clue}</p></details><p class="decision-label" id="decision-label">${q.question}</p><div class="choice-list" role="group" aria-labelledby="decision-label">${q.options.map((o,i)=>`<button type="button" data-choice="${i}" aria-pressed="false"><span aria-hidden="true">${String.fromCharCode(65+i)}</span>${o.text}</button>`).join('')}</div><div id="feedback-slot"></div><div class="stage-footer"><button class="text-button" id="restart-mission">Restart mission</button><span class="small-note">Explore at your own pace.</span></div>`;
  stage.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>answer(Number(b.dataset.choice))));
  $('#restart-mission').addEventListener('click',()=>start(active));
 }
 if(focus)focusHeading();
}
function answer(i){
 if(selected!==null)return;
 selected=i;
 const m=missions[active],o=m.steps[step].options[i];
 stage.querySelectorAll('[data-choice]').forEach(b=>{b.disabled=true;b.setAttribute('aria-pressed',String(Number(b.dataset.choice)===i));});
 $('#feedback-slot').innerHTML=`<section class="feedback" tabindex="-1" aria-labelledby="feedback-title"><span class="status">${o.good?'A THOUGHTFUL NEXT STEP':'A CHANCE TO RECONSIDER'}</span><h4 id="feedback-title">${o.title}</h4><p>${o.result}</p><div class="actions"><button class="button" id="next-decision">${step===m.steps.length-1?'Reflect on this mission':'Continue the story'} →</button><button class="button ghost" id="retry-decision">Try another choice</button></div></section>`;
 $('#next-decision').addEventListener('click',()=>{selected=null;if(step===m.steps.length-1){finished=true;completed.add(active);document.querySelector('#mission-record').textContent=`${completed.size} of 2 missions explored${completed.size===2?' · Both paths discovered.':'.'}`;}else step++;render(true);});
 $('#retry-decision').addEventListener('click',()=>{selected=null;render(true);});
 $('.feedback').focus({preventScroll:true});$('.feedback').scrollIntoView({behavior:'instant',block:'nearest'});
}
function start(id){active=id;step=0;selected=null;finished=false;render(true);}
document.querySelectorAll('[data-mission]').forEach(b=>b.addEventListener('click',()=>start(b.dataset.mission)));
render();
})();
