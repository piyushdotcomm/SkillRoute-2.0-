import fetch from 'node-fetch';

/**
 * Generic wrapper to call the Mistra API.
 * Accepts either a simple prompt string or a structured payload.
 * Tries to parse JSON; if not JSON returns raw text under { text }.
 * @param {string|object} promptOrPayload
 * @param {object} opts { timeoutMs }
 */
export async function callMistra(promptOrPayload, opts = {}) {
  const { timeoutMs = 30000 } = opts;
  const url = process.env.MISTRA_API_URL;
  if (!url) throw new Error('MISTRA_API_URL not configured');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let payload;
  if (typeof promptOrPayload === 'string') {
    if (process.env.MISTRA_FORMAT === 'messages') {
      payload = { messages: [ { role: 'user', content: promptOrPayload } ] };
    } else {
      payload = { prompt: promptOrPayload };
    }
  } else {
    payload = promptOrPayload;
  }

  const started = Date.now();
  if (process.env.MISTRA_DEBUG) {
    console.log('[MISTRA][REQUEST]', { url, timeoutMs, payloadPreview: JSON.stringify(payload).slice(0,180) });
  }
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MISTRA_API_KEY || 'NO_KEY'}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  } catch (e) {
    clearTimeout(timer);
    if (e.name === 'AbortError') {
      console.error('[MISTRA][TIMEOUT]', { url, elapsedMs: Date.now()-started });
      throw new Error('Mistra request timed out');
    }
    if (e.code === 'ENOTFOUND') {
      console.error('[MISTRA][DNS_ERROR] Host not found. Check MISTRA_API_URL', { url });
      throw new Error('DNS lookup failed for MISTRA_API_URL (ENOTFOUND). Verify the domain.');
    }
    console.error('[MISTRA][NETWORK_ERROR]', e);
    throw e;
  }
  clearTimeout(timer);

  const raw = await res.text();
  const traceId = res.headers.get('x-trace-id');
  if (!res.ok) {
    throw new Error(`Mistra API error (${res.status})${traceId? ' trace='+traceId:''}: ${raw.slice(0,300)}`);
  }
  if (process.env.MISTRA_DEBUG) {
    console.log('[MISTRA][RESPONSE]', { ms: Date.now()-started, status: res.status, bodyPreview: raw.slice(0,180) });
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { text: raw };
  }
}

/**
 * Attempt to extract a JSON object from mixed LLM output text.
 * Returns parsed object or null.
 */
export function extractJsonBlock(text) {
  if (!text) return null;
  const match = text.match(/\{[\s\S]*\}/); // naive first { .. last }
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}
