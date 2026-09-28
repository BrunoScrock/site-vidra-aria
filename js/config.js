/* ==========================================================================
   COMAC — VIDRAÇARIA
   CONFIGURAÇÃO CENTRALIZADA
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para publicar o site com
   os dados reais da empresa.

   Regras importantes:
   • Não invente informações. Enquanto um dado não for confirmado pela COMAC,
     mantenha o placeholder no formato [INSERIR ...] (ou campo vazio).
   • O WhatsApp é usado em todo o site (botões, formulário, rodapé e botão
     flutuante) e NUNCA deve ser digitado em outros arquivos.
   • As imagens deste arquivo são ILUSTRATIVAS (Unsplash / SVG de exemplo).
     Substitua pelas fotos reais em assets/images/ antes da publicação.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DADOS DA EMPRESA
   -------------------------------------------------------------------------- */
const CONFIG = {

  /* Identidade ------------------------------------------------------------ */
  nome: "COMAC Vidraçaria",
  marca: "COMAC",
  complemento: "Vidraçaria",
  tagline: "Soluções em Vidro",
  slogan: "Soluções em vidro com acabamento, precisão e sofisticação.",
  descricao: "Empresa especializada em soluções em vidro para projetos residenciais e comerciais.",
  ano: "",

  /* Contato --------------------------------------------------------------- */
  // Formato: 55 + DDD + número, somente dígitos. Ex.: 5541999999999
  // Enquanto estiver vazio, os botões avisam que o número ainda não foi
  // configurado neste arquivo.
  whatsapp: "",
  telefone: "",
  email: "",

  /* Localização ----------------------------------------------------------- */
  endereco: "[INSERIR ENDEREÇO]",
  cidade: "[INSERIR CIDADE]",
  uf: "",

  // Cidades / regiões atendidas. Enquanto não houver lista real, o site
  // exibe apenas o placeholder.
  areaAtendimento: [],

  /* Funcionamento --------------------------------------------------------- */
  horario: "[INSERIR HORÁRIO DE FUNCIONAMENTO]",
  horarioResumo: "[INSERIR HORÁRIO RESUMIDO]",

  /* Mapa (opcional) ------------------------------------------------------- */
  // Preencha latitude e longitude para o site montar o mapa automaticamente.
  // Exemplo de como encontrar: https://www.openstreetmap.org → clique no
  // ponto → o endereço aparece no canto da tela.
  mapa: {
    lat: "",
    lon: "",
    zoom: 16
  },

  /* Redes sociais --------------------------------------------------------- */
  instagram: "",

  /* Endereço do site (usado em sitemap, robots e Schema.org) --------------- */
  site: "https://brunoscrock.github.io/site-vidra-aria/",

  /* Mensagens do WhatsApp ------------------------------------------------- */
  mensagemPadrao: "Olá! Gostaria de falar com a COMAC Vidraçaria.",

  mensagemOrcamento: "Olá! Gostaria de solicitar um orçamento com a COMAC Vidraçaria.",

  mensagemFotos: "Olá! Gostaria de enviar fotos e referências de um projeto para avaliação.",

  mensagemLocalizacao: "Olá! Gostaria de mais informações sobre o atendimento da COMAC Vidraçaria."
};

/* --------------------------------------------------------------------------
   2. SERVIÇOS
   --------------------------------------------------------------------------
   ATENÇÃO: os textos abaixo são uma estrutura editável. Confirme com a COMAC
   quais serviços realmente são executados antes de publicar o site.

   Para alterar: edite os itens. O número é gerado automaticamente
   (01, 02, 03...). Para usar outro ícone, consulte a lista do Lucide Icons:
   https://lucide.dev/icons/
   -------------------------------------------------------------------------- */
