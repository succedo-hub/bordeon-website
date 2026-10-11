const icon = window.BordeonIcons.icon;
const menu = document.querySelector('.menu');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('open',open)});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');document.querySelector('nav').classList.remove('open')}));
const stages=[["01 / BIND INTAKE", "Enter accepted business with the agreed risk details and premium. Keep a consistent starting record for the policy and its transactions."], ["02 / POLICY RECORD", "Keep customer, insured risk, insured value and agreed commission together with the policy reference and current version."], ["03 / CARRIER PARTICIPATION", "Record carrier names, written shares and the binder reference. Allocate net premium after commission, with shares checked against a 100% total."], ["04 / POLICY HISTORY", "Follow the current policy version and retain earlier versions, including the effective date and description of each change."], ["05 / ENDORSEMENTS", "Record agreed changes and their effective dates. Preserve the previous policy version and link each additional or return premium to its change."], ["06 / PREMIUM TRANSACTIONS", "Keep gross premium, commission, net premium and additional or return premium in the same transaction history."], ["07 / BORDEREAUX", "Create a CSV bordereau from unreported transactions. Preserve the report snapshot, its carrier allocations and the transactions behind each amount."], ["08 / SETTLEMENT OBLIGATIONS", "Follow carrier amounts due back to the report and its transactions. Record settlement status separately from payment execution in your finance systems."]];
document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-step]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});const [code,copy]=stages[Number(button.dataset.step)];document.querySelector('#step-code').textContent=code;document.querySelector('#step-copy').textContent=copy}));
const formats={JSON:['policy.json','{\n  "policy_id": "BRD-2026-0142",\n  "insured_value": 24500000,\n  "currency": "USD",\n  "coverage": "Hull & Machinery",\n  "status": "bound"\n}'],CSV:['bordereau.csv','policy_id,currency,insured_value,status\nBRD-2026-0142,USD,24500000,bound\n\nOne row derived from the structured record.\nColumns can follow a counterparty’s specification.'],XLSX:['bordereau.xlsx · content preview','POLICY REFERENCE     BRD-2026-0142\nCURRENCY             USD\nINSURED VALUE        24,500,000\nGROSS PREMIUM        4,703.29\nCOMMISSION           15%\nNET PREMIUM          3,997.79\n\nIllustrative workbook fields.'],PDF:['policy-schedule.pdf · content preview','POLICY SCHEDULE\n─────────────────────────────────\nReference     BRD-2026-0142\nRisk          MV Example Vessel\nCoverage      Hull & Machinery\nValue         USD 24,500,000\nPeriod        15 Jan 2026 – 14 Jul 2027\n\nIllustrative document content.'],API:['GET /policies/{id} · interface example','GET /policies/BRD-2026-0142\nAccept: application/json\n\nThe same structured policy record.\n\nRelated event: policy.bound\n\nAPI example. No live API request is made.']};
document.querySelectorAll('[data-format]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-format]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});const [name,content]=formats[button.dataset.format];document.querySelector('#format-filename').textContent=name;document.querySelector('#format-content').textContent=content}));
document.querySelector('#format-content')?.setAttribute('aria-live','polite');
document.querySelector('#match')?.addEventListener('click',()=>{document.querySelector('#match-status').textContent='Finance export: carrier reference, reporting period, expected amount and linked transaction IDs. The ERP manages invoice, payment and reconciliation workflows.'});
document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.getElementById(button.dataset.dialog);if(button.dataset.audience)dialog.querySelector('[name=audience]').value=button.dataset.audience;dialog.showModal()}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}})});
document.querySelectorAll('[data-enquiry-form]').forEach(form=>form.addEventListener('submit',async event=>{
  event.preventDefault();
  const form=event.currentTarget;
  const button=form.querySelector('[type=submit]');
  const label=button.querySelector('[data-submit-text]');
  const status=form.querySelector('.form-status');
  if(button.disabled) return;
  button.disabled=true;
  label.textContent='Sending…';
  form.setAttribute('aria-busy','true');
  status.textContent='Sending your request…';
  status.dataset.state='pending';
  try {
    const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    if(!response.ok) throw new Error('Submission failed');
    form.reset();
    status.dataset.state='success';
    status.textContent=form.dataset.successMessage;
  } catch(error) {
    status.dataset.state='error';
    status.textContent='We couldn’t confirm your request. Your details are still here. Please try again, or email anton@succedo.fi.';
  } finally {
    button.disabled=false;
    label.textContent=form.dataset.submitLabel;
    form.removeAttribute('aria-busy');
  }
}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.setAttribute('aria-expanded','false');document.querySelector('nav').classList.remove('open')}});


