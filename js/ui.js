// ARAYÜZ: sade durum özeti, kontroller, hazır senaryolar
const volley=()=>{spawn('gcr',H*.3);spawn('pro',H*.5);spawn('e',H*.7)};
const startSPE=()=>{S.spe={t:0};$('al').style.display='block';lg('Güneş parçacık olayı başladı')};
function reset(){S.day=0;S.spe=null;S.P=[];S.X=[];S.hist=[];S.log=[];S.st=[0,0,0,0];S.man=0;$('al').style.display='none';$('sh').classList.remove('on');crew.forEach((c,i)=>{c.d=0;c.h=0;c.sh=0;c.x=G.home[i][0];c.y=G.home[i][1]});volley()}
function sync(){$('env').value=S.env;$('mat').value=S.mat;$('th').value=S.t;$('mag').checked=!!S.mag;$('est').checked=!!S.est;$('aut').checked=!!S.auto}
const PRE={iss:['iss','al',20],moon:['moon','re',100],mars:['mars','pe',40],storm:['mars','al',15,1]};
function preset(k){const[e,m,t,s]=PRE[k];reset();Object.assign(S,{env:e,mat:m,t,mag:0,est:0,auto:1});sync();geo();document.querySelectorAll('.pre').forEach(b=>b.classList.toggle('on',b.dataset.p===k));if(s)startSPE();lg('Senaryo: '+ENV[e].n)}
function ui(){const sr=speRate(),D=parts(S.mat,S.t,0,sr),mxd=Math.max(...crew.map(c=>c.d)),lv=D.tot>3.5||mxd>500?2:D.tot>1.2||mxd>250?1:0,C=['var(--ok)','var(--wa)','var(--cr)'];
 $('day').textContent='GÜN '+S.day.toFixed(1);$('st').textContent=['GÜVENLİ','DİKKAT','TEHLİKE'][lv];$('st').style.color=$('stbox').style.borderColor=C[lv];
 const dy=D.tot>0?(600-mxd)/D.tot:1e9,yr=dy>730?(dy/365).toFixed(1)+' yıl':Math.round(dy)+' gün';
 $('msg').textContent=S.spe?'☀ Güneş fırtınası sürüyor! '+(crew[0].sh?'Mürettebat sığınakta.':'Mürettebatı sığınağa alın.'):`Kabinde günde ${D.tot.toFixed(2)} mSv alınıyor. `+(dy<2e4?`Bu hızla kariyer sınırına ~${yr} sonra ulaşılır.`:'Kariyer sınırı için risk yok.');
 $('tip').textContent=lv?(S.mat==='none'||S.mat==='al'?'💡 Öneri: Zırhı polietilen veya su yap, kalınlığı artır.':S.t<60?'💡 Öneri: Zırh kalınlığını artır.':'💡 Öneri: Sığınağı kullan.'):'';
 $('rate').firstChild.nodeValue=D.tot.toFixed(2)+' ';const mx=Math.max(D.tot,1e-6);
 $('stk').innerHTML=SPC.map(s=>`<div style="width:${D[s[0]]/mx*100}%;background:${s[2]}"></div>`).join('');
 $('spc').innerHTML=SPC.map(s=>`<div class="sp"><span style="color:${s[2]}">● ${s[1]}</span><b class="m">${D[s[0]].toFixed(2)}</b></div>`).join('');
 $('crw').innerHTML=crew.map(c=>{const p=Math.min(100,c.d/6);return`<div class="cr"><div class="h"><span style="color:${c.c}">${c.n}</span><span class="m">${c.d.toFixed(1)} mSv</span></div><div class="bar"><div style="width:${p}%;background:${p>80?'var(--cr)':p>40?'var(--wa)':'var(--ok)'}"></div></div><div class="sp" style="color:var(--mu)"><span>${c.sh?'🛡 Sığınakta':'Çalışıyor'}</span><span>risk +${(c.d/600*3).toFixed(2)}%</span></div></div>`}).join('');
 S.st.forEach((v,i)=>$('s'+(i+1)).textContent=v);$('lg').innerHTML=S.log.slice(0,8).map(l=>`<div>${l}</div>`).join('');
 const t=S.mat==='none'?2:S.t;$('tv').textContent=`${t<20?'İnce':t<60?'Orta':t<110?'Kalın':'Çok kalın'} · ${t} g/cm²`;$('note').innerHTML=MAT[S.mat].i;$('envh').textContent=ENV[S.env].s+' · temel doz '+ENV[S.env].d+' mSv/gün'}
function bind(){$('env').innerHTML=Object.entries(ENV).map(([k,e])=>`<option value="${k}">${e.n}</option>`).join('');$('mat').innerHTML=Object.entries(MAT).map(([k,m])=>`<option value="${k}">${m.n}</option>`).join('');sync();
 $('env').onchange=e=>{S.env=e.target.value;S.P=[];volley();lg('Ortam: '+ENV[S.env].n)};$('mat').onchange=e=>{S.mat=e.target.value;geo();S.P=[];volley()};$('th').oninput=e=>{S.t=+e.target.value;geo()};
 $('mag').onchange=e=>S.mag=+e.target.checked;$('est').onchange=e=>S.est=+e.target.checked;$('aut').onchange=e=>S.auto=+e.target.checked;
 $('sh').onclick=e=>{S.man=!S.man;e.target.classList.toggle('on',S.man)};$('spe').onclick=startSPE;$('vol').onclick=volley;
 $('pz').onclick=e=>{S.pause=!S.pause;e.target.textContent=S.pause?'▶':'⏸'};$('spd').onclick=e=>{const o=[1,.3,4,12];S.spd=o[(o.indexOf(S.spd)+1)%4];e.target.textContent='Hız ×'+S.spd};
 $('rs').onclick=reset;$('hb').onclick=()=>$('help').showModal();document.querySelectorAll('.pre').forEach(b=>b.onclick=()=>preset(b.dataset.p));
 document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{S.mode=b.dataset.m;document.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x===b))})}
