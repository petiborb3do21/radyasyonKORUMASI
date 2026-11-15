// ÇİZİM: sahne ve grafikler
// ---- ÇİZİM ----
const rgba=(h,a)=>{const n=parseInt(h.slice(1),16);return`rgba(${n>>16},${n>>8&255},${n&255},${a})`};
function draw(){const g=cx.createLinearGradient(0,0,W,H);g.addColorStop(0,S.spe?'#1f0a0e':'#07101f');g.addColorStop(1,'#02040a');cx.fillStyle=g;cx.fillRect(0,0,W,H);
 const t=performance.now()/1000;for(let i=0;i<60;i++){cx.fillStyle=`rgba(226,232,240,${.2+.5*((i*37)%10)/10})`;cx.fillRect((i*97.3+t*(2+i%4))%W,(i*53.7)%H,1.4,1.4)}
 cx.font='600 11px "JetBrains Mono",monospace';cx.textAlign='left';cx.fillStyle='rgba(148,163,184,.7)';cx.fillText('ORTAM: '+ENV[S.env].n.toUpperCase(),14,22);
 if(S.env==='iss'||S.env==='belt'){const r=cx.createRadialGradient(0,H+200,100,0,H+200,330);r.addColorStop(0,'#0b3b6e');r.addColorStop(1,'rgba(11,59,110,0)');cx.fillStyle=r;cx.beginPath();cx.arc(0,H+200,330,0,7);cx.fill()}
 if(S.env==='belt'){cx.strokeStyle='rgba(56,189,248,.14)';for(let k=0;k<4;k++){cx.beginPath();cx.moveTo(0,H*(.2+k*.2));cx.bezierCurveTo(W*.3,H*(.05+k*.2),W*.6,H*(.35+k*.2),W,H*(.2+k*.2));cx.stroke()}}
 if(S.env==='moon'){cx.fillStyle='#1e293b';cx.fillRect(0,H-26,W,26);cx.fillStyle='#64748b';cx.fillText('MARE TRANQUILLITATIS',14,H-9)}
 if(S.env==='mars'){cx.fillStyle='rgba(180,80,40,.10)';cx.beginPath();cx.arc(W+100,H*.9,260,0,7);cx.fill()}
 const{hx,hy,cw,chh,wall,wl}=G,m=MAT[S.mat];
 if(S.mag){cx.save();cx.strokeStyle='rgba(34,211,238,.7)';cx.lineWidth=2;cx.setLineDash([8,6]);cx.lineDashOffset=-t*30;cx.beginPath();cx.ellipse(wl,hy,125,chh*.72,0,Math.PI*.5,Math.PI*1.5);cx.stroke();cx.fillStyle='#22d3ee';cx.font='bold 10px sans-serif';cx.fillText('MANYETİK ALAN',wl-120,hy-chh*.58);cx.restore()}
 if(S.est){cx.save();cx.strokeStyle='rgba(167,139,250,.85)';cx.lineWidth=2.5;cx.shadowColor='#8b5cf6';cx.shadowBlur=14;cx.beginPath();cx.ellipse(wl,hy,62,chh*.6,0,Math.PI*.5,Math.PI*1.5);cx.stroke();cx.restore()}
 cx.fillStyle=rgba(m.c,.38);cx.strokeStyle=m.c;cx.lineWidth=2.5;cx.beginPath();cx.roundRect(wl,hy-chh/2-wall,cw+wall*2,chh+wall*2,22);cx.fill();cx.stroke();
 cx.fillStyle='#0b1220';cx.strokeStyle='#334155';cx.lineWidth=1.5;cx.beginPath();cx.roundRect(hx-cw/2,hy-chh/2,cw,chh,14);cx.fill();cx.stroke();
 cx.textAlign='center';cx.font='bold 10px "Space Grotesk",sans-serif';cx.fillStyle=m.c;cx.fillText(`ZIRH: ${m.n.toUpperCase()} · ${S.mat==='none'?2:S.t} g/cm²`,hx,hy-chh/2-wall-8);
 const on=crew.some(c=>c.sh);cx.fillStyle=on?'rgba(45,212,191,.22)':'rgba(30,41,59,.6)';cx.strokeStyle=on?'#2dd4bf':'#475569';cx.lineWidth=on?3:1.5;cx.setLineDash(on?[]:[4,4]);cx.beginPath();cx.roundRect(G.sx,G.sy,G.sw,G.sh,10);cx.fill();cx.stroke();cx.setLineDash([]);
 cx.fillStyle=on?'#2dd4bf':'#94a3b8';cx.font='bold 9px sans-serif';cx.fillText('SIĞINAK (20 g/cm² H₂O)',G.sx+G.sw/2,G.sy-5);cx.fillStyle='#475569';cx.fillText('YAŞAM / KOMUTA',hx-cw*.2,hy-chh/2+14);
 crew.forEach(c=>{cx.fillStyle=c.f>.05?`rgba(239,68,68,${.3+c.f*.6})`:'rgba(255,255,255,.05)';cx.beginPath();cx.arc(c.x,c.y,15+c.f*6,0,7);cx.fill();cx.fillStyle='#f8fafc';cx.beginPath();cx.roundRect(c.x-6,c.y-3,12,15,4);cx.fill();cx.beginPath();cx.arc(c.x,c.y-8,7,0,7);cx.fill();cx.fillStyle=c.c;cx.beginPath();cx.arc(c.x-1,c.y-8,4.5,0,7);cx.fill();cx.fillStyle='#cbd5e1';cx.font='9px sans-serif';cx.fillText(c.n,c.x,c.y+23)});
 cx.textAlign='left';
 cx.globalCompositeOperation='lighter';S.P.forEach(p=>{for(let j=1;j<p.tr.length;j++){const q=j/p.tr.length;cx.strokeStyle=rgba(p.c,q*.6);cx.lineWidth=p.r*q*1.3;cx.lineCap='round';cx.beginPath();cx.moveTo(...p.tr[j-1]);cx.lineTo(p.tr[j][0],p.tr[j][1]);cx.stroke()}
  const h=cx.createRadialGradient(p.x,p.y,1,p.x,p.y,p.r*2.6);h.addColorStop(0,'#fff');h.addColorStop(.35,p.c);h.addColorStop(1,'transparent');cx.fillStyle=h;cx.beginPath();cx.arc(p.x,p.y,p.r*2.6,0,7);cx.fill();
  if(S.lab&&p.x>20&&p.x<W-70&&p.tp!=='xr'){cx.font='600 10px "JetBrains Mono",monospace';cx.fillStyle=p.c;cx.fillText(p.L,p.x-22,p.y-p.r-6)}});cx.globalCompositeOperation='source-over';
 S.X.forEach(r=>{cx.strokeStyle=rgba(r.c.length===7?r.c:'#94a3b8',r.a);cx.lineWidth=2;cx.beginPath();cx.arc(r.x,r.y,r.r,0,7);cx.stroke();if(S.lab&&r.t){cx.font='bold 10px sans-serif';cx.fillStyle=rgba(r.c.length===7?r.c:'#94a3b8',r.a);cx.fillText(r.t,r.x-30,r.y-10)}})}
