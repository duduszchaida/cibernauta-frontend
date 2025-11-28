import { MALICIOUS, SAFE, SPAM, type EmailData } from "./EmailData";

const adresses: Record<string, string> = {
  cibernauta: "cibernauta@mail.com",
  choppu: "emails@choppu.com",
  pineappleBook: "pineapplebook@mail.com",
  fritter: "fritter@frtr.com",
  mail: "mail@mail.com",
  grandma: "aparecida1948@mail.com",
};

// Lista de export de todos os emails do jogo

export const mailsafeSubscription: EmailData = {
  text: `Olá SeuNome,\nEstamos confirmando sua inscrição no workshop "Boas Práticas de Segurança Digital", que ocorrerá no dia 12/12 às 14h.\nVocê pode acessar todos os materiais e informações no link do nosso site oficial:\n\nhttps://empresa-segura.com.br/workshop\n\nSe tiver qualquer dúvida, responda por este mesmo email.\n\nAtenciosamente,\nEquipe Empresa Segura`,
  address: "empresasegura@mail.zig",
  class: SAFE,
  name: "Emprura",
  picture: "picture_default_1",
};

// Controls Level

export const mailTutorialControls: EmailData = {
  text: `Olá! E bem vind@ ao treinamento de identificação de emails da equipe Cibernauta.\n\nDaqui em diante, você irá aprender como identificar emails seguros, maliciosos e spam em todas as suas formas.\n\nMas antes de começar, vamos dar uma olhada nos controles que temos aqui.\n\nNa parte lateral da direita, mais ou menos por aqui -->\nTemos a barra de scroll, se clicar nela ou arrasta-la pode mover o conteúdo do email para cima e para baixo.\n\nNão ache estranho se ela às vezes não estiver presente, ela só aparece quando um email é comprido o suficiente para precisar dela.\n\nAlém dela também temos seu painel de botões, para abrir ele basta clicar no botão com a seta no canto esquerdo.\n\nNo painel você tem acesso a o que é preciso para classificar um email.\nPor enquanto só temos os botões de SEGURO (verde e redondo) e MALICIOSO (quadrado vermelho).\n\nPara prosseguir classifique esse email como SEGURO e vamos seguir em frente.`,
  address: adresses.cibernauta,
  class: SAFE,
  name: "Equipe Cibernauta",
  picture: "picture_cibernauta",
};

// Classification

export const mailTutorialClass: EmailData = {
  text: `Agora que tem uma noção básica dos controles, vamos à o que interessa, emails.\n\nNesse próximo treino vamos ver uma série de emails e é o seu trabalho identificar se eles são SEGUROs ou MALICIOSOs.\n\nMas como fazer isso? Existem várias maneiras, mas por enquanto só para aquecer, vamos começar com algo básico.\n\nEmails de pessoas e empresas desconhecidas ou até suspeitas podem ser maliciosos. Se vir um email de alguém que for desconhecido ou suspeito, marque como MALICIOSO, se for de alguém que conhece como Cibernauta ou Mail, uma das empresas que fornece serviço de email, pode marcar como SEGURO.\n\nUma última coisa, no canto de cima, junto com o botão de pause, tem o cronômetro, esse é o tempo que você terá para classificar quantos emails conseguir.\n\nQuando o cronómetro chegar a 0 (ou não houver mais emails), você irá para o placar de pontos, onde pode ver quantos erros e acertos cometeu, e sua pontuação final.\n\nEle só começa a contar quando esse email for classificado e seguirá para o próximo, então assim que estiver pronto, marque esse como SEGURO e boa sorte!`,
  address: adresses.cibernauta,
  class: SAFE,
  name: "Equipe Cibernauta",
  picture: "picture_cibernauta",
};

export const mailClassMal1: EmailData = {
  text: `Prezado cliente, Sua conta bancária foi SUSPENSA por atividade irregular.\n\nPara evitar o CANCELAMENTO IMEDIATO, acesse o link abaixo e confirme seus dados:\n\nhttp://banco-verificacao-segura123.com/urgente\nSe não confirmar em 1 HORA, sua conta será apagada para sempre.\n\nAtenciosamente, Equipe do Banco.`,
  address: "hackers@mail.com",
  class: MALICIOUS,
  name: "Banco do mal",
  picture: "picture_hacker_2",
};

export const mailClassMal2: EmailData = {
  text: `Olá,\n\nSeu computador está DESATUALIZADO e em risco crítico.\n\nNos envie seu endereço de email e sua senha antes que seja tarde demais.`,
  address: "hackers@mail.com",
  class: MALICIOUS,
  name: "Não é Virus",
  picture: "picture_hacker_0",
};

