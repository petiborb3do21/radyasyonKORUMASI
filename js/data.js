// VERİ & DURUM: ortamlar, malzemeler, simülasyon durumu
const $=i=>document.getElementById(i),R=Math.random,ex=m=>-m*Math.log(1-R());
const ENV={iss:{n:'ISS · Alçak Dünya Yörüngesi',s:'Manyetosfer korumalı · SAA geçişleri',d:.55,f:{gcr:.35,pro:.5,e:.15},r:1.5,sp:.05},
belt:{n:'Van Allen Kuşakları',s:'Hapsolmuş proton ve elektron sağanağı',d:18,f:{gcr:.02,pro:.38,e:.6},r:4,sp:1},
moon:{n:'Ay Yüzeyi · Artemis',s:'Manyetosfer dışı · ½ uzay (zemin korur)',d:1.37,f:{gcr:.85,pro:.15,e:0},r:2.2,sp:1},
mars:{n:'Mars Transferi',s:'Derin uzay · yoğun GCR (MSL/RAD ≈1.84)',d:1.84,f:{gcr:.93,pro:.07,e:0},r:2.6,sp:1}};
// rf: su-eşdeğeri menzil çarpanı · L/b: GCR birincil sönüm / ikincil tepe · z: bremsstrahlung · nl: nükleer etkileşim uzunluğu
const MAT={none:{n:'Sadece kabuk (2 g/cm²)',c:'#64748b',rf:1.25,L:120,b:.45,z:.9,nl:20,i:'<b style="color:var(--cr)">Korunmasız:</b> ince alüminyum kabuk neredeyse hiçbir şeyi durdurmaz.'},
al:{n:'Alüminyum',c:'#94a3b8',rf:1.25,L:120,b:.45,z:.9,nl:20,i:'<b style="color:var(--wa)">İkincil radyasyon:</b> ince Al, GCR parçalanmasıyla nötron ve fragman üretir; doz önce artabilir.'},
pe:{n:'Polietilen (HDPE)',c:'#38bdf8',rf:.92,L:75,b:.1,z:.1,nl:9,i:'<b style="color:var(--ok)">Hidrojen zengini:</b> ağır iyonları az fragmanla yavaşlatır; gram başına en verimli pasif zırh.'},
wa:{n:'Su bariyeri',c:'#2dd4bf',rf:1,L:85,b:.12,z:.15,nl:11,i:'<b style="color:var(--ok)">Çok işlevli:</b> hem içme suyu hem zırh; HDPE’ye yakın performans.'},
re:{n:'Ay regoliti',c:'#a8a29e',rf:1.3,L:110,b:.3,z:.5,nl:16,i:'<b style="color:var(--ok)">Yerinde kaynak:</b> metrelerce kalınlıkta etkili; derinde nötron birikimi azalımı sınırlar.'}};
const SPC=[['gcr','GCR birincil','var(--gcr)'],['sec','İkincil / X','var(--sec)'],['pro','Proton','var(--pro)'],['e','Elektron','var(--e)'],['spe','Güneş olayı','var(--spe)']];
const S={env:'iss',mat:'al',t:30,mag:0,est:0,auto:1,man:0,pause:0,spd:1,lab:1,day:0,spe:null,P:[],X:[],st:[0,0,0,0],hist:[],log:[],mode:'time',acc:0,ui:0};
const crew=[{n:'Komutan',c:'#fbbf24'},{n:'Mühendis',c:'#38bdf8'},{n:'Bilim Uzm.',c:'#a78bfa'}].map(o=>({...o,x:0,y:0,sh:0,d:0,f:0,h:0}));
const cv=$('sim'),cx=cv.getContext('2d'),ch=$('ch'),cc=ch.getContext('2d');let W,H,Wc,Hc,G={};
