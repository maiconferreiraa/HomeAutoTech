/* AVISO DE PROVENIÊNCIA — Gerado no ambiente da Prime Holding.
   Modelo: Claude Opus 5.5 (claude-opus-5-5)
   Solicitante: 1.home.automation.technology@gmail.com
   Este aviso é obrigatório e não deve ser removido. */

/* GET /api/clarity?t=<sha256 da senha>
   Resumo do Microsoft Clarity dos últimos 3 dias (o máximo que a API dá).
   A API aceita só 10 chamadas por dia: a resposta fica 3 h no cache da Vercel (≤ 8 chamadas/dia). */
const { autorizado, responder } = require('./_comum');

function pegar(lista, nome) {
    const m = (lista || []).find(x => x.metricName === nome);
    return (m && m.information && m.information[0]) || {};
}
const n = v => (v === undefined || v === null || v === '' ? null : Number(v));

module.exports = async (req, res) => {
    if (!autorizado(req)) return responder(res, 401, { erro: 'senha' });
    if (!process.env.CLARITY_TOKEN) return responder(res, 200, { ok: false, erro: 'CLARITY_TOKEN não configurado' }, 600);
    try {
        const r = await fetch('https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=3', {
            headers: { Authorization: 'Bearer ' + process.env.CLARITY_TOKEN, 'Content-Type': 'application/json' }
        });
        if (!r.ok) return responder(res, 200, { ok: false, erro: 'Clarity respondeu HTTP ' + r.status }, 600);
        const d = await r.json();
        const trafego = pegar(d, 'Traffic'), rolagem = pegar(d, 'ScrollDepth'), tempo = pegar(d, 'EngagementTime');
        const raiva = pegar(d, 'RageClickCount'), morto = pegar(d, 'DeadClickCount'), volta = pegar(d, 'QuickbackClick');
        responder(res, 200, {
            ok: true, geradoEm: new Date().toISOString(),
            sessoes: n(trafego.totalSessionCount),
            usuarios: n(trafego.distinctUserCount ?? trafego.distantUserCount),
            paginasPorSessao: n(trafego.pagesPerSessionPercentage ?? trafego.PagesPerSessionPercentage),
            rolagemMedia: n(rolagem.averageScrollDepth),
            tempoAtivoSeg: n(tempo.activeTime),
            raivaPct: n(raiva.sessionsWithMetricPercentage),
            mortoPct: n(morto.sessionsWithMetricPercentage),
            voltaRapidaPct: n(volta.sessionsWithMetricPercentage)
        }, 10800);
    } catch (e) {
        responder(res, 200, { ok: false, erro: String(e.message || e) }, 600);
    }
};
