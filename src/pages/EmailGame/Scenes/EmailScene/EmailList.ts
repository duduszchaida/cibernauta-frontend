import { MALICIOUS, SAFE, SPAM, type EmailData } from "./EmailManager";

export const mailspamDesconto90: EmailData = {
  text: `PARABÉNS!!!\n\nVocê foi selecionado para RECEBER um cupom de até 90% de DESCONTO em nossos produtos incríveis!\nMas é SÓ HOJE! Clique e aproveite:\n\nhttp://superofertaspromocao.biz/premio\n\nNão perca tempo! Essa é sua chance de mudar de vida!\nEquipe Promoções Imperdíveis`,
  address: "promocoes@shop.com",
  class: SPAM,
  name: "Loja de coisas",
  picture: "picture_default_3",
  anomalyParagraphs: [1, 2, 3],
  key: crypto.randomUUID(),
};

export const mailmalSuport: EmailData = {
  text: `Prezado usuário,\nDetectamos um problema URGENTE em sua conta e precisamos que você confirme seus dados imediatamente para evitar bloqueio permanente.\n\nClique no link abaixo e faça login para manter sua conta ativa:\n\nhttp://seguranca-verificacao-login.com/auth\n\nAtenção: se você não confirmar nas próximas 2 horas, sua conta será removida.\n\nSuporte Técnico`,
  address: "tecnicus@zap.com",
  class: MALICIOUS,
  name: "Suporte de tecnocidade",
  picture: "picture_default_2",
  anomalyParagraphs: [0, 1, 2, 3],
  key: crypto.randomUUID(),
};
// export const mailExample: EmailData = {
//   text: `Se você ainda faz SEO como era feito em 2014, provavelmente você está, nesse momento, desesperado com a queda de tráfego do seu blog.\n\nA chegada do AI Mode no Google é, sem dúvidas, a maior mudança da SERP desde a atualização Panda.\n\nQuem tem blog "velho" tá aí sofrendo. Aqueles milhares de blog-posts com assuntos longtail super difíceis de dar manutenção e manter relevantes.\n\nFora que a empresa evoluiu, cresceu, as estratégias de marketing também mudaram e, ao mesmo tempo, um monte de banners, ctas, materiais ou estão ultrapassados ou até mesmo com link quebrado espalhados por todos os milhares e milhares de conteúdos.\n\nO custo de manutenção subindo e o orçamento diminuindo, afinal o tráfego está caindo, não apenas pelos desafios que comentei, mas também porque as pessoas estão clicando cada vez menos, com o efeito do que chamamos, desde 2017, de zero-click.\n\nUma soma de fatores está chacoalhando a indústria.\n\nAinda temos o aumento dos muros dos jardins fechados, que também contribui para a diminuição de tráfego nos sites e blogs. Até porque nenhuma rede social quer que o usuário saia para um link externo. Por isso que, quando você cola um link num post, tipo esse, a tendência é que seu alcance seja menor.\n\nHá mais ajustes, mas esses já serão bem recebidos pelas LLMs e a probabilidade de começar a aparecer mais por lá aumenta.\n\nÉ uma longa conversa. De todo modo, esse é um pontapé inicial, pra quem estava se sentindo perdido em meio a tantas mudanças.\n\nMatt\n\nPS: Caso você não queira mais receber emails como esse, basta se descadastrar aqui.`,
//   address: "endereçoAnomalia@.mail.zig",
//   class: SPAM,
//   name: "Ricardo",
//   picture: "picture_default_0",
//   anomalyAddress: true,
//   anomalyParagraphs: [3, 1, 7],
//   key: crypto.randomUUID(),
// };
export const mailsafeSubscription: EmailData = {
  text: `Olá SeuNome,\nEstamos confirmando sua inscrição no workshop "Boas Práticas de Segurança Digital", que ocorrerá no dia 12/12 às 14h.\nVocê pode acessar todos os materiais e informações no link do nosso site oficial:\n\nhttps://empresa-segura.com.br/workshop\n\nSe tiver qualquer dúvida, responda por este mesmo email.\n\nAtenciosamente,\nEquipe Empresa Segura`,
  address: "empresasegura@mail.zig",
  class: SAFE,
  name: "Emprura",
  picture: "picture_default_1",
  key: crypto.randomUUID(),
};

export const mailGrandma: EmailData = {
  text: `Estava pensando em você hoje e resolvi mandar este email só para saber como você está.\nFiz aquele bolo de chocolate que você gosta, e ficou uma delícia! Quando você tiver um tempinho, venha me visitar para comer um pedaço.\n\nAh, e se quiser ver as fotos do aniversário do seu primo, coloquei tudo no nosso grupo da família, lá no azap mesmo.\n\nSe cuida, meu amor.\nVovó`,
  address: "aparecida123@mail.com",
  class: SAFE,
  name: "Aparecida",
  picture: "picture_default_1",
  key: crypto.randomUUID(),
};

// Controls Level

