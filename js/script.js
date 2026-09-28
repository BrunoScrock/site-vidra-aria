/* ==========================================================================
   COMAC — VIDRAÇARIA
   Funcionalidades do site (HTML + CSS + JavaScript, sem dependências)
   --------------------------------------------------------------------------
   Organização: cada responsabilidade vive em uma função independente e é
   acionada em DOMContentLoaded.
   ========================================================================== */

/* ==========================================================================
   1. UTILITÁRIOS
   ========================================================================== */

const COMAC = {
  /* Estado compartilhado entre os módulos da galeria ------------------- */
  portfolio: {
    filtro: "Todos",
    itens: []
  }
};

function $$(seletor, contexto) {
  return Array.prototype.slice.call((contexto || document).querySelectorAll(seletor));
}

function el(tag, classe, html) {
  const node = document.createElement(tag);
  if (classe) node.className = classe;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

/* Detecta placeholders do tipo [INSERIR ...] e valores vazios */
function ehPlaceholder(valor) {
  if (valor === null || valor === undefined) return true;
  const texto = String(valor).trim();
  return texto === "" || texto.indexOf("[INSERIR") === 0;
}

function numeros(valor) {
  return String(valor || "").replace(/\D/g, "");
}

function telefoneE164(telefone) {
  const digitos = numeros(telefone);
  if (!digitos) return "";
  if (digitos.length > 11) return "+" + digitos;
  if (digitos.startsWith("55")) return "+" + digitos;
  return "+55" + digitos;
}

function textoLivre(valor) {
  return String(valor === null || valor === undefined ? "" : valor).trim();
}

function mensagemWhatsApp(chave) {
  const mapa = {
    padrao: CONFIG.mensagemPadrao,
    orcamento: CONFIG.mensagemOrcamento,
    fotos: CONFIG.mensagemFotos,
    localizacao: CONFIG.mensagemLocalizacao
  };
  return mapa[chave] || CONFIG.mensagemPadrao || "";
}

function reduzirMovimentoAtivo() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function atualizarIcones() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function icone(nome) {
  return '<i data-lucide="' + nome + '" aria-hidden="true"></i>';
}

/* ==========================================================================
   2. WHATSAPP CENTRALIZADO
   ========================================================================== */

function numeroWhatsapp() {
  return numeros(CONFIG.whatsapp);
}

function avisarWhatsappVazio() {
  window.alert(
    "WhatsApp ainda não configurado.\n\n" +
    "Abra o arquivo js/config.js e preencha CONFIG.whatsapp " +
    "no formato 55 + DDD + número (somente dígitos)."
  );
}

function gerarUrlWhatsApp(mensagem) {
  const numero = numeroWhatsapp();
  if (numero.length < 10) return "";
  return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem || "");
}

function abrirWhatsApp(mensagem) {
  const url = gerarUrlWhatsApp(mensagem);
  if (!url) {
    avisarWhatsappVazio();
    return;
  }
  window.open(url, "_blank", "noopener");
}

/* ==========================================================================
   3. CONFIGURAÇÃO CENTRALIZADA
   ========================================================================== */

function aplicarConfiguracao() {
  const nome = CONFIG.nome || "COMAC Vidraçaria";

  document.title = nome + " | " + (CONFIG.tagline || "Soluções em Vidro");

  /* Textos simples ----------------------------------------------------- */
  const textos = {
    "heroKicker": CONFIG.tagline,
    "heroSubtitle": CONFIG.slogan,
    "footerSlogan": CONFIG.slogan,
    "footerName": nome,
    "year": new Date().getFullYear()
  };

  Object.keys(textos).forEach(function (id) {
    const alvo = document.getElementById(id);
    if (alvo && textos[id]) alvo.textContent = textos[id];
  });

  /* Telefone ----------------------------------------------------------- */
  const telefone = textoLivre(CONFIG.telefone);
  $$(".js-phone").forEach(function (link) {
    if (!ehPlaceholder(telefone)) {
      link.textContent = telefone;
      link.href = "tel:" + telefoneE164(telefone);
    }
  });

  /* E-mail ------------------------------------------------------------- */
  const email = textoLivre(CONFIG.email);
  $$(".js-email").forEach(function (link) {
    if (!ehPlaceholder(email)) {
      link.textContent = email;
      link.href = "mailto:" + email;
    }
  });

  /* Endereço ----------------------------------------------------------- */
  const partes = [];
  if (!ehPlaceholder(CONFIG.endereco)) partes.push(CONFIG.endereco);
  if (!ehPlaceholder(CONFIG.cidade)) {
    partes.push(CONFIG.cidade + (CONFIG.uf ? " — " + CONFIG.uf : ""));
  }
  const endereco = partes.join(" · ");
  const footerAddress = document.getElementById("footerAddress");
  if (footerAddress && endereco) footerAddress.textContent = endereco;

  /* Área de atendimento ------------------------------------------------ */
  const area = Array.isArray(CONFIG.areaAtendimento) ? CONFIG.areaAtendimento : [];
  const footerArea = document.getElementById("footerArea");
  if (footerArea) {
    footerArea.innerHTML = "";
    if (area.length) {
      area.forEach(function (item) {
        footerArea.appendChild(el("span", "location-tag", item));
      });
    } else {
      footerArea.appendChild(el("span", "location-tag", "[INSERIR CIDADES/REGIÕES ATENDIDAS]"));
    }
  }

  /* WhatsApp: aplica o mesmo link em todos os botões ------------------- */
  const configurado = numeroWhatsapp().length >= 10;
  $$(".js-whatsapp").forEach(function (link) {
    const chave = link.getAttribute("data-ws") || "padrao";
    link.href = configurado ? gerarUrlWhatsApp(mensagemWhatsApp(chave)) : "#";
  });

  const rotuloMobile = document.getElementById("mobileContato");
  if (rotuloMobile) {
    rotuloMobile.textContent = ehPlaceholder(telefone) ? "[INSERIR WHATSAPP]" : telefone;
  }

  /* Instagram ---------------------------------------------------------- */
  const instagram = document.getElementById("footerInstagram");
  if (instagram) {
    if (!ehPlaceholder(CONFIG.instagram)) {
      instagram.href = CONFIG.instagram;
      instagram.hidden = false;
    } else {
      instagram.hidden = true;
      instagram.removeAttribute("href");
    }
  }

  /* Lista de localização ---------------------------------------------- */
  montarListaLocalizacao();

  /* Mapa (opcional) ---------------------------------------------------- */
  montarMapa();

  /* Select de serviços no formulário ----------------------------------- */
  montarSelectServicos();

  /* Rodapé: horário ----------------------------------------------------- */
  const footerHorario = document.getElementById("footerHorario");
  if (footerHorario && !ehPlaceholder(CONFIG.horario)) footerHorario.textContent = CONFIG.horario;
}

