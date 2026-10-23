(function(){
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=n=>'$'+(n%1?n.toFixed(2):n);
const PAGE=$('#main').dataset.page;
let FIRST=true;try{FIRST=!sessionStorage.getItem('kk-seen')}catch(e){}
const INTRO=RM?0:(FIRST?1500:950);

const C={salmon:'#f2875a',tuna:'#b5122f',toro:'#e46a77',otoro:'#f1a3a8',hamachi:'#f0d2ad',scallop:'#f4e6d4',eel:'#6e3a1c',shrimp:'#f6a27c',tai:'#f3d6cf',saba:'#9aa7ad',egg:'#f3c64b',roe:'#ff5a1f',green:'#6f9a3e',gold:'#d99a3a',red:'#d0142c',dark:'#2a1d18',cream:'#efe2c8'};
const CATS=[
 {id:'nigiri',n:'Nigiri',j:'握り',note:'2 pieces · red-vinegar shari'},
 {id:'sashimi',n:'Sashimi',j:'刺身',note:'5 slices · served with fresh wasabi'},
 {id:'signature',n:'Signature Rolls',j:'特製巻',note:'8 pieces · house creations'},
 {id:'classic',n:'Classic Rolls',j:'巻物',note:'6–8 pieces'},
 {id:'sets',n:'Sets',j:'盛合せ',note:'For sharing'},
 {id:'starters',n:'Starters',j:'前菜',note:'Small plates'},
 {id:'hot',n:'Hot Kitchen',j:'温菜',note:'Tempura, ramen, grill'},
 {id:'desserts',n:'Desserts',j:'甘味',note:'Made in house'},
 {id:'drinks',n:'Drinks',j:'飲物',note:'Sake, beer, tea'}
];
// [cat, name, jp, desc, price, qty, tags(s spicy,v veg,c chef), art, color]
const RAW=[
 ['nigiri','Sake','鮭','Faroe Islands salmon, skin lightly seared over binchotan.',7,'2 pcs','','nigiri',C.salmon],
 ['nigiri','Maguro','鮪','Bluefin akami, marinated 20 minutes in soy.',9,'2 pcs','','nigiri',C.tuna],
 ['nigiri','Chutoro','中トロ','Medium-fatty bluefin from the side of the belly. Aged five days.',13,'2 pcs','c','nigiri',C.toro],
 ['nigiri','Otoro','大トロ','Fattiest cut of the bluefin belly, kissed with a torch.',16,'2 pcs','c','nigiri',C.otoro],
 ['nigiri','Hamachi','鰤','Yellowtail with a dot of yuzu kosho.',9,'2 pcs','s','nigiri',C.hamachi],
 ['nigiri','Hotate','帆立','Hokkaido scallop, flaky sea salt and lime zest.',10,'2 pcs','','nigiri',C.scallop],
 ['nigiri','Unagi','鰻','Freshwater eel, grilled and brushed with our 3-year tare.',9,'2 pcs','','nigiri',C.eel],
 ['nigiri','Amaebi','甘海老','Sweet raw shrimp. Heads fried crisp on the side.',8,'2 pcs','','nigiri',C.shrimp],
 ['nigiri','Madai','真鯛','Sea bream cured in kombu overnight.',8,'2 pcs','','nigiri',C.tai],
 ['nigiri','Shime Saba','〆鯖','Mackerel salted and cured in rice vinegar.',7,'2 pcs','','nigiri',C.saba],
 ['nigiri','Tamago','玉子','Sweet layered omelette, made each morning.',5,'2 pcs','v','nigiri',C.egg],
 ['nigiri','Ikura Gunkan','いくら','Salmon roe marinated in sake and soy.',10,'2 pcs','','gunkan',C.roe],
 ['sashimi','Salmon','鮭','Belly and loin, cut thick.',13,'5 slices','','sashimi',C.salmon],
 ['sashimi','Bluefin Akami','赤身','Lean bluefin, deep red, clean finish.',16,'5 slices','','sashimi',C.tuna],
 ['sashimi','Hamachi','鰤','Yellowtail with ponzu and chives.',15,'5 slices','','sashimi',C.hamachi],
 ['sashimi','Madai','真鯛','Kombu-cured sea bream, thin usuzukuri cut.',14,'5 slices','','sashimi',C.tai],
 ['sashimi','Toro','トロ','Chutoro and otoro side by side.',26,'5 slices','c','sashimi',C.toro],
 ['sashimi','Moriawase','盛合せ',"Chef's selection of five fish.",39,'18 slices','c','sashimi',C.tuna],
 ['signature','Red Katana','赤刀','Spicy tuna, tempura flakes, chili threads, sriracha mayo. Our namesake.',18,'8 pcs','sc','roll',C.tuna],
 ['signature','Black Blade','黒刃','Eel, avocado and cucumber, black sesame, squid-ink tare.',19,'8 pcs','c','roll',C.eel],
 ['signature','Ronin','浪人','Salmon and cream cheese, torched salmon on top, ikura.',18,'8 pcs','','roll',C.salmon],
 ['signature','Shogun','将軍','Tempura shrimp and crab, topped with chutoro and truffle ponzu.',24,'8 pcs','c','roll',C.toro],
 ['signature','Bushido','武士道','Hamachi, jalapeño, cilantro, yuzu.',17,'8 pcs','s','roll',C.hamachi],
 ['signature','Dragon Fire','火龍','Tempura shrimp inside, eel on top, spicy mayo, torched.',20,'8 pcs','s','roll',C.eel],
 ['signature','Kamikaze','神風','Spicy salmon, crispy onion, chili oil.',16,'8 pcs','s','roll',C.salmon],
 ['signature','Midnight Garden','夜庭','Tempura sweet potato, avocado, shiso, ume plum.',14,'8 pcs','v','roll',C.gold],
 ['signature','Shinobi','忍','Seared scallop, crab, tobiko, yuzu aioli.',21,'8 pcs','','roll',C.scallop],
 ['classic','California','加州巻','Crab, avocado, cucumber, tobiko.',11,'8 pcs','','maki',C.shrimp],
 ['classic','Philadelphia','フィラデルフィア','Salmon, cream cheese, cucumber.',13,'8 pcs','','maki',C.salmon],
 ['classic','Spicy Tuna','鉄火','Chopped tuna, chili, scallion.',12,'8 pcs','s','maki',C.tuna],
 ['classic','Salmon Avocado','鮭アボカド','Salmon and ripe avocado.',11,'8 pcs','','maki',C.salmon],
 ['classic','Futomaki','太巻','Thick roll with tamago, crab, cucumber, kanpyo, shiitake.',13,'8 pcs','','maki',C.egg],
 ['classic','Negihama','ねぎはま','Yellowtail and scallion.',9,'6 pcs','','maki',C.hamachi],
 ['classic','Kappa','河童巻','Cucumber and sesame.',6,'6 pcs','v','maki',C.green],
 ['classic','Avocado','アボカド巻','Avocado and shiso leaf.',7,'6 pcs','v','maki',C.green],
 ['sets','Nigiri Set','握り盛','Ten pieces of nigiri, chef\'s pick from the day\'s fish.',36,'10 pcs','c','set',C.tuna],
 ['sets','Ronin Set','浪人セット','Red Katana, California, Philadelphia.',42,'24 pcs','','set',C.salmon],
 ['sets','Samurai Set','侍セット','Three signature rolls, two classics, six nigiri.',68,'46 pcs','c','set',C.tuna],
 ['sets','Shogun Set','将軍セット','Our largest board for 4–5 guests: rolls, nigiri, sashimi.',109,'72 pcs','c','set',C.toro],
 ['sets','Green Set','菜食セット','Midnight Garden, Kappa, Avocado, tamago nigiri.',34,'28 pcs','v','set',C.green],
 ['starters','Edamame','枝豆','Steamed soybeans, flaky salt.',6,'','v','small',C.green],
 ['starters','Fire Edamame','辛枝豆','Tossed in garlic chili oil.',7,'','sv','small',C.red],
 ['starters','Miso Soup','味噌汁','Red miso, tofu, wakame, scallion.',5,'','','bowl',C.gold],
 ['starters','Wakame Salad','若布','Seaweed, sesame dressing, cucumber.',7,'','v','small',C.green],
 ['starters','Tuna Tataki','鮪たたき','Seared bluefin, ponzu, garlic chips.',16,'','','sashimi',C.tuna],
 ['starters','Hamachi Crudo','鰤カルパッチョ','Yellowtail, jalapeño, yuzu soy, olive oil.',17,'','s','sashimi',C.hamachi],
 ['starters','Agedashi Tofu','揚出豆腐','Crisp tofu in warm dashi, grated daikon.',9,'','v','fried',C.cream],
 ['hot','Ebi Tempura','海老天','Five tiger prawns, light batter, tentsuyu.',14,'5 pcs','','fried',C.gold],
 ['hot','Yasai Tempura','野菜天','Seasonal vegetables in tempura batter.',11,'','v','fried',C.gold],
 ['hot','Gyoza','餃子','Pork and cabbage, pan-fried crisp.',10,'6 pcs','','fried',C.cream],
 ['hot','Chicken Karaage','唐揚げ','Soy-ginger marinated, fried twice, yuzu mayo.',12,'','','fried',C.gold],
 ['hot','Tonkotsu Ramen','豚骨','18-hour pork broth, chashu, ajitama egg.',16,'','','bowl',C.cream],
 ['hot','Hell Miso Ramen','地獄味噌','Spicy red miso broth, ground pork, chili threads.',16,'','s','bowl',C.red],
 ['hot','Black Cod Miso','銀鱈','Marinated three days in saikyo miso, broiled.',28,'','c','fried',C.dark],
 ['desserts','Mochi Trio','餅','Matcha, sakura and black sesame.',9,'3 pcs','v','sweet','#9fb86a'],
 ['desserts','Matcha Cheesecake','抹茶','Baked cheesecake, Uji matcha.',10,'','v','sweet','#86a253'],
 ['desserts','Black Sesame Ice Cream','黒胡麻','Churned in house.',7,'','v','sweet','#2a2624'],
 ['desserts','Yuzu Tart','柚子','Sharp citrus curd, toasted meringue.',9,'','v','sweet',C.egg],
 ['drinks','Junmai Sake','純米酒','Dry and rice-forward. Warm or chilled.',22,'300 ml','','cup',C.cream],
 ['drinks','Junmai Daiginjo','大吟醸','Polished to 50%. Floral, served cold.',38,'300 ml','c','cup','#e8ecef'],
 ['drinks','Umeshu','梅酒','Plum liqueur over ice.',11,'90 ml','','cup','#c9782f'],
 ['drinks','Whisky Highball','ハイボール','Japanese whisky, soda, lemon.',14,'','','cup','#d8a14a'],
 ['drinks','Sapporo','札幌','Japanese lager.',7,'500 ml','','cup',C.egg],
 ['drinks','Yuzu Lemonade','柚子','House yuzu, sparkling water.',6,'','v','cup','#f1dc6a'],
 ['drinks','Iced Matcha','抹茶','Ceremonial matcha, milk of your choice.',6,'','v','cup','#86a253'],
 ['drinks','Sencha','煎茶','Green tea, free refills.',4,'','v','cup','#a8b85a']
];

const ITEMS=RAW.map((r,i)=>({id:'i'+i,c:r[0],n:r[1],j:r[2],d:r[3],p:r[4],q:r[5],t:r[6]}));
const byId=Object.fromEntries(ITEMS.map(x=>[x.id,x]));
if($('#itemTotal'))$('#itemTotal').textContent=ITEMS.length;

/* ---------- Ensō brush circle ---------- */
function rng(s){return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646}}
const ENSO={hero:{seed:7,start:-1.75,sweep:5.55,w:.092,alpha:1,dur:1700},oma:{seed:19,start:-2.4,sweep:5.2,w:.07,alpha:.75,dur:1400},page:{seed:31,start:-1.2,sweep:5.4,w:.08,alpha:.9,dur:1500}};
function enso(cv,delay){
  const o=ENSO[cv.dataset.enso]||ENSO.page,size=cv.clientWidth;if(!size)return;
  const dpr=Math.min(2,devicePixelRatio||1);cv.width=size*dpr;cv.height=size*dpr;
  const g=cv.getContext('2d');g.scale(dpr,dpr);g.lineCap='butt';
  const rand=rng(o.seed),R=size*.36,cx=size/2,cy=size/2,W=size*o.w,N=460;
  const br=[...Array(70)].map(()=>({o:rand()-.5,a:.18+rand()*.7,gap:rand(),w:.4+rand()*1.6,f:2+rand()*9,ph:rand()*6.28,m:.02+rand()*.07}));
  const wob=[...Array(N+2)].map((_,i)=>Math.sin(i*.045+o.seed)*size*.007+(rand()-.5)*size*.0015);
  function seg(i){
    const t=i/N,a1=o.start+o.sweep*t,a2=o.start+o.sweep*(i+1)/N;
    const press=Math.pow(Math.sin(Math.min(1,t*4+.08)*Math.PI/2),.5)*(1-.62*t);
    const wd=W*(.3+press),r1=R+wob[i],r2=R+wob[i+1];
    g.strokeStyle=`rgba(179,18,29,${.34*o.alpha*(1-t*.6)})`;g.lineWidth=wd*.62;
    g.beginPath();g.moveTo(cx+Math.cos(a1)*r1,cy+Math.sin(a1)*r1);g.lineTo(cx+Math.cos(a2)*r2,cy+Math.sin(a2)*r2);g.stroke();
    for(const b of br){
      if(t>.55&&b.gap<(t-.55)*2.3)continue;
      if(rand()<.06)continue;const off=(b.o+Math.sin(t*b.f+b.ph)*b.m)*wd,x1=cx+Math.cos(a1)*(r1+off),y1=cy+Math.sin(a1)*(r1+off),x2=cx+Math.cos(a2)*(r2+off),y2=cy+Math.sin(a2)*(r2+off);
      g.strokeStyle=`rgba(${b.a>.75?'214,32,42':'179,18,29'},${b.a*o.alpha})`;g.lineWidth=b.w*size/420;
      g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();
    }
  }
  if(RM){for(let k=0;k<N;k++)seg(k);return}
  let i=0;const per=Math.ceil(N/(o.dur/16));
  const frame=()=>{for(let k=0;k<per&&i<N;k++,i++)seg(i);if(i<N)requestAnimationFrame(frame)};
  setTimeout(()=>requestAnimationFrame(frame),delay);
}
const ensoObs='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){ensoObs.unobserve(e.target);enso(e.target,e.target.dataset.enso==='oma'?0:INTRO-300)}}),{rootMargin:'0px 0px 10% 0px'}):null;
$$('canvas.enso').forEach(c=>ensoObs?ensoObs.observe(c):enso(c,0));

/* ---------- Hero split title ---------- */
const cut=$('#cut');
if(cut){
  const geo=()=>{const w=cut.offsetWidth*1.08,h=cut.offsetHeight;cut.style.setProperty('--ang',(Math.atan2(-.12*h,w)*180/Math.PI)+'deg')};
  geo();addEventListener('resize',geo);
  setTimeout(()=>cut.classList.add('go'),INTRO+(RM?0:250));
}

/* ---------- Scroll-drawn katana ---------- */
const stage=$('#stage');
if(stage){
  const sw=$('#sword'),parts=$$('.part',stage),pct=$('#pct'),gl=$('#glintRect');
  let ticking=false;
  const upd=()=>{ticking=false;
    const r=stage.getBoundingClientRect(),total=Math.max(1,stage.offsetHeight-innerHeight);
    let p=RM?1:Math.min(1,Math.max(0,(-r.top+innerHeight*.15)/(total*.8)));
    const e=1-Math.pow(1-p,2.2);
    sw.setAttribute('transform',`translate(${(-620*e).toFixed(1)} 0)`);
    parts.forEach(g=>g.style.opacity=e>=+g.dataset.at?1:0);
    pct.textContent=String(Math.round(e*100)).padStart(2,'0')+'%';
  };
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(upd)}},{passive:true});
  addEventListener('resize',upd);upd();
  if(!RM&&gl.animate)gl.animate([{transform:'translateX(0px)'},{transform:'translateX(700px)'}],{duration:3200,iterations:Infinity,easing:'cubic-bezier(.6,0,.3,1)'});
}

