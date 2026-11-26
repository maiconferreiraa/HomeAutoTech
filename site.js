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
        // "Na Gruta do Rei da Montanha" (Edvard Grieg, Peer Gynt, 1875 — DOMÍNIO PÚBLICO).
        // Arranjo próprio, sintetizado aqui (nenhuma gravação de terceiros): começa baixinho no
        // pizzicato grave, os sopros entram, vai acelerando e crescendo até o tutti, e recomeça.
        // Toca em loop enquanto o "Som ambiente" estiver ligado.
        var Ctx = window.AudioContext || window.webkitAudioContext, audio = null, musica = null, ruido = null;
        function desbloquearAudio() {           // precisa acontecer dentro do toque/clique (iPhone)
            if (!Ctx) return;
            if (!audio) audio = new Ctx();
            if (audio.state === 'suspended') audio.resume();
        }
        function hz(n) { return 440 * Math.pow(2, (n - 69) / 12); }   // nota MIDI → Hz
        var PASSO = 60 / 104 / 2;                                     // colcheia (muda: a música acelera)
        var TOM = 59;                                                 // Si menor (tom original), Si3
        // frases em colcheias: [nota relativa ao Si, duração em colcheias]
        var FRASE_A = [   // tema na tônica
            [[0,1],[2,1],[3,1],[5,1],[7,1],[3,1],[7,2]],
            [[6,1],[2,1],[6,2],[5,1],[1,1],[5,2]],
            [[0,1],[2,1],[3,1],[5,1],[7,1],[3,1],[7,1],[12,1]],
            [[10,1],[7,1],[3,1],[7,1],[10,4]]
        ];
        var FRASE_B = [   // o mesmo tema na dominante
            [[7,1],[9,1],[11,1],[12,1],[14,1],[11,1],[14,2]],
            [[15,1],[11,1],[15,2],[14,1],[11,1],[14,2]],
            [[7,1],[9,1],[11,1],[12,1],[14,1],[11,1],[14,1],[19,1]],
            [[17,1],[14,1],[11,1],[14,1],[17,4]]
        ];
        // 16 compassos por volta: A (grave) · A (sopros) · B · A (tutti)
        function frase(c) { var f = c < 8 || c >= 12 ? FRASE_A : FRASE_B; return f[c % 4]; }
        function notaNoPasso(c, p) {          // nota que começa na colcheia p do compasso c (ou null)
            var pos = 0, f = frase(c);
            for (var i = 0; i < f.length; i++) { if (pos === p) return f[i]; pos += f[i][1]; }
            return null;
        }
        function montar() {
            var m = { saida: audio.createGain(), passo: 0, compasso: 0, proximo: audio.currentTime + .1 };
            m.saida.gain.setValueAtTime(0.0001, audio.currentTime);
            m.saida.gain.exponentialRampToValueAtTime(.9, audio.currentTime + 1.2);   // entra suave
            var quente = audio.createBiquadFilter(); quente.type = 'lowpass'; quente.frequency.value = 6000;
            var comp = audio.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 3;
            var vol = audio.createGain(); vol.gain.value = .5;
            m.saida.connect(quente); quente.connect(comp); comp.connect(vol); vol.connect(audio.destination);
            // ambiência de sala de concerto: eco curto
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
        function ruidoCurto(m, t, tipo, freq, vol, dur) {
            var s = audio.createBufferSource(), f = audio.createBiquadFilter(), g = audio.createGain();
            s.buffer = ruido; f.type = tipo; f.frequency.value = freq; f.Q.value = tipo === 'bandpass' ? 1.2 : .7;
            env(g, t, vol, .002, dur);
            s.connect(f); f.connect(g); g.connect(m.saida); s.start(t, Math.random() * .3); s.stop(t + dur + .05);
        }

        function timpano(m, nota, t, vol) {               // tímpano: grave com a afinação caindo
            var o = audio.createOscillator(), g = audio.createGain();
            o.type = 'sine'; o.frequency.setValueAtTime(hz(nota) * 1.5, t); o.frequency.exponentialRampToValueAtTime(hz(nota), t + .06);
            env(g, t, vol, .004, .55); o.connect(g); g.connect(m.saida); o.start(t); o.stop(t + .65);
            ruidoCurto(m, t, 'lowpass', 400, vol * .4, .08);
        }
        function tocarPasso(m, p, t) {                    // p = colcheia 0–7 do compasso
            var c = m.compasso % 16, volta = Math.floor(m.compasso / 16), dom = c >= 8 && c < 12;
            var n = notaNoPasso(c, p);
            if (n) {
                var nota = TOM + n[0], dur = n[1] * PASSO;
                var curta = Math.min(dur * .7, PASSO * .9);   // staccato, como na partitura
                if (c < 4) baixo(m, nota - 12, t);                          // pizzicato grave, misterioso
                else {
                    baixo(m, nota - 12, t);
                    sopro(m, nota, t, n[1] > 1 ? dur * .85 : curta);
                    if (c >= 12) sopro(m, nota + 12, t, n[1] > 1 ? dur * .85 : curta);   // tutti: oitava acima
                }
            }
            // acompanhamento "marchando": fundamental e quinta nos tempos
            if (p % 2 === 0) {
                var raiz = TOM - 24 + (dom ? 7 : 0), quinta = raiz + 7;
                if (c >= 2) baixo(m, p % 4 === 0 ? raiz : quinta, t);
                if (c >= 8 && p % 4 === 0) timpano(m, raiz + 12, t, c >= 12 ? .5 : .3);
            }
            // acordes curtos no contratempo a partir do B; caixa marcando no tutti
            if (c >= 8 && p % 2 === 1) {
                var ac = dom ? [TOM + 6, TOM + 10, TOM + 13] : [TOM, TOM + 3, TOM + 7];
                ac.forEach(function (x, i) { piano(m, x, t + i * .006, c >= 12 ? .055 : .035, .18); });
            }
            if (c >= 12 && p % 2 === 0) ruidoCurto(m, t, 'bandpass', 1800, .05, .07);
            // final da volta: rufo e prato; começo da próxima: prato
            if (c === 15 && p >= 4) { timpano(m, TOM - 12, t, .55); timpano(m, TOM - 12, t + PASSO / 2, .5); }
            if (c === 0 && p === 0 && volta > 0) ruidoCurto(m, t, 'highpass', 5000, .12, 1.4);
        }
        function agendar() {
            var m = musica; if (!m) return;
            while (m.proximo < audio.currentTime + .15) {
                var c = m.compasso % 16;
                PASSO = 60 / (104 + c * 3.4) / 2;     // acelera ao longo da volta (104 → ~155 BPM)
                tocarPasso(m, m.passo, m.proximo);
                m.proximo += PASSO;
                if (++m.passo === 8) { m.passo = 0; m.compasso++; if (m.compasso % 16 === 0) m.proximo += PASSO * 2; }   // respiro antes de recomeçar
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
                onda.className = 'ativo' + (estado ? ' ' + estado : '') + (ouvindo ? ' ouve' : '');
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
            // ---- nível da voz: a onda sobe conforme a pessoa fala ----
            // No computador lê o volume real do microfone; no celular (onde o microfone não pode
            // ser aberto duas vezes) a onda pulsa a cada pedaço de frase reconhecido.
            var celular = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            var nivel = 0, alvoNivel = 0, medidor = null, quadro = 0;
            function animarNivel() {
                if (medidor) {
                    medidor.an.getByteTimeDomainData(medidor.buf);
                    var soma = 0;
                    for (var i = 0; i < medidor.buf.length; i++) { var x = (medidor.buf[i] - 128) / 128; soma += x * x; }
                    alvoNivel = Math.min(1, Math.sqrt(soma / medidor.buf.length) * 6);
                } else alvoNivel *= .93;               // celular: o pulso vai baixando
                nivel += (alvoNivel - nivel) * (alvoNivel > nivel ? .45 : .12);   // sobe rápido, desce suave
                onda.style.setProperty('--nivel', nivel.toFixed(3));
                quadro = requestAnimationFrame(animarNivel);
            }
            function ligarMedidor() {
                cancelAnimationFrame(quadro); nivel = alvoNivel = 0;
                onda.classList.add('ouve'); quadro = requestAnimationFrame(animarNivel);
                if (celular || !audio || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
                navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }).then(function (st) {
                    if (!ouvindo) { st.getTracks().forEach(function (t) { t.stop(); }); return; }
                    var an = audio.createAnalyser(); an.fftSize = 512;
                    var src = audio.createMediaStreamSource(st); src.connect(an);
                    medidor = { st: st, src: src, an: an, buf: new Uint8Array(an.fftSize) };
                }).catch(function () {});
            }
            function desligarMedidor() {
                if (medidor) { try { medidor.src.disconnect(); } catch (e) {} medidor.st.getTracks().forEach(function (t) { t.stop(); }); medidor = null; }
                alvoNivel = 0;
                setTimeout(function () { if (!ouvindo) { cancelAnimationFrame(quadro); onda.style.setProperty('--nivel', 0); } }, 700);
            }
            function parar() { ouvindo = false; vozBtn.classList.remove('ouvindo'); desligarMedidor(); }
            vozBtn.addEventListener('click', function (ev) {
                ev.stopPropagation();
                desbloquearAudio();
                if (window.speechSynthesis) { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance('')); }  // libera a fala (iPhone)
                if (ouvindo && rec) { rec.abort(); parar(); esconder(); return; }
                rec = new SR();
                rec.lang = 'pt-BR'; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 3;
                var entendeu = false;
                rec.onstart = function () { ouvindo = true; vozBtn.classList.add('ouvindo'); mostrar('Ouvindo…', 'Ex.: "apaga a luz" ou "modo cinema"'); };
                rec.onspeechstart = function () { if (!medidor) alvoNivel = .7; };
                rec.onresult = function (e) {
                    var r = e.results[e.results.length - 1];
                    if (!medidor) alvoNivel = .55 + Math.random() * .45;
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
                ligarMedidor();
                try { rec.start(); } catch (err) { parar(); esconder(); }
            });
            if (window.speechSynthesis) speechSynthesis.getVoices();   // carrega a lista de vozes
        }
    }

    // ---------- Central de Operações (tela ilustrativa): relógio, ping e eventos ao vivo ----------
    var noc = document.querySelector('.noc');
    if (noc) {
        var hora = document.getElementById('noc-hora'), ping = document.getElementById('noc-ping'), lista = document.getElementById('noc-eventos');
        var EVENTOS = [
            ['ok', 'check-circle-fill', 'Backup das gravações concluído'],
            ['info', 'info-circle-fill', 'Cena "Chegar em casa" executada'],
            ['ok', 'check-circle-fill', 'Internet de volta em 40 s, tudo online'],
            ['info', 'info-circle-fill', 'Portão social aberto pelo app'],
            ['alerta', 'exclamation-triangle-fill', 'Câmera Quintal sem sinal, técnico avisado'],
            ['ok', 'check-circle-fill', 'Câmera Quintal voltou a gravar'],
            ['info', 'info-circle-fill', 'Ar da suíte ligado em 23 °C'],
            ['ok', 'check-circle-fill', 'HD do gravador verificado: saudável']
        ], ev = 0, visivelNoc = false;
        function relogio() { if (hora) hora.textContent = new Date().toLocaleTimeString('pt-BR'); }
        relogio(); setInterval(relogio, 1000);
        if (!reduz) {
            setInterval(function () {
                if (!visivelNoc || document.hidden) return;
                if (ping) ping.firstChild.nodeValue = String(14 + Math.round(Math.random() * 9));
            }, 2000);
            setInterval(function () {
                if (!visivelNoc || document.hidden || !lista) return;
                var e = EVENTOS[ev++ % EVENTOS.length], li = document.createElement('li');
                li.className = e[0];
                li.innerHTML = '<i class="bi bi-' + e[1] + '"></i><span></span><time>agora</time>';
                li.querySelector('span').textContent = e[2];
                lista.querySelectorAll('time').forEach(function (t, i) { t.textContent = (i + 1) * 3 + ' min'; });
                lista.insertBefore(li, lista.firstChild);
                while (lista.children.length > 3) lista.removeChild(lista.lastChild);
            }, 3800);
            if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visivelNoc = es[0].isIntersecting; }).observe(noc);
            else visivelNoc = true;
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

    // ---------- Simulador de orçamento (2026-11-26) ----------
    // Monta a mensagem com o que o cliente marcou e abre o WhatsApp da HAT.
    // Nada é enviado a servidor nenhum: só vira o texto do link wa.me.
    (function () {
        var sim = document.getElementById('simulador');
        if (!sim) return;
        var ZAP = '5531995012927';
        var btn = document.getElementById('simEnviar');
        var lista = document.getElementById('simLista');
        var barra = document.getElementById('simBarra');
        var nivel = document.getElementById('simNivel');
        var aviso = document.getElementById('simAviso');
        var nome = document.getElementById('simNome');
        var local = document.getElementById('simLocal');
        var ROTULO = { imovel: 'Imóvel', ambientes: 'Tamanho', prazo: 'Prazo' };

        function marcados(grupo) {
            return Array.prototype.map.call(sim.querySelectorAll('[data-grupo="' + grupo + '"] .sim-op.ativo'), function (b) { return b.getAttribute('data-valor'); });
        }
        function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

        function atualizar() {
            var imovel = marcados('imovel')[0], itens = marcados('itens'), amb = marcados('ambientes')[0], prazo = marcados('prazo')[0];
            var html = '';
            if (imovel) html += '<li><b>Imóvel</b> ' + esc(imovel) + '</li>';
            itens.forEach(function (i) { html += '<li><i class="bi bi-check2"></i> ' + esc(i) + '</li>'; });
            if (amb) html += '<li><b>Tamanho</b> ' + esc(amb) + '</li>';
            if (prazo) html += '<li><b>Prazo</b> ' + esc(prazo) + '</li>';
            lista.innerHTML = html;

            var pontos = (imovel ? 1 : 0) + (itens.length ? 1 : 0) + (amb ? 1 : 0) + (prazo ? 1 : 0);
            barra.style.width = (pontos * 25) + '%';
            nivel.textContent = !pontos ? 'Comece marcando o tipo de imóvel.'
                : itens.length >= 6 ? 'Casa completa: ' + itens.length + ' soluções integradas num só app.'
                : itens.length >= 3 ? itens.length + ' soluções: já é uma casa inteligente de verdade.'
                : itens.length ? itens.length + (itens.length > 1 ? ' soluções escolhidas.' : ' solução escolhida.')
                : 'Agora marque o que quer automatizar.';

            var ok = itens.length > 0;
            btn.classList.toggle('off', !ok);
            btn.setAttribute('aria-disabled', ok ? 'false' : 'true');
            aviso.textContent = ok ? '' : 'Marque pelo menos um item para enviar.';

            var n = nome.value.trim(), l = local.value.trim();
            var msg = 'Olá! Montei meu projeto no site da HAT:\n';
            if (n) msg += '\n*Nome:* ' + n;
            if (l) msg += '\n*Local:* ' + l;
            if (imovel) msg += '\n*' + ROTULO.imovel + ':* ' + imovel;
            if (amb) msg += '\n*' + ROTULO.ambientes + ':* ' + amb;
            if (prazo) msg += '\n*' + ROTULO.prazo + ':* ' + prazo;
            if (itens.length) msg += '\n\n*Quero automatizar:*\n' + itens.map(function (i) { return '• ' + i; }).join('\n');
            msg += '\n\nPode me passar um orçamento?';
            btn.href = 'https://wa.me/' + ZAP + '?text=' + encodeURIComponent(msg);
        }

        sim.querySelectorAll('.sim-opcoes').forEach(function (g) {
            var unico = g.hasAttribute('data-unico');
            g.querySelectorAll('.sim-op').forEach(function (b) {
                b.setAttribute('aria-pressed', 'false');
                b.addEventListener('click', function () {
                    var ligar = !b.classList.contains('ativo');
                    if (unico) g.querySelectorAll('.sim-op').forEach(function (o) { o.classList.remove('ativo'); o.setAttribute('aria-pressed', 'false'); });
                    b.classList.toggle('ativo', ligar);
                    b.setAttribute('aria-pressed', String(ligar));
                    atualizar();
                });
            });
        });
        nome.addEventListener('input', atualizar);
        local.addEventListener('input', atualizar);
        btn.addEventListener('click', function (e) {
            if (btn.classList.contains('off')) {
                e.preventDefault(); e.stopImmediatePropagation();
                var g = sim.querySelector('[data-grupo="itens"]');
                g.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, true);
        atualizar();
    })();

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