export const mailClassMal3: EmailData = {
  text: `Caro usuário,\n\nSeu PACOTE não pôde ser entregue porque está faltando pagamento de TAXA.\n\nPara liberar a entrega, pague agora mesmo:\n\nhttp://correios-entrega-rapidahoje.net/liberar\n\nSe você não pagar nas próximas 24h, o pacote será DEVOLVIDO definitivamente.\n\nServiço de Entregas`,
  address: "hackers@mail.com",
  class: MALICIOUS,
  name: "Hacker Entregas",
  picture: "picture_hacker_1",
};

export const mailClassSafe1: EmailData = {
  text: `Tudo certo por enquanto?\n\nNão se esqueça que se precisar de um momento para respirar, pode apertar o botão de pause lá encima no canto, onde você pode ver também alguns controles adicionais.\n\nContamos com você!\n\nEquipe Cibernauta`,
  address: adresses.cibernauta,
  class: SAFE,
  name: "Equipe Cibernauta",
  picture: "picture_cibernauta",
};

export const mailClassSafe2: EmailData = {
  text: `Alerta de segurança\n\nDetectamos uma tentativa de login na sua Conta. Se não foi você que fez isso, nenhuma ação é necessária. Caso contrário, acesse o link abaixo para fazer uma verificação.\n\nhttps://mail.verif-activity/user?=486350147\n\nAgradecemos sua compreensão.`,
  address: adresses.mail,
  class: SAFE,
  name: "Mail Emails",
  picture: "picture_mail",
};

// Inspect

export const mailTutorialElements: EmailData = {
  text: `Agora que passamos por esse aquecimento vamos ver a parte mais crucial do treinamento. Selecionar elementos.\n\nTodo email é composto de elementos, como a foto no canto superior esquerdo, o endereço de onde veio esse email ou até o texto que você está lendo.\n\nAgora, além de classificar os emails, você também pode SELECIONAR seus elementos.\n\nQuando estiver com seu painel aberto, seu cursor do mouse vai virar uma seta em diagonal, isso quer dizer que está no modo de seleção.\n\nNo modo de seleção, qualquer elemento do email que você clicar será selecionado como uma ANOMALIA, ou seja, algo que indica que esse email não é SEGURO.\n\nPara essa próxima etapa, vamos começar a partir do princípio que qualquer email oferecendo algo de GRAÇA ou pedindo que você faça algo com URGÊNCIA como ralizar um pagamento ou entrar em algum link, é malicioso.\n\nSe ver algo do tipo, marque aonde no texto que isso aparece e classifique como MALICIOSO. Se o texto tiver mais frases do tipo em outros lugares não tem problema, você só precisa selecionar uma delas que já conta.\n\nElementos que forem corretamente marcados como ANOMALIAS te darão pontos extras! Mas elementos selecionados incorretamente irão reduzir sua pontuação.\n\nPronto para seguir em frente?`,
  address: adresses.cibernauta,
  class: SAFE,
  name: "Equipe Cibernauta",
  picture: "picture_cibernauta",
};

export const mailElementsMal1: EmailData = {
  text: `Prezado cliente,\n\nIdentificamos um pagamento PENDENTE no valor de R$ 247,90.\nPara evitar multa e bloqueio, realize o pagamento no link seguro abaixo:\n\nhttp://cobranca-sistema24h.net/pagar\n\nEste é seu último aviso.\n\nDepartamento de Cobranças`,
  address: "cobrancas@dep.com",
  class: MALICIOUS,
  name: "Equipe de Cobranças",
  picture: "picture_default_6",
  anomalyParagraphs: [1, 2, 3],
};

export const mailElementsMal2: EmailData = {
  text: `Olá Jogador,\n\nDetectamos uma atividade suspeita na sua conta Rubloks e, por segurança, precisamos que você verifique sua identidade imediatamente. Caso contrário, sua conta poderá ser removida permanentemente e todo seu inventário de Ruboks será perdido.\n\nClique no link abaixo para continuar sua verificação:\n\nhttps://rubloks-secure-login.freegift.claim-now.co\n\nApós confirmar seus dados, você receberá 500 Ruboks grátis como forma de agradecimento pela sua cooperação.\n\nObrigado por escolher Rubloks,\nA Equipe Oficial de Segurança Rubloks`,
  address: "rubloks@oficial.com",
  class: MALICIOUS,
  name: "Rubloks Oficial",
  picture: "picture_rubloks",
  anomalyParagraphs: [1, 3, 4],
};

export const mailElementsMal3: EmailData = {
  text: `ATENÇÃO!\n\nSua assinatura PREMIUM vai expirar HOJE. Para manter o acesso, faça a renovação IMEDIATA pelo link abaixo:\n\nhttp://renovacao-conta-premium-now.com/pagamento\n\nSe não renovar agora, sua conta será permanentemente bloqueada.\n\nEquipe PineappleBook`,
  address: "p1neapplebook@mail.com",
  class: MALICIOUS,
  name: "PineappleBook",
  picture: "picture_pbook",
  anomalyParagraphs: [1, 2, 3],
};

