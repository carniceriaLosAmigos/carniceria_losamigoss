// Configurá el WhatsApp del comercio con código de país, sin + ni espacios.
const WHATSAPP_NUMBER = "5493885820776"; // Número indicado: 3883108797 (Argentina).
const INSTAGRAM_URL = "https://www.instagram.com/carniceria_losamigos_/";
const FACEBOOK_URL = "https://www.facebook.com/share/1A33MALE4f/";  // Pendiente: el negocio todavía no compartió su perfil.
const products = [
 {id:1,name:"Asado palomita",cat:"vacuno",price:13000,unit:"kg",desc:"Para la parrilla y reuniones.",img:"img/asado.png"},
 {id:2,name:"Corte americano",cat:"vacuno",price:12000,unit:"kg",desc:"Un corte sabroso para la parrilla.",img:"img/corte americano.png"},
 {id:3,name:"Vacío",cat:"vacuno",price:16500,unit:"kg",desc:"Ideal para hacer a fuego lento.",img:"img/vacio 1.webp"},
 {id:4,name:"Costilla para estofado",cat:"vacuno",price:15000,unit:"2 kg",desc:"Presentación de 2 kg.",img:"img/costilla de carne.webp"},
 {id:5,name:"Costeleta vacuna",cat:"vacuno",price:14000,unit:"kg",desc:"Práctica para plancha o sartén.",img:"img/costeleta.png"},
 {id:6,name:"Blando especial",cat:"vacuno",price:15800,unit:"pieza",desc:"Cuadrada, bola de lomo, paleta o picaña. Un solo pedazo.",img:"img/blando.avif"},
 {id:7,name:"Pollo entero",cat:"pollo",price:3900,unit:"unidad / precio publicado",desc:"Consultá disponibilidad y tamaño.",img:"img/pollo.webp"},
 {id:8,name:"Pollo trozado",cat:"pollo",price:null,unit:"kg",desc:"Disponible en combos promocionales.",img:"img/pollo trozado.webp"},
 {id:9,name:"Cuarto trasero",cat:"pollo",price:10000,unit:"2 kg",desc:"Presentación de 2 kg.",img:"img/cuarto trasero.png"},
 {id:17,name:"Suprema de pollo",cat:"pollo",price:11300,unit:"precio publicado",desc:"Ideal para plancha o milanesas.",img:"img/pechuga 1.webp"},
 {id:10,name:"Pata muslo",cat:"pollo",price:null,unit:"consultar",desc:"También forma parte de combos promocionales.",img:"img/pata muslo 1.webp"},
 {id:11,name:"Milanesa de pollo",cat:"pollo",price:null,unit:"kg",desc:"Consultá disponibilidad y precio por WhatsApp.",img:"img/mila de pollo.webp"},
 {id:12,name:"Alitas de pollo",cat:"pollo",price:null,unit:"kg",desc:"También disponibles en combo promocional.",img:"img/alitas.webp"},
 {id:13,name:"Pierna de cerdo",cat:"cerdo",price:17500,unit:"2 kg",desc:"Precio por presentación de 2 kg.",img:"img/pierna de cerdo.jpg"},
 {id:14,name:"Costilla de cerdo",cat:"cerdo",price:17500,unit:"2 kg",desc:"Precio por presentación de 2 kg.",img:"img/costilla.png"},
 {id:15,name:"Costeleta de cerdo",cat:"cerdo",price:17500,unit:"2 kg",desc:"Precio por presentación de 2 kg.",img:"img/costeleta de cerdo.webp"},
 {id:16,name:"Morcilla",cat:"embutidos",price:7500,unit:"unidad / precio a confirmar",desc:"Para completar el asado.",img:"img/morcilla.jpg"}
];
const category={vacuno:"CARNE VACUNA",cerdo:"CERDO",pollo:"POLLO",embutidos:"EMBUTIDOS"};let cart=[];
const money=n=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);
function renderProducts(filter='todos'){
 const list=products.filter(p=>filter==='todos'||p.cat===filter);
 document.getElementById('productGrid').innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=700&q=80'"></div><div class="product-info"><span class="product-category">${category[p.cat]}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${p.price?money(p.price):'Consultar'}<small>${p.unit}</small></span><button class="add-btn" data-add="${p.id}" aria-label="Agregar ${p.name}">+</button></div></div></article>`).join('');
}
renderProducts();
document.getElementById('filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderProducts(b.dataset.filter)});
function addToCart(item){const old=cart.find(x=>x.key===item.key);old?old.qty++:cart.push({...item,qty:1});updateCart()}
document.getElementById('productGrid').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const p=products.find(x=>x.id===+b.dataset.add);addToCart({key:'p'+p.id,name:p.name,price:p.price||0,unit:p.unit})});
document.querySelector('.promo-grid').addEventListener('click',e=>{const b=e.target.closest('[data-promo]');if(!b)return;addToCart({key:'promo'+b.dataset.price+b.dataset.promo,name:b.dataset.promo,price:+b.dataset.price,unit:'combo'});});
function updateCart(){const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.qty*x.price,0);document.getElementById('cartCount').textContent=count;document.getElementById('cartTotal').textContent=money(total)+(cart.some(x=>!x.price)?' + consultas':'');const el=document.getElementById('cartItems');if(!cart.length){el.innerHTML='<p class="empty-cart">Todavía no agregaste productos.</p>';return}el.innerHTML=cart.map(x=>`<div class="cart-line"><div><b>${x.name}</b><small>${x.price?money(x.price):'Precio a consultar'} · ${x.unit}</small></div><div class="qty-controls"><button data-change="${x.key}" data-delta="-1">−</button><b>${x.qty}</b><button data-change="${x.key}" data-delta="1">+</button></div></div>`).join('')}
document.getElementById('cartItems').addEventListener('click',e=>{const b=e.target.closest('[data-change]');if(!b)return;const item=cart.find(x=>x.key===b.dataset.change);item.qty+=+b.dataset.delta;if(item.qty<=0)cart=cart.filter(x=>x.key!==item.key);updateCart()});
document.getElementById('cartOpen').onclick=()=>document.getElementById('cartOverlay').classList.add('open');document.getElementById('cartClose').onclick=()=>document.getElementById('cartOverlay').classList.remove('open');document.getElementById('cartOverlay').addEventListener('click',e=>{if(e.target.id==='cartOverlay')e.currentTarget.classList.remove('open')});
function openWhatsApp(message){if(!WHATSAPP_NUMBER){alert('Todavía falta configurar el número de WhatsApp de Los Amigos.');return}window.open('https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(message),'_blank','noopener')}
document.getElementById('sendOrder').onclick=()=>{if(!cart.length){alert('Agregá al menos un producto al pedido.');return}const lines=cart.map(x=>`• ${x.name} x ${x.qty} — ${x.price?money(x.price):'consultar precio'}`);const notes=document.getElementById('orderNotes').value.trim();openWhatsApp(`¡Hola, Los Amigos! Quiero hacer este pedido:\n${lines.join('\n')}\n\nTotal estimado: ${money(cart.reduce((s,x)=>s+x.qty*x.price,0))}\nIndicaciones: ${notes||'Sin indicaciones'}\n\n¿Me confirman disponibilidad, precio final y delivery?`)};
document.getElementById('whatsappContact').onclick=e=>{e.preventDefault();openWhatsApp('¡Hola! Quería consultar por los cortes y promociones de hoy.')};
document.querySelectorAll('[data-social]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const key=a.dataset.social;const url=key==='instagram'?INSTAGRAM_URL:key==='facebook'?FACEBOOK_URL:(WHATSAPP_NUMBER?'https://wa.me/'+WHATSAPP_NUMBER:'');if(url)window.open(url,'_blank','noopener');else alert('Falta configurar el enlace de '+(key==='whatsapp'?'WhatsApp':key==='instagram'?'Instagram':'Facebook')+' de Carnicería Los Amigos.');}));
// Asistente conversacional de Los Amigos. Funciona localmente con respuestas inteligentes programadas.
const chatState={topic:'',people:null,waitingFor:'',lastProducts:[]};
const chatBox=document.getElementById('chatMessages');
const chatInput=document.getElementById('chatInput');
const quickSets={
 inicio:[['🥩 Quiero hacer un asado','asado'],['🍗 Algo con pollo','pollo'],['🔥 Ver promociones','promociones'],['🛵 Consultar delivery','delivery']],
 comida:[['🥩 Asado','asado'],['🍽️ Milanesas','milanesas'],['🍲 Estofado o guiso','estofado'],['🍗 Pollo','pollo']],
 seguir:[['Ver promociones','promociones'],['Consultar precios','precios'],['Armar mi pedido','pedido'],['Delivery','delivery']]
};
function addChat(text,who){const d=document.createElement('div');d.className='bubble '+who;d.textContent=text;chatBox.appendChild(d);chatBox.scrollTop=chatBox.scrollHeight;return d}
function addQuickReplies(items){const old=chatBox.querySelector('.quick-questions');if(old)old.remove();const wrap=document.createElement('div');wrap.className='quick-questions';items.forEach(([label,value])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.question=value;wrap.appendChild(b)});chatBox.appendChild(wrap);chatBox.scrollTop=chatBox.scrollHeight}
function showTyping(){const t=document.createElement('div');t.className='bubble bot typing';t.innerHTML='<span></span><span></span><span></span>';chatBox.appendChild(t);chatBox.scrollTop=chatBox.scrollHeight;return t}
function addChatAction(label,action){const wrap=document.createElement('div');wrap.className='chat-action-row';const b=document.createElement('button');b.type='button';b.className='chat-action';b.textContent=label;b.dataset.chatAction=action;wrap.appendChild(b);chatBox.appendChild(wrap);chatBox.scrollTop=chatBox.scrollHeight}
function moneyChat(n){return money(n).replace(',00','')}
function answerFor(raw){
 const q=raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 if(/^(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches)/.test(q))return {text:'¡Hola! 😊 Qué bueno tenerte por acá. Soy el asistente de Los Amigos y te ayudo a elegir. ¿Qué tenés ganas de cocinar hoy o qué necesitás consultar?',quick:'comida'};
 if(/gracias|genial|perfecto|buenisimo|listo/.test(q))return {text:'¡De nada! 😊 Cuando quieras seguimos. Si ya elegiste, podés sumar los cortes al pedido y después enviarlo por WhatsApp para confirmar todo con el local.',quick:'seguir'};
 if(/promo|promocion|oferta|combo/.test(q))return {text:'¡Sí! Tenemos estas promos de pollo 🐔\n\n• 2 kg de pollo trozado + 1 kg de alitas: $13.500\n• 1 kg de pata muslo + 1 kg de trozado + 1 kg de milanesa de pollo: $16.000\n• 2 kg de pollo trozado + 1 kg de hamburguesa de pollo: $15.500\n• 2 kg de pata muslo + 1 kg de hamburguesa de pollo: $15.500\n\n¿Cuál te tienta más? Podés agregarla desde la sección Promociones.',quick:'seguir'};
 if(/delivery|envio|domicilio|reparto/.test(q))return {text:'¡Claro! 🛵 Tenemos delivery. Primero armá tu pedido y después lo enviamos por WhatsApp. Por ahí coordinamos tu dirección, la zona, el costo del envío y el horario. ¿Ya sabés qué cortes querés o te ayudo a elegir?',quick:'comida'};
 if(/asado|parrilla|parrillada/.test(q)){chatState.topic='asado';return {text:'¡Un asadito! 🔥 Para la parrilla tenemos asado palomita ($13.000/kg), corte americano ($12.000/kg), vacío ($16.500/kg) y costeleta vacuna ($14.000/kg). También podés sumar morcilla ($7.500, precio publicado).\n\nDecime, ¿para cuántas personas estás organizando? Así te oriento con una cantidad aproximada.',quick:[['2 a 3 personas','somos 3'],['4 a 5 personas','somos 5'],['6 o más','somos 6'],['Ver otros cortes','cortes']]};}
 if(/milanesa|milanesas/.test(q)){chatState.topic='milanesas';return {text:'Para milanesas tenés la suprema de pollo ($11.300, precio publicado) y el combo familiar: 1 kg de pata muslo + 1 kg de pollo trozado + 1 kg de milanesa de pollo por $16.000. 😋\n\n¿Preferís milanesas de pollo o querés consultar por carne vacuna?',quick:[['De pollo','pollo'],['De carne vacuna','carne vacuna'],['Ver promociones','promociones']]};}
 if(/horno|estofado|guiso|olla|cocido/.test(q)){chatState.topic='comida al horno';return {text:'Para una comida al horno o de olla te pueden servir el blando especial ($15.800 la pieza) o la costilla para estofado (presentación de 2 kg a $15.000). Para guiso, la costilla queda muy bien. 🍲\n\n¿Qué vas a preparar: estofado, guiso o carne al horno?',quick:[['Estofado o guiso','estofado'],['Carne al horno','horno'],['Ver todos los cortes','cortes']]};}
 if(/cerdo|chancho|puerco/.test(q)){chatState.topic='cerdo';return {text:'De cerdo tenemos tres opciones: pierna, costilla y costeleta. Las tres están a $17.500 la presentación de 2 kg. 🐷\n\n¿La querés para horno, parrilla o para hacer a la cacerola?',quick:[['Para horno','horno'],['Para parrilla','asado'],['Agregar una opción','pedido']]};}
 if(/pollo|pata|muslo|alita|suprema|trozado|hamburguesa/.test(q)){chatState.topic='pollo';return {text:'¡De pollo hay varias opciones! 🐔 Tenemos pollo ($3.900, precio publicado), cuarto trasero ($10.000 los 2 kg), suprema ($11.300) y las promos de trozado, pata muslo, alitas y hamburguesas.\n\n¿Buscás pollo para horno, milanesas o algo práctico para varias comidas?',quick:[['Para horno','horno'],['Para milanesas','milanesas'],['Ver combos de pollo','promociones']]};}
 if(/direccion|ubicacion|donde queda|como llego|mapa/.test(q))return {text:'Estamos en Alvear 182, barrio General Savio, Palpalá, Jujuy. 📍 Podés tocar “Ver en Google Maps” en la sección Contacto para abrir la ubicación y recibir indicaciones.',quick:[['Ver ubicación','ubicacion'],['Consultar delivery','delivery']]};
 if(/horario|abren|abierto|cierran|atienden/.test(q))return {text:'¡Te paso nuestros horarios! 🕒\n\nLunes a viernes: 8:00 a 14:30 y 19:30 a 23:30.\nSábados: 9:30 a 14:30 y 20:00 a 23:00.\nDomingos: 9:30 a 14:30. Por la tarde no hay atención.\n\n¿Querés consultar algo más o armar tu pedido?',quick:'seguir'};
 if(/precio|cuanto|cuesta|vale|sale|lista/.test(q)){return {text:'¡Obvio! Te paso los precios publicados que tenemos cargados 😊\n\nVACUNO: asado palomita $13.000/kg, corte americano $12.000/kg, vacío $16.500/kg, costilla para estofado $15.000 (2 kg), costeleta $14.000/kg y blando especial $15.800 la pieza.\n\nPOLLO: pollo $3.900, cuarto trasero $10.000 (2 kg) y suprema $11.300.\nCERDO: pierna, costilla y costeleta $17.500 (2 kg).\nMORCILLA: $7.500.\n\nLos precios y el stock se confirman con el local al hacer el pedido. ¿Cuál te interesa?',quick:'seguir'};}
 if(/personas|somos|comen|comensales/.test(q)){const n=q.match(/\d+/);chatState.people=n?+n[0]:null;const cant=chatState.people?`¡Perfecto, entonces son ${chatState.people}! `:'¡Dale! ';return {text:cant+'Para orientarte mejor, ¿qué van a preparar: asado, pollo o una comida al horno? Así te recomiendo opciones sin hacerte comprar de más. La cantidad siempre la confirmamos según el apetito y los acompañamientos.',quick:'comida'};}
 if(/cortes|catalogo|catalogo|ver carne|que tienen|que hay/.test(q))return {text:'Tenemos cortes vacunos, de cerdo, pollo y embutidos. En “Nuestros cortes” podés ver las opciones y tocar el + para sumarlas a tu pedido. ¿Qué categoría querés mirar primero?',quick:[['Vacuno','carne vacuna'],['Cerdo','cerdo'],['Pollo','pollo'],['Embutidos','morcilla']]};
 if(/morcilla|embutido/.test(q))return {text:'¡También tenemos morcilla! Está publicada a $7.500. Es una buena opción para sumar a la parrilla. ¿Querés que te muestre otros cortes para el asado?',quick:[['Sí, para el asado','asado'],['Ver todos los cortes','cortes']]};
 if(/pedido|comprar|agregar|llevar|carrito/.test(q))return {text:'¡Vamos a armarlo! 😄 Podés tocar el botón + de cada corte o el botón “Agregar al pedido” de las promos. Después abrí “Mi pedido”, revisá las cantidades y mandalo por WhatsApp. ¿Qué producto querés llevar?',quick:'comida'};
 if(/carne vacuna|vacuno|vaca/.test(q))return {text:'En carne vacuna tenemos asado palomita ($13.000/kg), corte americano ($12.000/kg), vacío ($16.500/kg), costilla para estofado ($15.000 los 2 kg), costeleta ($14.000/kg) y blando especial ($15.800 la pieza). ¿Para qué comida lo necesitás? Así te recomiendo el corte más conveniente.',quick:[['Para asado','asado'],['Para estofado','estofado'],['Para horno','horno']]};
 return {text:'A ver, contame un poquito más así te ayudo bien 😊 ¿Querés saber qué corte conviene para una comida, consultar precios, ver las promos o coordinar delivery?',quick:'seguir'};
}
const chatHistory=[];
async function askOpenAI(message){
 const endpoint=location.protocol==='file:'?'http://localhost:3000/api/chat':'/api/chat';
 const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:chatHistory.slice(-12)})});
 if(!response.ok) throw new Error('No se pudo conectar con el asistente IA.');
 const data=await response.json();
 if(!data.reply) throw new Error('La IA no devolvió una respuesta.');
 return data.reply;
}
async function sendChat(text){
 const value=text.trim();if(!value||chatInput.disabled)return;
 const quick=chatBox.querySelector('.quick-questions');if(quick)quick.remove();
 addChat(value,'user');chatInput.value='';chatInput.disabled=true;
 chatHistory.push({role:'user',content:value});
 const typing=showTyping();
 try{
  const reply=await askOpenAI(value);
  typing.remove();addChat(reply,'bot');chatHistory.push({role:'assistant',content:reply});
  const status=document.getElementById('assistantStatus');if(status)status.textContent='IA conectada';
 }catch(error){
  typing.remove();
  const answer=answerFor(value);addChat(answer.text,'bot');
  if(answer.quick){const choices=Array.isArray(answer.quick)?answer.quick:quickSets[answer.quick];if(choices)addQuickReplies(choices)}
  const status=document.getElementById('assistantStatus');if(status)status.textContent='Modo de prueba · IA no conectada';
 }
 chatInput.disabled=false;chatInput.focus();
}
async function checkAIStatus(){
 const endpoint=location.protocol==='file:'?'http://localhost:3000/api/health':'/api/health';
 try{const r=await fetch(endpoint);const d=await r.json();const status=document.getElementById('assistantStatus');if(status)status.textContent=d.configured?'IA conectada':'Servidor listo · falta configurar API key';}
 catch{const status=document.getElementById('assistantStatus');if(status)status.textContent='Modo de prueba · iniciar servidor para IA';}
}
checkAIStatus();
document.getElementById('chatForm').addEventListener('submit',e=>{e.preventDefault();sendChat(chatInput.value)});
chatBox.addEventListener('click',e=>{const b=e.target.closest('[data-question]');if(b)sendChat(b.dataset.question)});
document.getElementById('menuToggle').onclick=()=>document.getElementById('nav').classList.toggle('open');document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));
