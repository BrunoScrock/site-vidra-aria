# COMAC Vidraçaria

Site institucional da **COMAC Vidraçaria** — soluções em vidro para projetos
residenciais e comerciais.

Projeto **100% estático**, construído com HTML5, CSS3 e JavaScript (ES6+),
pronto para publicação no **GitHub Pages** (ou Netlify, Vercel, Cloudflare
Pages e qualquer hospedagem estática).

Identidade visual clara, arquitetônica e fotográfica: vidro, luz, linhas finas,
tipografia elegante e animações discretas. Nenhum framework, nenhum backend,
nenhuma biblioteca externa obrigatória (apenas Lucide Icons via CDN, com
fallback caso o CDN falhe).

---

## Estrutura

```text
site-vidra-aria/
├── index.html
├── README.md
├── .gitignore
├── robots.txt
├── sitemap.xml
├── llms.txt
│
├── css/
│   └── style.css          <- todos os estilos
│
├── js/
│   ├── config.js          <- CONFIGURAÇÃO CENTRALIZADA (edite este arquivo)
│   └── script.js          <- funcionalidades do site
│
└── assets/
    └── images/
        ├── logo/          <- logo (SVG) e favicon
        ├── hero/          <- imagem de fundo do Hero
        ├── sobre/         <- fotos da seção "Sobre"
        ├── servicos/      <- fotos dos serviços (opcional)
        ├── antes-depois/  <- projeto-01/ projeto-02/ projeto-03/ (antes + depois)
        ├── portfolio/     <- projeto-01/ projeto-02/ projeto-03/
        └── equipe/        <- fotos da equipe e da oficina
```

> **Importante:** as imagens externas (Unsplash) usadas hoje são
> **demonstrativas**. Substitua-as pelas fotos reais da COMAC antes de
> publicar — o site funciona igualmente com URLs ou com arquivos locais em
> `assets/images/`.

---

## Configuração rápida (obrigatória)

**Edite apenas `js/config.js`.** Tudo o que muda (WhatsApp, endereço, horário,
Instagram, serviços, projetos, antes e depois, diferenciais, estatísticas) está
centralizado ali.

```javascript
const CONFIG = {
  nome: "COMAC Vidraçaria",
  whatsapp: "",      // 55 + DDD + número, somente dígitos
  telefone: "",
  email: "",
  endereco: "[INSERIR ENDEREÇO]",
  cidade: "[INSERIR CIDADE]",
  areaAtendimento: [],               // ex.: ["Cidade A", "Cidade B"]
  horario: "[INSERIR HORÁRIO DE FUNCIONAMENTO]",
  instagram: "",
  mapa: { lat: "", lon: "", zoom: 16 },
  site: "https://brunoscrock.github.io/site-vidra-aria/"
};
```

### WhatsApp

O número do WhatsApp é usado em **todos** os botões, no formulário e no botão
flutuante. Nunca o digite em outro arquivo:

```javascript
CONFIG.whatsapp = "5541999999999";   // 55 + DDD + número (somente dígitos)
```

Enquanto `whatsapp` estiver vazio, os botões exibem um aviso explicando que o
número ainda não foi configurado — nenhum link inválido é gerado.

### Mapa (opcional)

Preencha `CONFIG.mapa.lat` e `CONFIG.mapa.lon` e o site monta automaticamente
um mapa leve do OpenStreetMap. Sem esses valores, aparece um bloco reservado
com a orientação de preenchimento.

### Endereço do site

Atualize `CONFIG.site` e, no `index.html`, as tags `<link rel="canonical">`,
`og:url`, `og:image` e o bloco `application/ld+json`. Depois ajuste também
`robots.txt` e `sitemap.xml`.

---

## Como alterar imagens

| Seção | Onde trocar |
| --- | --- |
| Hero (fundo) | `index.html` → `<img id="heroImg">` (hoje: URL Unsplash) |
| Sobre | `index.html` → bloco `.about-media` |
| Confiança (fundo) | `index.html` → bloco `.trust-media` |
| Serviços | `js/config.js` → `SERVICOS[].imagem` |
| Portfólio | `js/config.js` → `PORTFOLIO[].imagem` e `PORTFOLIO[].imagens[]` |
| Antes e Depois | `js/config.js` → `ANTES_DEPOIS[].antes` / `.depois` |
| Fotos da empresa | `js/config.js` → `BASTIDORES[]` |

Tamanho recomendado: imagens em `.webp` (ou `.jpg`), até 1600 px de largura,
com `loading="lazy"` (já aplicado pelo JavaScript) e `width`/`height`
definidos para evitar saltos de layout.

---

## Como adicionar um serviço

```javascript
const SERVICOS = [
  {
    id: "box-de-vidro",
    titulo: "Box de vidro",
    descricao: "Soluções em vidro para banheiros...",
    icone: "shower-head",                                  // nome do ícone Lucide
    imagem: "assets/images/servicos/box.webp"
  }
];
```

O número (01, 02, 03...) é gerado automaticamente.

---

## Como adicionar um projeto ao portfólio