const SERVICOS = [
  {
    id: "box-de-vidro",
    titulo: "Box de vidro",
    descricao: "Soluções em vidro para banheiros, com diferentes possibilidades de acabamento.",
    icone: "shower-head",
    imagem: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: "portas-de-vidro",
    titulo: "Portas de vidro",
    descricao: "Projetos de portas de vidro com visual moderno e funcional.",
    icone: "door-open",
    imagem: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: "janelas-e-divisorias",
    titulo: "Janelas e divisórias",
    descricao: "Soluções em vidro para ambientes residenciais e comerciais.",
    icone: "app-window",
    imagem: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: "fachadas-de-vidro",
    titulo: "Fachadas de vidro",
    descricao: "Aplicações arquitetônicas para valorizar fachadas e ambientes.",
    icone: "building-2",
    imagem: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: "espelhos",
    titulo: "Espelhos",
    descricao: "Instalação e aplicação de espelhos para diferentes ambientes.",
    icone: "frame",
    imagem: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: "projetos-personalizados",
    titulo: "Projetos personalizados",
    descricao: "Soluções desenvolvidas de acordo com as características de cada projeto.",
    icone: "layers",
    imagem: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=70"
  }
];

/* --------------------------------------------------------------------------
   3. DIFERENCIAIS
   --------------------------------------------------------------------------
   Textos genéricos e editáveis. Não inclua certificações, garantias ou
   qualificações que não tenham sido confirmadas pela empresa.
   -------------------------------------------------------------------------- */
const DIFERENCIAIS = [
  {
    titulo: "Atendimento personalizado",
    descricao: "Cada projeto é tratado a partir das necessidades do cliente e das características do ambiente.",
    icone: "heart-handshake"
  },
  {
    titulo: "Acabamento cuidadoso",
    descricao: "Atenção aos detalhes de acabamento, das bordas às junções e ao encaixe final.",
    icone: "gem"
  },
  {
    titulo: "Precisão na instalação",
    descricao: "Medição e instalação feitas para que o vidro se encaixe corretamente no projeto.",
    icone: "ruler"
  },
  {
    titulo: "Soluções personalizadas",
    descricao: "Desenvolvimento de alternativas para cada espaço, respeitando o projeto original.",
    icone: "compass"
  },
  {
    titulo: "Organização",
    descricao: "Ambiente de trabalho organizado, com materiais e ferramentas em ordem.",
    icone: "list-checks"
  },
  {
    titulo: "Atenção aos detalhes",
    descricao: "Compromisso com a apresentação final do serviço entregue ao cliente.",
    icone: "sparkles"
  }
];

/* --------------------------------------------------------------------------
   4. PROCESSO — COMO FUNCIONA
   -------------------------------------------------------------------------- */
const PROCESSO = [
  {
    numero: "01",
    titulo: "Contato",
    descricao: "Entre em contato e apresente sua necessidade.",
    icone: "message-circle"
  },
  {
    numero: "02",
    titulo: "Avaliação",
    descricao: "Entendemos as características do projeto.",
    icone: "scan-search"
  },
  {
    numero: "03",
    titulo: "Orçamento",
    descricao: "Apresentamos a solução adequada.",
    icone: "file-text"
  },
  {
    numero: "04",
    titulo: "Execução",
    descricao: "Realizamos o serviço conforme o projeto.",
    icone: "hammer"
  },
  {
    numero: "05",
    titulo: "Entrega",
    descricao: "Finalizamos o projeto com atenção aos detalhes.",
    icone: "badge-check"
  }
];

/* --------------------------------------------------------------------------
   5. PORTFÓLIO — PROJETOS REALIZADOS
   --------------------------------------------------------------------------
   Para adicionar um projeto:
   1. Coloque as fotos em assets/images/portfolio/pjeto-0X/
   2. Adicione um item neste array.

   - tag: etiqueta curta exibida no card
   - titulo: nome do projeto
   - descricao: resumo curto (aparece no lightbox)
   - imagem: foto de capa do card
   - imagens: lista completa exibida no lightbox
   - categoria: filtro da galeria (ver CATEGORIAS_PORTFOLIO)
   -------------------------------------------------------------------------- */
const CATEGORIAS_PORTFOLIO = [
  "Todos",
  "Residencial",
  "Comercial",
  "Box",
  "Portas",
  "Fachadas",
  "Espelhos",
  "Outros"
];

/* ATENÇÃO: as imagens abaixo são ILUSTRATIVAS (Unsplash). Para usar as fotos
   reais, coloque os arquivos em assets/images/portfolio/projeto-0X/ e troque as
   URLs por caminhos relativos, ex.: "assets/images/portfolio/projeto-01/imagem-01.jpg" */