export const mailElementsMal4: EmailData = {
  text: `Olá,\n\nSua NOTA FISCAL está pronta, mas devido a um erro no sistema ela não pode ser enviada como anexo.\nAcesse o documento clicando no link abaixo:\n\nhttp://notafiscal-online-check.com/download\n\nSe você não abrir em até 24h, perderá acesso ao documento.\n\nDepartamento Financeiro`,
  address: "choppu@mail.com",
  class: MALICIOUS,
  name: "Compras Choppu",
  picture: "picture_choppu",
  anomalyParagraphs: [2, 3],
};

export const mailElementsSafe1: EmailData = {
  text: `Olá,\n\nAgradecemos sua compra!\nSua nota fiscal já está disponível no site oficial. Você pode acessá-la pelo link seguro abaixo:\n\nhttps://loja-oficial.com.br/minha-conta/notas\n\nSe tiver qualquer dúvida, estamos à disposição.\n\nAtenciosamente,\nEquipe Loja Oficial`,
  address: adresses.choppu,
  class: SAFE,
  name: "Compras Choppu",
  picture: "picture_choppu",
};

export const mailElementsSafe2: EmailData = {
  text: `Olá!\n\nObrigado por criar uma conta no Fritter. Estamos felizes em ter você aqui!\nPara começar a personalizar sua experiência, recomendamos visitar sua página de configurações:\n\nhttps://fritter.com/configuracoes\n\nLá você pode ajustar notificações, escolher interesses e configurar a segurança da sua conta.\n\nSe precisar de ajuda, basta responder este email ou acessar nossa Central de Suporte.\n\nBem-vindo à conversa!\nEquipe Fritter`,
  address: adresses.fritter,
  class: SAFE,
  name: "Fritter",
  picture: "picture_fritter",
};

export const mailElementsSafe3: EmailData = {
  text: `Escrever alguma dica de uso para o usuário`,
  address: adresses.cibernauta,
  class: SAFE,
  name: "Equipe Cibernauta",
  picture: "picture_fritter",
};

// Adresses

// General

export const mailTutorialTest: EmailData = {
  text: `Esta é uma fase para teste.\n\n:D`,
  address: adresses.cibernauta,
  class: SAFE,
  name: "Equipe Cibernauta",
  picture: "picture_cibernauta",
};

// MALICIOUS

export const mailGenMal1: EmailData = {
  text: `Oi,\n\nEstou tentando falar com você desde cedo, mas não estou conseguindo. Estou viajando e tive um problema com meu cartão — não tenho acesso à conta e preciso fazer um pagamento urgente.\n\nPor favor, você pode me ajudar transferindo o valor temporariamente? Assim que eu resolver tudo, devolvo imediatamente.\n\nAqui estão os dados para transferência:\nhttp://suporte-financeiro-urgente.com/transferir\n\nPor favor, é realmente importante.\nObrigado.`,
  address: "fernando.nandes@mail.com",
  class: MALICIOUS,
  name: "Fernando Fernandes",
  picture: "picture_default_5",
};

export const mailGenMal2: EmailData = {
  text: `Prezado usuário,\nDetectamos um problema URGENTE em sua conta e precisamos que você confirme seus dados imediatamente para evitar bloqueio permanente.\n\nClique no link abaixo e faça login para manter sua conta ativa:\n\nhttp://seguranca-verificacao-login.com/auth\n\nAtenção: se você não confirmar nas próximas 2 horas, sua conta será removida.\n\nSuporte Técnico`,
  address: "tecnicus@zap.com",
  class: MALICIOUS,
  name: "Suporte de tecnocidade",
  picture: "picture_default_2",
  anomalyParagraphs: [0, 1, 2, 3],
};

// SPAM

export const mailGenSpam1: EmailData = {
  text: `Moletom BenIO que pode ser de se interesse, está em oferta!\n\nVerifique sua lista de desejos da Choppu e aproveite o desconto de 25% com frete grátis em todo País!\n\nhttps://Choppu.com.br`,
  address: adresses.choppu,
  class: SPAM,
  name: "Compras Choppu",
  picture: "picture_choppu",
};

export const mailGenSpam2: EmailData = {
  text: `Seu amigo Ciclano e outras 32 pessoas reagiram a foto de AnimesIrados no PineappleBook.\nVeja agora!\n\nhttps://pineapplebook.com`,
  address: adresses.pineappleBook,
  class: SPAM,
  name: "PineappleBook",
  picture: "picture_pbook",
};