/* ---------- Signature rows ---------- */
const sig=$('#sig');
if(sig){
  sig.innerHTML=['Red Katana','Otoro','Black Blade','Shogun'].map(n=>ITEMS.find(x=>x.n===n)).map(x=>`<article class="srow rv"><span class="vjp">${x.j}</span><h3>${x.n}<em>${x.q}</em></h3><p>${x.d}</p><div class="pb"><span class="price">${money(x.p)}</span><button class="arrow" type="button" data-add="${x.id}">Add to order</button></div><span class="k" aria-hidden="true">${x.j[0]}</span></article>`).join('');
}

/* ---------- Order ---------- */
let cart={};
try{cart=JSON.parse(localStorage.getItem('kk-cart')||'{}')||{}}catch(e){cart={}}
Object.keys(cart).forEach(k=>{if(!byId[k])delete cart[k]});
const save=()=>{try{localStorage.setItem('kk-cart',JSON.stringify(cart))}catch(e){}};
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const sub=()=>Object.entries(cart).reduce((a,[k,v])=>a+byId[k].p*v,0);
function syncAdds(){
  const n=count();$('#cartCount').textContent=n;$('#cartBtn').classList.toggle('has',n>0);
  $$('[data-add]').forEach(b=>{const c=cart[b.dataset.add]||0;
    if(b.classList.contains('plus')){b.classList.toggle('in',c>0);b.textContent=c?c:'+'}
    else b.textContent=c?`In your order · ${c}`:'Add to order'});
}
function toast(m){const r=$('#toastRoot');r.innerHTML=`<div class="toast">${m}</div>`;clearTimeout(toast.t);toast.t=setTimeout(()=>r.innerHTML='',2400)}
function sel(btn){const t=btn.previousElementSibling;if(!t)return;const r=document.createRange();r.selectNodeContents(t);const s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='Selected'}
/* ---------- Menu ---------- */
const chips=$('#chips');
function flags(x){return (x.t.includes('c')?'<span class="fl c">chef’s selection</span>':'')+(x.t.includes('s')?'<span class="fl s">spicy</span>':'')+(x.t.includes('v')?'<span class="fl v">vegetarian</span>':'')}
if(chips){
  chips.innerHTML=CATS.map((c,i)=>`<button type="button" data-cat="${c.id}"${i?'':' class="on"'}>${c.n}</button>`).join('');
  const render=()=>{
    const q=$('#q').value.trim().toLowerCase(),sp=$('#fSpicy').checked,vg=$('#fVeg').checked;let html='';
    CATS.forEach(c=>{
      const list=ITEMS.filter(x=>x.c===c.id&&(!sp||x.t.includes('s'))&&(!vg||x.t.includes('v'))&&(!q||(x.n+' '+x.d+' '+x.j).toLowerCase().includes(q)));
      if(!list.length)return;
      html+=`<section class="mcat" id="cat-${c.id}" data-cat="${c.id}"><div class="mcat-side"><div><span class="lbl">${list.length} ${list.length>1?'dishes':'dish'}</span><h2 style="margin-top:16px">${c.n}</h2><p>${c.note}</p></div><span class="vjp">${c.j}</span></div><div class="mlist">${list.map(x=>`<div class="mi"><div class="mi-top"><h3>${x.n}<span class="jp">${x.j}</span></h3><span class="dots"></span><span class="price">${money(x.p)}</span><button class="plus" type="button" data-add="${x.id}" aria-label="Add ${x.n} to order">+</button></div><p>${x.d}${x.q?`<span class="q">${x.q}</span>`:''}${flags(x)}</p></div>`).join('')}</div></section>`;
    });
    $('#menuBody').innerHTML=html||'<div class="mempty"><b>Nothing matches.</b><span>Try another word, or clear the filters.</span></div>';
    syncAdds();spyOn();
  };
  const setChip=id=>{$$('button',chips).forEach(b=>b.classList.toggle('on',b.dataset.cat===id));const on=$('button.on',chips);if(on){const r=chips.getBoundingClientRect(),o=on.getBoundingClientRect();if(o.left<r.left||o.right>r.right)chips.scrollBy({left:o.left-r.left-20,behavior:'smooth'})}};
  chips.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const s=$('#cat-'+b.dataset.cat);if(s)scrollTo({top:s.getBoundingClientRect().top+scrollY-$('.nav').offsetHeight-$('.mbar').offsetHeight+1,behavior:RM?'auto':'smooth'});setChip(b.dataset.cat)});
  let spy;const spyOn=()=>{spy&&spy.disconnect();spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setChip(e.target.dataset.cat)}),{rootMargin:'-35% 0px -60% 0px'});$$('.mcat').forEach(s=>spy.observe(s))};
  $('#q').addEventListener('input',render);$('#fSpicy').addEventListener('change',render);$('#fVeg').addEventListener('change',render);
  render();
}