function montarListaLocalizacao() {
  const lista = document.getElementById("locationList");
  if (!lista) return;

  const cidade = !ehPlaceholder(CONFIG.cidade)
    ? CONFIG.cidade + (CONFIG.uf ? " — " + CONFIG.uf : "")
    : "";

  const itens = [
    {
      icone: "map-pin",
      titulo: "Endereço",
      valor: [CONFIG.endereco, cidade].filter(function (p) { return p; }).join(" · ")
    },
    { icone: "clock", titulo: "Horário de funcionamento", valor: CONFIG.horario },
    { icone: "message-circle", titulo: "WhatsApp", valor: CONFIG.telefone },
    { icone: "mail", titulo: "E-mail", valor: CONFIG.email }
  ];

  lista.innerHTML = "";

  itens.forEach(function (item) {
    const texto = ehPlaceholder(item.valor)
      ? "[INSERIR " + item.titulo.toUpperCase() + "]"
      : textoLivre(item.valor);

    const bloco = el("div", "location-item");
    bloco.innerHTML =
      icone(item.icone) +
      "<div><h3>" + item.titulo + "</h3><p></p></div>";
    bloco.querySelector("p").textContent = texto;

    lista.appendChild(bloco);
  });

  atualizarIcones();
}

function montarMapa() {
  const alvo = document.getElementById("mapFrame");
  if (!alvo) return;

  const lat = CONFIG.mapa && CONFIG.mapa.lat;
  const lon = CONFIG.mapa && CONFIG.mapa.lon;

  if (ehPlaceholder(lat) || ehPlaceholder(lon)) return;

  const zoom = Number(CONFIG.mapa.zoom) || 16;
  const d = 0.004;
  const bbox = [lon - d, lat - d, lon + d, lat + d].join("%2C");

  const iframe = el("iframe");
  iframe.src = "https://www.openstreetmap.org/export/embed.html?bbox=" + bbox +
    "&layer=mapnik&marker=" + lat + "%2C" + lon;
  iframe.loading = "lazy";
  iframe.title = "Mapa de localização da COMAC Vidraçaria";
  iframe.referrerPolicy = "no-referrer-when-downgrade";

  const link = el("a", "text-link", "Como chegar");
  link.style.cssText = "position:absolute;left:20px;bottom:20px;z-index:2;background:rgba(255,255,255,.92);padding:12px 18px;";
  link.href = "https://www.openstreetmap.org/?mlat=" + lat + "&mlon=" + lon + "#map=" + zoom + "/" + lat + "/" + lon;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const placeholder = alvo.querySelector(".map-placeholder");
  if (placeholder) placeholder.parentNode.removeChild(placeholder);

  alvo.appendChild(iframe);
  alvo.appendChild(link);
}

function montarSelectServicos() {
  const select = document.getElementById("fServico");
  if (!select || !Array.isArray(SERVICOS)) return;

  const rotulo = select.options.length ? select.options[0].textContent : "Selecione um serviço";
  select.textContent = "";

  const placeholder = el("option", null, rotulo);
  placeholder.value = "";
  select.appendChild(placeholder);

  SERVICOS.forEach(function (servico) {
    const option = el("option", null, servico.titulo);
    option.value = servico.titulo;
    select.appendChild(option);
  });
}

/* ==========================================================================
   4. CABEÇALHO E NAVEGAÇÃO
   ========================================================================== */

