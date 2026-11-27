/* AVISO DE PROVENIÊNCIA — Gerado no ambiente da Prime Holding.
   Modelo: Claude Opus 5.5 (claude-opus-5-5)
   Solicitante: 1.home.automation.technology@gmail.com
   Este aviso é obrigatório e não deve ser removido. */

/* GET /api/painel?dias=7|28|90&t=<sha256 da senha>
   Junta Google Analytics 4 + Search Console numa resposta só. Cache de 1 h na Vercel. */
const { autorizado, responder, postGoogle, seguro, SITE_SC } = require('./_comum');

const DIAS_OK = [7, 28, 90];

function iso(d) { return d.toISOString().slice(0, 10); }
function diasAtras(n) { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d; }

function ga(propriedade, corpo) {
    return postGoogle(`https://analyticsdata.googleapis.com/v1beta/properties/${propriedade}:runReport`, corpo);
}
function linhas(rel) { return (rel && rel.rows) || []; }
function num(v) { return Number((v && v.value) || 0); }

async function analytics(dias) {
    const prop = process.env.GA4_PROPERTY_ID || '566083324'; // "HomeAutoTech - Site"
    if (!prop) throw new Error('GA4_PROPERTY_ID não configurado');
    const atual = { startDate: `${dias - 1}daysAgo`, endDate: 'today' };
    const anterior = { startDate: `${dias * 2 - 1}daysAgo`, endDate: `${dias}daysAgo` };
    const evento = nome => ({ filter: { fieldName: 'eventName', stringFilter: { value: nome } } });

    const [totais, serie, canais, paginas, eventos] = await Promise.all([
        ga(prop, { dateRanges: [atual, anterior], metrics: [{ name: 'activeUsers' }, { name: 'sessions' }] }),
        ga(prop, { dateRanges: [atual], dimensions: [{ name: 'date' }], metrics: [{ name: 'activeUsers' }],
                   orderBys: [{ dimension: { dimensionName: 'date' } }] }),
        ga(prop, { dateRanges: [atual], dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }],
                   orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 8 }),
        ga(prop, { dateRanges: [atual], dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }],
                   orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 10 }),
        ga(prop, { dateRanges: [atual, anterior], dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }],
                   dimensionFilter: { filter: { fieldName: 'eventName', inListFilter: { values: ['contato', 'generate_lead'] } } } })
    ]);

    // cliques no WhatsApp por botão: precisa da dimensão personalizada "origem" registrada no GA4
    const porBotao = await seguro(ga(prop, {
        dateRanges: [atual], dimensions: [{ name: 'customEvent:origem' }], metrics: [{ name: 'eventCount' }],
        dimensionFilter: evento('contato'), orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }], limit: 15
    }));

    // totais: com 2 períodos o GA devolve uma linha por período (dimensão dateRange)
    const t = { atual: { usuarios: 0, sessoes: 0 }, anterior: { usuarios: 0, sessoes: 0 } };
    linhas(totais).forEach((l, i) => {
        const qual = (l.dimensionValues && l.dimensionValues[0] && l.dimensionValues[0].value === 'date_range_1') || i === 1 ? 'anterior' : 'atual';
        t[qual] = { usuarios: num(l.metricValues[0]), sessoes: num(l.metricValues[1]) };
    });
    const ev = { atual: { contato: 0, generate_lead: 0 }, anterior: { contato: 0, generate_lead: 0 } };
    linhas(eventos).forEach(l => {
        const nome = l.dimensionValues[0].value;
        const qual = l.dimensionValues[1] && l.dimensionValues[1].value === 'date_range_1' ? 'anterior' : 'atual';
        ev[qual][nome] = num(l.metricValues[0]);
    });

    return {
        totais: t, eventos: ev,
        serie: linhas(serie).map(l => ({ data: l.dimensionValues[0].value, usuarios: num(l.metricValues[0]) })),
        canais: linhas(canais).map(l => ({ nome: l.dimensionValues[0].value, valor: num(l.metricValues[0]) })),
        paginas: linhas(paginas).map(l => ({ nome: l.dimensionValues[0].value, valor: num(l.metricValues[0]) })),
        botoes: porBotao.ok
            ? linhas(porBotao.dados).map(l => ({ nome: l.dimensionValues[0].value, valor: num(l.metricValues[0]) }))
            : null,
        botoesErro: porBotao.ok ? null : porBotao.erro
    };
}

async function searchConsole(dias) {
    // o Search Console publica os dados com ~2 dias de atraso
    const fim = diasAtras(2), ini = diasAtras(dias + 1);
    const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_SC)}/searchAnalytics/query`;
    const base = { startDate: iso(ini), endDate: iso(fim) };
    const [tot, buscas, paginas] = await Promise.all([
        postGoogle(url, base),
        postGoogle(url, { ...base, dimensions: ['query'], rowLimit: 15 }),
        postGoogle(url, { ...base, dimensions: ['page'], rowLimit: 15 })
    ]);
    const lin = r => (r.rows || []).map(x => ({
        nome: x.keys[0], cliques: x.clicks, impressoes: x.impressions, ctr: x.ctr, posicao: x.position
    }));
    const r0 = (tot.rows && tot.rows[0]) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    return {
        periodo: base,
        totais: { cliques: r0.clicks, impressoes: r0.impressions, ctr: r0.ctr, posicao: r0.position },
        buscas: lin(buscas), paginas: lin(paginas)
    };
}

module.exports = async (req, res) => {
    if (!autorizado(req)) return responder(res, 401, { erro: 'senha' });
    const dias = DIAS_OK.includes(Number(req.query.dias)) ? Number(req.query.dias) : 28;
    const [a, s] = await Promise.all([seguro(analytics(dias)), seguro(searchConsole(dias))]);
    responder(res, 200, { dias, geradoEm: new Date().toISOString(), analytics: a, searchConsole: s }, 3600);
};
