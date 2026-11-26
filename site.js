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
        // ---------- Toque do "Som ambiente" (sintetizado no navegador, sem arquivo) ----------
        // Arpejo suave de sinos sobre um acorde de fundo (Fá maior com 7ª/9ª), ~4 s, volume baixo.
        var Ctx = window.AudioContext || window.webkitAudioContext, audio = null, toque = null;
        function desbloquearAudio() {           // precisa acontecer dentro do toque/clique (iPhone)
            if (!Ctx) return;
            if (!audio) audio = new Ctx();
            if (audio.state === 'suspended') audio.resume();
        }
        function hz(n) { return 440 * Math.pow(2, (n - 69) / 12); }   // nota MIDI → Hz
        function pararToque(rapido) {
            if (!toque) return;
            var t = audio.currentTime, g = toque.mestre.gain;
            g.cancelScheduledValues(t); g.setValueAtTime(g.value, t);
            g.linearRampToValueAtTime(0, t + (rapido ? .08 : .35));
            var velho = toque; toque = null;
            setTimeout(function () { try { velho.mestre.disconnect(); } catch (e) {} }, 600);
            clearTimeout(velho.fim);
            if (velho.btn) velho.btn.classList.remove('tocando');
        }
        function tocarToque(btn) {
            if (!audio) return;
            pararToque(true);
            var t0 = audio.currentTime + .05, dur = 4.2;
            var mestre = audio.createGain(); mestre.gain.setValueAtTime(0.0001, t0);
            mestre.gain.exponentialRampToValueAtTime(.22, t0 + .08);
            mestre.gain.setValueAtTime(.22, t0 + dur - 1.2);
            mestre.gain.linearRampToValueAtTime(0, t0 + dur);
            var filtro = audio.createBiquadFilter(); filtro.type = 'lowpass'; filtro.frequency.value = 3800;
            // eco leve, dá a sensação de ambiente
            var eco = audio.createDelay(); eco.delayTime.value = .27;
            var retorno = audio.createGain(); retorno.gain.value = .28;
            var molhado = audio.createGain(); molhado.gain.value = .3;
            filtro.connect(mestre); filtro.connect(eco); eco.connect(retorno); retorno.connect(eco);
            eco.connect(molhado); molhado.connect(mestre); mestre.connect(audio.destination);

            function sino(nota, t, vol, sus) {
                var f = hz(nota);
                [[1, 1], [2, .28], [3.01, .07]].forEach(function (h) {   // fundamental + harmônicos
                    var o = audio.createOscillator(), g = audio.createGain();
                    o.type = 'sine'; o.frequency.value = f * h[0];
                    g.gain.setValueAtTime(0.0001, t);
                    g.gain.exponentialRampToValueAtTime(vol * h[1], t + .012);
                    g.gain.exponentialRampToValueAtTime(0.0001, t + (sus || 1.5) / h[0]);
                    o.connect(g); g.connect(filtro); o.start(t); o.stop(t + (sus || 1.5) + .1);
                });
            }
            function fundo(nota, vol) {
                var o = audio.createOscillator(), g = audio.createGain();
                o.type = 'triangle'; o.frequency.value = hz(nota);
                g.gain.setValueAtTime(0.0001, t0);
                g.gain.exponentialRampToValueAtTime(vol, t0 + .6);
                g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
                o.connect(g); g.connect(filtro); o.start(t0); o.stop(t0 + dur + .1);
            }
            [53, 57, 60, 64].forEach(function (n) { fundo(n, .05); });               // Fá  Lá  Dó  Mi
            [[69, 0], [72, .16], [76, .32], [79, .48], [81, .64],                   // Lá Dó Mi Sol Lá (sobe)
             [76, 1.1], [79, 1.34], [84, 1.6, 2.4]].forEach(function (x, i) {      // Mi Sol … Dó agudo (segura)
                sino(x[0], t0 + x[1], i === 7 ? .32 : .26, x[2]);
            });
            toque = { mestre: mestre, btn: btn };
            if (btn) btn.classList.add('tocando');
            toque.fim = setTimeout(function () { if (btn) btn.classList.remove('tocando'); toque = null; }, (dur + .2) * 1000);
        }

        var portaoTimer, hero = document.querySelector('.hero');
        function aplicar(btn, on) {
            var k = btn.getAttribute('data-disp');
            if (k === 'som') {
                var estava = btn.classList.contains('on');
                if (on && !estava) tocarToque(btn);
                else if (!on) pararToque();
            }
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
                desbloquearAudio();
                aplicar(btn, !btn.classList.contains('on'));
                painel.querySelectorAll('.cena').forEach(function (c) { c.classList.remove('ativa'); });
            });
        });
        painel.querySelectorAll('.cena').forEach(function (c) {
            c.addEventListener('click', function () {
                desbloquearAudio();
                var cena = cenas[c.getAttribute('data-cena')];
                painel.querySelectorAll('.cena').forEach(function (x) { x.classList.toggle('ativa', x === c); });
                painel.setAttribute('data-cena', c.getAttribute('data-cena'));
                painel.querySelectorAll('.disp').forEach(function (btn, i) {
                    setTimeout(function () { aplicar(btn, cena[btn.getAttribute('data-disp')]); }, reduz ? 0 : i * 90);
                });
            });
        });
    }

    // ---------- Vídeos dos projetos: só baixam/tocam quando aparecem na tela ----------
    // (antes tocavam sozinhos desde o início e disputavam com a abertura → travadinha)
    var videos = document.querySelectorAll('.portfolio-swiper video');
    if ('IntersectionObserver' in window) {
        var iov = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) {
                var v = e.target;
                if (e.isIntersecting) { v.play().catch(function () {}); } else { v.pause(); }
            });
        }, { rootMargin: '200px 0px', threshold: 0.2 });
        videos.forEach(function (v) { iov.observe(v); });
    } else {
        videos.forEach(function (v) { v.preload = 'metadata'; v.play().catch(function () {}); });
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