const PORTFOLIO = [
  {
    tag: "Box",
    titulo: "Projeto em Vidro",
    descricao: "Descrição do serviço realizado.",
    imagem: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=70",
    imagens: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=75",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=75",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=75"
    ],
    categoria: "Box"
  },
  {
    tag: "Residencial",
    titulo: "Projeto em Vidro",
    descricao: "Descrição do serviço realizado.",
    imagem: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=70",
    imagens: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=75",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=75",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=75"
    ],
    categoria: "Residencial"
  },
  {
    tag: "Fachadas",
    titulo: "Projeto em Vidro",
    descricao: "Descrição do serviço realizado.",
    destaque: true,
    imagem: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=70",
    imagens: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=78",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=78",
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1800&q=78"
    ],
    categoria: "Fachadas"
  },
  {
    tag: "Comercial",
    titulo: "Projeto em Vidro",
    descricao: "Descrição do serviço realizado.",
    imagem: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=70",
    imagens: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=75",
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1600&q=75",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=75"
    ],
    categoria: "Comercial"
  }
];

/* --------------------------------------------------------------------------
   6. ANTES E DEPOIS
   --------------------------------------------------------------------------
   Cada item precisa de duas fotos do MESMO ambiente: uma antes e outra
   depois da instalação.

   - antes / depois: caminhos das imagens (podem ser .jpg, .png ou .webp)
   - titulo, categoria e descricao: exibidos abaixo do comparador
   -------------------------------------------------------------------------- */
const ANTES_DEPOIS = [
  {
    id: "projeto-01",
    titulo: "Projeto em Vidro",
    categoria: "Residencial",
    antes: "assets/images/antes-depois/projeto-01/antes.svg",
    depois: "assets/images/antes-depois/projeto-01/depois.svg",
    descricao: "Descrição do serviço realizado."
  },
  {
    id: "projeto-02",
    titulo: "Projeto em Vidro",
    categoria: "Comercial",
    antes: "assets/images/antes-depois/projeto-02/antes.svg",
    depois: "assets/images/antes-depois/projeto-02/depois.svg",
    descricao: "Descrição do serviço realizado."
  },
  {
    id: "projeto-03",
    titulo: "Projeto em Vidro",
    categoria: "Box",
    antes: "assets/images/antes-depois/projeto-03/antes.svg",
    depois: "assets/images/antes-depois/projeto-03/depois.svg",
    descricao: "Descrição do serviço realizado."
  }
];

/* --------------------------------------------------------------------------
   7. ESTATÍSTICAS
   --------------------------------------------------------------------------
   Não publique números não confirmados pela COMAC.
   Enquanto o valor estiver como [INSERIR NÚMERO], o site exibe o placeholder
   (sem contador animado).
   -------------------------------------------------------------------------- */
const ESTATISTICAS = [
  { valor: "[INSERIR NÚMERO]", rotulo: "Projetos realizados" },
  { valor: "[INSERIR NÚMERO]", rotulo: "Clientes atendidos" },
  { valor: "[INSERIR NÚMERO]", rotulo: "Anos de experiência" },
  { valor: "[INSERIR NÚMERO]", rotulo: "Tipos de serviço" }
];

/* --------------------------------------------------------------------------
   8. NOSSO TRABALHO — FOTOS DA EMPRESA
   --------------------------------------------------------------------------
   Reservado para fotos reais: oficina, equipe, instalação, ferramentas,
   materiais e acabamento. As imagens atuais são ilustrativas.
   -------------------------------------------------------------------------- */
const BASTIDORES = [
  {
    imagem: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=70",
    alt: "Espaço reservado para foto real do ambiente de trabalho",
    legenda: "[INSERIR LEGENDA]"
  },
  {
    imagem: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=70",
    alt: "Espaço reservado para foto real da equipe",
    legenda: "[INSERIR LEGENDA]"
  },
  {
    imagem: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=900&q=70",
    alt: "Espaço reservado para foto real de materiais e ferramentas",
    legenda: "[INSERIR LEGENDA]"
  },
  {
    imagem: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=70",
    alt: "Espaço reservado para foto real de instalação",
    legenda: "[INSERIR LEGENDA]"
  },
  {
    imagem: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=70",
    alt: "Espaço reservado para foto real de acabamento",
    legenda: "[INSERIR LEGENDA]"
  },
  {
    imagem: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=70",
    alt: "Espaço reservado para foto real de projeto concluído",
    legenda: "[INSERIR LEGENDA]"
  }
];
