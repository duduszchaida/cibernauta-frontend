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

// General

// MALICIOUS

export const mailMal4: EmailData = {
  text: `Olá Jogador,\n\nDetectamos uma atividade suspeita na sua conta Rubloks e, por segurança, precisamos que você verifique sua identidade imediatamente. Caso contrário, sua conta poderá ser removida permanentemente e todo seu inventário de bloquinhos premium será perdido.\n\nClique no link abaixo para continuar sua verificação:\n\nhttps://rubloks-secure-login.freegift.claim-now.co\n\nApós confirmar seus dados, você receberá 500 Rubux grátis como forma de agradecimento pela sua cooperação.\n\nObrigado por escolher Rubloks,\nA Equipe Oficial de Segurança Rubloks`,
  address: "rubloks@oficial.com",
  class: MALICIOUS,
  name: "Rubloks Oficial",
  picture: "picture_rubloks",
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

export const mailSpam3: EmailData = {
  text: `Curta CatMusic Premium por 2 meses de graça!\n\nOuça suas playlists com o plano Premium por 2 meses sem pagar nada e aproveite.\n\nApós o periodo de teste, será cobrado o valor de R$ 1,99/mês.\n\nAssine já!`,
  address: "marketing@catmusic.com",
  class: SPAM,
  name: "CatMusic",
  picture: "picture_catmusic",
  key: crypto.randomUUID(),
};

export const nonTutorials: EmailData[] = [
  mailSpam1,
  mailSpam2,
  mailSpam3,
  mailMal1,
  mailMal2,
  mailMal3,
  mailMal4,
];
