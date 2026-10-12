(function(){
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
function gpath(n,rt,rr){const a=Math.PI*2/n;let d='';for(let i=0;i<n;i++){const t=i*a;[[rr,0],[rt,.14],[rt,.36],[rr,.5]].forEach(([r,k],q)=>{d+=(i==0&&q==0?'M':'L')+(Math.cos(t+k*a)*r).toFixed(2)+' '+(Math.sin(t+k*a)*r).toFixed(2)})}return d+'Z'}
// about from db.js
$('#abh').innerHTML=about.title.join('<br>');
$('#abp').innerHTML=about.paragraphs.map((t,i)=>'<p class="ab-p rv" style="transition-delay:'+i*.08+'s">'+t+'</p>').join('');
$('#skl').innerHTML=skills.map(s=>'<span>'+s+'</span>').join('');
$('#mono').textContent=about.initials;$('#bdg').textContent=about.badge;
$('#abg').innerHTML='<path d="'+gpath(24,86.7,71.7)+'"/><circle r="80"/><circle r="22"/><circle r="9"/><circle r="52" stroke-dasharray="3 5"/>';
// projects from db.js
$('#rows').innerHTML=projects.map((p,i)=>'<div class="row" data-i="'+(i%4)+'"><span class="n">'+p.num+'</span><span class="t">'+p.title+'</span><span class="g">'+p.tag+'</span><span class="s">'+p.tech.slice(0,4).join(' · ')+(p.tech.length>4?' +'+(p.tech.length-4):'')+'</span><span class="l">'+(p.github?'<a href="'+p.github+'" target="_blank" rel="noopener">GitHub ↗</a>':'')+(p.live?'<a href="'+p.live+'" target="_blank" rel="noopener">Canlı ↗</a>':'')+'</span></div>').join('');
// rəqəmlər db.js-dəki stats-dan gəlir
const st=(typeof stats!=='undefined')?stats:{years:3,projects:projects.length,technologies:skills.length};
$('#nyr') && ($('#nyr').dataset.n=st.years);
$('#npj').dataset.n=st.projects;$('#nsk').dataset.n=st.technologies;
// loader
let pc=0;const pe=$('#pc'),pl=$('#pl');
const li=setInterval(()=>{pc=Math.min(100,pc+(calm?100:Math.ceil(Math.random()*8)));pe.textContent=String(pc).padStart(3,'0');pl.style.transform='scaleX('+pc/100+')';
  if(pc>=100){clearInterval(li);setTimeout(()=>{$('#ld').classList.add('out');document.body.classList.remove('load')},300)}},55);
// reveal + counters
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');x.target.querySelectorAll('[data-n]').forEach(c=>{const n=+c.dataset.n;let v=0;const id=setInterval(()=>{v++;c.textContent=String(v).padStart(2,'0')+(n>9?'+':'');if(v>=n)clearInterval(id)},90)});io.unobserve(x.target)}}),{threshold:.08});
$$('.rv').forEach(el=>io.observe(el));
// cursor, preview
const cu=$('#cu'),pv=$('#pvw');let tx=0,ty=0,cx=0,cy=0,px=0,py=0,lcx=0,lcy=0,th2=0;
// mechanical cursor: two meshing gears
const gm=1.6,gAn=14,gBn=8,gAR=gm*gAn/2,gBR=gm*gBn/2,gD=gAR+gBR,gPhi=Math.PI/4,gaA=Math.PI*2/gAn,gaB=Math.PI*2/gBn;
const gA0=gPhi-.25*gaA,gB0=gPhi+Math.PI-.75*gaB,gBx=13+gD*Math.cos(gPhi),gBy=13+gD*Math.sin(gPhi);
$('#paA').setAttribute('d',gpath(gAn,gAR+gm,gAR-1.25*gm));$('#paB').setAttribute('d',gpath(gBn,gBR+gm,gBR-1.25*gm));
const cgA=$('#cgA'),cgB=$('#cgB');
addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});
$$('a,button').forEach(el=>{el.addEventListener('pointerenter',()=>cu.classList.add('big'));el.addEventListener('pointerleave',()=>cu.classList.remove('big'))});
const mc=$('#mc'),c2=mc.getContext('2d'),cap=$('#cap');
const caps=['MEXANİZM 01 — DİŞLİ ÇARX ÇİFTİ','MEXANİZM 02 — KRİVOŞİP-PORŞEN','MEXANİZM 03 — MANOMETR','MEXANİZM 04 — PLANETAR REDUKTOR'];
let mi=0,mt=0,col='#b8935a',dim='#8a8f96';
const KK=1040/340;mc.width=1040;mc.height=Math.round(240*KK);c2.setTransform(KK,0,0,KK,0,0);
const P2=Math.PI*2,d2=Math.PI/180;
function gp(c,n,rt,rr,rot){const a=P2/n;c.beginPath();for(let i=0;i<n;i++){const t=rot+i*a;[[rr,0],[rt,.14],[rt,.36],[rr,.5]].forEach(([r,k],j)=>{const X=Math.cos(t+k*a)*r,Y=Math.sin(t+k*a)*r;(i==0&&j==0)?c.moveTo(X,Y):c.lineTo(X,Y)})}c.closePath();c.stroke()}
function ci(c,x,y,r,d){c.beginPath();c.arc(x,y,r,0,P2);if(d){c.save();c.setLineDash([3,4]);c.strokeStyle=dim;c.stroke();c.restore()}else c.stroke()}
function ln(c,x1,y1,x2,y2,d){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);if(d){c.save();c.setLineDash([6,3,1,3]);c.strokeStyle=dim;c.stroke();c.restore()}else c.stroke()}
function drawM(){
  const c=c2;c.clearRect(0,0,340,240);c.lineWidth=1.3;c.strokeStyle=col;c.shadowColor=col;c.shadowBlur=12;c.fillStyle=dim;c.font='9px "IBM Plex Mono",monospace';mt+=.016;const th=mt;
  if(mi==0){
    const m=5.2,aA=P2/20,aB=P2/12;
    c.save();c.translate(112,112);gp(c,20,52+m,52-1.25*m,-.25*aA+th);ci(c,0,0,52,1);ci(c,0,0,7);ln(c,-68,0,68,0,1);ln(c,0,-68,0,68,1);c.restore();
    c.save();c.translate(195.2,112);gp(c,12,31.2+m,31.2-1.25*m,Math.PI-.75*aB-th*20/12);ci(c,0,0,31.2,1);ci(c,0,0,5);ln(c,-46,0,46,0,1);ln(c,0,-46,0,46,1);c.restore();
    ln(c,112,190,195.2,190);ln(c,112,185,112,195);ln(c,195.2,185,195.2,195);c.fillText('a = 83.2',132,184);c.fillText('Z 20',60,52);c.fillText('Z 12',212,66);
  }else if(mi==1){
    const cx=70,cy=118,r=32,L=100,sn=Math.sin(th*1.4),cs=Math.cos(th*1.4),pxx=cx+r*cs+Math.sqrt(L*L-r*r*sn*sn),pyy=cy+r*sn;
    ln(c,cx-50,cy,300,cy,1);ci(c,cx,cy,r,1);
    c.beginPath();c.moveTo(105,cy-24);c.lineTo(300,cy-24);c.moveTo(105,cy+24);c.lineTo(300,cy+24);c.stroke();
    c.strokeRect(pxx-15,cy-20,30,40);
    ln(c,cx,cy,pyy>-1?cx+r*cs:0,pyy);ln(c,cx+r*cs,pyy,pxx,cy);
    ci(c,cx,cy,6);ci(c,cx+r*cs,pyy,4);ci(c,pxx,cy,4);
    c.fillText('r = 32',cx-16,cy+r+22);c.fillText('L = 100',150,186);ln(c,70,196,300,196,1);c.fillText('S = 64',210,208);
  }else if(mi==2){
    const cx=170,cy=116,R=78,a0=135*d2,sw=270*d2,v=.5+.5*Math.sin(th*.9)+.015*Math.sin(th*11);
    ci(c,cx,cy,R);ci(c,cx,cy,R-6,1);
    for(let i=0;i<=40;i++){const a=a0+i/40*sw,l=i%5==0?12:6;ln(c,cx+Math.cos(a)*(R-6),cy+Math.sin(a)*(R-6),cx+Math.cos(a)*(R-6-l),cy+Math.sin(a)*(R-6-l));
      if(i%5==0){c.textAlign='center';c.fillText(String(i*2),cx+Math.cos(a)*(R-26),cy+Math.sin(a)*(R-26)+3)}}
    c.textAlign='center';c.fillText('BAR',cx,cy+34);c.textAlign='left';
    const na=a0+v*sw;ln(c,cx-Math.cos(na)*14,cy-Math.sin(na)*14,cx+Math.cos(na)*(R-12),cy+Math.sin(na)*(R-12));
    c.beginPath();c.arc(cx,cy,5,0,P2);c.fillStyle=col;c.fill();c.fillStyle=dim;
  }else{
    const m=4,as=P2/12,ar=P2/36,phi=th*.5,cx=170,cy=118;
    c.save();c.translate(cx,cy);
    gp(c,36,72-m,72+1.25*m,-.25*ar);ci(c,0,0,87);ci(c,0,0,72,1);
    gp(c,12,24+m,24-1.25*m,-.25*as+4*phi);ci(c,0,0,4);
    for(let k=0;k<3;k++){const b=phi+k*P2/3,x=Math.cos(b)*48,y=Math.sin(b)*48;ln(c,0,0,x,y,1);
      c.save();c.translate(x,y);gp(c,12,24+m,24-1.25*m,Math.PI-.75*as-2*phi);ci(c,0,0,4);c.restore()}
    c.restore();
    c.fillText('Z 12 / 12 / 36',112,226);
  }
}
$$('.row').forEach(r=>{
  r.addEventListener('pointerenter',()=>{if(!pv.classList.contains('show')){px=tx-(pv.offsetWidth||520)/2;py=ty-(pv.offsetHeight||367)-28}mi=+r.dataset.i;mt=0;const cs=getComputedStyle(document.documentElement);col=cs.getPropertyValue('--brass').trim()||col;dim=cs.getPropertyValue('--mute').trim()||dim;cap.textContent=caps[mi];pv.classList.add('show')});
  r.addEventListener('pointerleave',()=>pv.classList.remove('show'));
});
// copy, clock, up
const em='salam@example.com',tt=$('#toast');
$('#cp').addEventListener('click',()=>{const done=()=>{tt.classList.add('on');setTimeout(()=>tt.classList.remove('on'),2000)};
  const fb=()=>{const x=document.createElement('textarea');x.value=em;document.body.appendChild(x);x.select();try{document.execCommand('copy')}catch(e){}x.remove();done()};
  if(navigator.clipboard)navigator.clipboard.writeText(em).then(done,fb);else fb()});