function inicializarHeader() {
  const header = document.getElementById("topo");
  if (!header) return;

  function aoRolar() {
    header.classList.toggle("is-solid", window.scrollY > 40);
  }

  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });
}

function inicializarMenuMobile() {
  const botao = document.getElementById("menuToggle");
  const menu = document.getElementById("menuMobile");
  if (!botao || !menu) return;

  function abrir() {
    menu.classList.add("is-open");
    botao.classList.add("is-open");
    botao.setAttribute("aria-expanded", "true");
    botao.setAttribute("aria-label", "Fechar menu");
    document.body.classList.add("no-scroll");
  }

  function fechar(devolverFoco) {
    menu.classList.remove("is-open");
    botao.classList.remove("is-open");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("no-scroll");
    if (devolverFoco) botao.focus();
  }

  botao.addEventListener("click", function () {
    if (menu.classList.contains("is-open")) fechar(false);
    else abrir();
  });

  $$("a", menu).forEach(function (link) {
    link.addEventListener("click", function () {
      fechar(false);
    });
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && menu.classList.contains("is-open")) fechar(true);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1080 && menu.classList.contains("is-open")) fechar(false);
  });
}

function inicializarScrollSuave() {
  document.addEventListener("click", function (evento) {
    const link = evento.target.closest ? evento.target.closest('a[href^="#"]') : null;
    if (!link) return;

    const id = link.getAttribute("href");
    if (!id || id === "#" || id.length < 2) return;

    const alvo = document.querySelector(id);
    if (!alvo) return;

    evento.preventDefault();
    alvo.scrollIntoView({
      behavior: reduzirMovimentoAtivo() ? "auto" : "smooth",
      block: "start"
    });

    if (history.replaceState) history.replaceState(null, "", id);
  });
}

function inicializarScrollSpy() {
  const links = $$("#navPrincipal a");
  if (!links.length || !("IntersectionObserver" in window)) return;

  const secoes = links
    .map(function (link) {
      const alvo = document.querySelector(link.getAttribute("href"));
      return alvo ? { alvo: alvo, link: link } : null;
    })
    .filter(Boolean);

  if (!secoes.length) return;

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      links.forEach(function (link) { link.classList.remove("is-active"); });
      const item = secoes.find(function (s) { return s.alvo === entrada.target; });
      if (item) item.link.classList.add("is-active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  secoes.forEach(function (s) { observador.observe(s.alvo); });
}

/* ==========================================================================
   5. HERO: ANIMAÇÃO DE IMAGEM, TÍTULO E PARALLAX
   ========================================================================== */

function inicializarHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  /* Pausa o Ken Burns quando a aba não está visível (economiza bateria) */
  const imagem = document.querySelector(".hero-media img");

  document.addEventListener("visibilitychange", function () {
    if (!imagem) return;
    imagem.style.animationPlayState = document.hidden ? "paused" : "running";
  });
}

function inicializarAnimatedText() {
  const titulo = document.getElementById("heroTitle");
  if (!titulo) return;

  if (reduzirMovimentoAtivo()) return;

  const linhas = $$(".title-line > span", titulo);
  if (!linhas.length) return;

  let deslocamento = 0;

  linhas.forEach(function (linha) {
    const texto = textoLivre(linha.textContent);
    if (!texto) return;

    linha.setAttribute("aria-hidden", "true");

    let html = "";
    texto.split("").forEach(function (caractere) {
      if (caractere === " ") {
        html += '<span class="title-char" aria-hidden="true">&nbsp;</span>';
      } else {
        html += '<span class="title-char" aria-hidden="true" style="--d:' + deslocamento + 'ms">' + caractere + "</span>";
        deslocamento += 46;
      }
    });

    linha.innerHTML = html;
    deslocamento += 130;
  });

  titulo.classList.add("is-animated");
}

function inicializarParallax() {
  if (reduzirMovimentoAtivo()) return;
  if (window.innerWidth < 900) return;
  if (!("IntersectionObserver" in window)) return;

  const hero = document.querySelector(".hero");
  const media = document.querySelector(".hero-media");
  if (!hero || !media) return;

  let agendado = false;

  function atualizar() {
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const deslocamento = Math.min(rect.top * -0.16, 120);
    media.style.transform = "translate3d(0," + deslocamento.toFixed(1) + "px,0)";
    agendado = false;
  }

  window.addEventListener("scroll", function () {
    if (agendado) return;
    agendado = true;
    window.requestAnimationFrame(atualizar);
  }, { passive: true });
}

/* ==========================================================================
   6. SCROLL REVEAL
   ========================================================================== */

function inicializarReveal(novosElementos) {
  const alvos = novosElementos || $$("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    alvos.forEach(function (alvo) { alvo.classList.add("is-visible"); });
    return;
  }

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("is-visible");
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  alvos.forEach(function (alvo) {
    alvo.style.transitionDelay = String((Number(alvo.dataset.revealDelay) || 0) * 1000) + "ms";
    if (!alvo.classList.contains("is-visible")) observador.observe(alvo);
    else alvo.style.transitionDelay = "0ms";
  });

  /* Manifesto: palavras entram uma a uma (observador criado uma única vez) */
  if (COMAC.manifestoObservado) return;
  COMAC.manifestoObservado = true;

  const palavras = $$(".manifesto-word");
  if (!palavras.length) return;

  if (!("IntersectionObserver" in window)) {
    palavras.forEach(function (p) { p.classList.add("is-visible"); });
    return;
  }

  const observadorPalavras = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      const indice = palavras.indexOf(entrada.target);
      setTimeout(function () { entrada.target.classList.add("is-visible"); }, indice * 130);
      observadorPalavras.unobserve(entrada.target);
    });
  }, { threshold: 0.4 });

  palavras.forEach(function (palavra) { observadorPalavras.observe(palavra); });
}

