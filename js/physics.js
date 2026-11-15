// FİZİK: doz modeli, geometri, Monte Carlo parçacık taşınımı
// ---- FİZİK ÇEKİRDEĞİ ----
function parts(mat,t,sh,spe){
 const m=MAT[mat],E=ENV[S.env],tt=mat==='none'?2:t,A=(t_,k)=>[Math.exp(-t_/k.L),k.b*(t_/15)*Math.exp(-t_/15)];
 let [p,s]=A(tt,m);if(sh){const[p2,s2]=A(sh,MAT.wa);s=s*p2+s2*p;p*=p2}
 if(p+s<.3){const k=.3/(p+s);p*=k;s*=k}
 const w=tt/m.rf+sh,Em=Math.pow(w/.0022,1/1.77),Tp=Math.exp(-Math.max(0,Em-10)/35),Ts=Math.exp(-Math.max(0,Em-20)/60),
 Te=Math.exp(-(tt/m.rf+sh)/.9),br=.05*m.z*(1-Te),a=S;
 const D={gcr:E.d*E.f.gcr*p*(a.mag?.9:1)*(a.est?.97:1),sec:E.d*E.f.gcr*s+E.d*E.f.e*br,pro:E.d*E.f.pro*Tp*(a.mag?.5:1)*(a.est?.6:1),
 e:E.d*E.f.e*Te*(a.mag?.3:1)*(a.est?1.3:1),spe:spe*Ts*(a.mag?.5:1)*(a.est?.6:1)};
 D.tot=D.gcr+D.sec+D.pro+D.e+D.spe;D.Em=Em;D.Te=Te;D.br=br;return D}
const speRate=()=>S.spe&&S.spe.t<4?40*ENV[S.env].sp*(S.spe.t<.2?S.spe.t/.2:Math.exp(-(S.spe.t-.2)/1.2)):0;
const lg=t=>{S.log.unshift(`G${S.day.toFixed(1)} · ${t}`);S.log.length=Math.min(S.log.length,30)};
// ---- GEOMETRİ ----
function size(){const d=devicePixelRatio||1;for(const[c,x]of[[cv,cx],[ch,cc]]){c.width=c.clientWidth*d;c.height=c.clientHeight*d;x.setTransform(d,0,0,d,0,0)}W=cv.clientWidth;H=cv.clientHeight;Wc=ch.clientWidth;Hc=ch.clientHeight}
function geo(){const m=S.mat,hx=W*.66,hy=H*.5,cw=Math.min(240,W*.3),chh=Math.min(300,H*.62),wall=m==='none'?3:6+S.t*.28;
 G={hx,hy,cw,chh,wall,wl:hx-cw/2-wall,sx:hx+cw*.06,sw:cw*.4,sy:hy-chh*.22,sh:chh*.44};
 G.home=[[hx-cw*.3,hy-chh*.2],[hx-cw*.3,hy+chh*.15],[hx-cw*.08,hy-chh*.02]];G.shl=[0,1,2].map(i=>[G.sx+G.sw/2,hy-chh*.14+i*chh*.14])}
// ---- PARÇACIKLAR ----
const SP={gcr:['#e879f9',8,2.4],pro:['#fbbf24',6,3.2],spe:['#fb923c',6,3.8],e:['#38bdf8',4.5,3],sec:['#ef4444',3.5,2],xr:['#fde68a',3,4]};
function spawn(tp,y,x,vx,vy){const k=SP[tp],E=tp==='pro'?10+ex(35):tp==='spe'?20+ex(60):tp==='gcr'?1000:1,L={gcr:'Fe 1 GeV/n',pro:`p⁺ ${E|0} MeV`,spe:`SPE p⁺ ${E|0} MeV`,e:'e⁻',sec:'ikincil',xr:'X'}[tp];
 y=y??H*.14+R()*H*.72;S.P.push({x:x??-10,y,by:y,vx:vx??k[2]*(tp==='pro'||tp==='spe'?1:1),vy:vy??(R()-.5)*.3,tp,c:k[0],r:k[1],E,L,ph:R()*6,w:tp==='sec'||tp==='xr'?1:0,k:0,s:0,tr:[]})}
