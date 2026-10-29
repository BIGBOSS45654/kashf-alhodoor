const V='kashf-v2',JQ='https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-180.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);try{await c.put(JQ,await fetch(JQ,{mode:'no-cors'}))}catch(x){}}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))caches.open(V).then(c=>c.put(r,res.clone()));return res}).catch(()=>hit||(r.mode==='navigate'?caches.match('index.html'):Response.error()));e.waitUntil(net.catch(()=>0));return hit||net}))});
