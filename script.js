const defaultProjects = [
  {id:'systems-foundations',title:'Systems Foundations',description:'Linux process, filesystem, and networking experiments with command notes, a process inspector, and failure observations.',status:'in-progress',tech:'Python',tags:['Linux','Networking','Failure notes'],link:''},
  {id:'concurrent-http-server',title:'Concurrent HTTP Server',description:'Planned standard-library server with bounded concurrency, request timeouts, graceful shutdown, rate limiting, and load-test evidence.',status:'planned',tech:'Python',tags:['HTTP','Concurrency','Load testing'],link:''},
  {id:'reliable-job-queue',title:'Reliable Job Queue',description:'Planned queue that explores leases, retries, duplicate delivery, idempotency, dead-letter handling, and worker recovery.',status:'planned',tech:'PostgreSQL',tags:['Queues','Transactions','Reliability'],link:''},
  {id:'replicated-key-value-store',title:'Replicated Key-Value Store',description:'Planned implementation project connecting replication, consistency, network partitions, Raft, persistence, and recovery tests.',status:'planned',tech:'Go',tags:['Replication','Raft','Distributed systems'],link:''},
  {id:'event-processing-pipeline',title:'Event Processing Pipeline',description:'Planned Kafka-based pipeline with replay, an outbox, idempotent consumers, lag metrics, and a recovery runbook.',status:'planned',tech:'Kafka',tags:['Events','Observability','Replay'],link:''},
  {id:'secure-distributed-platform',title:'Secure Distributed Platform',description:'Planned capstone combining service identity, RBAC, network policy, hardened containers, telemetry, and attack-path testing.',status:'planned',tech:'Kubernetes',tags:['Security','Kubernetes','Infrastructure'],link:''}
];
const storageKey='sd-portfolio-projects-v1';
const deletedKey='sd-portfolio-deleted-v1';
const getCustom=()=>JSON.parse(localStorage.getItem(storageKey)||'[]');
const getDeleted=()=>JSON.parse(localStorage.getItem(deletedKey)||'[]');
const getProjects=()=>[...defaultProjects.filter(p=>!getDeleted().includes(p.id)),...getCustom()];
const save=()=>{localStorage.setItem(storageKey,JSON.stringify(getCustom()));localStorage.setItem(deletedKey,JSON.stringify(getDeleted()));};
const esc=(v)=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function render(filter='all'){
  const grid=document.querySelector('#projectGrid'); if(!grid)return;
  const all=getProjects(); const projects=filter==='all'?all:all.filter(p=>p.status===filter);
  document.querySelector('#projectCount').textContent=`${projects.length.toString().padStart(2,'0')} project${projects.length===1?'':'s'}`;
  grid.innerHTML=projects.length?projects.map((p,i)=>`<article class="project-card"><div class="project-card-top"><span class="project-kicker">${String(i+1).padStart(2,'0')} · ${esc(p.tech||'Project')}</span><span class="status-pill ${esc(p.status)}">${esc(p.status.replace('-',' '))}</span></div><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p><div class="project-tags">${(p.tags||[]).map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="project-card-footer">${p.link?`<a class="project-link" href="${esc(p.link)}" target="_blank" rel="noreferrer">View project ↗</a>`:'<span class="project-kicker">Evidence will be added</span>'}<button class="delete-project" data-delete="${esc(p.id)}">Delete</button></div></article>`).join(''):'<div class="project-note"><div class="note-mark">+</div><div><strong>No projects in this view yet.</strong><p>Add one when you have something meaningful to document.</p></div></div>';
  grid.querySelectorAll('[data-delete]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.delete;if(!confirm('Remove this project from the local portfolio?'))return;const custom=getCustom().filter(p=>p.id!==id);localStorage.setItem(storageKey,JSON.stringify(custom));if(defaultProjects.some(p=>p.id===id)){const deleted=getDeleted();if(!deleted.includes(id))deleted.push(id);localStorage.setItem(deletedKey,JSON.stringify(deleted));}render(filter);}));
}
function openDialog(){document.querySelector('#projectDialog')?.showModal();}
document.querySelectorAll('#addProjectButton,#addProjectTop').forEach(b=>b.addEventListener('click',openDialog));
document.querySelector('#closeDialog')?.addEventListener('click',()=>document.querySelector('#projectDialog').close());
document.querySelector('#cancelDialog')?.addEventListener('click',()=>document.querySelector('#projectDialog').close());
document.querySelector('#projectForm')?.addEventListener('submit',(e)=>{e.preventDefault();const data=new FormData(e.currentTarget);const title=data.get('title').trim();const p={id:`custom-${Date.now()}`,title,description:data.get('description').trim(),status:data.get('status'),tech:data.get('tech').trim()||'Project',tags:data.get('tags').split(',').map(x=>x.trim()).filter(Boolean),link:data.get('link').trim()};localStorage.setItem(storageKey,JSON.stringify([...getCustom(),p]));e.currentTarget.reset();document.querySelector('#projectDialog').close();render(document.querySelector('.filter.active')?.dataset.filter||'all');});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter);}));
document.querySelector('#exportProjects')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify(getProjects(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='projects.json';a.click();URL.revokeObjectURL(a.href);});
document.querySelector('#resetProjects')?.addEventListener('click',()=>{if(confirm('Reset added and deleted projects on this browser?')){localStorage.removeItem(storageKey);localStorage.removeItem(deletedKey);render();}});
render();
