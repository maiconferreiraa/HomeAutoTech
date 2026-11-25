/* AVISO DE PROVENIÊNCIA — Gerado no ambiente da Prime Holding.
   Modelo: Claude Opus 5.5 (claude-opus-5-5)
   Solicitante: 1.home.automation.technology@gmail.com
   Este aviso é obrigatório e não deve ser removido. */

/* Home Automation Technology — interações do site (2026-11-25) */
(function () {
    'use strict';
    var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Carrosséis ----------
    if (window.Swiper) {
        new Swiper('.product-swiper', {
            slidesPerView: 1.1, spaceBetween: 18, grabCursor: true,
            pagination: { el: '.product-pagination', clickable: true },
            navigation: { nextEl: '.product-swiper .swiper-button-next', prevEl: '.product-swiper .swiper-button-prev' },
            breakpoints: { 640: { slidesPerView: 2, spaceBetween: 20 }, 992: { slidesPerView: 3, spaceBetween: 28 } }
        });

        new Swiper('.portfolio-swiper', {
            loop: true, slidesPerView: 1, spaceBetween: 24, grabCursor: true,
            autoplay: reduz ? false : { delay: 20000, disableOnInteraction: false },
            pagination: { el: '.portfolio-pagination', clickable: true },
            navigation: { nextEl: '.portfolio-swiper .swiper-button-next', prevEl: '.portfolio-swiper .swiper-button-prev' },
            breakpoints: { 768: { slidesPerView: 2, spaceBetween: 20 }, 1200: { slidesPerView: 3, spaceBetween: 28 } },
            on: {
                slideChangeTransitionStart: function () {
                    this.slides.forEach(function (s) { var v = s.querySelector('video'); if (v) v.pause(); });
                },
                slideChangeTransitionEnd: function () {
                    var sw = this, v = this.slides[this.activeIndex].querySelector('video');
                    if (!v) { if (sw.autoplay) sw.autoplay.start(); return; }
                    if (sw.autoplay) sw.autoplay.stop();
                    v.currentTime = 0; v.play().catch(function () {});
                    v.onended = function () { sw.slideNext(); if (sw.autoplay) sw.autoplay.start(); };
                }
            }
        });

        new Swiper('.testimonial-swiper', {
            loop: true, slidesPerView: 1, spaceBetween: 24, grabCursor: true, autoHeight: false,
            autoplay: reduz ? false : { delay: 9000, disableOnInteraction: false },
            pagination: { el: '.testimonial-pagination', clickable: true },
            breakpoints: { 992: { slidesPerView: 2, spaceBetween: 28 } }
        });
    }

    // ---------- Painel "app" do topo: o visitante testa a casa ----------
    var painel = document.querySelector('.painel-app');
    if (painel) {
        var estados = {
            luz:     ['Desligadas', 'Ligadas · 80%'],
            portao:  ['Fechado', 'Abrindo…'],
            camera:  ['Pausadas', '4 gravando'],
            clima:   ['Desligado', '23 °C'],
            cortina: ['Fechadas', 'Abertas'],
            som:     ['Pausado', 'Tocando']
        };
        var cenas = {
            chegar: { luz: 1, portao: 1, camera: 1, clima: 1, cortina: 1, som: 1 },
            cinema: { luz: 0, portao: 0, camera: 1, clima: 1, cortina: 0, som: 1 },
            dormir: { luz: 0, portao: 0, camera: 1, clima: 1, cortina: 0, som: 0 }
        };
        var portaoTimer, hero = document.querySelector('.hero');
        function aplicar(btn, on) {
            var k = btn.getAttribute('data-disp');
            // a sala da foto do fundo acompanha o painel
            if (hero && k === 'luz') hero.classList.toggle('luz-off', !on);
            if (hero && k === 'cortina') hero.classList.toggle('cortina-fechada', !on);
            btn.classList.toggle('on', !!on);
            btn.querySelector('.estado').textContent = estados[k][on ? 1 : 0];
            if (k === 'portao' && on) {
                clearTimeout(portaoTimer);
                portaoTimer = setTimeout(function () { btn.querySelector('.estado').textContent = 'Aberto'; }, 1400);
            }
        }
        painel.querySelectorAll('.disp').forEach(function (btn) {
            btn.addEventListener('click', function () {
                aplicar(btn, !btn.classList.contains('on'));
                painel.querySelectorAll('.cena').forEach(function (c) { c.classList.remove('ativa'); });
            });
        });
        painel.querySelectorAll('.cena').forEach(function (c) {
            c.addEventListener('click', function () {
                var cena = cenas[c.getAttribute('data-cena')];
                painel.querySelectorAll('.cena').forEach(function (x) { x.classList.toggle('ativa', x === c); });
                painel.setAttribute('data-cena', c.getAttribute('data-cena'));
                painel.querySelectorAll('.disp').forEach(function (btn, i) {
                    setTimeout(function () { aplicar(btn, cena[btn.getAttribute('data-disp')]); }, reduz ? 0 : i * 90);
                });
            });
        });
    }

    // ---------- Aparecer ao rolar ----------
    var revelar = document.querySelectorAll('.revela');
    if (!reduz && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        revelar.forEach(function (el) { io.observe(el); });
    } else {
        revelar.forEach(function (el) { el.classList.add('visivel'); });
    }

    // ---------- Topo encolhe ao rolar ----------
    var header = document.querySelector('.header');
    function topo() { if (header) header.classList.toggle('rolou', window.scrollY > 30); }
    window.addEventListener('scroll', topo, { passive: true }); topo();

    // ---------- Menu do celular fecha ao tocar num link ----------
    var menu = document.getElementById('navbarNav');
    if (menu && window.bootstrap) {
        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
            });
        });
    }

    // ---------- Saudação do painel pelo horário ----------
    var sd = document.getElementById('saudacao');
    if (sd) { var h = new Date().getHours(); sd.textContent = (h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite') + ', família 👋'; }

    // ---------- Ano do rodapé ----------
    var ano = document.getElementById('ano');
    if (ano) ano.textContent = new Date().getFullYear();

    // ---------- Medição de contatos (funciona se Google Analytics/Meta Pixel forem instalados) ----------
    document.querySelectorAll('[data-evento]').forEach(function (el) {
        el.addEventListener('click', function () {
            var nome = el.getAttribute('data-evento');
            try {
                if (window.gtag) window.gtag('event', 'contato', { origem: nome });
                if (window.fbq) window.fbq('track', 'Contact', { origem: nome });
                (window.dataLayer = window.dataLayer || []).push({ event: 'contato', origem: nome });
            } catch (e) {}
        });
    });
})();
