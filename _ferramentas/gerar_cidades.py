#!/usr/bin/env python3
# AVISO DE PROVENIÊNCIA — Gerado no ambiente da Prime Holding.
# Modelo: Claude Opus 5.5 (claude-opus-5-5)
# Solicitante: 1.home.automation.technology@gmail.com
# Este aviso é obrigatório e não deve ser removido.
"""Gera as páginas de SEO local: /automacao-residencial-<cidade>/index.html

Uso (na raiz do site):  python3 _ferramentas/gerar_cidades.py
Para mudar um texto, edite CIDADES abaixo e rode de novo. Não edite os HTML gerados à mão.
Também regenera o sitemap.xml.
"""
import html
import json
import os
from datetime import date
from urllib.parse import quote

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://www.homeautotech.com.br"
ZAP = "5531995012927"

CIDADES = [
    {
        "slug": "lagoa-santa",
        "nome": "Lagoa Santa",
        "titulo": "Automação Residencial em Lagoa Santa | Home Automation Technology",
        "descricao": "Automação residencial em Lagoa Santa/MG: iluminação, câmeras, portão, piscina, cortinas e som no celular ou pela voz. Empresa local, com projeto, instalação e suporte.",
        "selo": "Nossa casa é aqui",
        "h1": 'Automação residencial em <span class="grad">Lagoa Santa</span>',
        "sub": "Somos de Lagoa Santa. Projetamos, instalamos e damos suporte à sua casa inteligente sem você depender de técnico de fora.",
        "intro": [
            "Lagoa Santa é onde a Home Automation Technology nasceu e onde fica a maior parte das casas que automatizamos. Boa parte delas está em condomínios horizontais, com quintal, piscina e área externa grande. É justamente onde a automação mais aparece no dia a dia.",
            "Aqui fazemos de tudo: luzes que acendem sozinhas ao anoitecer, bomba e iluminação da piscina pelo celular, câmeras no perímetro com aviso no celular, portão que abre quando você chega e persianas que fecham no sol da tarde. Também levamos o Sentinel para portarias de condomínio.",
        ],
        "destaques": [
            ("geo-alt", "Atendimento local", "Visita técnica e suporte presencial sem custo de deslocamento longo."),
            ("water", "Piscina e área externa", "Bomba, aquecimento e iluminação da piscina em horários ou por voz."),
            ("shield-check", "Condomínios", "Projetos em casas de condomínio e o Sentinel para portarias."),
        ],
        "depoimento": ("Contratar a Home Automation Technology foi a melhor decisão para a nossa casa. O nível de conforto e praticidade que ganhamos no dia a dia é surreal. A equipe foi extremamente profissional e atenciosa, desde o planejamento até a instalação final. Recomendo de olhos fechados!", "Hélio Ferreira", "Condomínio Estâncias da Serra, Lagoa Santa"),
        "faq": [
            ("Vocês atendem todos os bairros de Lagoa Santa?", "Sim. Atendemos Lagoa Santa inteira, inclusive os condomínios fechados. Mande sua localização no WhatsApp e agendamos a visita."),
            ("Dá para automatizar a piscina?", "Sim. Ligamos a bomba, o aquecedor e a iluminação da piscina ao aplicativo, com horários automáticos e controle por voz."),
            ("Vocês fazem automação para a portaria do condomínio?", "Sim. O Sentinel é o nosso sistema para portarias e acessos de condomínio. Fale com a gente para uma apresentação ao síndico."),
        ],
    },
    {
        "slug": "pedro-leopoldo",
        "nome": "Pedro Leopoldo",
        "titulo": "Automação Residencial em Pedro Leopoldo | Home Automation Technology",
        "descricao": "Automação residencial em Pedro Leopoldo/MG: luzes, câmeras com acesso remoto, portão, clima e som no celular. Projeto, instalação e pós-venda de quem está na cidade vizinha.",
        "selo": "Pertinho de você",
        "h1": 'Automação residencial em <span class="grad">Pedro Leopoldo</span>',
        "sub": "Somos da cidade vizinha, Lagoa Santa. Por isso chegamos rápido para a visita técnica, a instalação e o pós-venda.",
        "intro": [
            "Pedro Leopoldo tem muita casa com terreno grande, sítio e chácara. Nessas casas, o que mais pedem é ver tudo de longe: câmeras com acesso pelo celular, portão automático e luzes externas que acendem sozinhas.",
            "Montamos o projeto a partir do que você já tem. Câmeras, interruptores, ar-condicionado e Alexa de marcas diferentes passam a funcionar juntos em um único aplicativo. E, se a internet cair, a casa continua funcionando.",
        ],
        "destaques": [
            ("camera-video", "Câmeras com acesso remoto", "Veja a casa, o sítio ou a chácara pelo celular, de onde estiver."),
            ("door-open", "Portão e acesso", "Portão pelo app, fechadura digital e aviso quando alguém chega."),
            ("headset", "Pós-venda de verdade", "Suporte rápido de quem está na cidade vizinha."),
        ],
        "depoimento": ("Desde o primeiro contato, o atendimento foi impecável. A equipe entendeu exatamente o que eu queria e superou todas as minhas expectativas. O pós-venda também é excelente, sempre dispostos a ajudar. Serviço de primeira qualidade!", "Gilberto B.", "Pedro Leopoldo"),
        "faq": [
            ("Vocês atendem Pedro Leopoldo e a zona rural?", "Sim. Atendemos a cidade e também sítios e chácaras da região. Mande a localização no WhatsApp para combinarmos a visita."),
            ("Dá para ver as câmeras do sítio pelo celular?", "Dá. Se o local tiver internet (fibra, rádio ou 4G), as câmeras ficam no aplicativo e avisam você quando detectam movimento."),
            ("Preciso trocar tudo o que já tenho?", "Não. Aproveitamos câmeras, aparelhos e interruptores que já funcionam e integramos tudo em um só aplicativo."),
        ],
    },
    {
        "slug": "vespasiano",
        "nome": "Vespasiano",
        "titulo": "Automação Residencial em Vespasiano | Home Automation Technology",
        "descricao": "Automação residencial em Vespasiano/MG para casas e apartamentos: luzes, fechadura digital, câmeras, clima e Wi-Fi sem quebrar parede. Projeto e instalação sob medida.",
        "selo": "Casas e apartamentos",
        "h1": 'Automação residencial em <span class="grad">Vespasiano</span>',
        "sub": "Casa nova, apartamento ou casa pronta: deixamos tudo inteligente sem quebra-quebra, com um aplicativo só.",
        "intro": [
            "Vespasiano cresce rápido, com muitos condomínios e apartamentos novos. Para quem está mudando, é o melhor momento de automatizar: dá para planejar a casa inteira de uma vez, antes de os móveis chegarem.",
            "Quem já mora no imóvel também pode automatizar sem obra. Usamos módulos que vão atrás do interruptor que você já tem, fechadura digital no lugar da comum e Wi-Fi em malha para o sinal chegar em todos os cômodos.",
        ],
        "destaques": [
            ("building", "Ideal para apartamento", "Automação sem quebrar parede e sem mexer na fachada."),
            ("key", "Fechadura digital", "Entre com senha, digital ou celular, e libere visitas de longe."),
            ("wifi", "Wi-Fi em toda a casa", "Rede em malha para câmeras e aparelhos nunca ficarem sem sinal."),
        ],
        "depoimento": ("O serviço foi executado com excelência. O profissional demonstrou grande conhecimento e atenção aos detalhes, superando minhas expectativas.", "Anderson Marques", "Avaliação no Google"),
        "faq": [
            ("Vocês atendem Vespasiano?", "Sim. Vespasiano faz parte da nossa área de atendimento. Mande seu bairro no WhatsApp e agendamos a visita."),
            ("Dá para automatizar apartamento alugado?", "Dá. Usamos dispositivos que saem com você na mudança, sem obra e sem marcas na parede."),
            ("Meu imóvel ainda está na planta. Vale falar agora?", "Vale muito. Com a obra ainda aberta, deixamos a infraestrutura pronta e a automação sai mais completa e mais barata."),
        ],
    },
    {
        "slug": "confins",
        "nome": "Confins",
        "titulo": "Automação Residencial em Confins | Home Automation Technology",
        "descricao": "Automação residencial em Confins/MG: acompanhe sua casa pelo celular quando viajar, com câmeras, portão, luzes que simulam presença e alertas. Instalação e suporte na região.",
        "selo": "Casa vigiada até quando você viaja",
        "h1": 'Automação residencial em <span class="grad">Confins</span>',
        "sub": "Para quem passa dias fora: veja, controle e receba alertas da sua casa pelo celular, de qualquer lugar.",
        "intro": [
            "Em Confins, perto do aeroporto, muita gente trabalha viajando ou passa temporadas fora. A automação resolve justamente isso: você acompanha a casa à distância e ela parece ocupada mesmo vazia.",
            "As luzes acendem e apagam em horários diferentes para simular presença. As câmeras avisam quando detectam movimento, o portão abre pelo celular para quem você autorizar e sensores avisam sobre vazamento ou queda de energia.",
        ],
        "destaques": [
            ("lightbulb", "Simulação de presença", "Luzes e persianas mudam sozinhas para a casa parecer ocupada."),
            ("bell", "Alertas no celular", "Movimento, porta aberta, vazamento ou falta de energia: você fica sabendo na hora."),
            ("phone", "Controle de longe", "Abra o portão para a diarista ou o jardineiro sem estar em casa."),
        ],
        "depoimento": ("Profissional super competente, honesto e com opções de produtos. Super indico.", "Flavio Rabelo", "Avaliação no Google"),
        "faq": [
            ("Vocês atendem Confins?", "Sim. Confins fica na nossa área de atendimento, ao lado de Lagoa Santa."),
            ("Consigo ver a casa quando estou viajando?", "Sim. Com internet em casa, você vê as câmeras, recebe alertas e controla luzes e portão de qualquer lugar do mundo."),
            ("E se a internet ou a energia cair enquanto eu estiver fora?", "Planejamos para isso: as automações locais continuam funcionando sem internet, e você recebe um aviso quando a casa volta a ficar online."),
        ],
    },
    {
        "slug": "sao-jose-da-lapa",
        "nome": "São José da Lapa",
        "titulo": "Automação Residencial em São José da Lapa | Home Automation Technology",
        "descricao": "Automação residencial em São José da Lapa/MG: portão, câmeras, iluminação interna e externa, clima e som no celular. Projeto, instalação e pós-venda de quem está na região.",
        "selo": "Atendimento na região",
        "h1": 'Automação residencial em <span class="grad">São José da Lapa</span>',
        "sub": "Do portão ao quintal: segurança, luz e conforto da sua casa em um aplicativo só, com suporte de quem está pertinho.",
        "intro": [
            "São José da Lapa fica entre Lagoa Santa e Vespasiano, onde já atendemos todos os dias. Por isso a visita técnica, a instalação e o suporte depois da obra são rápidos.",
            "Em casa com quintal e área externa, o que mais faz diferença é a segurança: câmeras que avisam no celular, portão que abre pelo app e luzes externas que acendem sozinhas ao anoitecer. Por dentro, o mesmo app cuida de luzes, ar-condicionado e som.",
        ],
        "destaques": [
            ("camera-video", "Câmeras com alerta", "Veja a casa e o quintal pelo celular e receba aviso de movimento."),
            ("door-open", "Portão no celular", "Abra para quem chegou sem sair do sofá, ou de longe."),
            ("lightbulb", "Luz externa automática", "Acende ao anoitecer e apaga sozinha, sem esquecer ligada."),
        ],
        "depoimento": ("Melhor serviço, qualidade, pontualidade, tudo de bom! Obrigada pelo ótimo serviço, Home Automation.", "Patrícia Pires", "Avaliação no Google"),
        "faq": [
            ("Vocês atendem São José da Lapa?", "Sim. São José da Lapa faz parte da nossa área de atendimento, entre Lagoa Santa e Vespasiano. Mande seu bairro no WhatsApp e agendamos a visita."),
            ("Dá para automatizar sem quebrar parede?", "Na maioria das casas, sim. Usamos módulos atrás dos interruptores que você já tem e câmeras e sensores sem fio."),
            ("Funciona se a internet cair?", "As automações da casa continuam funcionando sem internet. Só o acesso de fora de casa espera a conexão voltar."),
        ],
    },
    {
        "slug": "sao-jose-de-almeida",
        "nome": "São José de Almeida",
        "titulo": "Automação Residencial em São José de Almeida | Home Automation Technology",
        "descricao": "Automação residencial em São José de Almeida (Jaboticatubas/MG) para casas, sítios e chácaras: câmeras, portão, luzes e alertas no celular, mesmo longe. Instalação e suporte na região.",
        "selo": "Casas, sítios e chácaras",
        "h1": 'Automação residencial em <span class="grad">São José de Almeida</span>',
        "sub": "Acompanhe sua casa, sítio ou chácara pelo celular, esteja você lá ou a quilômetros de distância.",
        "intro": [
            "São José de Almeida, distrito de Jaboticatubas a caminho da Serra do Cipó, tem muitas casas de fim de semana, sítios e chácaras. Quem não está lá todo dia precisa saber o que acontece na propriedade.",
            "Com câmeras que avisam no celular, portão liberado de longe para o caseiro ou um prestador, e luzes que simulam presença, a casa fica vigiada mesmo vazia. Sensores avisam sobre falta de energia ou vazamento antes de o problema crescer.",
        ],
        "destaques": [
            ("camera-video", "Câmeras com alerta", "Veja a propriedade de longe e receba aviso de movimento."),
            ("phone", "Portão de longe", "Libere a entrada do caseiro ou de um prestador pelo app."),
            ("bell", "Alertas da casa", "Falta de energia, porta aberta ou vazamento: você fica sabendo na hora."),
        ],
        "depoimento": ("Atendimento nota mil: atencioso, tranquilo e super eficiente. Super recomendo.", "Joben Marques", "Avaliação no Google"),
        "faq": [
            ("Vocês atendem São José de Almeida?", "Sim. São José de Almeida faz parte da nossa área de atendimento, perto de Lagoa Santa. Mande sua localização no WhatsApp e agendamos a visita."),
            ("E se a internet do sítio for fraca?", "Avaliamos o sinal na visita técnica. As automações locais funcionam sem internet, e indicamos a melhor forma de levar conexão às câmeras."),
            ("Consigo ver a casa quando não estou lá?", "Sim. Com internet no local, você vê as câmeras, recebe alertas e abre o portão de qualquer lugar."),
        ],
    },
    {
        "slug": "belo-horizonte",
        "nome": "Belo Horizonte",
        "titulo": "Automação Residencial em Belo Horizonte | Home Automation Technology",
        "descricao": "Automação residencial em Belo Horizonte/MG: iluminação, home cinema, som ambiente, câmeras, clima e cortinas em casas e apartamentos. Projeto, instalação e suporte.",
        "selo": "Também em BH",
        "h1": 'Automação residencial em <span class="grad">Belo Horizonte</span>',
        "sub": "Casas e apartamentos em BH com luz, som, cinema, clima e segurança em um único aplicativo, ou pela voz.",
        "intro": [
            "Além de Lagoa Santa e região, atendemos casas e apartamentos em Belo Horizonte. Mande seu bairro pelo WhatsApp e confirmamos o atendimento e a data da visita técnica.",
            "Em BH, o mais pedido é conforto: cenas de iluminação para cada momento, home cinema e som ambiente, ar-condicionado e cortinas no celular. E segurança integrada, com câmeras, fechadura digital e interfone no mesmo app.",
        ],
        "destaques": [
            ("film", "Home cinema e som", "Cinema em casa e música em cada ambiente, tudo com um toque."),
            ("sliders", "Cenas de iluminação", "\"Jantar\", \"Filme\", \"Boa noite\": a casa inteira muda com um comando."),
            ("snow", "Clima e cortinas", "Ar-condicionado e cortinas no app, em horários ou pela voz."),
        ],
        "depoimento": ("Empresa séria e eficiente, trabalho de qualidade e profissionais qualificados. Super indico.", "Freitas", "Avaliação no Google"),
        "faq": [
            ("Vocês atendem todos os bairros de BH?", "Atendemos Belo Horizonte mediante agendamento. Mande seu bairro no WhatsApp e confirmamos a data da visita técnica."),
            ("Dá para automatizar apartamento sem obra?", "Na maioria dos casos, sim. Usamos módulos atrás dos interruptores, controles infravermelho para ar e TV e motores para cortinas que já existem."),
            ("Funciona com Alexa e Google?", "Sim. Integramos Alexa e Google Assistente para você controlar luzes, cenas, ar e cortinas pela voz."),
        ],
    },
]