document.addEventListener('click',e=>{
  const a=e.target.closest('[data-add]');
  if(a){const id=a.dataset.add;cart[id]=(cart[id]||0)+1;save();syncAdds();toast(`${byId[id].n} added`);if(drawerOpen)renderDrawer()}
  const cp=e.target.closest('[data-copy]');
  if(cp){const done=()=>{cp.textContent='Copied';setTimeout(()=>cp.textContent='Copy',1600)};try{navigator.clipboard.writeText(cp.dataset.copy).then(done,()=>sel(cp))}catch(err){sel(cp)}}
});
let drawerOpen=false,mode='pickup',placed=null,lastFocus=null;
$('#cartBtn').addEventListener('click',()=>{lastFocus=document.activeElement;drawerOpen=true;placed=null;renderDrawer();setTimeout(()=>$('.drawer .x')?.focus(),40)});
function closeDrawer(){drawerOpen=false;$('#drawerRoot').innerHTML='';lastFocus&&lastFocus.focus()}
function renderDrawer(){
  const ent=Object.entries(cart).filter(([,v])=>v>0),s=sub(),fee=mode==='delivery'&&s?4:0,tot=s+fee;
  const keep={n:$('#oName')?.value,p:$('#oPhone')?.value,a:$('#oAddr')?.value};
  let body;
  if(placed)body=`<div class="db"><div class="ok" style="margin-top:30px"><span class="lbl red">Order ${placed.no}</span><h3>Received.<br><em class="it">The blade is moving.</em></h3><p>${placed.mode==='delivery'?'Delivery to '+placed.addr+' in about 45 minutes.':'Ready for pickup at 24 Ember Lane in about 25 minutes.'} We will call ${placed.phone} if anything changes.</p><p style="font-family:var(--serif);font-size:28px;color:var(--paper)">${money(placed.tot)}</p></div></div>`;
  else if(!ent.length)body=`<div class="db"><div class="dempty"><b>Nothing here yet.</b><p>Open the menu and choose a few pieces.</p><a class="btn solid" href="menu.html" data-close>Open the menu</a></div></div>`;
  else body=`<div class="db">${ent.map(([k,v])=>{const x=byId[k];return `<div class="li"><div><b>${x.n}</b><small>${x.j} · ${money(x.p)}${x.q?' · '+x.q:''}</small></div><div class="lp">${money(x.p*v)}</div><div class="step"><button type="button" data-q="${k}" data-d="-1" aria-label="Remove one ${x.n}">−</button><span>${v}</span><button type="button" data-q="${k}" data-d="1" aria-label="Add one ${x.n}">+</button></div></div>`}).join('')}</div>
  <form class="df" id="orderForm" novalidate>
    <div class="mode" role="radiogroup" aria-label="Pickup or delivery"><label for="mP"><input type="radio" name="m" id="mP" value="pickup"${mode==='pickup'?' checked':''}>Pickup</label><label for="mD"><input type="radio" name="m" id="mD" value="delivery"${mode==='delivery'?' checked':''}>Delivery</label></div>
    <div class="grid2" style="gap:20px"><div class="f" id="oN"><label for="oName">Name</label><input id="oName" autocomplete="name"><span class="err" hidden>Add your name.</span></div><div class="f" id="oP"><label for="oPhone">Phone</label><input id="oPhone" type="tel" autocomplete="tel"><span class="err" hidden>Add a phone number.</span></div></div>
    ${mode==='delivery'?'<div class="f" id="oA"><label for="oAddr">Delivery address</label><input id="oAddr" autocomplete="street-address"><span class="err" hidden>Add a street address.</span></div>':''}
    <div class="sum"><div><span>Subtotal</span><span>${money(s)}</span></div>${mode==='delivery'?`<div><span>Delivery</span><span>${money(fee)}</span></div>`:''}<div class="tot"><span>Total</span><span>${money(tot)}</span></div></div>
    <button class="btn solid" type="submit">Place order · ${money(tot)}</button>
  </form>`;
  $('#drawerRoot').innerHTML=`<div class="scrim" data-close></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Your order"><div class="dh"><div><span class="lbl">Chūmon · 注文</span><h3>Your order</h3></div><button class="x" type="button" data-close aria-label="Close your order">×</button></div>${body}</aside>`;
  if($('#oName')){$('#oName').value=keep.n||'';$('#oPhone').value=keep.p||'';if($('#oAddr'))$('#oAddr').value=keep.a||''}
}
$('#drawerRoot').addEventListener('click',e=>{
  if(e.target.closest('[data-close]')&&!e.target.closest('a')){closeDrawer();return}
  const q=e.target.closest('[data-q]');if(q){const k=q.dataset.q;cart[k]=(cart[k]||0)+(+q.dataset.d);if(cart[k]<=0)delete cart[k];save();syncAdds();renderDrawer()}
});
$('#drawerRoot').addEventListener('change',e=>{if(e.target.name==='m'){mode=e.target.value;renderDrawer();$('#m'+(mode==='pickup'?'P':'D'))?.focus()}});
$('#drawerRoot').addEventListener('submit',e=>{
  e.preventDefault();
  const ok=[check('oN','oName'),check('oP','oPhone'),mode==='delivery'?check('oA','oAddr'):true].every(Boolean);
  if(!ok){$('.f.bad input')?.focus();return}
  placed={no:'KK-'+(1000+Math.floor(Math.random()*9000)),mode,addr:$('#oAddr')?.value||'',phone:$('#oPhone').value,tot:sub()+(mode==='delivery'?4:0)};
  cart={};save();syncAdds();renderDrawer();
});
function check(w,id){const el=$('#'+w),bad=!$('#'+id).value.trim();el.classList.toggle('bad',bad);el.querySelector('.err').hidden=!bad;return !bad}
document.addEventListener('input',e=>{const w=e.target.closest('.f.bad');if(w&&e.target.value.trim()){w.classList.remove('bad');w.querySelector('.err').hidden=true}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(drawerOpen)closeDrawer();if(!$('#sheet').hidden)toggleSheet(false)}});
syncAdds();