document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-preview]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=panel.dataset.panel!==button.dataset.preview);}));

// User-driven transaction states, illustrated with the same synthetic demo data.
const transactionStates=[
 {ref:'POLICY / BRD-2026-0142 · v1',title:'Accepted business.<br>A structured starting point.',events:[['Policy version created','MV Example Vessel · €24.5m insured','v1'],['Initial premium','TX-001 · Agreed gross premium','€120,000'],['Commission recorded','15% of gross premium','€18,000']],label:'Net premium on the original policy',total:'€102,000.00'},
 {ref:'ENDORSEMENT / BRD-2026-0142 · v2',title:'The risk changes.<br>The original stays intact.',events:[['Insured value updated',`€24.5m ${icon('arrow-right')} €28.0m`,'v2'],['Additional premium','TX-002 · Manually entered','+ €10,000'],['History preserved','Original policy linked to endorsement',`v1 ${icon('arrow-right')} v2`]],label:'Net additional premium',total:'€8,500.00'},
 {ref:'REPORT / BDX-DEMO-01',title:'One adjustment.<br>Two carrier obligations.',events:[['Northstar Insurance (demo)','60% of the net adjustment','€5,100'],['Baltic Specialty (demo)','40% of the net adjustment','€3,400'],['Bordereau snapshot','Linked transaction · TX-002','CSV']],label:'Net change for reporting',total:'€8,500.00'}
];
function showTransaction(index){const state=transactionStates[index],target=document.querySelector('#transaction-state');if(!target)return;target.innerHTML=`<p class="console-label">${state.ref}</p><h3>${state.title}</h3>${state.events.map((e,i)=>`<div class="console-event"><span class="event-mark">0${i+1}</span><div><b>${e[0]}</b><small>${e[1]}</small></div><strong>${e[2]}</strong></div>`).join('')}<div class="console-total"><span>${state.label}</span><strong>${state.total}</strong></div>`;document.querySelectorAll('[data-transaction]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.transaction)===index)));if(!matchMedia('(prefers-reduced-motion: reduce)').matches)target.animate([{opacity:.4,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});}
document.querySelectorAll('[data-transaction]').forEach(b=>b.addEventListener('click',()=>showTransaction(Number(b.dataset.transaction))));
if(document.querySelector('#transaction-state'))showTransaction(2);
const connectionCopy={intake:['MANUAL INTAKE · AVAILABLE IN DEMO','Start with accepted business.','Enter customer, risk, insured value and agreed premium. Create the first policy version from that record.'],record:['VERSIONED HISTORY · AVAILABLE IN DEMO','Keep the change and its context.','Link endorsements to the policy, preserve earlier versions and record additional or return premium as a separate transaction.'],output:['CSV REPORTING · AVAILABLE IN DEMO','Give every amount a destination.','Allocate net premium between carriers and create a bordereau snapshot with settlement obligations. Payment execution remains outside the demo.']};
document.querySelectorAll('[data-connection]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-connection]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));const [label,title,copy]=connectionCopy[button.dataset.connection];document.querySelector('#connection-label').textContent=label;document.querySelector('#connection-title').textContent=title;document.querySelector('#connection-copy').textContent=copy;}));

// Pause decorative motion on request and while the footer is off-screen.
const footerPulse=document.querySelector('.footer-pulse');
if(footerPulse){
  const toggle=footerPulse.querySelector('.pulse-toggle');
  let manuallyPaused=false;
  let visible=false;
  const updatePulse=()=>footerPulse.classList.toggle('is-paused',manuallyPaused||!visible||document.hidden);
  toggle.addEventListener('click',()=>{
    manuallyPaused=!manuallyPaused;
    toggle.setAttribute('aria-pressed',String(manuallyPaused));
    toggle.textContent=manuallyPaused?'Play animation':'Pause animation';
    toggle.setAttribute('aria-label',manuallyPaused?'Play footer animation':'Pause footer animation');
    updatePulse();
  });
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;updatePulse();}).observe(footerPulse);
  document.addEventListener('visibilitychange',updatePulse);
  updatePulse();
}
