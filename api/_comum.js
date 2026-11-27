/* AVISO DE PROVENIÊNCIA — Gerado no ambiente da Prime Holding.
   Modelo: Claude Opus 5.5 (claude-opus-5-5)
   Solicitante: 1.home.automation.technology@gmail.com
   Este aviso é obrigatório e não deve ser removido. */

/* Painel do site (2026-11-27) — funções comuns das rotas /api/painel e /api/clarity.
   Arquivos que começam com "_" dentro de /api não viram rota na Vercel.

   Variáveis de ambiente (Vercel > Settings > Environment Variables):
     PAINEL_SENHA     senha do painel
     GOOGLE_SA_JSON   conteúdo inteiro do .json da conta de serviço do Google (só leitura)
     GA4_PROPERTY_ID  opcional (padrão 566083324 = propriedade "HomeAutoTech - Site")
     CLARITY_TOKEN    token de "Data Export" do Clarity */
const crypto = require('crypto');

const SITE_SC = 'https://www.homeautotech.com.br/';

// O navegador manda sha256(senha) em ?t=. A URL entra na chave do cache da Vercel,
// então só quem tem a senha recebe a resposta guardada.
function autorizado(req) {
    const senha = process.env.PAINEL_SENHA || '';
    const t = String((req.query && req.query.t) || '');
    if (!senha || t.length !== 64) return false;
    const esperado = crypto.createHash('sha256').update(senha).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(t), Buffer.from(esperado));
}

function responder(res, status, corpo, cacheSeg) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'noindex');
    res.setHeader('Cache-Control', status === 200 && cacheSeg
        ? `private, max-age=0, s-maxage=${cacheSeg}, stale-while-revalidate=${cacheSeg}`
        : 'no-store');
    res.status(status).send(JSON.stringify(corpo));
}

// ---------- Token do Google (conta de serviço, JWT assinado aqui mesmo) ----------
let tokenCache = { valor: null, expira: 0 };
async function tokenGoogle() {
    if (tokenCache.valor && Date.now() < tokenCache.expira - 60000) return tokenCache.valor;
    if (!process.env.GOOGLE_SA_JSON) throw new Error('GOOGLE_SA_JSON não configurado');
    const sa = JSON.parse(process.env.GOOGLE_SA_JSON);
    const agora = Math.floor(Date.now() / 1000);
    const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url');
    const semAssinatura = b64({ alg: 'RS256', typ: 'JWT' }) + '.' + b64({
        iss: sa.client_email,
        scope: 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',
        aud: 'https://oauth2.googleapis.com/token', iat: agora, exp: agora + 3600
    });
    const assinatura = crypto.createSign('RSA-SHA256').update(semAssinatura).sign(sa.private_key, 'base64url');
    const r = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: semAssinatura + '.' + assinatura })
    });
    const j = await r.json();
    if (!r.ok) throw new Error('Google recusou a conta de serviço: ' + (j.error_description || j.error));
    tokenCache = { valor: j.access_token, expira: Date.now() + j.expires_in * 1000 };
    return tokenCache.valor;
}

async function postGoogle(url, corpo) {
    const r = await fetch(url, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + await tokenGoogle(), 'content-type': 'application/json' },
        body: JSON.stringify(corpo)
    });
    const j = await r.json();
    if (!r.ok) throw new Error((j.error && j.error.message) || ('HTTP ' + r.status));
    return j;
}

// erro de uma seção não derruba o painel inteiro
async function seguro(promessa) {
    try { return { ok: true, dados: await promessa }; }
    catch (e) { return { ok: false, erro: String(e.message || e) }; }
}

module.exports = { autorizado, responder, postGoogle, seguro, SITE_SC };