/* ---------- Reservation ---------- */
if($('#resForm')){
  const pad=n=>String(n).padStart(2,'0'),iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const d=new Date();d.setDate(d.getDate()+1);if(d.getDay()===1)d.setDate(d.getDate()+1);
  $('#rDate').value=iso(d);$('#rDate').min=iso(new Date());
  $('#rGuests').innerHTML=[1,2,3,4,5,6,7,8].map(n=>`<option value="${n}"${n===2?' selected':''}>${n} ${n>1?'guests':'guest'}</option>`).join('');
  const fill=()=>{
    const seat=$('input[name="seat"]:checked').value,cur=$('#rTime').value;let t=[];
    if(seat==='omakase')t=['18:00','20:30'];else{for(let h=12;h<=21;h++)t.push(h+':00',h+':30');t.push('22:00')}
    const want=t.includes(cur)?cur:(seat==='omakase'?'18:00':'19:30');
    $('#rTime').innerHTML=t.map(x=>`<option${x===want?' selected':''}>${x}</option>`).join('');
    const max=seat==='omakase'?4:8;$$('#rGuests option').forEach(o=>o.disabled=+o.value>max);if(+$('#rGuests').value>max)$('#rGuests').value=String(max);
  };
  $$('input[name="seat"]').forEach(r=>r.addEventListener('change',fill));
  if(location.hash==='#omakase')$('#sOma').checked=true;
  fill();
  $('#resForm').addEventListener('submit',e=>{
    e.preventDefault();
    if(![check('fName','rName'),check('fPhone','rPhone')].every(Boolean)){$('.f.bad input')?.focus();return}
    const seat={table:'a table',omakase:'the omakase counter',private:'the private room'}[$('input[name="seat"]:checked').value];
    const ds=new Date($('#rDate').value+'T12:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'}),g=$('#rGuests').value;
    $('#resBox').innerHTML=`<div class="ok"><span class="lbl red">Request received</span><h3>${$('#rName').value.trim().split(' ')[0]}, your seat<br>is <em class="it">on hold.</em></h3><p>${g} ${g>1?'guests':'guest'} at ${seat}, ${ds} at ${$('#rTime').value}. We will call ${$('#rPhone').value} within two hours to confirm.</p><div style="margin-top:40px;display:flex;gap:28px;flex-wrap:wrap;align-items:center"><a class="btn solid" href="menu.html">Browse the menu</a><a class="arrow" href="reserve.html">Make another booking</a></div></div>`;
    scrollTo({top:$('#resBox').getBoundingClientRect().top+scrollY-140,behavior:RM?'auto':'smooth'});
  });
}

