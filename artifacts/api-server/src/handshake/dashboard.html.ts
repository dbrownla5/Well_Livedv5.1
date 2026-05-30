/**
 * Internal Handshake dashboard — a single self-contained admin page.
 *
 * Served as one HTML string from the API server (GET /api/handshake/dashboard)
 * so there is no second build pipeline and no second "site copy" to drift. It
 * talks to the same /api/handshake/* endpoints via fetch. Internal tool: keep it
 * behind hosting auth / an unguessable path in production.
 */
export const DASHBOARD_HTML = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Handshake Dashboard — WLC</title>
<style>
  :root { --ink:#38302e; --parch:#f8f4e3; --sage:#9caf88; --sage-d:#6b7d5a; --line:#e2ddcd; }
  * { box-sizing:border-box; }
  body { margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; background:var(--parch); color:var(--ink); }
  header { background:var(--ink); color:var(--parch); padding:1rem 1.5rem; display:flex; justify-content:space-between; align-items:center; }
  header h1 { font-size:1rem; margin:0; letter-spacing:.05em; }
  .wrap { display:grid; grid-template-columns:340px 1fr; gap:0; height:calc(100vh - 56px); }
  .board { border-right:1px solid var(--line); overflow:auto; }
  .detail { overflow:auto; padding:1.5rem; }
  .card { padding:.85rem 1.1rem; border-bottom:1px solid var(--line); cursor:pointer; }
  .card:hover { background:#fff; }
  .card.sel { background:#fff; border-left:3px solid var(--sage); }
  .card .nm { font-weight:600; }
  .card .meta { font-size:.75rem; color:var(--sage-d); margin-top:.2rem; }
  .pill { display:inline-block; font-size:.65rem; text-transform:uppercase; letter-spacing:.08em; padding:.15rem .5rem; border-radius:99px; background:var(--sage); color:var(--ink); }
  .pill.blocked { background:#d9534f; color:#fff; }
  .steps { display:flex; flex-wrap:wrap; gap:.3rem; margin:1rem 0; }
  .step { font-size:.68rem; padding:.25rem .55rem; border:1px solid var(--line); border-radius:99px; color:#999; }
  .step.done { background:var(--sage-d); color:#fff; border-color:var(--sage-d); }
  .step.cur { background:var(--ink); color:#fff; border-color:var(--ink); }
  button { font-family:inherit; cursor:pointer; border:1px solid var(--ink); background:var(--ink); color:var(--parch); padding:.5rem .9rem; border-radius:4px; font-size:.8rem; }
  button.ghost { background:transparent; color:var(--ink); }
  button:disabled { opacity:.4; cursor:not-allowed; }
  input, select { font-family:inherit; padding:.45rem .6rem; border:1px solid var(--line); border-radius:4px; font-size:.8rem; }
  table { width:100%; border-collapse:collapse; margin:.5rem 0; font-size:.8rem; }
  th, td { text-align:left; padding:.4rem .5rem; border-bottom:1px solid var(--line); }
  .row { display:flex; gap:.5rem; flex-wrap:wrap; align-items:center; margin:.5rem 0; }
  h2 { font-size:1.3rem; margin:.2rem 0; }
  h3 { font-size:.8rem; text-transform:uppercase; letter-spacing:.1em; color:var(--sage-d); margin:1.5rem 0 .5rem; }
  .muted { color:var(--sage-d); font-size:.8rem; }
  .ok { color:var(--sage-d); } .err { color:#d9534f; }
</style>
</head>
<body>
<header><h1>THE HANDSHAKE — Operations</h1><span id="status" class="muted"></span></header>
<div class="wrap">
  <div class="board" id="board"></div>
  <div class="detail" id="detail"><p class="muted">Select a client from the board.</p></div>
</div>
<script>
const STEPS = ["intake","day_before","custody","inventory","evaluation","report","consent","review","payout","closed"];
const LABEL = {intake:"Intake",day_before:"Day-before",custody:"Custody",inventory:"48h Count",evaluation:"Evaluation",report:"Report",consent:"Consent",review:"Review",payout:"Payout",closed:"Closed"};
let SEL = null;
const $ = s => document.querySelector(s);
const money = c => c==null?"—":"$"+(c/100).toFixed(2);
function setStatus(m,cls){ const s=$("#status"); s.textContent=m; s.className=cls||"muted"; }

async function api(path, opts){ const r = await fetch("/api/handshake"+path, opts); return r.json(); }

async function loadBoard(){
  const d = await api("");
  if(!d.ok){ $("#board").innerHTML='<p class="muted" style="padding:1rem">Could not load. Is the database connected?</p>'; return; }
  const open = d.handshakes.filter(h=>!h.blocked);
  const blocked = d.handshakes.filter(h=>h.blocked);
  $("#board").innerHTML = open.map(card).join("") +
    (blocked.length?'<div style="padding:.6rem 1.1rem" class="muted">BLOCKED — no signature</div>'+blocked.map(card).join(""):"");
}
function card(h){
  return '<div class="card '+(SEL===h.id?'sel':'')+'" onclick="openRec('+h.id+')">'+
    '<div class="nm">'+esc(h.clientName)+'</div>'+
    '<div class="meta">'+esc(h.summary||"")+'</div>'+
    '<div style="margin-top:.4rem"><span class="pill '+(h.blocked?'blocked':'')+'">'+(h.blocked?'blocked':LABEL[h.step]||h.step)+'</span></div></div>';
}
function esc(s){ return (s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

async function openRec(id){
  SEL=id; await loadBoard();
  const d = await api("/"+id);
  if(!d.ok){ $("#detail").innerHTML='<p class="err">Not found.</p>'; return; }
  const h=d.handshake, items=d.items||[];
  const ci=STEPS.indexOf(h.step);
  const stepBar = STEPS.map((s,i)=>'<span class="step '+(i<ci?'done':i===ci?'cur':'')+'">'+LABEL[s]+'</span>').join("");
  let html='<h2>'+esc(h.clientName)+'</h2><div class="muted">'+esc(h.clientEmail)+(h.clientPhone?' · '+esc(h.clientPhone):'')+'</div>';
  if(h.blocked){ html+='<p class="err" style="margin-top:1rem">⚠ Blocked — no valid signature at intake. Cannot proceed.</p>'; }
  html+='<div class="steps">'+stepBar+'</div>';
  html+='<div class="muted">'+esc(h.summary||"")+(h.bagsCount?' · '+esc(h.bagsCount)+' bags':'')+(h.estimatedItems?' · ~'+esc(h.estimatedItems)+' items':'')+'</div>';
  if(h.agreementTimestamp){ html+='<div class="ok" style="font-size:.78rem;margin-top:.4rem">✓ Agreement signed by '+esc(h.signatureName||h.clientName)+' · '+new Date(h.agreementTimestamp).toLocaleString()+'</div>'; }

  if(!h.blocked && h.step!=="closed"){
    html+='<h3>Next action</h3><div class="row">';
    const next = STEPS[ci+1];
    if(["day_before","custody","inventory","evaluation"].includes(next)){
      html+='<button onclick="advance('+id+')">Run: '+LABEL[next]+(["day_before","custody"].includes(next)?' (emails client)':'')+'</button>';
    } else if(next==="report"){
      html+='<button onclick="advance('+id+')">Move to Report stage</button>';
    } else if(h.step==="report"||h.step==="evaluation"){
      html+='<button onclick="sendReport('+id+')">Build &amp; send inventory report</button>';
    } else if(next==="payout"||h.step==="review"){
      html+='<button onclick="doPayout('+id+',false)">Compute payout</button> <button class="ghost" onclick="doPayout('+id+',true)">Mark paid</button>';
    } else {
      html+='<button onclick="advance('+id+')">Advance → '+LABEL[next]+'</button>';
    }
    html+='</div>';
  }

  // Inventory builder
  html+='<h3>Inventory report</h3>';
  html+='<table><thead><tr><th>Item</th><th>Platform</th><th>Tier</th><th>Disp.</th><th>Est. sale</th><th>Sold</th><th>Client cut</th></tr></thead><tbody>';
  html+=items.map(it=>'<tr><td>'+esc(it.description)+(it.clientPulled?' <span class="err">(pulled)</span>':'')+'</td><td>'+esc(it.platform||"")+'</td><td>'+esc(it.tier)+'</td><td>'+esc(it.disposition)+'</td><td>'+money(it.estSaleCents)+'</td><td>'+money(it.soldGrossCents)+'</td><td>'+clientCut(it)+'</td></tr>').join("");
  html+='</tbody></table>';
  html+='<div class="row"><input id="i_desc" placeholder="Item description" style="flex:1;min-width:160px"/>'+
    '<input id="i_plat" placeholder="Platform" style="width:110px"/>'+
    '<select id="i_tier"><option value="standard">standard</option><option value="contemporary">contemporary</option><option value="designer">designer</option><option value="luxury">luxury</option></select>'+
    '<select id="i_disp"><option value="list">list</option><option value="donate">donate</option><option value="return">return</option><option value="biohazard">biohazard</option></select>'+
    '<input id="i_est" type="number" placeholder="Est $ (e.g. 70)" style="width:120px"/>'+
    '<button onclick="addItem('+id+')">Add item</button></div>';
  html+='<p class="muted">Consent link: <code>'+location.origin.replace(/:\\d+$/,'')+'/consent/'+esc(h.token)+'</code></p>';
  if(h.payoutClientTotalCents!=null){ html+='<h3>Payout</h3><p>Total to client: <b>'+money(h.payoutClientTotalCents)+'</b> · scheduled '+(h.payoutDate?new Date(h.payoutDate).toDateString():'—')+(h.payoutPaidAt?' · <span class="ok">PAID</span>':'')+'</p>'; }
  $("#detail").innerHTML=html;
}
function clientCut(it){
  if(it.clientPulled||it.disposition!=="list"||!it.soldGrossCents) return "—";
  const net=(it.soldGrossCents||0)-(it.feesCents||0)-(it.shippingCents||0);
  const share={standard:.4,contemporary:.45,designer:.5,luxury:.6}[it.tier]||.4;
  return net<=0?"$0.00":money(Math.round(net*share));
}
async function advance(id){ setStatus("Working…"); const d=await api("/"+id+"/advance",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"}); flash(d); openRec(id); }
async function sendReport(id){ setStatus("Sending report…"); const d=await api("/"+id+"/send-report",{method:"POST"}); flash(d,d.emailDelivered?"Report sent.":"Report logged (email off)."); openRec(id); }
async function doPayout(id,paid){ setStatus("Computing payout…"); const d=await api("/"+id+"/payout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({markPaid:paid})}); flash(d, d.ok?("Payout "+d.total):null); openRec(id); }
async function addItem(id){
  const body={description:$("#i_desc").value,platform:$("#i_plat").value,tier:$("#i_tier").value,disposition:$("#i_disp").value};
  const est=parseFloat($("#i_est").value); if(!isNaN(est)) body.estSaleCents=Math.round(est*100);
  if(!body.description){ setStatus("Item needs a description","err"); return; }
  const d=await api("/"+id+"/items",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}); flash(d); openRec(id);
}
function flash(d,msg){ if(d&&d.ok) setStatus(msg||"Done.","ok"); else setStatus((d&&d.error)||"Error","err"); }

loadBoard(); setInterval(loadBoard, 15000);
</script>
</body>
</html>`;
