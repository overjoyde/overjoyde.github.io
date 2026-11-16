import { catalog, ruleText, cases, filePreviews } from './data.js';

import { escapeHtml, renderProducts } from './render-products.js';
import { startAnalytics } from './analytics.js';

const cards = document.querySelector('#product-cards');
if (!cards.children.length) cards.innerHTML = renderProducts(catalog.products);
startAnalytics();
const date = document.querySelector('.verified-date time');
date.dateTime = catalog.checkedOn;
date.textContent = new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(catalog.checkedOn));

const menu = document.querySelector('#navigation');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu(returnFocus = false) {
  menu.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false');
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener('click',()=>{
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('open',open); menuToggle.setAttribute('aria-expanded',String(open));
});
menu.addEventListener('click', event => { if(event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if(event.key==='Escape' && menu.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', event => { if(!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width:761px)').addEventListener('change', event => { if(event.matches) closeMenu(); });

const tabs = [...document.querySelectorAll('[role=tab]')];
function selectTab(selected, moveFocus = false) {
  for (const tab of tabs) {
    const active = tab === selected;
    tab.setAttribute('aria-selected',String(active)); tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
  if(moveFocus) selected.focus();
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectTab(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight') next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft') next=(index+tabs.length-1)%tabs.length;
    if(event.key==='Home') next=0;
    if(event.key==='End') next=tabs.length-1;
    if(next !== undefined){event.preventDefault();selectTab(tabs[next],true);}
  });
});

document.querySelector('#copy-rule').addEventListener('click',async()=>{
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(ruleText);
    status.textContent = 'Example rule copied.';
  } catch {
    const area = document.createElement('textarea');
    area.value = ruleText; area.style.cssText='position:fixed;top:0;left:0;opacity:0';
    document.body.append(area); area.select();
    let copied = false;
    try {copied=document.execCommand('copy');} catch { /* Allow manual copying below. */ }
    area.remove();
    if (copied) {status.textContent = 'Example rule copied.';document.querySelector('#copy-rule').focus();}
    else {selectTab(document.querySelector('#tab-files'),true);showFile('rule-contract.md');status.textContent='Copy unavailable. Select the rule text in Deliverables.';document.querySelector('#preview-content').focus();}
  }
});

const picker = document.querySelector('.case-picker');
picker.innerHTML = cases.map((c,i)=>`<button class="case-button" data-case="${i}" aria-pressed="${i===0}"><span>${c.id}</span><strong>${escapeHtml(c.label)}</strong></button>`).join('');
function showCase(index) {
  const current = cases[index];
  picker.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
  document.querySelector('#case-detail').innerHTML=`<div class="case-detail"><div class="case-detail-header"><h4>${escapeHtml(current.title)}</h4><span class="outcome${current.expected?'':' no-hit'}">Expected: ${current.expected?'hit':'no hit'}</span></div><table class="transaction-table"><caption class="sr-only">${current.id}: fictional payments in SEK to DEMO-ACCOUNT-01. Evaluation time 12:00:00 UTC on 1 January 2026. All payments incoming and booked.</caption><thead><tr><th scope="col">Counterparty</th><th scope="col">Minor units</th><th scope="col">Time (UTC)</th><th scope="col">In window</th></tr></thead><tbody>${current.rows.map(r=>`<tr${!r.included?' class="excluded"':''}><td>${r.party}</td><td>${r.amount.toLocaleString('en-US')}</td><td>${r.time}</td><td>${r.included?'Yes':'No'}</td></tr>`).join('')}</tbody></table><p>${escapeHtml(current.explanation)}</p></div>`;
}
picker.addEventListener('click',event=>{const button=event.target.closest('[data-case]');if(button)showCase(Number(button.dataset.case));});
showCase(0);

const fileList=document.querySelector('.file-list');
fileList.innerHTML=Object.keys(filePreviews).map((file,i)=>`<button class="file-button" data-file="${file}" aria-pressed="${i===0}">${file}</button>`).join('');
function showFile(file) {
  fileList.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.file===file)));
  document.querySelector('#preview-filename').textContent=file;
  const download = document.querySelector('#download-example');
  download.href = `./examples/${file}`; download.download = file;
  download.setAttribute('data-goatcounter-click', `example-download-${file}`);
  document.querySelector('#preview-content').textContent=filePreviews[file];
  document.querySelector('#preview-content').setAttribute('aria-label',`Preview of ${file}`);
  document.querySelector('#preview-content').scrollTop=0;
}
fileList.addEventListener('click',event=>{const button=event.target.closest('[data-file]');if(button)showFile(button.dataset.file);});
showFile('rule-contract.md');
