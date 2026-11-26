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
        // ---------- Música do "Som ambiente" (gerada no navegador, sem arquivo) ----------
        // "Jazz de detetive" ORIGINAL (composição própria do site): 120 BPM com swing, baixo
        // andando, prato de condução, sopro abafado no tema e vibrafone improvisando na volta.
        // Forma de 8 compassos em Dó menor: Cm7 Cm7 Fm7 Fm7 Ab7 G7 Cm7 G7(b9).
        // Toca em loop enquanto o "Som ambiente" estiver ligado.
        var Ctx = window.AudioContext || window.webkitAudioContext, audio = null, musica = null, ruido = null;
        function desbloquearAudio() {           // precisa acontecer dentro do toque/clique (iPhone)
            if (!Ctx) return;
            if (!audio) audio = new Ctx();
            if (audio.state === 'suspended') audio.resume();
        }
        function hz(n) { return 440 * Math.pow(2, (n - 69) / 12); }   // nota MIDI → Hz
        var BPM = 120, PASSO = 60 / BPM / 2, SWING = 1 / 3;           // colcheia com swing (longa-curta)
        // acordes: fundamental do baixo, notas do acorde (comping) e escala para o vibrafone
        var FORMA = [
            { r: 36, ac: [58, 63, 67], esc: [60, 63, 65, 67, 70, 72, 75] },   // Cm7
            { r: 36, ac: [58, 63, 67], esc: [60, 63, 65, 67, 70, 72, 75] },   // Cm7
            { r: 41, ac: [56, 60, 63], esc: [65, 68, 70, 72, 75, 77] },       // Fm7
            { r: 41, ac: [56, 60, 63], esc: [65, 68, 70, 72, 75, 77] },       // Fm7
            { r: 44, ac: [54, 60, 63], esc: [63, 66, 68, 72, 75] },           // Ab7
            { r: 43, ac: [53, 59, 62], esc: [62, 65, 67, 71, 74] },           // G7
            { r: 36, ac: [58, 63, 67], esc: [60, 63, 67, 70, 72] },           // Cm7
            { r: 43, ac: [53, 56, 59], esc: [59, 62, 65, 68, 71] }            // G7(b9)
        ];
        // tema: [compasso, colcheia (0–7), nota MIDI, duração em colcheias]
        var TEMA = [
            [0,2,67,1],[0,3,70,1],[0,4,72,2],[0,7,75,1],
            [1,0,74,3],[1,4,72,1],[1,5,70,1],[1,6,67,2],
            [2,1,68,1],[2,2,72,1],[2,3,75,1],[2,4,77,2],[2,6,75,1],[2,7,72,1],
            [3,0,68,4],[3,6,67,1],[3,7,68,1],
            [4,0,75,1],[4,1,72,1],[4,2,68,2],[4,4,66,1],[4,5,68,1],[4,6,72,2],
            [5,0,71,2],[5,2,74,1],[5,3,77,2],[5,5,75,1],[5,6,74,1],[5,7,71,1],
            [6,0,72,3],[6,4,67,1],[6,5,63,1],[6,6,60,2],
            [7,2,59,1],[7,3,62,1],[7,4,65,1],[7,5,68,3]
        ];

        function montar() {
            var m = { saida: audio.createGain(), passo: 0, compasso: 0, proximo: audio.currentTime + .1 };
            m.saida.gain.setValueAtTime(0.0001, audio.currentTime);
            m.saida.gain.exponentialRampToValueAtTime(.9, audio.currentTime + 1.2);   // entra suave
            var quente = audio.createBiquadFilter(); quente.type = 'lowpass'; quente.frequency.value = 6000;
            var comp = audio.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 3;
            var vol = audio.createGain(); vol.gain.value = .5;
            m.saida.connect(quente); quente.connect(comp); comp.connect(vol); vol.connect(audio.destination);
            // ambiência de clube: eco curto
            m.eco = audio.createDelay(); m.eco.delayTime.value = .19;
            var ret = audio.createGain(), molhado = audio.createGain(); ret.gain.value = .25; molhado.gain.value = .2;
            m.eco.connect(ret); ret.connect(m.eco); m.eco.connect(molhado); molhado.connect(m.saida);
            if (!ruido) {
                ruido = audio.createBuffer(1, audio.sampleRate * .5, audio.sampleRate);
                var d = ruido.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
            }
            return m;
        }
        function env(g, t, pico, ataque, queda) {
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(pico, t + ataque);
            g.gain.exponentialRampToValueAtTime(0.0001, t + ataque + queda);
        }
        function piano(m, nota, t, vol, dur) {           // piano elétrico (FM) para o acompanhamento
            var f = hz(nota), car = audio.createOscillator(), mod = audio.createOscillator();
            var modG = audio.createGain(), g = audio.createGain();
            car.frequency.value = f; mod.frequency.value = f;
            modG.gain.setValueAtTime(f * 1.2, t); modG.gain.exponentialRampToValueAtTime(f * .05, t + .3);
            mod.connect(modG); modG.connect(car.frequency);
            env(g, t, vol, .005, dur);
            car.connect(g); g.connect(m.saida);
            car.start(t); mod.start(t); car.stop(t + dur + .1); mod.stop(t + dur + .1);
        }
        function baixo(m, nota, t) {                      // contrabaixo dedilhado
            var o = audio.createOscillator(), f = audio.createBiquadFilter(), g = audio.createGain();
            o.type = 'triangle'; o.frequency.value = hz(nota);
            f.type = 'lowpass'; f.frequency.setValueAtTime(900, t); f.frequency.exponentialRampToValueAtTime(300, t + .2);
            env(g, t, .6, .008, .42);
            o.connect(f); f.connect(g); g.connect(m.saida); o.start(t); o.stop(t + .55);
        }
        function sopro(m, nota, t, dur) {                 // sopro abafado (tipo sax com surdina)
            var f = hz(nota), o1 = audio.createOscillator(), o2 = audio.createOscillator();
            var lfo = audio.createOscillator(), lfoG = audio.createGain();
            var fil = audio.createBiquadFilter(), g = audio.createGain();
            o1.type = 'sawtooth'; o2.type = 'square'; o1.frequency.value = f; o2.frequency.value = f * 1.003;
            lfo.frequency.value = 5.2; lfoG.gain.setValueAtTime(0, t); lfoG.gain.linearRampToValueAtTime(f * .007, t + Math.min(.25, dur));
            lfo.connect(lfoG); lfoG.connect(o1.frequency); lfoG.connect(o2.frequency);
            fil.type = 'lowpass'; fil.Q.value = 1.2;
            fil.frequency.setValueAtTime(500, t); fil.frequency.linearRampToValueAtTime(1500, t + .06);
            fil.frequency.linearRampToValueAtTime(1000, t + dur);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(.075, t + .035);
            g.gain.setValueAtTime(.075, t + Math.max(.04, dur - .06));
            g.gain.exponentialRampToValueAtTime(0.0001, t + dur + .08);
            o1.connect(fil); o2.connect(fil); fil.connect(g); g.connect(m.saida); g.connect(m.eco);
            [o1, o2, lfo].forEach(function (o) { o.start(t); o.stop(t + dur + .15); });
        }
        function vibra(m, nota, t) {                      // vibrafone (tremolo leve)
            var f = hz(nota), o = audio.createOscillator(), o4 = audio.createOscillator();
            var g = audio.createGain(), g4 = audio.createGain(), trem = audio.createOscillator(), tremG = audio.createGain();
            o.frequency.value = f; o4.frequency.value = f * 4;
            env(g, t, .09, .004, 1.6); env(g4, t, .018, .002, .25);
            trem.frequency.value = 5; tremG.gain.value = .025; trem.connect(tremG); tremG.connect(g.gain);
            o.connect(g); o4.connect(g4); g.connect(m.saida); g4.connect(m.saida); g.connect(m.eco);
            [o, o4, trem].forEach(function (x) { x.start(t); x.stop(t + 1.8); });
        }
        function ruidoCurto(m, t, tipo, freq, vol, dur) {
            var s = audio.createBufferSource(), f = audio.createBiquadFilter(), g = audio.createGain();
            s.buffer = ruido; f.type = tipo; f.frequency.value = freq; f.Q.value = tipo === 'bandpass' ? 1.2 : .7;
            env(g, t, vol, .002, dur);
            s.connect(f); f.connect(g); g.connect(m.saida); s.start(t, Math.random() * .3); s.stop(t + dur + .05);
        }

        function tocarPasso(m, p, t) {                    // p = colcheia 0–7 do compasso
            var c = m.compasso % 8, volta = Math.floor(m.compasso / 8), a = FORMA[c], prox = FORMA[(c + 1) % 8];
            // bateria: condução no prato (1, 2, 2e, 3, 4, 4e) + "chick" do chimbal no 2 e no 4
            if ([0, 2, 3, 4, 6, 7].indexOf(p) >= 0) ruidoCurto(m, t, 'highpass', 8000, p % 2 ? .025 : .045, .22);
            if (p === 2 || p === 6) ruidoCurto(m, t, 'bandpass', 3200, .035, .05);
            if (p === 6 && Math.random() < .3) ruidoCurto(m, t + PASSO * (1 - SWING), 'bandpass', 1700, .06, .08); // caixa "fantasma"
            // baixo andando: fundamental, 3ª, 5ª e nota de aproximação do próximo acorde
            if (p % 2 === 0) {
                var ter = (c === 4 || c === 5 || c === 7) ? 4 : 3;
                var nota = [a.r, a.r + ter, a.r + 7, prox.r + (Math.random() < .5 ? 1 : -1)][p / 2];
                baixo(m, nota, t);
            }
            // piano: acordes curtos no contratempo do 2 e no 4
            if (p === 3 || (p === 6 && c % 2)) a.ac.forEach(function (n, i) { piano(m, n, t + i * .008, .05, .35); });
            // tema no sopro nas voltas pares; vibrafone improvisando nas ímpares
            if (volta % 2 === 0) {
                TEMA.forEach(function (n) {
                    if (n[0] === c && n[1] === p) sopro(m, n[2], t, n[3] * PASSO * (n[3] > 1 ? 1 : .8));
                });
            } else if (p !== 7 && Math.random() < (p % 2 ? .25 : .45)) {
                vibra(m, a.esc[Math.floor(Math.random() * a.esc.length)], t);
            }
        }
        function agendar() {
            var m = musica; if (!m) return;
            while (m.proximo < audio.currentTime + .15) {
                var t = m.proximo + (m.passo % 2 ? PASSO * SWING : 0);
                tocarPasso(m, m.passo, t);
                m.proximo += PASSO;
                if (++m.passo === 8) { m.passo = 0; m.compasso++; }
            }
        }
        function tocarMusica(btn) {
            if (!audio || musica) return;
            musica = montar(); musica.btn = btn;
            agendar(); musica.timer = setInterval(agendar, 40);
            if (btn) btn.classList.add('tocando');
        }
        function pararMusica() {
            var m = musica; if (!m) return; musica = null;
            clearInterval(m.timer);
            var t = audio.currentTime;
            m.saida.gain.cancelScheduledValues(t); m.saida.gain.setValueAtTime(m.saida.gain.value, t);
            m.saida.gain.linearRampToValueAtTime(0, t + .6);
            setTimeout(function () { try { m.saida.disconnect(); m.eco.disconnect(); } catch (e) {} }, 900);
            if (m.btn) m.btn.classList.remove('tocando');
        }
        // aba escondida: pausa; voltou: continua de onde estava
        document.addEventListener('visibilitychange', function () {
            if (!audio || !musica) return;
            if (document.hidden) audio.suspend(); else audio.resume();
        });

        var portaoTimer, hero = document.querySelector('.hero');
        function aplicar(btn, on) {
            var k = btn.getAttribute('data-disp');
            if (k === 'som') {
                var estava = btn.classList.contains('on');
                if (on && !estava) tocarMusica(btn);
                else if (!on) pararMusica();
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

        // ---------- Comando de voz: o visitante fala e a casa obedece ----------
        // Usa o reconhecimento de fala do próprio navegador (Chrome, Edge, Safari) em pt-BR
        // e responde falando. Sem suporte (ex.: Firefox), o botão some.
        var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        var vozBtn = painel.querySelector('.voz-btn'), onda = document.getElementById('voz-onda');
        if (SR && vozBtn && !onda) {          // onda azul de "estou ouvindo" no rodapé da tela
            onda = document.createElement('div'); onda.id = 'voz-onda'; onda.setAttribute('aria-live', 'polite');
            onda.innerHTML = '<div class="voz-fala"></div><div class="voz-luz"></div>';
            document.body.appendChild(onda);
        }
        if (!SR || !vozBtn || !onda) { painel.classList.add('sem-voz'); }
        else {
            var fala = onda.querySelector('.voz-fala'), rec = null, ouvindo = false, sumir;
            function mostrar(titulo, texto, estado) {
                clearTimeout(sumir);
                onda.className = 'ativo' + (estado ? ' ' + estado : '');
                fala.innerHTML = '';
                if (titulo) { var sm = document.createElement('small'); sm.textContent = titulo; fala.appendChild(sm); }
                if (texto) fala.appendChild(document.createTextNode(texto));
            }
            function esconder(depois) {
                clearTimeout(sumir);
                sumir = setTimeout(function () { onda.className = ''; fala.innerHTML = ''; }, depois || 0);
            }
            function responder(frase, fim) {
                mostrar('', frase, 'falando');
                var acabou = function () { esconder(600); if (fim) fim(); };
                if (!window.speechSynthesis) { setTimeout(acabou, 1400); return; }
                var u = new SpeechSynthesisUtterance(frase);
                u.lang = 'pt-BR'; u.rate = 1.02; u.pitch = 1.05;
                var vozes = speechSynthesis.getVoices().filter(function (v) { return /pt[-_]BR/i.test(v.lang); });
                var fem = vozes.filter(function (v) { return /luciana|francisca|maria|female|feminina|google/i.test(v.name); });
                if (fem.length || vozes.length) u.voice = (fem[0] || vozes[0]);
                u.onend = acabou; u.onerror = acabou;
                speechSynthesis.cancel(); speechSynthesis.speak(u);
                setTimeout(acabou, 4000);     // garantia se o onend não vier
            }
            function semAcento(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
            var APARELHOS = {
                luz: /\b(luz|luzes|lampada|lampadas|iluminacao|abajur)\b/,
                cortina: /\b(cortina|cortinas|persiana|persianas|blackout)\b/,
                portao: /\b(portao|garagem)\b/,
                camera: /\b(camera|cameras|seguranca|alarme)\b/,
                clima: /\b(clima|ar|ar condicionado|temperatura)\b/,
                som: /\b(som|musica|musicas|jazz|caixa)\b/
            };
            function entender(texto) {
                var t = semAcento(texto);
                // cenas
                if (/\b(cinema|filme)\b/.test(t)) return { cena: 'cinema' };
                if (/\b(dormir|boa noite|vou deitar)\b/.test(t)) return { cena: 'dormir' };
                if (/\b(cheguei|chegar em casa|chegando)\b/.test(t)) return { cena: 'chegar' };
                // vale o verbo que aparece primeiro ("liga a luz para mim" = ligar)
                var mDes = t.search(/(^para\b|\b(?:apaga|apague|apagar|desliga|desligue|desligar|fecha|feche|fechar|pare|parar|pausa|pause|pausar|desativa|desative|silencio)\b)/);
                var mLig = t.search(/\b(acende|acenda|acender|liga|ligue|ligar|abre|abra|abrir|toca|toque|tocar|ativa|ative|ativar|coloca|coloque|bota)\b/);
                var desligar = mDes >= 0 && (mLig < 0 || mDes < mLig), ligar = mLig >= 0 && !desligar;
                var alvo = [];
                Object.keys(APARELHOS).forEach(function (k) { if (APARELHOS[k].test(t)) alvo.push(k); });
                if (!alvo.length) return null;
                return { alvo: alvo, on: desligar ? 0 : (ligar ? 1 : null) };
            }
            function executar(cmd) {
                if (cmd.cena) { var c = painel.querySelector('.cena[data-cena="' + cmd.cena + '"]'); if (c) c.click(); return; }
                painel.querySelectorAll('.cena').forEach(function (c) { c.classList.remove('ativa'); });
                cmd.alvo.forEach(function (k) {
                    var b = painel.querySelector('.disp[data-disp="' + k + '"]');
                    if (b) aplicar(b, cmd.on === null ? !b.classList.contains('on') : cmd.on);
                });
            }
            function parar() { ouvindo = false; vozBtn.classList.remove('ouvindo'); }
            vozBtn.addEventListener('click', function (ev) {
                ev.stopPropagation();
                desbloquearAudio();
                if (window.speechSynthesis) { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance('')); }  // libera a fala (iPhone)
                if (ouvindo && rec) { rec.abort(); parar(); esconder(); return; }
                rec = new SR();
                rec.lang = 'pt-BR'; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 3;
                var entendeu = false;
                rec.onstart = function () { ouvindo = true; vozBtn.classList.add('ouvindo'); mostrar('Ouvindo…', 'Ex.: "apaga a luz" ou "modo cinema"'); };
                rec.onresult = function (e) {
                    var r = e.results[e.results.length - 1];
                    mostrar('Ouvindo…', '“' + r[0].transcript + '”', 'pensando');
                    if (!r.isFinal) return;
                    entendeu = true; parar();
                    var cmd = null;
                    for (var i = 0; i < r.length && !cmd; i++) cmd = entender(r[i].transcript);
                    if (cmd) { executar(cmd); responder('Tudo bem'); }
                    else responder('Desculpe, não entendi. Tente "apaga a luz" ou "fecha a cortina".');
                };
                rec.onerror = function (e) {
                    parar(); entendeu = true;
                    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { mostrar('Microfone', 'Libere o microfone para falar com a casa.'); esconder(3500); }
                    else if (e.error === 'no-speech') { mostrar('', 'Não ouvi nada. Toque e fale de novo.'); esconder(2500); }
                    else if (e.error !== 'aborted') { mostrar('', 'Não consegui ouvir agora. Tente de novo.'); esconder(2500); }
                };
                rec.onend = function () { parar(); if (!entendeu) esconder(300); };
                ouvindo = true; vozBtn.classList.add('ouvindo');
                mostrar('Ouvindo…', 'Fale um comando (se o navegador pedir, permita o microfone)');   // resposta imediata ao toque
                try { rec.start(); } catch (err) { parar(); esconder(); }
            });
            if (window.speechSynthesis) speechSynthesis.getVoices();   // carrega a lista de vozes
        }
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