function rip(x,y,c,t){S.X.push({x,y,c,t,r:4,a:1});if(S.X.length>24)S.X.shift()}
function pick(){const f=ENV[S.env].f,r=R();return r<f.gcr?'gcr':r<f.gcr+f.pro?'pro':'e'}
function wallHit(p){const m=MAT[S.mat],tt=S.mat==='none'?2:S.t,D=parts(S.mat,S.t,0,0);
 if(p.tp==='gcr'){if(R()<1-Math.exp(-tt/m.nl)){const n=1+Math.round(m.b*8*R()+m.b*3);S.st[2]+=n;for(let i=0;i<n;i++)spawn('sec',p.y+(R()-.5)*20,G.wl+G.wall+6,1.2+R()*2,(R()-.5)*2.2);rip(G.wl,p.y,'#ef4444','Fragmentasyon');p.r*=.8}return 1}
 if(p.tp==='pro'||p.tp==='spe'){if(p.E<D.Em){S.st[1]++;rip(G.wl,p.y,m.c,'Durdu');return 0}return 1}
 if(R()>D.Te){S.st[1]++;if(R()<D.br*5){spawn('xr',p.y,G.wl+G.wall,4,(R()-.5)*1.5);S.st[2]++;rip(G.wl,p.y,'#fde68a','Bremsstrahlung')}return 0}return 1}
function step(dt){
 const k=dt*60*S.spd,dd=dt*.5*S.spd;S.day+=dd;S.acc+=dd;
 if(S.spe){S.spe.t+=dd;if(S.spe.t>4){S.spe=null;$('al').style.display='none';lg('SPE sona erdi')}}
 const sr=speRate(),E=ENV[S.env],auto=S.auto&&S.spe&&S.spe.t>.25;
 crew.forEach((c,i)=>{const w=S.man||auto?1:0;if(w!==c.sh){c.sh=w;if(i===0)lg(w?'Mürettebat sığınakta':'Mürettebat çalışma alanında')}
  const T=c.sh?G.shl[i]:G.home[i];c.x+=((T[0])-c.x)*Math.min(1,.08*k);c.y+=(T[1]-c.y)*Math.min(1,.08*k);c.f*=.93;
  const D=parts(S.mat,S.t,c.sh?20:0,sr);c.d+=D.tot*dd});
 if(S.acc>.5){S.acc=0;S.hist.push([S.day,...crew.map(c=>c.d)]);if(S.hist.length>500)S.hist.shift()}
 if(R()<E.r*dt*S.spd&&S.P.length<45)spawn(pick());
 if(sr>0&&R()<Math.min(.9,sr*.12*dt*S.spd*8)&&S.P.length<60)spawn('spe');
 for(let i=S.P.length-1;i>=0;i--){const p=S.P[i];p.tr.push([p.x,p.y]);if(p.tr.length>16)p.tr.shift();
  if(p.tp==='e'&&!p.k){p.ph+=.14*k;p.y=p.by+Math.sin(p.ph)*20}else p.y+=p.vy*k;
  if((S.mag||S.est)&&!p.k&&p.w===0&&p.tp!=='sec'&&p.x>G.wl-120&&p.x<G.wl-8){p.k=1;
   const pm=S.mag?{gcr:.1,pro:.5,spe:.5,e:.7}[p.tp]:0,pe=S.est&&p.tp!=='e'?{gcr:.03,pro:.4,spe:.4}[p.tp]:0;
   if(R()<1-(1-pm)*(1-pe)){p.vy=(p.y<G.hy?-1:1)*(2.4+R());p.vx*=.6;S.st[0]++;rip(p.x,p.y,S.mag&&R()<.6?'#22d3ee':'#a78bfa',S.mag?'Manyetik saptırma':'Elektrostatik itme')}}
  if(!p.w&&p.x>=G.wl&&Math.abs(p.y-G.hy)<G.chh/2+G.wall){p.w=1;if(!wallHit(p)){S.P.splice(i,1);continue}}
  if(p.w&&!p.s&&p.x>G.sx&&p.y>G.sy&&p.y<G.sy+G.sh&&crew.some(c=>c.sh)){p.s=1;const pass={gcr:.85,pro:.25,spe:.2,e:0,sec:.6,xr:.5}[p.tp];if(R()>pass){S.st[1]++;rip(p.x,p.y,'#2dd4bf','Sığınak durdurdu');S.P.splice(i,1);continue}}
  let hit=0;if(p.x>G.hx-G.cw/2)for(const c of crew)if(Math.hypot(p.x-c.x,p.y-c.y)<14){c.f=1;c.h++;S.st[3]++;hit=1;break}
  if(hit){S.P.splice(i,1);continue}
  p.x+=p.vx*k;if(p.x>W+40||p.x<-60||p.y<-40||p.y>H+40)S.P.splice(i,1)}
 for(let i=S.X.length-1;i>=0;i--){const r=S.X[i];r.r+=dt*40;r.y-=dt*12;r.a-=dt*1.1;if(r.a<=0)S.X.splice(i,1)}}
