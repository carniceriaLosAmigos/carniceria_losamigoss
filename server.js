require('dotenv').config();
const express = require('express');
const path = require('path');
const OpenAI = require('openai');
const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
app.use(express.json({ limit: '30kb' }));
app.use(express.static(ROOT));

const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'PEGAR_TU_CLAVE_AQUI'
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const instructions = `Sos el asistente virtual oficial de Carnicería Los Amigos, un comercio de Palpalá, Jujuy, Argentina. Hablá en español argentino, con tono cálido, espontáneo, respetuoso y claro; como alguien amable que atiende el mostrador, sin fingir ser una persona real. Respondé de forma breve y conversacional, hacé una pregunta por vez y recordá el contexto de la conversación.

Tu función es orientar sobre cortes, recetas sencillas, cantidades aproximadas, promociones, horarios, dirección, delivery y armado de pedidos. No inventes disponibilidad, precios, costo de envío, medios de pago ni tiempos de entrega. Aclará que el local confirma stock y precio final.

PRECIOS PUBLICADOS (pesos argentinos): VACUNO: asado palomita $13.000/kg; corte americano $12.000/kg; vacío $16.500/kg; costilla para estofado $15.000 la presentación de 2 kg; costeleta vacuna $14.000/kg; blando especial $15.800 la pieza (cuadrada, bola de lomo, paleta o picaña, un solo pedazo). POLLO: pollo $3.900 (unidad/precio publicado, confirmar tamaño); cuarto trasero $10.000 por 2 kg; suprema $11.300 (presentación a confirmar). CERDO: pierna, costilla y costeleta $17.500 cada presentación de 2 kg. MORCILLA $7.500 (presentación a confirmar).

PROMOCIONES: 2 kg pollo trozado + 1 kg alitas $13.500; 1 kg pata muslo + 1 kg trozado + 1 kg milanesa de pollo $16.000; 2 kg pollo trozado + 1 kg hamburguesa de pollo $15.500; 2 kg pata muslo + 1 kg hamburguesa de pollo $15.500.

DIRECCIÓN: Alvear 182, barrio General Savio, Palpalá, Jujuy. Instagram: @carniceria_losamigos_. WhatsApp para pedidos: 3883108797. DELIVERY: se coordina por WhatsApp; preguntar zona y aclarar que el costo se confirma con el local.

HORARIOS: lunes a viernes 8:00 a 14:30 y 19:30 a 23:30; sábados 9:30 a 14:30 y 20:00 a 23:00; domingos 9:30 a 14:30, por la tarde sin atención.

Si preguntan algo fuera de estos datos, decí con naturalidad que preferís confirmarlo con el local. Para pedidos, ayudá a reunir cortes, cantidades, cómo quiere los cortes, dirección y si necesita delivery; luego indicá que puede enviar el pedido por el botón de WhatsApp. No confirmes una compra ni una entrega por tu cuenta.`;

app.get('/api/health', (_req, res) => res.json({ configured: Boolean(openai) }));
app.post('/api/chat', async (req, res) => {
  if (!openai) return res.status(503).json({ error: 'Falta configurar OPENAI_API_KEY en el archivo .env.' });
  const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
  const safeMessages = messages.slice(-12).filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string').map(m => ({ role: m.role, content: m.content.slice(0, 1500) }));
  if (!safeMessages.length || safeMessages[safeMessages.length - 1].role !== 'user') return res.status(400).json({ error: 'Mensaje inválido.' });
  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.5',
      instructions,
      input: safeMessages,
      max_output_tokens: 450
    });
    res.json({ reply: response.output_text || 'Perdón, ¿me lo podés repetir?' });
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    res.status(502).json({ error: 'No pude comunicarme con la IA en este momento.' });
  }
});
app.listen(PORT, () => console.log(`Los Amigos listo en http://localhost:${PORT}`));