export const mailTutorialControls: EmailData = {
  text: `Olá! E bem vind@ ao treinamento de identificação de emails da equipe Cibernauta.\n\nDaqui em diante, você irá aprender como identificar emails seguros, maliciosos e spam em todas as suas formas.\n\nMas antes de começar, vamos dar uma olhada nos controles que temos aqui.\n\nNa parte lateral da direita, mais ou menos por aqui -->\nTemos a barra de scroll, se clicar nela ou arrasta-la pode mover o conteúdo do email para cima e para baixo.\n\nNão ache estranho se ela às vezes não estiver presente, ela só aparece quando um email é comprido o suficiente para precisar dela.\n\nAlém dela também temos seu painel de botões, para abrir ele basta clicar no botão com a seta no canto esquerdo.\n\nNo painel você tem acesso a o que é preciso para classificar um email.\nPor enquanto só temos os botões de SEGURO (verde e redondo) e MALICIOSO (quadrado vermelho).\n\nPara prosseguir classifique esse email como SEGURO e vamos seguir em frente.`,
  address: "teamcibernauta@mail.com",
  class: SAFE,
  name: "Equipe Cibernauta",
  picture: "picture_cibernauta",
  key: crypto.randomUUID(),
};

// Classification

export const mailTutorialClass: EmailData = {
  text: `Agora que tem uma noção básica dos controles, vamos à o que interessa, emails.\n\nNesse próximo treino vamos ver uma série de emails e é o seu trabalho identificar se eles são SEGUROs ou MALICIOSOs.\n\nMas como fazer isso? Existem várias maneiras, mas por enquanto só para aquecer, vamos começar com algo básico.\n\nEmails de pessoas e empresas desconhecidas ou até suspeitas podem ser maliciosos. Se vir um email de alguém que for desconhecido ou suspeito, marque como MALICIOSO, se não, pode marcar como SEGURO.\n\nUma última coisa, no canto de cima, junto com o botão de pause, tem o cronômetro, esse é o tempo que você terá para classificar quantos emails conseguir.\n\nQuando o cronómetro chegar a 0 (ou não houver mais emails), você irá para o placar de pontos, onde pode ver quantos erros e acertos cometeu, e sua pontuação final.\n\nEle só começa a contar quando esse email for classificado e seguirá para o próximo, então assim que estiver pronto, marque esse como SEGURO e boa sorte!`,
  address: "teamcibernauta@mail.com",
  class: SAFE,
  name: "Equipe Cibernauta",
  picture: "picture_cibernauta",
  key: crypto.randomUUID(),
};

export const mailMal1: EmailData = {
  text: `Prezado cliente, Sua conta bancária foi SUSPENSA por atividade irregular.\n\nPara evitar o CANCELAMENTO IMEDIATO, acesse o link abaixo e confirme seus dados:\n\nhttp://banco-verificacao-segura123.com/urgente\nSe não confirmar em 1 HORA, sua conta será apagada para sempre.\n\nAtenciosamente, Equipe do Banco.`,
  address: "hackers@mail.com",
  class: MALICIOUS,
  name: "Banco do mal",
  picture: "picture_hacker_2",
  key: crypto.randomUUID(),
};

export const mailMal2: EmailData = {
  text: `Olá,\n\nSeu computador está DESATUALIZADO e em risco crítico.\n\nNos envie seu endereço de email e sua senha antes que seja tarde demais.`,
  address: "hackers@mail.com",
  class: MALICIOUS,
  name: "Não é Virus",
  picture: "picture_hacker_0",
  key: crypto.randomUUID(),
};

export const mailMal3: EmailData = {
  text: `Caro usuário,\n\nSeu PACOTE não pôde ser entregue porque está faltando pagamento de TAXA.\n\nPara liberar a entrega, pague agora mesmo:\n\nhttp://correios-entrega-rapidahoje.net/liberar\n\nSe você não pagar nas próximas 24h, o pacote será DEVOLVIDO definitivamente.\n\nServiço de Entregas`,
  address: "hackers@mail.com",
  class: MALICIOUS,
  name: "Hacker Entregas",
  picture: "picture_hacker_1",
  key: crypto.randomUUID(),
};

export const mailSafe1: EmailData = {
  text: `Tudo certo por enquanto?\n\nNão se esqueça que se precisar de um momento para respirar, pode apertar o botão de pause lá encima no canto, onde você pode ver também alguns controles adicionais.\n\nContamos com você!\n\nEquipe Cibernauta`,
  address: "teamcibernauta@mail.com",
  class: SAFE,
  name: "Equipe Cibernauta",
  picture: "picture_cibernauta",
  key: crypto.randomUUID(),
};

export const mailSafe2: EmailData = {
  text: `Alerta de segurança\n\nDetectamos um novo login na sua Conta. Se foi você que fez isso, nenhuma ação é necessária. Se não foi, ajudaremos a proteger sua conta.\n\nVerificar atividade.`,
  address: "emails@mail.com",
  class: SAFE,
  name: "Sistema de Emails",
  picture: "picture_default_1",
  key: crypto.randomUUID(),
};

// SPAM

export const mailSpam1: EmailData = {
  text: `Moletom BenIO que pode ser de se interesse, está em oferta!\n\nVerifique sua lista de desejos da Choppu e aproveite o desconto de 25% com frete grátis em todo Brasil!\n\nhttps://Choppu.com.br`,
  address: "emails@choppu.com",
  class: SPAM,
  name: "Compras Choppu",
  picture: "picture_choppu",
  key: crypto.randomUUID(),
};

export const mailSpam2: EmailData = {
  text: `Seu amigo Ciclano e outras 32 pessoas reagiram a foto de AnimesIrados no PineappleBook.\nVeja agora!\n\nhttps://pineapplebook.com`,
  address: "pineapplebook@mail.com",
  class: SPAM,
  name: "PineappleBook",
  picture: "picture_pbook",
  key: crypto.randomUUID(),
};
