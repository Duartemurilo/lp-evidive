import { emotionDiveConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

const bookingCta = {
  label: "Comprar meu ingresso agora",
  href: emotionDiveConfig.bookingUrl,
  external: true,
} as const;

const scheduleCta = {
  label: "Agendar Emotion Dive",
  href: emotionDiveConfig.bookingUrl,
  external: true,
  variant: "schedule",
} as const;

export const emotionDivePageContent: CursoPageContent = {
  slug: "emotion-dive",
  title: "Emotion Dive",
  categoryLabel: "Quero começar a mergulhar",
  metaDescription:
    "Emotion Dive na Evidive: mergulho com cilindro a 30 minutos de São Paulo, no único centro de mergulho conceito do mundo. Compre seu ingresso.",
  hero: {
    logoSrc: "/cursos/emotion-dive.svg",
    lead:
      "Descubra como é mergulhar com cilindro sem precisar ir para o litoral e por um ",
    leadHighlight: "preço inacreditável",
    supporting:
      "Estamos a 30 minutinhos de São Paulo e você vai mergulhar em um lago artificial de água doce construído para mergulho com peixes e plantas.",
    cta: bookingCta,
  },
  blocks: [
    {
      type: "split-media",
      id: "experiencia-urbana",
      eyebrow: "Experiência · Evidive",
      titleSans: "Sua experiência de mergulho",
      titleDisplay: "com cilindro na cidade",
      paragraphs: [
        "Criamos esta experiência inédita em um centro urbano para pessoas que têm o sonho ou a curiosidade de mergulhar com equipamento completo de um mergulhador sem ter que necessariamente se matricular em um curso caro.",
      ],
      video: {
        videoId: "DM3IUkS8d1Y",
        title: "Emotion Dive — experiência na cidade",
      },
      cta: scheduleCta,
      mediaPosition: "right",
      surface: "default",
    },
    {
      type: "split-media",
      id: "centro-conceito",
      eyebrow: "Centro conceito · Evidive",
      titleSans: "O único centro de mergulho",
      titleDisplay: '"conceito" do mundo',
      paragraphs: [
        "Passeio no lago com peixes, instrutores PADI e equipamento completo — da piscina para iniciantes ao primeiro lago artificial homologado para mergulho no Brasil.",
        "Conheça o lago:",
      ],
      video: {
        videoId: "n5sbTVNsOKI",
        title: "Lago Evidive — Emotion Dive",
      },
      cta: scheduleCta,
      mediaPosition: "left",
      surface: "sand",
    },
    {
      type: "depth-divider",
      id: "transicao-para-quem",
      rulerLabel: "para quem mergulha",
      rulerIcon: "waves",
      depthMeters: 5,
      surface: "default",
    },
    {
      type: "illustration",
      id: "para-quem",
      title: 'Para quem é o "Emotion Dive"',
      paragraphs: [
        "Sendo indicado tanto como a primeira experiência de mergulho, ou para as pessoas que já mergulharam mas ainda não fizeram o curso de mergulho.",
        "Adultos e crianças a partir de 10 anos em boas condições de saúde e que tenham o sonho de realizar uma experiência de mergulho autônomo.",
      ],
      illustrationSrc: "/cursos/para-quem-e-o-emotion-dive.svg",
      illustrationAlt: "Ilustração — para quem é o Emotion Dive",
      surface: "default",
    },
    {
      type: "illustration",
      id: "cotia-localizacao",
      layout: "stacked",
      paragraphs: [
        "Cotia/SP a 30 min de São Paulo",
        "Inaugurado em setembro de 2020, desenhamos um local repleto de experiências sensoriais e profundamente emocionais, sem precedentes no mundo.",
        "Nossa estrutura:",
      ],
      bullets: [
        "3.000m² dedicados ao ensino do mergulho",
        "Piscina aquecida dedicada à experiências de mergulho (1,5m)",
        "Lago climatizado com 440.000 litros d'água, milhares de peixes, vegetação subaquática e 5m de profundidade — simulando o ambiente real",
        "Simulador de Embarcação de mergulho",
        "100% acessível para deficientes",
      ],
      illustrationSrc: "/cursos/30-min-de-sao-paulo-.svg",
      illustrationAlt: "Cotia/SP — 30 minutos de São Paulo",
    },
    {
      type: "steps",
      id: "como-funciona",
      eyebrow: "Passo a passo",
      title: "Como funciona o",
      titleDisplay: '"Emotion Dive" em 3 passos',
      steps: [
        {
          stepNumber: "01",
          title: "AULA TEÓRICA",
          description:
            "Vamos te explicar como funciona o equipamento completo de um mergulhador e alguns conceitos básicos sobre como nosso corpo funciona embaixo d'água.",
          duration: "15 minutos",
        },
        {
          stepNumber: "02",
          title: "ADAPTAÇÃO NA PISCINA RASA",
          description:
            "Prática supervisionada em piscina aquecida para você se familiarizar com máscara, respirador, colete e movimentos antes de ir ao lago.",
        },
        {
          stepNumber: "03",
          title: "MERGULHO NO LAGO",
          description:
            "Experiência completa no lago artificial com peixes, vegetação subaquática e instrutores PADI ao seu lado do início ao fim.",
        },
      ],
      trailingFineRule: true,
    },
    {
      type: "padi",
      id: "padi-five-star",
      title: "Somos PADI 5 Star e o que isso significa?",
      subtitle: "PADI 5 Star Dive Center",
      paragraphs: [
        "Os PADI Five Star Dive Centers são centros de mergulho que oferecem uma gama completa de programas de educação de mergulho PADI e que incentivam a responsabilidade ambiental aquática.",
        "Essas empresas se destacam no fornecimento de serviços de qualidade para mergulhadores, apresentam uma imagem profissional e promovem ativamente os benefícios do mergulho recreativo, snorkeling, viagens de mergulho e proteção ambiental.",
        "O que é a PADI?",
        "A PADI é a maior certificadora de mergulho do mundo, sendo responsável por ter formado mais de 23 milhões de mergulhadores! Por ser a maior autoridade no assunto, ela é também a mais reconhecida: a credencial de mergulho da PADI permite mergulhar em 186 países.",
        'O nome PADI é uma referência tão forte no universo do mergulho que muitas vezes é utilizado como sinônimo de "certificado de mergulho".',
      ],
      illustrationSrc: "/cursos/padi-five-star-dive-center.svg",
      cta: bookingCta,
    },
    {
      type: "testimonials",
      id: "depoimentos",
      eyebrow: "Depoimentos",
      titleSans: "Quem viveu a",
      titleDisplay: "experiência conta",
      items: [
        {
          name: "Fernanda L.",
          role: "Emotion Dive · primeira vez",
          quote:
            "Nunca imaginei mergulhar tão perto de São Paulo. A estrutura é incrível e os instrutores passam muita segurança.",
          image: "/assets/hero/DCIM_101GOPRO_GOPR5892.JPG.png",
        },
        {
          name: "Bruno K.",
          role: "Emotion Dive · presente de aniversário",
          quote:
            "Ganhei o ingresso de presente e virou um dos melhores dias da minha vida. O lago surpreende demais.",
          image: "/assets/hero/POSTS_EVIDIVE (4).png",
        },
        {
          name: "Patrícia M.",
          role: "Emotion Dive · família",
          quote:
            "Levei meu filho de 12 anos e foi emocionante ver a curiosidade dele embaixo d'água com tanto cuidado da equipe.",
          image: "/assets/hero/DCIM_100GOPRO_GOPR3378.JPG.png",
        },
        {
          name: "André V.",
          role: "Emotion Dive · curiosidade",
          quote:
            "Queria experimentar antes de fazer o curso completo. Saí de lá querendo me certificar — experiência impecável.",
          image: "/assets/hero/POSTS_EVIDIVE (7).png",
        },
        {
          name: "Luciana H.",
          role: "Emotion Dive · grupo",
          quote:
            "Fomos em grupo de amigos e o atendimento foi excelente do início ao fim. Já estamos planejando voltar.",
          image: "/assets/hero/G0025436.JPG.png",
        },
      ],
    },
    {
      type: "included",
      id: "incluso",
      title: 'O que está incluso no seu ingresso para o "Emotion Dive"',
      intro:
        "Estão incluídos todos os equipamentos necessários para a prática do mergulho recreacional autônomo.",
      items: [
        "Máscara",
        "Nadadeiras",
        "Regulador",
        "Colete equilibrador",
        "Roupa de exposição (Neoprene)",
        "Cilindro de ar",
        "Lastros",
      ],
      footer:
        "Você precisa vir preparado com roupa para entrar na água, como: sunga, maiô, biquíni, bermuda e uma camiseta para se molhar.",
    },
    {
      type: "gift",
      id: "presente",
      title: "Presenteie uma pessoa querida",
      paragraphs: [
        "Vale uma experiência inesquecível! Emotion Dive",
        "Seja para um aniversário ou data especial, considere presentear a pessoa querida com esta incrível experiência e tenha a certeza de surpreender!",
        "Viver uma experiência cria memórias únicas e fortalece laços de relacionamento. E é essa a ideia por trás de um presente-experiência: proporcionar algo novo e inesperado para alguém que você ama.",
        "Após a compra do ingresso, vamos enviar um voucher-presente especial para o presenteado. Basta acessar nosso WhatsApp corporativo e falar com um de nossos atendentes que faremos tudo isso com o maior carinho.",
      ],
    },
    {
      type: "pricing",
      id: "preco",
      title: "Compre agora mesmo o seu voucher e agende sua experiência!",
      installmentLabel: "3x de R$ 106,66",
      cashLabel: "ou à vista por R$ 320,00",
      cta: bookingCta,
      footnote:
        "**Oferecemos desconto para grupos, entre em contato com nosso time de atendimento através do WhatsApp.",
    },
    {
      type: "faq",
      id: "faq",
      eyebrow: "Ainda tem dúvidas?",
      title: "Perguntas frequentes",
      closing:
        "Estamos preparados para entregar excelência e trazer uma experiência única em sua vida!",
      items: [
        {
          question: "Quem PODE fazer o Emotion Dive?",
          answer:
            "Adultos e crianças a partir de 10 anos, em boas condições de saúde, que queiram viver uma primeira experiência de mergulho autônomo ou retomar o contato com o mergulho antes de um curso completo.",
        },
        {
          question: "Quem NÃO pode fazer o Emotion Dive?",
          answer:
            "Gestantes, pessoas com condições médicas que contraindiquem mergulho (consulte seu médico), ou quem apresente sintomas de resfriado, sinusite ou congestão nasal no dia da experiência.",
        },
        {
          question: "Não sei nadar, posso fazer o Emotion Dive?",
          answer:
            "Sim. Saber nadar ajuda, mas não é obrigatório. Você estará acompanhado por instrutores PADI em piscina rasa e no lago, com equipamento completo e briefing antes de cada etapa.",
        },
        {
          question: "Qual o tempo de duração da experiência?",
          answer:
            "A experiência completa leva cerca de 2 a 3 horas, incluindo aula teórica, adaptação na piscina e mergulho no lago, além do tempo para recepção e equipamentos.",
        },
        {
          question: "O que preciso levar?",
          answer:
            "Roupa para entrar na água (sunga, maiô, biquíni ou bermuda) e uma camiseta que possa molhar. Os equipamentos de mergulho são fornecidos pela Evidive.",
        },
        {
          question: "Onde está localizada a Evidive?",
          answer:
            "Em Cotia/SP, a aproximadamente 30 minutos de São Paulo. Você mergulha em nosso centro conceito com piscina aquecida e lago artificial homologado.",
        },
        {
          question: "Quanto tempo preciso chegar antes do meu horário agendado?",
          answer:
            "Recomendamos chegar com 15 a 20 minutos de antecedência para check-in, documentação e preparação tranquila antes da experiência.",
        },
        {
          question: "A Evidive possui estacionamento?",
          answer:
            "Sim, há estacionamento no local para clientes. Em dias de maior movimento, nossa equipe orienta sobre vagas disponíveis na recepção.",
        },
        {
          question: "Existe algum lugar para comer dentro da Evidive?",
          answer:
            "Temos área de convivência para lanches leves e bebidas. Para refeições completas, a equipe pode indicar opções próximas ao centro.",
        },
        {
          question: "Qual horário de atendimento?",
          answer:
            "O atendimento e agendamentos seguem a grade de experiências publicada no site de compra. Consulte horários disponíveis ao reservar seu ingresso ou fale conosco pelo WhatsApp.",
        },
      ],
    },
  ],
};
