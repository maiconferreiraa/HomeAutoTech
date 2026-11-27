/* AVISO DE PROVENIÊNCIA — Gerado no ambiente da Prime Holding.
   Modelo: Claude Opus 5.5 (claude-opus-5-5)
   Solicitante: 1.home.automation.technology@gmail.com
   Este aviso é obrigatório e não deve ser removido. */

/* Medição de visitas (2026-11-27)
   Google Analytics 4, Microsoft Clarity e Meta Pixel só carregam DEPOIS que o
   visitante clica em "Aceitar" no aviso de cookies (LGPD). Se ele recusar, nada carrega.
   Para ligar uma ferramenta, preencha o ID dela abaixo. ID vazio = ferramenta desligada.
   Se os três estiverem vazios, o aviso nem aparece. */
(function () {
    'use strict';
    var IDS = {
        ga4: '',        // ex.: 'G-XXXXXXXXXX'  (analytics.google.com > Administrador > Fluxos de dados)
        clarity: '',    // ex.: 'abcd1234ef'    (clarity.microsoft.com > Configurações > Projeto)
        metaPixel: ''   // ex.: '123456789012345' (business.facebook.com > Gerenciador de eventos)
    };
    var CHAVE = 'hatCookies'; // 'sim' | 'nao'

    if (!IDS.ga4 && !IDS.clarity && !IDS.metaPixel) return;

    function carregar(src) { var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }

    function ligar() {
        if (IDS.ga4) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { window.dataLayer.push(arguments); };
            window.gtag('js', new Date());
            window.gtag('config', IDS.ga4);
            carregar('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(IDS.ga4));
        }
        if (IDS.clarity) {
            window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
            carregar('https://www.clarity.ms/tag/' + encodeURIComponent(IDS.clarity));
        }
        if (IDS.metaPixel) {
            var f = window.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
            if (!window._fbq) window._fbq = f;
            f.push = f; f.loaded = true; f.version = '2.0'; f.queue = [];
            carregar('https://connect.facebook.net/en_US/fbevents.js');
            window.fbq('init', IDS.metaPixel);
            window.fbq('track', 'PageView');
        }
        // formulário enviado: a página de obrigado conta como lead
        if (/obrigado(\.html)?$/.test(location.pathname)) {
            if (window.gtag) window.gtag('event', 'generate_lead', { origem: 'formulario' });
            if (window.fbq) window.fbq('track', 'Lead');
        }
    }

    function lerEscolha() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
    function salvar(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

    var aviso = null;
    function mostrarAviso() {
        if (aviso) return;
        aviso = document.createElement('div');
        aviso.className = 'aviso-cookies';
        aviso.setAttribute('role', 'dialog');
        aviso.setAttribute('aria-label', 'Aviso de cookies');
        aviso.innerHTML = '<p>Usamos cookies para contar visitas e entender o que funciona no site. Nenhum dado é vendido. ' +
            '<a href="/privacidade.html">Saiba mais</a>.</p>' +
            '<div class="botoes"><button type="button" class="btn btn-contorno btn-sm" data-c="nao">Recusar</button>' +
            '<button type="button" class="btn btn-neon btn-sm" data-c="sim">Aceitar</button></div>';
        aviso.addEventListener('click', function (e) {
            var v = e.target.getAttribute && e.target.getAttribute('data-c');
            if (!v) return;
            salvar(v);
            aviso.remove(); aviso = null;
            if (v === 'sim') ligar();
        });
        document.body.appendChild(aviso);
    }

    var escolha = lerEscolha();
    if (escolha === 'sim') ligar();
    else if (escolha !== 'nao') {
        if (document.body) mostrarAviso(); else document.addEventListener('DOMContentLoaded', mostrarAviso);
    }

    // link "Preferências de cookies" no rodapé reabre o aviso
    document.addEventListener('click', function (e) {
        var alvo = e.target.closest && e.target.closest('[data-cookies]');
        if (!alvo) return;
        e.preventDefault();
        try { localStorage.removeItem(CHAVE); } catch (err) {}
        mostrarAviso();
    });
})();