/* ==========================================================================
   7. SERVIÇOS
   ========================================================================== */

function montarServicos() {
  const grade = document.getElementById("servicesGrid");
  if (!grade || !Array.isArray(SERVICOS)) return;

  grade.innerHTML = "";

  SERVICOS.forEach(function (servico, indice) {
    const numero = String(indice + 1).padStart(2, "0");

    const card = el("article", "service-card");
    card.dataset.reveal = "up";
    card.dataset.revealDelay = String(indice % 3);

    card.innerHTML =
      '<div class="service-card-media">' +
        '<span class="service-number">' + numero + "</span>" +
        '<span class="service-icon">' + icone(servico.icone || "layers") + "</span>" +
        (servico.imagem
          ? '<img src="' + servico.imagem + '" alt="' + escaparTexto(servico.titulo) + '" loading="lazy" decoding="async">'
          : "") +
      "</div>" +
      '<div class="service-card-body">' +
        "<h3>" + escaparTexto(servico.titulo) + "</h3>" +
        "<p>" + escaparTexto(servico.descricao) + "</p>" +
        '<a class="text-link js-whatsapp" href="#" data-ws="orcamento">Saiba mais' + icone("arrow-right") + "</a>" +
      "</div>";

    grade.appendChild(card);
  });

  inicializarBotoesWhatsApp(grade);
  inicializarReveal($$("[data-reveal]", grade));
  atualizarIcones();
}

/* ==========================================================================
   8. DIFERENCIAIS
   ========================================================================== */

function montarDiferenciais() {
  const grade = document.getElementById("diffGrid");
  if (!grade || !Array.isArray(DIFERENCIAIS)) return;

  grade.innerHTML = "";

  DIFERENCIAIS.forEach(function (item, indice) {
    const card = el("article", "diff-card");
    card.dataset.reveal = "up";
    card.dataset.revealDelay = String(indice % 3);

    card.innerHTML =
      '<span class="diff-icon">' + icone(item.icone || "sparkles") + "</span>" +
      "<h3>" + escaparTexto(item.titulo) + "</h3>" +
      "<p>" + escaparTexto(item.descricao) + "</p>";

    grade.appendChild(card);
  });

  inicializarReveal($$("[data-reveal]", grade));
  atualizarIcones();
}

/* ==========================================================================
   9. PROCESSO
   ========================================================================== */

function montarProcesso() {
  const trilha = document.getElementById("processTrack");
  if (!trilha || !Array.isArray(PROCESSO)) return;

  trilha.innerHTML = "";

  PROCESSO.forEach(function (etapa, indice) {
    const item = el("article", "step");
    item.dataset.reveal = "up";
    item.dataset.revealDelay = String(indice);

    item.innerHTML =
      '<span class="step-dot">' + icone(etapa.icone || "check") + "</span>" +
      '<span class="step-number">' + escaparTexto(etapa.numero || String(indice + 1).padStart(2, "0")) + "</span>" +
      "<h3>" + escaparTexto(etapa.titulo) + "</h3>" +
      "<p>" + escaparTexto(etapa.descricao) + "</p>";

    trilha.appendChild(item);
  });

  inicializarReveal($$("[data-reveal]", trilha));
  atualizarIcones();
}

/* ==========================================================================
   10. PORTFÓLIO: FILTROS + GRID + LIGHTBOX
   ========================================================================== */

function montarFiltros() {
  const caixa = document.getElementById("portfolioFilters");
  if (!caixa || !Array.isArray(CATEGORIAS_PORTFOLIO)) return;

  caixa.innerHTML = "";

  CATEGORIAS_PORTFOLIO.forEach(function (categoria) {
    const botao = el("button", "filter-btn", escaparTexto(categoria));
    botao.type = "button";
    botao.setAttribute("data-filtro", categoria);
    botao.setAttribute("aria-pressed", categoria === "Todos" ? "true" : "false");

    botao.addEventListener("click", function () {
      $$(".filter-btn", caixa).forEach(function (outro) {
        outro.setAttribute("aria-pressed", "false");
      });
      botao.setAttribute("aria-pressed", "true");
      COMAC.portfolio.filtro = categoria;
      montarPortfolio();
    });

    caixa.appendChild(botao);
  });
}