```javascript
const PORTFOLIO = [
  {
    tag: "Residencial",                                   // etiqueta no card
    titulo: "Projeto em Vidro",
    descricao: "Descrição curta do projeto.",
    imagem: "assets/images/portfolio/projeto-01/imagem-01.jpg",   // capa
    imagens: [                                             // galeria do lightbox
      "assets/images/portfolio/projeto-01/imagem-01.jpg",
      "assets/images/portfolio/projeto-01/imagem-02.jpg"
    ],
    categoria: "Residencial",   // deve existir em CATEGORIAS_PORTFOLIO
    destaque: true              // opcional: card maior na grade
  }
];
```

Os filtros são gerados a partir de `CATEGORIAS_PORTFOLIO`.

---

## Como adicionar um projeto "antes e depois"

As duas imagens devem ser do **mesmo ambiente**, uma antes e outra depois:

```javascript
const ANTES_DEPOIS = [
  {
    id: "projeto-01",
    titulo: "Projeto em Vidro",
    categoria: "Residencial",
    antes: "assets/images/antes-depois/projeto-01/antes.jpg",
    depois: "assets/images/antes-depois/projeto-01/depois.jpg",
    descricao: "Descrição do serviço realizado."
  }
];
```

Os arquivos `antes.svg` e `depois.svg` atuais são **placeholders** que dizem
exatamente o que substituir.

---

## Como executar localmente

Como o projeto é estático, basta um servidor simples:

```bash
npx serve .
# ou
python -m http.server 8000
```

Depois acesse `http://localhost:3000` (ou `http://localhost:8000`).

> Abrir o `index.html` direto pelo navegador (`file://`) funciona, mas alguns
> navegadores bloqueiam recursos por esse motivo. Use um servidor local para
> testar.

---

## Publicação no GitHub Pages

```bash
git init
git add .
git commit -m "feat: cria site institucional da COMAC Vidraçaria"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

No GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: main →
/(root)**.

O site ficará disponível em `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`.

Todos os caminhos do projeto são **relativos** (`css/`, `js/`, `assets/`),
portanto o site funciona tanto na raiz de um domínio quanto em subpasta.

---

## Recursos implementados

- **Hero** com imagem em Ken Burns (zoom e deslocamento lentíssimos),
  overlay com scrim para contraste e um reflexo diagonal sutil
- **Título animado letra a letra** (fade + blur + deslocamento + stagger +
  máscara/reveal + brilho), inspirado nos componentes de texto do 21st.dev,
  implementado em JavaScript puro — sem React, Next.js ou Tailwind
- **Menu fixo** que vira vidro fosco ao rolar, com **hamburger animado** no
  celular e menu em tela cheia
- **Scroll spy** (link ativo conforme a seção visível)
- **Scroll reveal** com `IntersectionObserver` (fade-up, esquerda, direita,
  clip e scale)
- **Serviços** em cards com imagem, número, ícone e hover
- **Antes e Depois** com comparador arrastável (mouse, touch e teclado),
  abas por projeto e rótulos ANTES/DEPOIS
- **Portfólio** com filtros por categoria, grid assimétrico e **lightbox**
  que navega entre as fotos do projeto (contador, miniaturas, teclado, ESC e swipe)
- **Formulário de orçamento** que monta a mensagem e abre o WhatsApp
  (sem backend)
- **Botão flutuante do WhatsApp** com número vindo de `js/config.js`
- **Contadores animados** — só quando há números reais em `ESTATISTICAS`
- **Mapa opcional** via OpenStreetMap
- **SEO**: canonical, Open Graph, Twitter Cards, robots.txt, sitemap.xml,
  llms.txt e Schema.org (apenas com dados confirmados)
- **Acessibilidade**: HTML semântico, `aria-*`, foco visível, navegação por
  teclado, foco preso no lightbox e `skip link`
- **`prefers-reduced-motion`**: sem animações, o site continua 100% utilizável
- **Impressão**: estilos próprios para PDF

---

## Checklist antes de publicar

- [ ] `CONFIG.whatsapp` preenchido (somente dígitos, com 55 + DDD)
- [ ] Telefone, e-mail, endereço, cidade, horário e Instagram reais
- [ ] `CONFIG.areaAtendimento` com as cidades realmente atendidas
- [ ] Lista de **serviços confirmados** pela empresa
- [ ] Textos de **diferenciais** revisados (sem certificações ou garantias
      não confirmadas)
- [ ] **Números reais** em `ESTATISTICAS` (ou manter os placeholders)
- [ ] Fotos reais substituindo as demonstrativas
- [ ] Fotos **antes e depois** reais em `assets/images/antes-depois/`
- [ ] Histórico da COMAC no lugar de `[INSERIR HISTÓRIA DA COMAC]`
- [ ] `canonical`, `og:url`, `og:image`, `robots.txt`, `sitemap.xml` e
      `llms.txt` com o domínio final
- [ ] Testar em 320 px, 375 px, 390 px, 430 px, 768 px, 1024 px, 1440 px e
      1920 px
- [ ] Verificar o console do navegador sem erros

---

## Observações

- Nenhuma informação comercial foi inventada: telefones, endereço, WhatsApp,
  Instagram, e-mail, horário, área de atendimento, números, avaliações,
  certificados e marcas **não** foram preenchidos. O que falta aparece como
  `[INSERIR ...]`.
- Os serviços e diferenciais são **estruturas editáveis** para revisão da
  empresa antes da publicação.
- Nenhum segredo, chave de API ou credencial está no projeto.