$('#up').addEventListener('click',()=>scrollTo({top:0}));
function clk(){try{$('#clk').textContent='Bakı · '+new Date().toLocaleTimeString('az',{timeZone:'Asia/Baku',hour:'2-digit',minute:'2-digit'})}catch(e){}}
clk();setInterval(clk,30000);
// section state + HUD
let act=0;
const so=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){act=+x.target.dataset.s;$('#h1n').textContent='0'+(act+1);$('#h2n').textContent=x.target.dataset.n.toUpperCase()}}),{rootMargin:'-45% 0px -45% 0px'});
$$('[data-s]').forEach(el=>so.observe(el));
const nv=$('#nv'),hp=$('#hpc');let lastY=scrollY,dy=0,render=null,mx=0,my=0;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth*2-1;my=-(e.clientY/innerHeight*2-1)});
function tick(){
  cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cu.style.transform='translate('+cx+'px,'+cy+'px)';
  const gdx=cx-lcx,gdy=cy-lcy;th2+=Math.hypot(gdx,gdy)*.05*((gdx+gdy)>=0?1:-1)+.004;lcx=cx;lcy=cy;
  cgA.setAttribute('transform','translate(13 13) rotate('+((gA0+th2)*180/Math.PI).toFixed(2)+')');
  cgB.setAttribute('transform','translate('+gBx.toFixed(2)+' '+gBy.toFixed(2)+') rotate('+((gB0-th2*gAn/gBn)*180/Math.PI).toFixed(2)+')');
  const pw=pv.offsetWidth||520,ph=pv.offsetHeight||367,up=ty-ph-28>76,qx=Math.min(Math.max(tx-pw/2,12),innerWidth-pw-12),qy=up?ty-ph-28:Math.min(ty+36,innerHeight-ph-12);px+=(qx-px)*.14;py+=(qy-py)*.14;pv.style.transform='translate('+px+'px,'+py+'px)';
  const y=scrollY,max=Math.max(1,document.body.scrollHeight-innerHeight);
  dy+=((y-lastY)-dy)*.1;lastY=y;
  nv.classList.toggle('sc',y>40);hp.textContent=String(Math.round(y/max*100)).padStart(3,'0')+'%';
  if(pv.classList.contains('show'))drawM();
  if(render)render();
  requestAnimationFrame(tick);
}
tick();
if(typeof THREE==='undefined')return;
// ---- 3D: precision gear train ----
const R=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,alpha:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.15;
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(35,1,.1,100);C.position.z=14;
const ec=document.createElement('canvas');ec.width=1024;ec.height=512;const x=ec.getContext('2d');
const gr=x.createLinearGradient(0,0,0,512);gr.addColorStop(0,'#2a2d33');gr.addColorStop(.5,'#101215');gr.addColorStop(1,'#1c1f24');
x.fillStyle=gr;x.fillRect(0,0,1024,512);
x.fillStyle='#ffffff';x.fillRect(180,40,60,400);x.fillRect(600,20,260,36);
x.fillStyle='#ffd9a0';x.fillRect(720,120,170,50);x.fillStyle='#9fb4ff';x.fillRect(380,300,120,30);
const et=new THREE.CanvasTexture(ec);et.mapping=THREE.EquirectangularReflectionMapping;et.encoding=THREE.sRGBEncoding;
S.environment=new THREE.PMREMGenerator(R).fromEquirectangular(et).texture;
const k1=new THREE.DirectionalLight(0xffe2b8,1.1);k1.position.set(4,6,8);S.add(k1);
const k2=new THREE.DirectionalLight(0x9fb4ff,.5);k2.position.set(-6,-3,-4);S.add(k2);
const mat=(c,r)=>new THREE.MeshStandardMaterial({color:c,metalness:1,roughness:r,envMapIntensity:1.2});
const steel=mat(0xa4aab2,.3),brass=mat(0xb8935a,.34),gun=mat(0x5a6068,.4),dark=mat(0x2a2d32,.5);
function gear(n,m,th,win){
  const Rp=m*n/2,ro=Rp+m,rr=Rp-1.25*m,a=Math.PI*2/n,s=new THREE.Shape();
  for(let i=0;i<n;i++){const t=i*a;[[rr,0],[ro,.14],[ro,.36],[rr,.5]].forEach(([r,k],j)=>{const px=Math.cos(t+k*a)*r,py=Math.sin(t+k*a)*r;(i==0&&j==0)?s.moveTo(px,py):s.lineTo(px,py)})}
  s.closePath();
  const h=new THREE.Path();h.absarc(0,0,Rp*.2,0,Math.PI*2,true);s.holes.push(h);
  for(let k=0;k<win;k++){const an=k/win*Math.PI*2,w=new THREE.Path();w.absarc(Math.cos(an)*Rp*.6,Math.sin(an)*Rp*.6,Rp*.17,0,Math.PI*2,true);s.holes.push(w)}
  const g=new THREE.ExtrudeGeometry(s,{depth:th,bevelEnabled:true,bevelThickness:.035,bevelSize:.03,bevelSegments:2,curveSegments:24});
  g.translate(0,0,-th/2);return{g,Rp,a};
}
const m=.16,GA=gear(30,m,.5,6),GB=gear(18,m,.5,5),GC=gear(12,m,.5,0),GD=gear(14,m,.5,3),d2r=Math.PI/180;
const phiBC=70*d2r,phiAD=240*d2r;
const specs=[
 {G:GA,n:30,pos:[0,0],rot0:-.25*GA.a,dir:1,mt:steel},
 {G:GB,n:18,pos:[GA.Rp+GB.Rp,0],rot0:Math.PI-.75*GB.a,dir:-1,mt:brass},
 {G:GC,n:12,pos:[GA.Rp+GB.Rp+(GB.Rp+GC.Rp)*Math.cos(phiBC),(GB.Rp+GC.Rp)*Math.sin(phiBC)],rot0:phiBC+Math.PI-.75*GC.a,dir:1,mt:steel},
 {G:GD,n:14,pos:[(GA.Rp+GD.Rp)*Math.cos(phiAD),(GA.Rp+GD.Rp)*Math.sin(phiAD)],rot0:phiAD+Math.PI-.75*GD.a,dir:-1,mt:gun}
];
const W=new THREE.Group(),V=new THREE.Group();V.add(W);S.add(V);
W.position.set(-1.7,.45,0);
specs.forEach(o=>{
  const me=new THREE.Mesh(o.G.g,o.mt);me.position.set(o.pos[0],o.pos[1],0);W.add(me);o.me=me;
  const ax=new THREE.Mesh(new THREE.CylinderGeometry(o.G.Rp*.14,o.G.Rp*.14,1,32),dark);ax.rotation.x=Math.PI/2;ax.position.set(o.pos[0],o.pos[1],0);W.add(ax);
});
// dial with ticks
const tp=[];for(let i=0;i<180;i++){const an=i/180*Math.PI*2,l=i%15==0?.5:.2,r0=6.3;tp.push(Math.cos(an)*r0,Math.sin(an)*r0,0,Math.cos(an)*(r0+l),Math.sin(an)*(r0+l),0)}
const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.Float32BufferAttribute(tp,3));
const dial=new THREE.LineSegments(dg,new THREE.LineBasicMaterial({color:0xb8935a,transparent:true,opacity:.55}));dial.position.z=-1;V.add(dial);
let wide=true;
function size(){const w=innerWidth,h=innerHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();wide=w>900}
addEventListener('resize',size);size();
let th=0,gx=0,gy=0,gs=1;
render=function(){
  th+=calm?0:.0035+dy*.0045;
  specs.forEach(o=>{o.me.rotation.z=o.rot0+o.dir*th*30/o.n});
  dial.rotation.z=-th*.15;
  const tg=wide?[[3.1,0,1],[3.6,-.4,.7],[3.6,-.4,.001],[3.6,-.4,.001]][act]:[[0,1.9,.5],[0,2.4,.4],[0,2.4,.001],[0,2.4,.001]][act];
  gx+=(tg[0]-gx)*.05;gy+=(tg[1]-gy)*.05;gs+=(tg[2]-gs)*.05;
  V.position.set(gx,gy,0);V.scale.setScalar(gs);V.visible=gs>.01;
  V.rotation.y+=((-.38+mx*.18)-V.rotation.y)*.05;V.rotation.x+=((-.28-my*.12)-V.rotation.x)*.05;
  if(V.visible)R.render(S,C);
};
})();