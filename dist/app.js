const menu = document.querySelector('.menu');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('open',open)});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');document.querySelector('nav').classList.remove('open')}));
const stages=[["01 / BIND INTAKE", "Create accepted business manually or import CSV/XLSX. Use assisted PDF extraction where it helps."], ["02 / POLICY RECORD", "Maintain insured, period, currency, risk objects, coverage, binder/facility and source identifiers."], ["03 / CARRIER PARTICIPATION", "Record lead/follower roles, written shares and carrier-specific references for reporting and obligations."], ["04 / POLICY LIFECYCLE", "Track bound, active, cancelled and expired policies. Link renewal results to the preceding contract."], ["05 / ENDORSEMENTS", "Record effective-dated changes with immutable, versioned history. Separate current state from the transaction ledger."], ["06 / PREMIUM TRANSACTIONS", "Represent gross premium, commission, net premium, instalments, additional/return premium and carrier allocation."], ["07 / BORDEREAUX", "Generate risk and premium bordereaux with reusable carrier templates from the canonical record."], ["08 / SETTLEMENT OBLIGATIONS", "Calculate expected amounts by carrier and period, then export to finance. Returned payment status can be linked back without owning payment execution or full reconciliation."]];
document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-step]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});const [code,copy]=stages[Number(button.dataset.step)];document.querySelector('#step-code').textContent=code;document.querySelector('#step-copy').textContent=copy}));
const formats={JSON:['policy.json','{\n  "policy_id": "BRD-2026-0142",\n  "insured_value": 24500000,\n  "currency": "USD",\n  "coverage": "Hull & Machinery",\n  "status": "bound"\n}'],CSV:['bordereau.csv','policy_id,currency,insured_value,status\nBRD-2026-0142,USD,24500000,bound\n\nOne row derived from the structured record.\nColumns can follow a counterparty’s specification.'],XLSX:['bordereau.xlsx · content preview','POLICY REFERENCE     BRD-2026-0142\nCURRENCY             USD\nINSURED VALUE        24,500,000\nGROSS PREMIUM        4,703.29\nCOMMISSION           15%\nNET PREMIUM          3,997.79\n\nIllustrative workbook fields.'],PDF:['policy-schedule.pdf · content preview','POLICY SCHEDULE\n─────────────────────────────────\nReference     BRD-2026-0142\nRisk          MV Example Vessel\nCoverage      Hull & Machinery\nValue         USD 24,500,000\nPeriod        15 Jan 2026 – 14 Jul 2027\n\nIllustrative document content.'],API:['GET /policies/{id} · proposed interface','GET /policies/BRD-2026-0142\nAccept: application/json\n\n→ The same structured policy record.\n\nRelated event: policy.bound\n\nAPI example. No live API request is made.']};
document.querySelectorAll('[data-format]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-format]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});const [name,content]=formats[button.dataset.format];document.querySelector('#format-filename').textContent=name;document.querySelector('#format-content').textContent=content}));
document.querySelector('#format-content').setAttribute('aria-live','polite');
document.querySelector('#match').addEventListener('click',()=>{document.querySelector('#match-status').textContent='Finance export: carrier reference, reporting period, expected amount and linked transaction IDs. The ERP manages invoice, payment and reconciliation workflows.'});
document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.getElementById(button.dataset.dialog);if(button.dataset.audience)dialog.querySelector('[name=audience]').value=button.dataset.audience;dialog.showModal()}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}})});
document.querySelector('#partner-form').addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const subject=`Bordeon demo request — ${data.get('audience')}`;
  const body=`Hello Anton,\n\nI would like to arrange a Bordeon demo.\n\nInterest: ${data.get('audience')}\nName: ${data.get('name')}\nCompany: ${data.get('company')}\n\n${data.get('workflow') || ''}\n\nPlease suggest a suitable time.`;
  const link=document.createElement('a');
  link.href=`mailto:anton@succedo.fi?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  link.click();
  document.querySelector('.form-status').textContent='Your email app has been requested to open. Send the message there to request a time. If it does not open, email anton@succedo.fi directly.';
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.setAttribute('aria-expanded','false');document.querySelector('nav').classList.remove('open')}});

// Local vector icons share a single visual language and require no external library.
const iconPaths={
  record:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  report:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12M9 15h12"/>',
  history:'<path d="M3 10a9 9 0 1 1 1 7M3 4v6h6M12 7v5l3 2"/>',
  network:'<rect x="9" y="9" width="6" height="6" rx="1"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/><circle cx="12" cy="2" r="1"/><circle cx="12" cy="22" r="1"/><circle cx="2" cy="12" r="1"/><circle cx="22" cy="12" r="1"/>',
  code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
  import:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  layers:'<path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5"/>',
  settlement:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18m-7 5 2 2 4-4"/>'
};
function techIcon(name){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','tech-icon');svg.setAttribute('aria-hidden','true');svg.innerHTML=iconPaths[name];return svg;}
document.querySelectorAll('.usp-card').forEach((el,i)=>el.prepend(techIcon(['database','report','history','network'][i])));
document.querySelectorAll('[data-step]').forEach((el,i)=>el.prepend(techIcon(['import','record','network','history','layers','settlement','report','settlement'][i])));
document.querySelectorAll('.outputs b').forEach((el,i)=>el.replaceChildren(techIcon(['record','report','code'][i])));
document.querySelector('.record-icon').replaceChildren(techIcon('record'));
document.querySelectorAll('.fit-integration .fit-stage').forEach((el,i)=>el.prepend(techIcon(['import','database','network'][i])));

// Decorative transaction routes: render once for reduced motion, pause off screen.
const networkCanvas=document.querySelector('.transaction-network');
const networkContext=networkCanvas.getContext('2d');
if(networkContext){
  const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,visible=false,width=0,height=0;
  const points=[[.03,.18],[.23,.08],[.43,.21],[.64,.08],[.89,.2],[.98,.45],[.8,.68],[.94,.9],[.62,.93],[.4,.79],[.17,.92],[.04,.65]];
  function draw(time=0){
    networkContext.clearRect(0,0,width,height);
    networkContext.strokeStyle='rgba(183,201,221,.23)';networkContext.lineWidth=1;
    points.forEach((point,i)=>{
      const next=points[(i+1)%points.length],x=point[0]*width,y=point[1]*height,nx=next[0]*width,ny=next[1]*height;
      networkContext.beginPath();networkContext.moveTo(x,y);networkContext.lineTo(nx,ny);networkContext.stroke();
      networkContext.fillStyle='#b7c9dd';networkContext.beginPath();networkContext.arc(x,y,2.5,0,Math.PI*2);networkContext.fill();
      const progress=(time/9000+i/points.length)%1;
      networkContext.fillStyle='rgba(215,234,255,.8)';networkContext.beginPath();networkContext.arc(x+(nx-x)*progress,y+(ny-y)*progress,2,0,Math.PI*2);networkContext.fill();
    });
  }
  function animate(time){draw(time);frame=requestAnimationFrame(animate);}
  function update(){cancelAnimationFrame(frame);frame=0;draw();if(visible&&!document.hidden&&!motionPreference.matches)frame=requestAnimationFrame(animate);}
  new ResizeObserver(()=>{width=networkCanvas.clientWidth;height=networkCanvas.clientHeight;const ratio=Math.min(devicePixelRatio||1,2);networkCanvas.width=Math.round(width*ratio);networkCanvas.height=Math.round(height*ratio);networkContext.setTransform(ratio,0,0,ratio,0,0);update();}).observe(networkCanvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();}).observe(networkCanvas);
  document.addEventListener('visibilitychange',update);motionPreference.addEventListener('change',update);
}