function montarPortfolio() {
  const grade = document.getElementById("portfolioGrid");
  if (!grade || !Array.isArray(PORTFOLIO)) return;

  const filtro = COMAC.portfolio.filtro;
  const itens = filtro === "Todos"
    ? PORTFOLIO.slice()
    : PORTFOLIO.filter(function (item) { return item.categoria === filtro; });

  grade.innerHTML = "";

  if (!itens.length) {
    grade.appendChild(el("p", "portfolio-empty", "Nenhum projeto nesta categoria por enquanto."));
    return;
  }

  itens.forEach(function (item, indice) {
    const fotos = Array.isArray(item.imagens) && item.imagens.length ? item.imagens : [item.imagem];

    const card = el("button", "portfolio-card" + (item.destaque && filtro === "Todos" ? " is-feature" : ""));
    card.type = "button";
    card.dataset.reveal = "up";
    card.dataset.revealDelay = String(indice % 3);
    card.setAttribute("aria-label", "Ampliar fotos: " + item.titulo);

    card.innerHTML =
      '<img src="' + item.imagem + '" alt="' + escaparTexto(item.titulo + " — " + (item.tag || "")) + '" loading="lazy" decoding="async">' +
      (fotos.length > 1 ? '<span class="portfolio-card-count">' + fotos.length + " fotos</span>" : "") +
      '<span class="portfolio-card-body">' +
        '<span class="portfolio-card-tag">' + escaparTexto(item.tag || "") + "</span>" +
        "<h3>" + escaparTexto(item.titulo) + "</h3>" +
        (item.descricao ? "<p>" + escaparTexto(item.descricao) + "</p>" : "") +
      "</span>";

    card.addEventListener("click", function () {
      abrirLightbox(itens, indice);
    });

    grade.appendChild(card);
  });

  inicializarReveal($$("[data-reveal]", grade));
}

