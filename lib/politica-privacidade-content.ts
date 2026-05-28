export type LegalSubsection = {
  title: string;
  paragraphs: string[];
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  subsections?: LegalSubsection[];
};

export const politicaPrivacidadeSections: LegalSection[] = [
  {
    id: "identificacao",
    title: "Identificação",
    paragraphs: [
      "Este site é de propriedade, mantido, e operado por Evidive Escola de Mergulho, inscrita no CNPJ/MF sob o n.28431620000102, com razão social Evidive Escola de Mergulho Ltda.",
    ],
  },
  {
    id: "contato",
    title: "Contato – Central de Atendimento",
    paragraphs: [
      "Caso o Usuário necessite de qualquer informação, esclarecimento ou atendimento com relação a esta Política de Privacidade e Segurança, Evidive Escola de Mergulho disponibiliza a Central de Atendimento para receber todas as comunicações que o Usuário desejar fazer. A Central de Atendimento opera por meios dos canais de comunicação exibidos no Site.",
      "Além disso, Evidive Escola de Mergulho disponibiliza neste site uma seção de FAQ (Perguntas mais frequentes), bem como suas demais políticas: Política de Trocas e Devoluções, Política de Pagamentos, Política de Entrega de Produtos, e, finalmente, os Termos e Condições de Uso deste Site. Todos estes documentos podem ser consultados online ou baixados pelos usuários em formato PDF para consulta off-line e arquivo.",
    ],
  },
  {
    id: "informacoes-gerais",
    title: "Informações gerais",
    paragraphs: [
      "Evidive Escola de Mergulho toma todas as medidas necessárias para proteger a privacidade do Usuário, em atendimento à legislação em vigor. Este documento detalha as formas de coleta, guarda, utilização, compartilhamento e divulgação de seus dados pessoais, bem como aponta claramente as medidas tomadas para assegurar a proteção dos dados coletados.",
    ],
  },
  {
    id: "coleta-utilizacao-guarda",
    title: "Coleta, utilização e guarda dos dados",
    subsections: [
      {
        title: "Coleta de dados: Conta de Acesso",
        paragraphs: [
          "Para a realização de Compras, o Usuário deverá criar uma Conta de Acesso, fornecendo nome completo, endereço de e-mail, número de telefone, CPF. Os dados fornecidos pelos Usuários serão armazenados e utilizados pela Evidive Escola de Mergulho, por si ou por terceiros por ela contratados, para fornecer os produtos do Site, realizar as transações comerciais, processar pagamentos a elas relacionados, compartilhar dados, enviar e-mails de ofertas, produtos, serviços e campanhas de marketing, armazenar o histórico de produtos visualizados, promover campanhas de retargeting, personalizar páginas do Site, verificar dados bancários para evitar fraudes (dados não serão armazenados) e operar os serviços necessários.",
          "Os dados poderão ser compartilhados com terceiros contratados pela Evidive Escola de Mergulho nos termos desta Política, ressaltando-se que a criação de cada Conta de Acesso ou qualquer cadastro no Site, para o qual seja necessário o envio de qualquer dado pessoal do Usuário, pressupõe o consentimento expresso quanto à coleta, uso, armazenamento e tratamento de dados pessoais. O Usuário é responsável, nas esferas civil e criminal, pela veracidade e atualização dos dados fornecidos (inclusive os dados pessoais) e Evidive Escola de Mergulho se exime de qualquer responsabilidade por danos decorrentes do preenchimento incompleto, impreciso ou inexato do cadastro pelo Usuário, sob qualquer meio ou forma, ou, ainda, pelo uso desse cadastro de forma indevida por qualquer terceiro não autorizado a usar tais dados ou, ainda, por terceiros que tenham, devida ou indevidamente, obtido os dados do Usuário para acesso no Site, agindo como se ele fosse.",
        ],
      },
      {
        title: "Coleta de dados: Cookies",
        paragraphs: [
          "Visando oferecer a melhor experiência de navegação e Compras ao Usuário, a Evidive Escola de Mergulho utiliza-se de tecnologias para coletar e armazenar informações relacionadas à visita do Usuário no Site e isso pode incluir o envio de um ou mais cookies ou identificadores anônimos que coletam dados relativos às preferências de navegação e às páginas visitadas pelo Usuário. Desta forma, a apresentação do Site fica personalizada e alinhada aos interesses pessoais do Usuário. A utilização destes dados fica restrita ao objetivo indicado e Evidive Escola de Mergulho se compromete a não utilizar ou permitir a utilização de tais dados com outra finalidade.",
          "Ademais, a coleta, guarda e tratamento destes dados é absolutamente automatizada, não havendo nenhuma possibilidade de contato humano com os dados em questão. O Usuário pode e poderá, a qualquer tempo, caso discorde da política de cookies acima, utilizar as ferramentas de seu navegador que impedem a instalação de cookies e ainda apagar quaisquer cookies existentes em seu dispositivo de conexão com a internet. Neste caso, algumas funcionalidades do Site poderão apresentar erros. A Evidive Escola de Mergulho poderá ainda utilizar-se de outras tecnologias para a coleta de dados de navegação dos Usuários, comprometendo-se a guardá-los, tratá-los e utilizá-los em conformidade com este Política.",
        ],
      },
      {
        title: "Coleta de dados: Registros de acesso",
        paragraphs: [
          "Evidive Escola de Mergulho manterá em sua base de dados todas as informações relativas aos acessos do Usuário ao Site, incluindo, mas não se limitando ao endereço IP, às páginas acessadas, aos horários e datas de acesso, e o dispositivo de acesso utilizado, nos termos da legislação vigente. Tais registros poderão ser utilizados em investigações internas ou públicas para averiguação de práticas que possam gerar quaisquer prejuízos à Evidive Escola de Mergulho, inclusive a prática de crimes em ambientes virtuais.",
        ],
      },
      {
        title: "Coleta de dados: Outras formas",
        paragraphs: [
          "Evidive Escola de Mergulho poderá coletar dados pessoais do Usuário, que não os identificados aqui, que sejam inseridos pelo Usuário e sobre o Usuário voluntariamente no processo de navegação do Site ou quando entrar em contato com a Central de Atendimento Evidive Escola de Mergulho. Finalmente, Evidive Escola de Mergulho poderá acessar bases de dados públicas ou privadas para confirmar a veracidade dos dados pessoais informados pelo Usuário, inclusive dados relacionados ao pagamento da Compra.",
        ],
      },
      {
        title: "Utilização de dados: E-mail",
        paragraphs: [
          "Evidive Escola de Mergulho utilizará o e-mail do Usuário prioritariamente para enviar informações sobre suas Compras (confirmação de Compra e atualizações da situação). O e-mail cadastrado também será utilizado para recuperação da senha de acesso do Cliente, em caso de perda ou esquecimento da senha.",
        ],
      },
      {
        title: "Utilização de dados: Publicidade via e-mail",
        paragraphs: [
          "No momento do cadastro de seus dados de contato, o Usuário terá a opção de aceitar ou proibir o envio de mensagens publicitárias. Ademais, a qualquer momento, o Usuário poderá alterar sua decisão, por meio de acesso à sua Conta no Site ou de contato com a Central de Atendimento Evidive Escola de Mergulho ou, ainda, no campo de descadastro existente nas newsletters enviadas pela Evidive Escola de Mergulho, sendo que nesse caso o descadastramento da base de dados poderá demorar até 30 (trinta) dias para ser efetivada.",
        ],
      },
      {
        title: "Utilização dos dados: Outras formas",
        paragraphs: [
          "Além das formas expostas acima, a Evidive Escola de Mergulho poderá, a seu exclusivo critério, utilizar os dados pessoais do Usuário nas seguintes formas: (i) atualização de cadastro; (ii) garantia da segurança do Usuário; (iii) resposta a solicitações do próprio Usuário; (iv) informação acerca de alterações nos Termos e Condições de Uso ou das Políticas; (v) elaboração de estatísticas com relação ao uso do Site, garantido o anonimato do Usuário, inclusive para fins de aperfeiçoamento e entendimento do perfil dos Usuários para a melhoria do Site; (vi) aperfeiçoamento de ferramentas de interatividade entre o Site e o Usuário, garantido seu anonimato; (vii) cumprimento de ordens judiciais; e (viii) defesa dos direitos da Evidive Escola de Mergulho contra o Usuário em procedimentos judiciais ou administrativos.",
        ],
      },
      {
        title: "Guarda dos dados",
        paragraphs: [
          "A Evidive Escola de Mergulho guardará todos os dados coletados em suas bases de dados protegidas e seguras. Tais dados serão acessados apenas por processos computadorizados automatizados, profissionais autorizados e nos casos listados nesta Política. Caso o Usuário requeira a exclusão de seus dados da base de dados, a Evidive Escola de Mergulho se reserva o seu direito de manter os dados em questão em cópias de salvaguarda por até 6 (seis) meses, a fim de cumprir obrigações legais de guarda obrigatória.",
        ],
      },
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento e divulgação dos dados",
    paragraphs: [
      "A Evidive Escola de Mergulho tem a confidencialidade dos dados pessoais do Usuário como prioridade em seus negócios. Assim, assume o compromisso de não divulgar, compartilhar, dar acesso a, facilitar acesso a, alugar, vender, trocar ou de qualquer outra forma disponibilizar tais informações a terceiros, sob nenhum pretexto, exceto nos casos autorizados expressamente pelo Usuário, inclusive nos casos indicados abaixo.",
      "Com o único intuito de permitir a concretização de Compras no Site, a Evidive Escola de Mergulho poderá compartilhar dados pessoais dos Usuários com seus parceiros comerciais, como empresas processadoras de pagamentos, administradoras de cartão de crédito e operadoras de serviços. Neste caso, serão compartilhados apenas os dados pessoais imprescindíveis para que o parceiro comercial da Evidive Escola de Mergulho desempenhe sua atividade (cobrança, operação de serviço, etc.). Ademais, tais parceiros comerciais serão obrigados, por meio de contratos de confidencialidade, a não arquivar, manter em arquivo, compilar, copiar, reproduzir ou compartilhar tais dados com quem quer que seja.",
      "A outra hipótese de divulgação de dados pessoais é por meio de uma determinação judicial. Também neste caso, a divulgação ocorrerá apenas na medida necessária para cumprir a determinação judicial, permanecendo sigilosos os dados não requeridos pela autoridade em questão.",
    ],
  },
  {
    id: "conteudos-nao-solicitados",
    title: "Dados transmitidos sem solicitação da Evidive Escola de Mergulho",
    paragraphs: [
      "A Evidive Escola de Mergulho solicita ao Usuário que não envie à Evidive Escola de Mergulho quaisquer informações comerciais, criações pessoais, ideias, fotografias, projetos, conceitos, etc (Conteúdos Não Solicitados). Tais Conteúdos Não Solicitados serão sumariamente descartados, sem qualquer leitura ou incorporação às bases de dados da Evidive Escola de Mergulho.",
      "Nos termos da Lei de Direitos Autorais, não são suscetíveis de proteção no Brasil as ideias, concepções abstratas, projetos, planos e esquemas. Desta forma, o eventual uso pela Evidive Escola de Mergulho de quaisquer Conteúdos Não Solicitados será decorrente de desenvolvimento interno e independente e poderá ocorrer livremente, não sendo devida ou exigida qualquer autorização ou compensação ao usuário ou consumidor.",
      "A Evidive Escola de Mergulho desenvolve de forma independente todas as suas políticas e atividades, rechaçando desde já qualquer acusação ou alegação de aproveitamento de Conteúdos Não Solicitados.",
    ],
  },
  {
    id: "medidas-seguranca",
    title: "Medidas de segurança",
    subsections: [
      {
        title: "Recursos tecnológicos",
        paragraphs: [
          "A Evidive Escola de Mergulho adota recursos tecnológicos avançados para garantir a segurança de todos os dados pessoais coletados e armazenados. Nem mesmo os funcionários da Evidive Escola de Mergulho têm livre acesso à base de dados dos Usuários, sendo este limitado apenas àquelas pessoas cujas funções exigem o contato com dados pessoais. Entre as medidas de segurança implementadas, estão a utilização de modernas forma de criptografia. Tais medidas podem ser verificadas pelo Usuário acessando o Site pela visualização do “cadeado de segurança” em seu navegador de internet.",
        ],
      },
      {
        title: "Sigilo da senha",
        paragraphs: [
          "A Evidive Escola de Mergulho recomenda que o Usuário mantenha sua senha sob total sigilo, evitando a sua divulgação a terceiros. A Evidive Escola de Mergulho nunca solicitará ao Usuário que informe sua senha fora do Site, por telefone, e-mail ou por qualquer outro meio de comunicação. A senha do Usuário deverá ser usada exclusivamente no momento do acesso à Conta do Usuário no Site (ou na redefinição de senha). Caso o Usuário suspeite que sua senha tenha sido exposta a terceiros, a Evidive Escola de Mergulho recomenda a imediata substituição da senha.",
        ],
      },
      {
        title: "E-mails suspeitos",
        paragraphs: [
          "A Evidive Escola de Mergulho envia ao Usuário apenas e-mails com mensagens publicitárias, divulgando produtos e serviços ou atualizando informações. A Evidive Escola de Mergulho não envia mensagens (i) solicitando dados pessoais do Usuário; (ii) solicitando a senha ou dados financeiros do Usuário; (iii) com arquivos anexos exceto documentos em PDF; ou (iv) com links para download de arquivos. Caso receba um e-mail com tais características, desconsidere-o e entre em contato com a Central de Atendimento Evidive Escola de Mergulho.",
        ],
      },
      {
        title: "Cartões de crédito",
        paragraphs: [
          "A Evidive Escola de Mergulho não armazena em sua base de dados informações financeiras do Usuário, como as informações referentes a cartões de crédito. O procedimento de aprovação do pagamento ocorre entre o Usuário, os bancos e as administradoras de cartões, sem intervenção da Evidive Escola de Mergulho.",
        ],
      },
      {
        title: "Impossibilidade de responsabilização",
        paragraphs: [
          "Em que pese os maiores esforços da Evidive Escola de Mergulho, o atual estágio da tecnologia não permite que se crie uma base de dados absolutamente segura contra ataques. Desta forma, a Evidive Escola de Mergulho exime-se de qualquer responsabilidade por danos eventualmente causados por terceiros, inclusive por invasões no Site ou na base de dados, por vírus ou por vazamento de informações, a menos que fique comprovada exclusiva culpa da Evidive Escola de Mergulho.",
        ],
      },
    ],
  },
  {
    id: "direitos",
    title: "Direitos das pessoas sobre os dados coletados",
    paragraphs: [
      "A Evidive Escola de Mergulho permite que o Usuário faça diferentes tipos de cadastro, contendo mais ou menos informações de acordo com seu próprio objetivo no Site. Assim, o Usuário tem a possibilidade de escolher a forma de cadastro, devendo preenchê-lo com informações verídicas e atualizadas.",
      "O Usuário declara ser o legítimo titular de seus dados pessoais e poderá, a qualquer momento, utilizar as ferramentas do Site para editá-los, atualizá-los ou removê-los preventivamente de nossa base de dados. A Evidive Escola de Mergulho manterá os dados preventivamente removidos em sigilo pelo prazo de seis meses, para atender obrigações legais de guarda obrigatória, descartando-os definitivamente após tal período.",
      "A Evidive Escola de Mergulho disponibiliza ainda ferramentas para que o Usuário possa determinar alguns usos de seus dados pessoais, como a autorização para envio de peças de publicidade.",
    ],
  },
  {
    id: "alteracao-controle",
    title: "Uso de dados em caso de alteração de controle da Evidive Escola de Mergulho",
    paragraphs: [
      "Os dados coletados podem ser eventualmente transferidos a um terceiro em caso de alteração do controle, de uma aquisição, de uma incorporação, de uma fusão ou de uma venda de ativos da Evidive Escola de Mergulho sob qualquer meio ou forma.",
    ],
  },
  {
    id: "menores",
    title: "Política de dados de menores",
    paragraphs: [
      "O Site não é direcionado a menores de 18 (dezoito) anos. No entanto, o acesso ao Site não é proibido aos menores, uma vez que não há qualquer conteúdo restrito por questões etárias. Os formulários e questionários do site da Evidive Escola de Mergulho não visam obter dados de menores.",
      "Caso tais dados sejam inseridos por menores, seu representante legal poderá contatar a Central de Atendimento Evidive Escola de Mergulho para retificar, modificar ou remover tais dados.",
    ],
  },
];
