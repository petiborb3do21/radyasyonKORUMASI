// BAŞLATMA & ANA DÖNGÜ
bind();addEventListener('resize',()=>{size();geo()});
let last=0;function loop(ts){const dt=Math.min(.1,(ts-last)/1000||0);last=ts;if(!S.pause)step(dt);draw();if((S.ui+=dt)>.15){S.ui=0;ui();chart()}requestAnimationFrame(loop)}
size();geo();crew.forEach((c,i)=>{c.x=G.home[i][0];c.y=G.home[i][1]});volley();ui();requestAnimationFrame(loop);
try{if(!localStorage.getItem('rl_seen')){$('help').showModal();localStorage.setItem('rl_seen',1)}}catch(e){$('help').showModal()}