function escaparTexto(valor) {
  return String(valor === null || valor === undefined ? "" : valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* --------------------------------------------------------------------------
   LIGHTBOX
   -------------------------------------------------------------------------- */

const LIGHTBOX = {
  node: null,
  itens: [],
  indice: 0,
  focoAnterior: null,

  criar: function () {
    if (this.node) return this.node;

    const node = el("div", "lightbox");
    node.setAttribute("role", "dialog");
    node.setAttribute("aria-modal", "true");
    node.setAttribute("aria-label", "Galeria de fotos");
    node.hidden = false;

    node.innerHTML =
      '<button class="lightbox-btn lightbox-close" type="button" aria-label="Fechar galeria">' + icone("x") + "</button>" +
      '<span class="lightbox-counter" aria-live="polite"></span>' +
      '<button class="lightbox-btn lightbox-prev" type="button" aria-label="Foto anterior">' + icone("chevron-left") + "</button>" +
      '<button class="lightbox-btn lightbox-next" type="button" aria-label="Próxima foto">' + icone("chevron-right") + "</button>" +
      '<figure class="lightbox-figure">' +
        '<img class="lightbox-img" src="" alt="">' +
        "<figcaption>" +
          '<div class="lightbox-cap"><h3></h3><p></p></div>' +
        "</figcaption>" +
      "</figure>" +
      '<div class="lightbox-thumbs"></div>';

    document.body.appendChild(node);
    this.node = node;

    node.querySelector(".lightbox-close").addEventListener("click", this.fechar.bind(this));

    node.querySelector(".lightbox-prev").addEventListener("click", function (evento) {
      evento.stopPropagation();
      this.anterior();
    }.bind(this));

    node.querySelector(".lightbox-next").addEventListener("click", function (evento) {
      evento.stopPropagation();
      this.proxima();
    }.bind(this));

    node.addEventListener("click", function (evento) {
      if (evento.target === node) this.fechar();
    }.bind(this));

    document.addEventListener("keydown", function (evento) {
      if (!this.estaAberto()) return;
      if (evento.key === "Escape") { this.fechar(); evento.preventDefault(); }
      else if (evento.key === "ArrowLeft") { this.anterior(); evento.preventDefault(); }
      else if (evento.key === "ArrowRight") { this.proxima(); evento.preventDefault(); }
      else if (evento.key === "Tab") this.manterFoco(evento);
    }.bind(this));

    /* Swipe */
    let inicioX = 0;
    node.addEventListener("touchstart", function (evento) {
      inicioX = evento.changedTouches[0].clientX;
    }, { passive: true });

    node.addEventListener("touchend", function (evento) {
      const diff = evento.changedTouches[0].clientX - inicioX;
      if (Math.abs(diff) < 48) return;
      if (diff < 0) this.proxima();
      else this.anterior();
    }.bind(this), { passive: true });

    atualizarIcones();
    return node;
  },

  estaAberto: function () {
    return this.node && this.node.classList.contains("is-open");
  },

  abrir: function (itens, indice) {
    this.criar();
    this.itens = itens;
    this.indice = indice || 0;
    this.foto = 0;
    this.focoAnterior = document.activeElement;

    this.atualizar();
    this.node.classList.add("is-open");
    document.body.classList.add("no-scroll");
    this.node.querySelector(".lightbox-close").focus();
  },

  fechar: function () {
    if (!this.node) return;
    this.node.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    if (this.focoAnterior && typeof this.focoAnterior.focus === "function") {
      this.focoAnterior.focus();
    }
  },

  irPara: function (indice) {
    if (!this.itens.length) return;
    this.indice = (indice + this.itens.length) % this.itens.length;
    this.foto = 0;
    this.atualizar();
  },

  irParaFoto: function (indice) {
    const fotos = listaFotos(this.itens[this.indice]);
    if (!fotos.length) return;
    this.foto = (indice + fotos.length) % fotos.length;
    this.atualizar();
  },

  anterior: function () { this.irParaFoto(this.foto - 1); },
  proxima: function () { this.irParaFoto(this.foto + 1); },

  manterFoco: function (evento) {
    const focaveis = $$("button", this.node).filter(function (botao) {
      return botao.offsetParent !== null;
    });
    if (!focaveis.length) return;

    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (evento.shiftKey && document.activeElement === primeiro) {
      ultimo.focus();
      evento.preventDefault();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      primeiro.focus();
      evento.preventDefault();
    }
  },

  atualizar: function () {
    if (!this.node || !this.itens.length) return;

    const item = this.itens[this.indice];
    const fotos = listaFotos(item);
    const multiplas = fotos.length > 1;
    if (this.foto >= fotos.length) this.foto = fotos.length - 1;
    if (this.foto < 0) this.foto = 0;

    const img = this.node.querySelector(".lightbox-img");
    img.src = fotos[this.foto];
    img.alt = (item.titulo || "Projeto") + (item.tag ? " — " + item.tag : "") +
      (multiplas ? " (" + (this.foto + 1) + " de " + fotos.length + ")" : "");

    this.node.querySelector(".lightbox-counter").textContent =
      multiplas ? this.foto + 1 + " / " + fotos.length : "";

    this.node.querySelector(".lightbox-cap h3").textContent = item.titulo || "";
    this.node.querySelector(".lightbox-cap p").textContent = item.descricao || "";

    this.node.querySelector(".lightbox-prev").style.display = multiplas ? "" : "none";
    this.node.querySelector(".lightbox-next").style.display = multiplas ? "" : "none";

    const miniaturas = this.node.querySelector(".lightbox-thumbs");
    miniaturas.innerHTML = "";

    if (multiplas) {
      fotos.forEach(function (foto, indice) {
        const botao = el("button", "lightbox-thumb");
        botao.type = "button";
        botao.setAttribute("aria-label", "Ver foto " + (indice + 1) + " de " + fotos.length);
        botao.setAttribute("aria-current", indice === this.foto ? "true" : "false");
        botao.innerHTML = '<img src="' + foto + '" alt="" loading="lazy" decoding="async">';
        botao.addEventListener("click", this.irParaFoto.bind(this, indice));
        miniaturas.appendChild(botao);
      }, this);
    }
  }
};

function listaFotos(item) {
  if (!item) return [];
  if (Array.isArray(item.imagens) && item.imagens.length) return item.imagens;
  return item.imagem ? [item.imagem] : [];
}

function abrirLightbox(itens, indice) {
  LIGHTBOX.abrir(itens, indice);
}

/* ==========================================================================
   11. ANTES E DEPOIS
   ========================================================================== */

function montarAntesDepois() {
  const abas = document.getElementById("compareTabs");
  if (!abas || !Array.isArray(ANTES_DEPOIS) || !ANTES_DEPOIS.length) return;

  abas.innerHTML = "";

  ANTES_DEPOIS.forEach(function (projeto, indice) {
    const aba = el("button", "compare-tab", escaparTexto(projeto.titulo || ("Projeto " + (indice + 1))));
    aba.type = "button";
    aba.id = "aba-" + projeto.id;
    aba.setAttribute("aria-pressed", indice === 0 ? "true" : "false");
    aba.addEventListener("click", function () {
      $$(".compare-tab", abas).forEach(function (outra) {
        outra.setAttribute("aria-pressed", "false");
      });
      aba.setAttribute("aria-pressed", "true");
      aplicarProjetoAntesDepois(projeto);
    });
    abas.appendChild(aba);
  });

  aplicarProjetoAntesDepois(ANTES_DEPOIS[0]);
}

function aplicarProjetoAntesDepois(projeto) {
  if (!projeto) return;

  const antes = document.getElementById("compareAntes");
  const depois = document.getElementById("compareDepois");
  const titulo = document.getElementById("compareTitulo");
  const descricao = document.getElementById("compareDescricao");
  const categoria = document.getElementById("compareCategoria");

  if (antes) {
    antes.src = projeto.antes;
    antes.alt = (projeto.titulo || "Projeto") + " — antes da instalação";
  }
  if (depois) {
    depois.src = projeto.depois;
    depois.alt = (projeto.titulo || "Projeto") + " — depois da instalação";
  }
  if (titulo) titulo.textContent = projeto.titulo || "";
  if (descricao) descricao.textContent = projeto.descricao || "";
  if (categoria) {
    categoria.textContent = projeto.categoria || "";
    categoria.hidden = ehPlaceholder(projeto.categoria);
  }

  ajustarSliderAntesDepois(50);
}

function inicializarSliderAntesDepois() {
  const frame = document.getElementById("compareFrame");
  const handle = document.getElementById("compareHandle");
  if (!frame) return;

  let arrastando = false;

  function percentual(clientX) {
    const rect = frame.getBoundingClientRect();
    const bruto = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(100, Math.max(0, bruto));
  }

  function aplicar(valor) {
    ajustarSliderAntesDepois(valor);
  }

  if (window.PointerEvent) {
    frame.addEventListener("pointerdown", function (evento) {
      arrastando = true;
      frame.setPointerCapture(evento.pointerId);
      aplicar(percentual(evento.clientX));
    });

    frame.addEventListener("pointermove", function (evento) {
      if (!arrastando) return;
      evento.preventDefault();
      aplicar(percentual(evento.clientX));
    });

    ["pointerup", "pointercancel"].forEach(function (tipo) {
      frame.addEventListener(tipo, function () { arrastando = false; });
    });
  } else {
    frame.addEventListener("touchstart", function (evento) {
      arrastando = true;
      aplicar(percentual(evento.touches[0].clientX));
    }, { passive: true });

    frame.addEventListener("touchmove", function (evento) {
      if (!arrastando) return;
      aplicar(percentual(evento.touches[0].clientX));
    }, { passive: true });

    frame.addEventListener("mousedown", function (evento) {
      arrastando = true;
      aplicar(percentual(evento.clientX));
    });

    document.addEventListener("mousemove", function (evento) {
      if (arrastando) aplicar(percentual(evento.clientX));
    });

    document.addEventListener("mouseup", function () { arrastando = false; });
  }

  /* Teclado: setas ajustam a comparação */
  const alvos = handle ? [handle] : [];
  alvos.forEach(function (alvo) {
    alvo.addEventListener("keydown", function (evento) {
      const passo = evento.shiftKey ? 10 : 2;
      const atualBruto = Number(alvo.getAttribute("aria-valuenow"));
      const atual = Number.isFinite(atualBruto) ? atualBruto : 50;

      if (evento.key === "ArrowLeft") { aplicar(atual - passo); evento.preventDefault(); }
      else if (evento.key === "ArrowRight") { aplicar(atual + passo); evento.preventDefault(); }
      else if (evento.key === "Home") { aplicar(0); evento.preventDefault(); }
      else if (evento.key === "End") { aplicar(100); evento.preventDefault(); }
    });
  });
}

function ajustarSliderAntesDepois(valor) {
  const frame = document.getElementById("compareFrame");
  const handle = document.getElementById("compareHandle");
  if (!frame) return;

  const limitado = Math.min(100, Math.max(0, Number(valor) || 0));
  frame.style.setProperty("--split", limitado.toFixed(2) + "%");

  if (handle) {
    handle.setAttribute("aria-valuenow", String(Math.round(limitado)));
    handle.setAttribute("aria-valuetext", Math.round(limitado) + "% do antes e " +
      (100 - Math.round(limitado)) + "% do depois");
  }
}

/* ==========================================================================
   12. BASTIDORES (FOTOS DA EMPRESA)
   ========================================================================== */

function montarBastidores() {
  const grade = document.getElementById("bastidoresGrid");
  if (!grade || !Array.isArray(BASTIDORES)) return;

  grade.innerHTML = "";

  const listaLightbox = BASTIDORES.map(function (foto) {
    return {
      imagens: [foto.imagem],
      imagem: foto.imagem,
      titulo: foto.legenda || "COMAC Vidraçaria",
      descricao: foto.alt || "",
      tag: "Nosso trabalho"
    };
  });

  BASTIDORES.forEach(function (item, indice) {
    const figura = el("figure", "bastidores-item");
    figura.dataset.reveal = "scale";
    figura.dataset.revealDelay = String(indice % 3);
    figura.setAttribute("role", "button");
    figura.tabIndex = 0;
    figura.setAttribute("aria-label", "Ampliar: " + (item.legenda || "Foto da empresa"));

    figura.innerHTML =
      '<img src="' + item.imagem + '" alt="' + escaparTexto(item.alt || "") + '" loading="lazy" decoding="async">' +
      "<figcaption>" + escaparTexto(item.legenda || "") + "</figcaption>";

    function abrir() { abrirLightbox(listaLightbox, indice); }

    figura.addEventListener("click", abrir);
    figura.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrir();
      }
    });

    grade.appendChild(figura);
  });

  inicializarReveal($$("[data-reveal]", grade));
}