export const mailGenSpam3: EmailData = {
  text: `Curta CatMusic Premium por 2 meses de graça!\n\nOuça suas playlists com o plano Premium por 2 meses sem pagar nada e aproveite.\n\nApós o periodo de teste, será cobrado o valor de R$ 1,99/mês.\n\nAssine já!`,
  address: "marketing@catmusic.com",
  class: SPAM,
  name: "CatMusic",
  picture: "picture_catmusic",
};

export const mailGenSpam4: EmailData = {
  text: `PARABÉNS!!!\n\nVocê foi selecionado para RECEBER um cupom de até 90% de DESCONTO em nossos produtos incríveis!\nMas é SÓ HOJE! Clique e aproveite:\n\nhttp://superofertaspromocao.biz/premio\n\nNão perca tempo! Essa é sua chance de mudar de vida!\nEquipe Promoções Imperdíveis`,
  address: "promocoes@shop.com",
  class: SPAM,
  name: "Loja de coisas",
  picture: "picture_default_3",
  anomalyParagraphs: [1, 2, 3],
};

// SAFE

export const mailSafeGrandma1: EmailData = {
  text: `Bom dia!\n\nQue esta manhã traga leveza ao seu coração e energia renovada para começar o dia com esperança e tranquilidade. Cada novo amanhecer é uma oportunidade de seguir em frente, ajustar os passos e encontrar motivos para sorrir, mesmo nas pequenas coisas.\n\nDesejo que o seu dia seja repleto de boas notícias, gentilezas inesperadas e momentos agradáveis. Que você consiga lidar com qualquer desafio com calma e sabedoria, lembrando sempre de cuidar de si e valorizar quem está ao seu redor.\n\nQue o dia seja produtivo, sereno e cheio de boas vibrações.\nCom carinho, desejo a você e à sua família um ótimo dia!`,
  address: adresses.grandma,
  class: SAFE,
  name: "Maria Aparecida",
  picture: "picture_grandma",
};

export const mailSafeGrandma2: EmailData = {
  text: `Bom dia!\n\nQue seu dia comece com pensamentos positivos e aquela sensação gostosa de que algo bom pode acontecer a qualquer momento. Aproveite esta nova manhã para respirar fundo, organizar a mente e seguir em frente com leveza.\n\nQue cada tarefa seja realizada com tranquilidade e cada encontro traga um pouco de alegria. Que você encontre motivos simples para sorrir e tenha forças para lidar com o que for necessário, sempre com calma e paciência.\n\nDesejo a você e a todos que ama um dia harmonioso, produtivo e cheio de momentos especiais.`,
  address: adresses.grandma,
  class: SAFE,
  name: "Maria Aparecida",
  picture: "picture_grandma",
};

export const mailSafeGrandma3: EmailData = {
  text: `Bom dia!\n\nQue esta manhã abra as portas para novas oportunidades e lhe traga motivação para realizar tudo o que precisa. A cada novo dia, renovamos também nossa capacidade de recomeçar, ajustar rotas e descobrir novas formas de ver a vida.\n\nQue hoje você receba boas mensagens, tenha conversas agradáveis e encontre pequenas alegrias no meio da rotina. Que o dia seja leve, cheio de calma e permeado por boas vibrações.\n\nDesejo a você um dia iluminado, inspirador e muito agradável!`,
  address: adresses.grandma,
  class: SAFE,
  name: "Maria Aparecida",
  picture: "picture_grandma",
};

export const mailMalGrandma1: EmailData = {
  text: `Bom dia, querido(a)!\n\nPassei para te desejar uma manhã cheia de luz, paz e muitas coisas boas. E olha, dizem que quando a gente começa o dia com o coração aberto e uma energia positiva, tudo flui melhor.\n\nPor isso, resolvi compartilhar algo especial que recebi: um pequeno “ritual de gratidão” que promete atrair bons sentimentos para o resto do dia.\n\nSe você quiser que seu dia seja cheio de gratidão, alegria e boas surpresas, é só entrar neste link aqui:\n\nhttp://energia-positiva.gratidao-matinal.com\n\nÉ rapidinho e, segundo a mensagem que recebi, ajuda a renovar as vibrações da manhã.\n\nDesejo que seu dia seja maravilhoso. Depois me conta se sentiu a diferença!`,
  address: adresses.grandma,
  class: MALICIOUS,
  name: "Maria Aparecida",
  picture: "picture_grandma",
  anomalyParagraphs: [4],
};

export const nonTutorials: EmailData[] = [
  mailClassMal1,
  mailClassMal2,
  mailClassMal3,
  mailElementsMal1,
  mailElementsMal2,
  mailElementsSafe1,
  mailGenSpam1,
  mailGenSpam2,
  mailGenSpam3,
  mailGenMal1,
];