/* ---------- Katana transition between pages ---------- */
const slash=$('#slash'),pa=$('.pa',slash),pb=$('.pb',slash),seam=$('#seam'),mark=$('#mark');
const seamGeom=()=>{const w=innerWidth,h=innerHeight;seam.style.width=Math.hypot(w,.2*h)+'px';seam.style.top=(.6*h)+'px';return Math.atan2(-.2*h,w)*180/Math.PI};
async function cutOpen(){
  if(RM){slash.hidden=true;return}
  slash.hidden=false;const ang=seamGeom();
  [pa,pb].forEach(p=>p.getAnimations().forEach(x=>x.cancel()));
  await seam.animate([{transform:`rotate(${ang}deg) scaleX(0)`,opacity:1},{transform:`rotate(${ang}deg) scaleX(1)`,opacity:1}],{duration:260,easing:'cubic-bezier(.9,0,.3,1)',fill:'forwards'}).finished;
  mark.animate([{opacity:getComputedStyle(mark).opacity},{opacity:0}],{duration:160,fill:'forwards'});
  const o={duration:1000,easing:'cubic-bezier(.75,0,.15,1)',fill:'forwards'};
  pa.animate([{transform:'translate(0,0)'},{transform:'translate(-3%,-1%)',offset:.2},{transform:'translate(-24%,-112%)'}],o);
  pb.animate([{transform:'translate(0,0)'},{transform:'translate(3%,1%)',offset:.2},{transform:'translate(24%,112%)'}],o);
  seam.animate([{opacity:1},{opacity:0}],{duration:600,fill:'forwards'});
  await new Promise(r=>setTimeout(r,1000));
  slash.hidden=true;
}
async function cutClose(){
  slash.hidden=false;mark.getAnimations().forEach(x=>x.cancel());mark.style.opacity=0;seam.getAnimations().forEach(x=>x.cancel());seam.style.opacity=0;
  const o={duration:520,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'};
  pa.animate([{transform:'translate(-24%,-112%)'},{transform:'translate(0,0)'}],o);
  await pb.animate([{transform:'translate(24%,112%)'},{transform:'translate(0,0)'}],o).finished;
}
let leaving=false;
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href]');
  if(!a||e.defaultPrevented||a.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0)return;
  let url;try{url=new URL(a.getAttribute('href'),location.href)}catch(err){return}
  if(url.origin!==location.origin||!/\.html$/.test(url.pathname))return;
  toggleSheet(false);if(drawerOpen)closeDrawer();
  if(url.pathname===location.pathname&&!url.hash){e.preventDefault();scrollTo({top:0,behavior:RM?'auto':'smooth'});return}
  if(RM||leaving)return;
  e.preventDefault();leaving=true;cutClose().then(()=>{location.href=url.href});
});
addEventListener('pageshow',e=>{if(e.persisted){leaving=false;mark.style.opacity=0;cutOpen()}});