/* ==========================================================================
   13. ESTATÍSTICAS
   ========================================================================== */

function montarEstatisticas() {
  const grade = document.getElementById("statsGrid");
  if (!grade || !Array.isArray(ESTATISTICAS)) return;

  grade.innerHTML = "";

  ESTATISTICAS.forEach(function (item) {
    const bloco = el("div", "stat");
    bloco.dataset.reveal = "up";

    const valor = textoLivre(item.valor);
    const placeholder = ehPlaceholder(valor);
    const alvo = String(valor).replace(/[^\d]/g, "");

    bloco.innerHTML =
      '<span class="stat-value' + (placeholder ? " is-placeholder" : "") + '">' +
        escaparTexto(placeholder ? "[INSERIR NÚMERO]" : valor) +
      "</span>" +
      '<span class="stat-label">' + escaparTexto(item.rotulo || "") + "</span>";

    if (!placeholder && alvo && "IntersectionObserver" in window && !reduzirMovimentoAtivo()) {
      const numero = bloco.querySelector(".stat-value");
      animarContador(numero, alvo);
    }

    grade.appendChild(bloco);
  });

  inicializarReveal($$("[data-reveal]", grade));
}

function animarContador(elemento, alvo) {
  const observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      observer.disconnect();

      const duracao = 1500;
      const inicio = performance.now();

      function passo(agora) {
        const progresso = Math.min(1, (agora - inicio) / duracao);
        const valor = Math.round(Number(alvo) * (1 - Math.pow(1 - progresso, 3)));
        elemento.textContent = valor.toLocaleString("pt-BR");
        if (progresso < 1) window.requestAnimationFrame(passo);
      }

      window.requestAnimationFrame(passo);
    });
  }, { threshold: 0.4 });

  observer.observe(elemento);
}