SERVICOS = [
    ("lightbulb", "Iluminação Inteligente", "Cenas, horários e controle por voz. Sem trocar sua instalação inteira."),
    ("camera-video", "Segurança e Câmeras", "Câmeras no celular com alerta de movimento e gravação na nuvem ou local."),
    ("door-open", "Portão e Fechadura", "Abra pelo app, libere visitas de longe e saiba quem entrou."),
    ("thermometer-sun", "Clima", "Ar-condicionado no celular, com a casa fresca quando você chegar."),
    ("speaker", "Som e Home Cinema", "Música em cada ambiente e cinema em casa com um toque."),
    ("window-sidebar", "Cortinas e Persianas", "Abrem com o sol, fecham à noite, ou quando você mandar."),
]

e = html.escape


def zap(texto):
    return f"https://wa.me/{ZAP}?text={quote(texto)}"


def pagina(c):
    url = f"{SITE}/automacao-residencial-{c['slug']}/"
    msg = f"Olá! Vi o site e quero um projeto de automação para minha casa em {c['nome']}."
    ev = c["slug"].replace("-", "_")
    schema_negocio = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Automação residencial",
        "name": f"Automação residencial em {c['nome']}",
        "url": url,
        "areaServed": {"@type": "City", "name": c["nome"], "address": {"@type": "PostalAddress", "addressRegion": "MG", "addressCountry": "BR"}},
        "provider": {
            "@type": "LocalBusiness", "name": "Home Automation Technology", "url": f"{SITE}/",
            "telephone": "+5531995012927", "image": f"{SITE}/images/logo-original.jpeg",
            "address": {"@type": "PostalAddress", "addressLocality": "Lagoa Santa", "addressRegion": "MG", "addressCountry": "BR"},
        },
    }
    schema_faq = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": r}} for q, r in c["faq"]],
    }
    schema_trilha = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Início", "item": f"{SITE}/"},
            {"@type": "ListItem", "position": 2, "name": f"Automação residencial em {c['nome']}", "item": url},
        ],
    }
    j = lambda o: json.dumps(o, ensure_ascii=False, indent=1)

    intro = "\n".join(f"                        <p>{p}</p>" for p in c["intro"])
    destaques = "\n".join(
        f'                            <li><i class="bi bi-{i}"></i><div><b>{t}</b><span>{d}</span></div></li>' for i, t, d in c["destaques"])
    servicos = "\n".join(
        f'                    <div class="col-lg-4 col-md-6"><div class="servico-card"><i class="icon bi bi-{i}"></i><h3>{t}</h3><p>{d}</p></div></div>' for i, t, d in SERVICOS)
    dt, dn, do = c["depoimento"]
    do_html = '<i class="bi bi-google"></i> Avaliação no Google' if do == "Avaliação no Google" else e(do)
    faq = "\n".join(
        f'''                    <div class="accordion-item">
                        <h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cf{n}" aria-expanded="false" aria-controls="cf{n}">{e(q)}</button></h3>
                        <div id="cf{n}" class="accordion-collapse collapse" data-bs-parent="#faqCidade"><div class="accordion-body">{e(r)}</div></div>
                    </div>''' for n, (q, r) in enumerate(c["faq"], 1))
    atual = ' aria-current="page"'
    outras = "".join(
        f'<a href="/automacao-residencial-{o["slug"]}/"{atual if o is c else ""}>{o["nome"]}</a>' for o in CIDADES)

    return f'''<!DOCTYPE html>
<!-- Gerado por _ferramentas/gerar_cidades.py. Não edite à mão: edite o script e rode de novo. -->
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{e(c["titulo"])}</title>
    <meta name="description" content="{e(c["descricao"])}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{url}">

    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png">
    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">

    <meta property="og:type" content="website">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Home Automation Technology">
    <meta property="og:title" content="{e(c["titulo"])}">
    <meta property="og:description" content="{e(c["descricao"])}">
    <meta property="og:url" content="{url}">
    <meta property="og:image" content="{SITE}/images/og-lagoa-santa-regiao.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="theme-color" content="#05080f">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="stylesheet" href="/style.css">

    <script type="application/ld+json">
{j(schema_negocio)}
    </script>
    <script type="application/ld+json">
{j(schema_faq)}
    </script>
    <script type="application/ld+json">
{j(schema_trilha)}
    </script>
    <script src="/medicao.js" defer></script>
</head>
<body>
    <header class="header fixed-top" id="topo">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container">
                <a class="navbar-brand" href="/"><img src="/images/logo-nav.webp" alt="Home Automation Technology" class="logo-img" width="1022" height="398"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Abrir menu">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto align-items-lg-center">
                        <li class="nav-item"><a class="nav-link" href="#solucoes">Soluções</a></li>
                        <li class="nav-item"><a class="nav-link" href="/#portfolio">Projetos</a></li>
                        <li class="nav-item"><a class="nav-link" href="#duvidas">Dúvidas</a></li>
                        <li class="nav-item"><a class="nav-link" href="/">Página inicial</a></li>
                        <li class="nav-item ms-lg-2"><a class="btn btn-neon btn-sm" href="/#simulador">Pedir orçamento</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero hero-cidade">
            <div class="container">
                <nav class="trilha" aria-label="Você está em"><a href="/">Início</a> › Automação residencial em {c["nome"]}</nav>
                <div class="row">
                    <div class="col-lg-9 hero-texto">
                        <span class="selo"><span class="led"></span> {e(c["selo"])}</span>
                        <h1>{c["h1"]}</h1>
                        <p class="hero-sub">{e(c["sub"])}</p>
                        <div class="hero-ctas">
                            <a href="{zap(msg)}" target="_blank" rel="noopener noreferrer" class="btn btn-whats btn-lg" data-evento="whatsapp_cidade_{ev}"><i class="bi bi-whatsapp"></i> Quero um projeto em {c["nome"]}</a>
                            <a href="/#simulador" class="btn btn-contorno btn-lg"><i class="bi bi-calculator"></i> Montar meu projeto</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="row gy-5 align-items-center">
                    <div class="col-lg-6 cidade-texto revela">
                        <span class="sobretitulo">{c["nome"]} e região</span>
                        <h2 class="mt-2 mb-4">Automação pensada para as casas de {c["nome"]}</h2>
{intro}
                    </div>
                    <div class="col-lg-6 revela" style="--atraso:.1s">
                        <ul class="cidade-destaques">
{destaques}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section id="solucoes">
            <div class="container">
                <div class="titulo-secao revela">
                    <span class="sobretitulo">Soluções</span>
                    <h2>O que dá para automatizar na sua casa</h2>
                    <p>Tudo em um só aplicativo, com Alexa e Google, e funcionando mesmo se a internet cair.</p>
                </div>
                <div class="row g-4 revela">
{servicos}
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="titulo-secao revela">
                    <span class="sobretitulo">Clientes</span>
                    <h2>Quem automatizou, recomenda</h2>
                    <p><span class="nota-google">★ 5,0</span> no Google, com todas as avaliações em 5 estrelas.</p>
                </div>
                <div class="cidade-depoimento revela">
                    <div class="testimonial-card"><span class="aspas">“</span><span class="estrelas" aria-label="5 estrelas">★★★★★</span><p>{e(dt)}</p><span class="author">{e(dn)}</span><span class="origem">{do_html}</span></div>
                </div>
                <div class="text-center mt-4 revela">
                    <a href="/#depoimentos" class="btn btn-contorno"><i class="bi bi-chat-quote"></i> Ver todas as avaliações</a>
                </div>
            </div>
        </section>

        <section id="duvidas">
            <div class="container">
                <div class="titulo-secao revela">
                    <span class="sobretitulo">Dúvidas</span>
                    <h2>Perguntas de quem mora em {c["nome"]}</h2>
                </div>
                <div class="accordion faq-lista revela" id="faqCidade">
{faq}
                </div>
            </div>
        </section>

        <section>
            <div class="container text-center">
                <div class="titulo-secao revela">
                    <h2>Vamos projetar a sua casa em {c["nome"]}?</h2>
                    <p>Conte o que você imagina. A gente responde com ideias e um orçamento sob medida.</p>
                </div>
                <a href="{zap(msg)}" target="_blank" rel="noopener noreferrer" class="btn btn-whats btn-lg revela" data-evento="whatsapp_cidade_{ev}_fim"><i class="bi bi-whatsapp"></i> Chamar no WhatsApp</a>
                <p class="mt-5 mb-3 text-white-50">Também atendemos:</p>
                <nav class="cidades-links" aria-label="Cidades atendidas">{outras}</nav>
            </div>
        </section>
    </main>

    <a href="{zap(msg)}" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Fale conosco pelo WhatsApp" data-evento="whatsapp_flutuante_{ev}">
        <i class="bi bi-whatsapp"></i>
    </a>

    <footer class="footer">
        <div class="container">
            <div class="row gy-4 align-items-center">
                <div class="col-lg-4 text-center text-lg-start">
                    <img src="/images/logo-nav.webp" alt="Home Automation Technology" class="footer-logo" width="1022" height="398" loading="lazy">
                    <p class="mt-3 mb-0">Automação residencial em Lagoa Santa e região. Sua casa inteligente, do jeito que você imagina.</p>
                </div>
                <div class="col-lg-4 text-center">
                    <nav class="footer-links">
                        <a href="/#servicos">Soluções</a><a href="/#como-funciona">Como funciona</a><a href="/#portfolio">Projetos</a><a href="/#faq">Dúvidas</a><a href="/#contato">Contato</a>
                    </nav>
                </div>
                <div class="col-lg-4 text-center text-lg-end">
                    <a href="https://www.instagram.com/homeautomationtechnology_" target="_blank" rel="noopener noreferrer" class="footer-social" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                    <a href="https://wa.me/{ZAP}" target="_blank" rel="noopener noreferrer" class="footer-social" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
                    <a href="mailto:1.home.automation.technology@gmail.com" class="footer-social" aria-label="E-mail"><i class="bi bi-envelope"></i></a>
                </div>
            </div>
            <div class="footer-base">
                <span>© <span id="ano">{date.today().year}</span> Home Automation Technology. Todos os direitos reservados.</span>
                <span><a href="/privacidade.html">Política de Privacidade</a> · <button type="button" class="link-cookies" data-cookies>Preferências de cookies</button></span>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="/site.js"></script>
</body>
</html>
'''


def sitemap():
    hoje = date.today().isoformat()
    urls = [(f"{SITE}/", "monthly", "1.0")] + [
        (f"{SITE}/automacao-residencial-{c['slug']}/", "monthly", "0.8") for c in CIDADES]
    corpo = "\n".join(
        f"    <url>\n        <loc>{u}</loc>\n        <lastmod>{hoje}</lastmod>\n        <changefreq>{f}</changefreq>\n        <priority>{p}</priority>\n    </url>"
        for u, f, p in urls)
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{corpo}\n</urlset>\n'


if __name__ == "__main__":
    for c in CIDADES:
        pasta = os.path.join(RAIZ, f"automacao-residencial-{c['slug']}")
        os.makedirs(pasta, exist_ok=True)
        with open(os.path.join(pasta, "index.html"), "w", encoding="utf-8") as f:
            f.write(pagina(c))
        print("ok", pasta)
    with open(os.path.join(RAIZ, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap())
    print("ok sitemap.xml")