/* ---------- Mobile sheet ---------- */
function toggleSheet(open){$('#sheet').hidden=!open;$('#burger').setAttribute('aria-expanded',String(open))}
$('#burger').addEventListener('click',()=>toggleSheet($('#sheet').hidden));

/* ---------- Reveal ---------- */
if(!RM&&'IntersectionObserver' in window){
  const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('play');ro.unobserve(e.target)}}),{rootMargin:'0px 0px 8% 0px'});
  requestAnimationFrame(()=>$$('.rv').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight)ro.observe(el)}));
}

/* ---------- Blade trail ---------- */
const cv=$('#trail'),cx=cv.getContext('2d');let pts=[],on=false;
const size=()=>{const r=Math.min(2,devicePixelRatio||1);cv.width=innerWidth*r;cv.height=innerHeight*r;cx.setTransform(r,0,0,r,0,0)};
function loop(){
  const now=performance.now();pts=pts.filter(p=>now-p.t<180);cx.clearRect(0,0,innerWidth,innerHeight);
  for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],k=i/pts.length;if(Math.hypot(b.x-a.x,b.y-a.y)<2)continue;
    cx.lineCap='round';cx.strokeStyle=`rgba(227,38,47,${k*.35})`;cx.lineWidth=k*6;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke();
    cx.strokeStyle=`rgba(255,255,255,${k*.85})`;cx.lineWidth=k*1.1;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}
  if(pts.length)requestAnimationFrame(loop);else{on=false;cx.clearRect(0,0,innerWidth,innerHeight)}
}
if(!RM&&matchMedia('(pointer:fine)').matches){size();addEventListener('resize',size);addEventListener('pointermove',e=>{pts.push({x:e.clientX,y:e.clientY,t:performance.now()});if(pts.length>36)pts.shift();if(!on){on=true;requestAnimationFrame(loop)}},{passive:true})}else cv.hidden=true;

/* ---------- Boot ---------- */
try{sessionStorage.setItem('kk-seen','1')}catch(e){}
if(!RM)setTimeout(cutOpen,FIRST?650:80);
})();