/* ==========================================================================
   14. FORMULÁRIO DE ORÇAMENTO (WHATSAPP)
   ========================================================================== */

function inicializarFormularioWhatsApp() {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const erro = document.getElementById("formError");

  function mostrarErro(mensagem) {
    if (!erro) return;
    erro.textContent = mensagem;
    erro.hidden = !mensagem;
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    mostrarErro("");

    const campos = {
      nome: document.getElementById("fNome"),
      whatsapp: document.getElementById("fWhatsapp"),
      tipo: document.getElementById("fTipo"),
      cidade: document.getElementById("fCidade"),
      servico: document.getElementById("fServico"),
      descricao: document.getElementById("fMensagem")
    };

    const valores = {
      nome: textoLivre(campos.nome.value),
      whatsapp: textoLivre(campos.whatsapp.value),
      tipo: textoLivre(campos.tipo.value),
      cidade: textoLivre(campos.cidade.value),
      servico: textoLivre(campos.servico.value),
      descricao: textoLivre(campos.descricao.value)
    };

    const obrigatorios = [
      { valor: valores.nome, campo: campos.nome, aviso: "Informe seu nome." },
      { valor: numeros(valores.whatsapp), campo: campos.whatsapp, aviso: "Informe um WhatsApp válido com DDD." },
      { valor: valores.descricao, campo: campos.descricao, aviso: "Descreva brevemente o que você precisa." }
    ];

    for (let i = 0; i < obrigatorios.length; i++) {
      const item = obrigatorios[i];
      if (!item.valor || (item.campo === campos.whatsapp && item.valor.length < 10)) {
        mostrarErro(item.aviso);
        item.campo.focus();
        return;
      }
    }

    const mensagem =
      "Olá, " + (CONFIG.marca || "COMAC") + " " + (CONFIG.complemento || "Vidraçaria") + "!\n\n" +
      "Gostaria de solicitar um orçamento.\n\n" +
      "Nome: " + valores.nome + "\n" +
      "WhatsApp: " + valores.whatsapp + "\n" +
      "Cidade: " + (valores.cidade || "—") + "\n" +
      "Tipo de projeto: " + (valores.tipo || "—") + "\n" +
      "Serviço: " + (valores.servico || "—") + "\n" +
      "Descrição: " + valores.descricao;

    if (numeroWhatsapp().length < 10) {
      mostrarErro(
        "O WhatsApp da COMAC ainda não foi configurado. Abra js/config.js e preencha CONFIG.whatsapp."
      );
      return;
    }

    window.open(gerarUrlWhatsApp(mensagem), "_blank", "noopener");
  });
}

/* ==========================================================================
   15. BOTÕES DE WHATSAPP
   ========================================================================== */

function inicializarBotoesWhatsApp(raiz) {
  $$(".js-whatsapp", raiz).forEach(function (link) {
    if (link.dataset.wsPronto === "sim") return;
    link.dataset.wsPronto = "sim";

    const chave = link.getAttribute("data-ws") || "padrao";
    if (numeroWhatsapp().length >= 10) {
      link.href = gerarUrlWhatsApp(mensagemWhatsApp(chave));
      return;
    }

    link.addEventListener("click", function (evento) {
      evento.preventDefault();
      avisarWhatsappVazio();
    });
  });
}

/* ==========================================================================
   16. BOTÃO FLUTUANTE
   ========================================================================== */

function inicializarBotaoFlutuante() {
  const botao = document.getElementById("whatsappFloat");
  if (!botao) return;

  function aoRolar() {
    botao.classList.toggle("is-visible", window.scrollY > 420);
  }

  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });
}

/* ==========================================================================
   17. INICIALIZAÇÃO
   ========================================================================== */

function iniciar() {
  aplicarConfiguracao();

  inicializarHeader();
  inicializarMenuMobile();
  inicializarScrollSuave();
  inicializarScrollSpy();

  inicializarHero();
  inicializarAnimatedText();
  inicializarParallax();

  montarServicos();
  montarDiferenciais();
  montarProcesso();

  montarFiltros();
  montarPortfolio();

  montarAntesDepois();
  inicializarSliderAntesDepois();

  montarBastidores();
  montarEstatisticas();

  inicializarFormularioWhatsApp();
  inicializarBotoesWhatsApp();
  inicializarBotaoFlutuante();

  inicializarReveal();

  atualizarIcones();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}