function chart(){cc.clearRect(0,0,Wc,Hc);const L=44,B=22,w=Wc-L-10,h=Hc-B-12;cc.font='10px "JetBrains Mono",monospace';cc.fillStyle='#8190ab';cc.strokeStyle='#1f2b44';cc.lineWidth=1;
 const ax=(mx,u)=>{for(let i=0;i<=4;i++){const y=12+h-h*i/4;cc.beginPath();cc.moveTo(L,y);cc.lineTo(L+w,y);cc.stroke();cc.textAlign='right';cc.fillText((mx*i/4).toFixed(mx<10?2:0),L-4,y+3)}cc.textAlign='left';cc.fillText(u,L,Hc-4)};
 if(S.mode==='time'){const H_=S.hist,mx=Math.max(1,...H_.flatMap(r=>r.slice(1)))*1.1;ax(mx,'mSv · kümülatif · '+'zaman →');
  crew.forEach((c,j)=>{cc.strokeStyle=c.c;cc.lineWidth=2;cc.beginPath();H_.forEach((r,i)=>{const x=L+w*i/Math.max(1,H_.length-1),y=12+h-h*r[j+1]/mx;i?cc.lineTo(x,y):cc.moveTo(x,y)});cc.stroke()})}
 else{const sw=Object.keys(MAT).map(k=>[k,[0,5,10,20,30,45,60,80,100,125,150].map(t=>parts(k,t,0,0).tot)]),mx=Math.max(...sw.flatMap(a=>a[1]))*1.05||1;ax(mx,'0 → 150 g/cm²  (çizgiler: malzemeler)');
  const T=[0,5,10,20,30,45,60,80,100,125,150];sw.forEach(([k,v])=>{cc.strokeStyle=MAT[k].c;cc.lineWidth=k===S.mat?3:1.5;cc.beginPath();v.forEach((y,i)=>{const X=L+w*T[i]/150,Y=12+h-h*y/mx;i?cc.lineTo(X,Y):cc.moveTo(X,Y)});cc.stroke()});
  const X=L+w*S.t/150;cc.strokeStyle='#5eead4';cc.setLineDash([4,4]);cc.beginPath();cc.moveTo(X,12);cc.lineTo(X,12+h);cc.stroke();cc.setLineDash([])}}
