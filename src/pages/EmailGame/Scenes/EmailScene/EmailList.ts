import { MALICIOUS, SAFE, SPAM, type EmailData } from "./EmailData";

// Lista de endereços de e-mail "oficiais"
export const addresses = {
  grandma: "aparecida48@mail.com",
  cibernauta: "cibernauta@mail.com",
  choppu: "emails@choppu.com",
  fritter: "fritter@frttr.com",
  mail: "mail@mail.com",
  jitjot: "mail@jitjot.com",
  youVideos: "youVideos@mail.com",
  rubloks: "oficial@rubloks.com",
  pineappleBook: "pineapplebook@mail.com",
  roberto: "rferreira@mail.com",
  catMusic: "sales@catmusic.com",
  tecnus: "suporte@tecnus.com",
  zetflix: "zetflix@mail.com",
};

// Lista de endereços de nomes "oficiais"
export const names = {
  grandma: "Maria Aparecida",
  cibernauta: "Equipe Cibernauta",
  choppu: "Compras Choppu",
  pineappleBook: "PineappleBook",
  fritter: "Fritter",
  mail: "Mail Emails",
  catMusic: "CatMusic",
  roberto: "Roberto Ferreira",
  rubloks: "Rubloks",
  tecnus: "Tecnus Suporte",
  jitjot: "JitJot",
  youVideos: "YouVideos",
  zetflix: "Zetflix Ent",
};

// Lista de endereços de imagens
const pictures = {
  cibernauta: "picture_cibernauta",
  choppu: "picture_choppu",
  pineappleBook: "picture_pbook",
  fritter: "picture_fritter",
  mail: "picture_mail",
  grandma: "picture_grandma",
  catMusic: "picture_catmusic",
  rubloks: "picture_rubloks",
  tecnus: "picture_tecnus",
  roberto: "picture_default_2",
  gov: "picture_brasil",
  jitjot: "picture_jitjot",
  youVideos: "picture_youvideos",
  zetflix: "picture_zetflix",
};

// Lista de export de todos os e-mails do jogo

export const mailsafeSubscription: EmailData = {
  text: `Olá SeuNome,\nEstamos confirmando sua inscrição no workshop "Boas Práticas de Segurança Digital", que ocorrerá no dia 12/12 às 14h.\nVocê pode acessar todos os materiais e informações no link do nosso site oficial:\n\nhttps://empresa-segura.com.br/workshop\n\nSe tiver qualquer dúvida, responda por este mesmo e-mail.\n\nAtenciosamente,\nEquipe Empresa Segura`,
  address: "empresasegura@mail.zig",
  class: SAFE,
  name: "Emprura",
  picture: "picture_default_1",
};

// Controls Level

export const mailTutorialControls: EmailData = {
  text: `Olá! E bem vind@ ao treinamento de identificação de e-mails da equipe Cibernauta.\n\nDaqui em diante, você irá aprender como identificar e-mails seguros, maliciosos e spam em todas as suas formas.\n\nMas antes de começar, vamos dar uma olhada nos controles que temos aqui.\n\nNa parte lateral da direita, mais ou menos por aqui -->\nTemos a barra de scroll, se clicar nela ou arrasta-la pode mover o conteúdo do e-mail para cima e para baixo.\n\nNão ache estranho se ela às vezes não estiver presente, ela só aparece quando um e-mail é comprido o suficiente para precisar dela.\n\nAlém dela também temos seu painel de botões, para abrir ele basta clicar no botão com a seta no canto esquerdo.\n\nNo painel você tem acesso a o que é preciso para classificar um e-mail.\nPor enquanto só temos os botões de SEGURO (verde e redondo) e MALICIOSO (quadrado vermelho).\n\nPara prosseguir classifique esse e-mail como SEGURO e vamos seguir em frente.`,
  address: addresses.cibernauta,
  class: SAFE,
  name: names.cibernauta,
  picture: pictures.cibernauta,
};

// Classification

export const mailTutorialClass: EmailData = {
  text: `Agora que tem uma noção básica dos controles, vamos ao que interessa, e-mails.\n\nNesse próximo treino vamos ver uma série de e-mails e é o seu trabalho identificar se eles são SEGUROs ou MALICIOSOs.\n\nMas como fazer isso? Existem várias maneiras, mas por enquanto só para aquecer, vamos começar com algo básico.\n\nEmails de pessoas e empresas desconhecidas ou até suspeitas podem ser maliciosos. Se ver um e-mail de alguém que for desconhecido ou suspeito, marque como MALICIOSO, se for de alguém que conhece como Cibernauta ou Mail, uma das empresas que fornece serviço de e-mail, pode marcar como SEGURO.\n\nUma última coisa, no canto de cima, junto com o botão de pause, tem o cronômetro, esse é o tempo que você terá para classificar quantos e-mails conseguir.\n\nQuando o cronômetro chegar a 0 (ou não houver mais e-mails), você irá para o placar de pontos, onde pode ver quantos erros e acertos cometeu, e sua pontuação final.\n\nEle só começa a contar quando esse e-mail for classificado e seguirá para o próximo, então assim que estiver pronto, marque esse como SEGURO e boa sorte!`,
  address: addresses.cibernauta,
  class: SAFE,
  name: names.cibernauta,
  picture: pictures.cibernauta,
};

export const mailClassMal1: EmailData = {
  text: `Prezado cliente, Sua conta bancária foi SUSPENSA por atividade irregular.\n\nPara evitar o CANCELAMENTO IMEDIATO, acesse o link abaixo e confirme seus dados:\n\nhttp://banco-verificacao-segura123.com/urgente\nSe não confirmar em 1 HORA, sua conta será apagada para sempre.\n\nAtenciosamente, Equipe do Banco.`,
  address: "hackers@mail.com",
  class: MALICIOUS,
  name: "Banco do mal",
  picture: "picture_hacker_2",
};

export const mailClassMal2: EmailData = {
  text: `Olá,\n\nSeu computador está DESATUALIZADO e em risco crítico.\n\nNos envie seu endereço de e-mail e sua senha antes que seja tarde demais.`,
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
  address: addresses.cibernauta,
  class: SAFE,
  name: names.cibernauta,
  picture: pictures.cibernauta,
};

export const mailClassSafe2: EmailData = {
  text: `Alerta de segurança\n\nDetectamos uma tentativa de login na sua Conta. Se não foi você que fez isso, nenhuma ação é necessária. Caso contrário, acesse o link abaixo para fazer uma verificação.\n\nhttps://mail.verif-activity/user?=486350147\n\nAgradecemos sua compreensão.`,
  address: addresses.mail,
  class: SAFE,
  name: names.mail,
  picture: pictures.mail,
};

// Elements

export const mailTutorialElements: EmailData = {
  text: `Agora que passamos por esse aquecimento vamos ver a parte mais crucial do treinamento. Selecionar elementos.\n\nTodo e-mail é composto de elementos, como a foto no canto superior esquerdo, o endereço de onde veio esse e-mail ou até o texto que você está lendo.\n\nAgora, além de classificar os e-mails, você também pode SELECIONAR seus elementos.\n\nQuando estiver com seu painel aberto, seu cursor do mouse vai virar uma seta em diagonal, isso quer dizer que está no modo de seleção.\n\nNo modo de seleção, qualquer elemento do e-mail que você clicar será selecionado como uma ANOMALIA, ou seja, algo que indica que esse e-mail não é SEGURO. Você pode selecionar mais do que um elemento ao mesmo tempo.\n\nPara essa próxima etapa, vamos começar a partir do princípio que qualquer e-mail oferecendo algo de GRAÇA ou pedindo que você faça algo com URGÊNCIA como realizar um pagamento ou entrar em algum link, é malicioso.\n\nSe ver algo do tipo, marque aonde no texto que isso aparece e classifique como MALICIOSO. Se o texto tiver mais frases do tipo em outros lugares não tem problema, você só precisa selecionar uma delas que já conta.\n\nElementos que forem corretamente marcados como ANOMALIAS te darão pontos extras! Mas elementos selecionados incorretamente irão reduzir sua pontuação.\n\nPronto para seguir em frente?`,
  address: addresses.cibernauta,
  class: SAFE,
  name: names.cibernauta,
  picture: pictures.cibernauta,
};

export const mailElementsMal1: EmailData = {
  text: `Prezado cliente,\n\nIdentificamos um pagamento PENDENTE no valor de R$ 247,90.\nPara evitar multa e bloqueio, realize o pagamento no link seguro abaixo:\n\nhttp://cobranca-sistema24h.net/pagar\n\nEste é seu último aviso.\n\nDepartamento de Cobranças`,
  address: "cobrancas@dep.com",
  class: MALICIOUS,
  name: "Equipe de Cobranças",
  picture: "picture_default_6",
  anomalyParagraphs: [1, 3],
};

export const mailElementsMal2: EmailData = {
  text: `Olá Jogador,\n\nDetectamos uma atividade suspeita na sua conta Rubloks e, por segurança, precisamos que você verifique sua identidade imediatamente. Caso contrário, sua conta poderá ser removida permanentemente e todo seu inventário de Ruboks será perdido.\n\nClique no link abaixo para continuar sua verificação:\n\nhttps://rubloks-secure-login.freegift.claim-now.co\n\nApós confirmar seus dados, você receberá 500 Ruboks grátis como forma de agradecimento pela sua cooperação.\n\nObrigado por escolher Rubloks,\nA Equipe Oficial de Segurança Rubloks`,
  address: "rubloks@oficial.com",
  class: MALICIOUS,
  name: "Rubloks Oficial",
  picture: pictures.rubloks,
  anomalyParagraphs: [1, 4],
};

export const mailElementsMal3: EmailData = {
  text: `ATENÇÃO!\n\nSua assinatura PREMIUM vai expirar HOJE. Para manter o acesso, faça a renovação IMEDIATA pelo link abaixo:\n\nhttp://renovacao-conta-premium-now.com/pagamento\n\nSe não renovar agora, sua conta será permanentemente bloqueada.\n\nEquipe PineappleBook`,
  address: "p1neapplebook@mail.com",
  class: MALICIOUS,
  name: names.pineappleBook,
  picture: pictures.pineappleBook,
  anomalyParagraphs: [1, 2, 3],
};

export const mailElementsMal4: EmailData = {
  text: `Olá,\n\nSua NOTA FISCAL está pronta, mas devido a um erro no sistema ela não pode ser enviada como anexo.\nAcesse o documento clicando no link abaixo:\n\nhttp://notafiscal-online-check.com/download\n\nSe você não abrir em até 24h, perderá acesso ao documento.\n\nDepartamento Financeiro`,
  address: "choppu@mail.com",
  class: MALICIOUS,
  name: names.choppu,
  picture: pictures.choppu,
  anomalyParagraphs: [2, 3],
};

export const mailElementsMal5: EmailData = {
  text: `Prezado usuário,\nDetectamos um problema URGENTE em sua conta e precisamos que você confirme seus dados imediatamente para evitar bloqueio permanente.\n\nClique no link abaixo e faça login para manter sua conta ativa:\n\nhttp://seguranca-verificacao-login.com/auth\n\nAtenção: se você não confirmar nas próximas 2 horas, sua conta será removida.\n\nTecnus Suporte`,
  address: "tecnus@mail.com",
  class: MALICIOUS,
  name: "Tecnus",
  picture: pictures.tecnus,
  anomalyParagraphs: [0, 1, 3],
  anomalyAddress: true,
};

export const mailElementsSafe1: EmailData = {
  text: `Olá,\n\nAgradecemos sua compra!\nSua nota fiscal já está disponível no site oficial. Você pode acessá-la pelo link seguro abaixo:\n\nhttps://loja-oficial.com.br/minha-conta/notas\n\nSe tiver qualquer dúvida, estamos à disposição.\n\nAtenciosamente,\nEquipe Loja Oficial`,
  address: addresses.choppu,
  class: SAFE,
  name: names.choppu,
  picture: pictures.choppu,
};

export const mailElementsSafe2: EmailData = {
  text: `Olá!\n\nObrigado por criar uma conta no Fritter. Estamos felizes em ter você aqui!\nPara começar a personalizar sua experiência, recomendamos visitar sua página de configurações:\n\nhttps://fritter.com/configuracoes\n\nLá você pode ajustar notificações, escolher interesses e configurar a segurança da sua conta.\n\nSe precisar de ajuda, basta responder este e-mail ou acessar nossa Central de Suporte.\n\nBem-vindo à conversa!\nEquipe Fritter`,
  address: addresses.fritter,
  class: SAFE,
  name: names.fritter,
  picture: pictures.fritter,
};

export const mailElementsSafe3: EmailData = {
  text: `Escrever alguma dica de uso para o usuário`,
  address: addresses.cibernauta,
  class: SAFE,
  name: names.cibernauta,
  picture: pictures.fritter,
};

// Notepad / Adresses

export const mailTutorialNotepad: EmailData = {
  text: `Olá! Para essa próxima etapa você terá uma nova ferramenta, o caderno de informações! Pode ver que tem um botão novo no painel, ele abrirá o caderno.\n\nNeste caderno, você terá informações importantes para ajudar na sua classificação de e-mails, como o que veremos nesta etapa, endereços de e-mail.\n\nUma coisa importante de saber enquanto estiver na internet, além de que há pessoas com intenções maliciosas, é que elas podem muitas vezes se passar por outras pessoas ou empresas. Uma maneira comum é pelo endereço de e-mail.\n\nCada pessoa e empresa possui seu próprio endereço de e-mail, como o nosso lá encima na esquerda, cibernauta@mail.com, mas como cada um pode escolher o endereço que quiser, muitas pessoas criam endereços parecidos com endereços oficiais.\n\nPor isso é importante quando receber um e-mail de alguma pessoa ou empresa, verificar que o endereço de e-mail é oficial e seguro.\n\nQuando estiver usando a internet, você pode pesquisar quais os endereços de e-mail oficiais de alguma empresa, mas aqui no treinamento eles estarão no caderno.\n\nEm resumo, se ver algum endereço de e-mail que não seja igual aos escritos no caderno, pode marcar ele como uma ANOMALIA, e classifique o e-mail como MALICIOSO.\n\nLembre-se que o que foi ensinado nas etapas anteriores também se aplicam aqui. Agora marque esse e-mail como SEGURO e vamos nessa!`,
  address: addresses.cibernauta,
  class: SAFE,
  name: names.cibernauta,
  picture: pictures.cibernauta,
};

export const mailAddressMal1: EmailData = {
  text: `Parabéns pelo seu progresso no treinamento!\n\nObrigado por estar participando de nossos serviços! Por recompensa de seu esforço você pode ganhar um prêmio acessando o link abaixo:\n\nhttp://cibernauta.premio.com/acesso\n\nMas não demore, o link inspira em 24 horas!`,
  address: "emails@cibernauta.com",
  class: MALICIOUS,
  name: names.cibernauta,
  picture: pictures.cibernauta,
  anomalyAddress: true,
  anomalyParagraphs: [1, 2, 3],
};

export const mailAddressMal2: EmailData = {
  text: `Olá,\nEstamos realizando uma revisão rotineira das configurações de acesso dos usuários.\n\nPara confirmar que tudo está atualizado, você pode revisar suas preferências no link abaixo:\n\nhttps://frttr.app-support.com/verificar\n\nEssa verificação é opcional, mas ajuda a manter sua conta protegida.\n\nAtenciosamente,\nEquipe Fritter`,
  address: "fritter@frtr.com",
  class: MALICIOUS,
  name: names.fritter,
  picture: pictures.fritter,
  anomalyAddress: true,
};

export const mailAddressMal3: EmailData = {
  text: `Olá,\n\nDetectamos atividade suspeita em sua conta Rubloks.\nVocê deve redefinir sua senha agora:\n\nhttp://rubl0ks-verificacao.com/reset\n\nSe não fizer isso, sua conta será suspensa.\n\nEquipe de Segurança Rubloks`,
  address: "rubloks@suporte.com",
  class: MALICIOUS,
  name: "Rubloks",
  picture: pictures.rubloks,
  anomalyAddress: true,
  anomalyParagraphs: [1, 3],
};

export const mailAddressMal4: EmailData = {
  text: `Notamos um acesso recente à sua conta catMusic usando um novo dispositivo.\nCaso tenha sido você, não é necessário fazer nada.\n\nSe desejar revisar a atividade, acesse:\n\nhttps://cattMusic.com.security-check/atividade\n\nSe não reconhecer o acesso, recomendamos atualizar sua senha.\n\nAtenciosamente,\n\nEquipe PineappleBook`,
  address: "catMusic@mail.com",
  class: MALICIOUS,
  name: names.catMusic,
  picture: pictures.catMusic,
  anomalyAddress: true,
};

export const mailAddressMal5: EmailData = {
  text: `Olá,\nDetectamos um erro incomum ao tentar sincronizar sua caixa de entrada do mail.\nPara garantir que você continue recebendo mensagens normalmente, faça a verificação da sua conta imediatamente no link abaixo:\n\nhttp://mail-secure-check.net/validar\n\nApós a validação, sua conta será atualizada automaticamente.\n\nAtenciosamente,\nEquipe mail`,
  address: "email@mail.com",
  class: MALICIOUS,
  name: names.mail,
  picture: pictures.mail,
  anomalyAddress: true,
  anomalyParagraphs: [1],
};

export const mailAddressSafe1: EmailData = {
  text: `Olá,\n\nEstamos ajustando o sistema de notificações do Fritter para deixá-lo mais rápido e estável.\nVocê pode revisar suas preferências aqui:\n\nhttps://fritter.com/notificacoes\n\nSe algo não estiver funcionando como esperado, basta responder este e-mail.\n\nAtenciosamente,\nEquipe Fritter`,
  address: addresses.fritter,
  class: SAFE,
  name: names.fritter,
  picture: pictures.fritter,
};

export const mailAddressSafe2: EmailData = {
  text: `Olá!\n\nLançamos novas ferramentas no Choppu para facilitar sua organização.\nVocê pode conhecer todas as novidades aqui:\n\nhttps://choppu.com/novidades\n\nObrigado por usar nossa plataforma!\n\nEquipe Choppu`,
  address: addresses.choppu,
  class: SAFE,
  name: names.choppu,
  picture: pictures.choppu,
};

export const mailAddressSafe3: EmailData = {
  text: `Olá,\n\nRecebemos seu pedido com sucesso!\nO download do seu álbum já está disponível em sua conta:\n\nhttps://catmusic.com/minha-conta\n\nQualquer dúvida, estamos à disposição.\n\nAtenciosamente,\nEquipe CatMusic`,
  address: addresses.catMusic,
  class: SAFE,
  name: names.catMusic,
  picture: pictures.catMusic,
};

// Contact

export const mailTutorialContact: EmailData = {
  text: `Você está indo muito bem! Vamos agora passar para o próximo passo, identificar SPAM\n\nOs e-mails classificados como SPAM são interessantes, eles nem sempre são MALICIOSOS, o que diferencia eles dos demais é que eles são muitas vezes... desnecessários.\n\nEmails de SPAM são conhecidos por inundar caixas de entrada de e-mails, com propagandas e oferecendo serviços que nem se quer temos interesse.\n\nNo caderno, você verá que há uma nova seção após os endereços conhecidos. "Contatos Autorizados"\n\nQuando estiver navegando pela internet você saberá que seviços você tem ou não interesse e pessoas de quem quer receber menságens, mas para esse treinamento, e-mails de serviços e pessoas que não forem MALICIOSOs mas não estiverem na lista de autorizados, são considerados SPAM.\n\nPara classificar e-mails como SPAM foi adicionado um novo botão ao seu painel, azul com um "!" no centro.\n\nPronto para prosseguir?`,
  address: addresses.cibernauta,
  class: SAFE,
  name: names.cibernauta,
  picture: pictures.cibernauta,
};

export const mailContactSpam1: EmailData = {
  text: `Moletom BenIO que pode ser de se interesse, está em oferta!\n\nVerifique sua lista de desejos da Choppu e aproveite o desconto de 25% com frete grátis em todo País!\n\nhttps://Choppu.com.br`,
  address: addresses.choppu,
  class: SPAM,
  name: names.choppu,
  picture: pictures.choppu,
};

export const mailContactSpam2: EmailData = {
  text: `Cleber e outras 32 pessoas que talvez você conheça reagiram a foto de AnimesIrados no PineappleBook.\nVeja agora!\n\nhttps://pineapplebook.com`,
  address: addresses.pineappleBook,
  class: SPAM,
  name: names.pineappleBook,
  picture: pictures.pineappleBook,
};

export const mailContactSpam3: EmailData = {
  text: `Olá,\n\nUm usuário que você pode conhecer acabou de postar um novo vídeo e achamos que ele combina com o tipo de conteúdo que você costuma assistir.\n\nO vídeo já está recebendo muitas visualizações e comentários, não deixe de conferir antes que ele saia das recomendações! Acesse pelo link abaixo:\n\nwww.videos-recomendados.online/watch\n\nSe quiser receber mais notificações como esta, é só continuar ativo(a) em nossa plataforma.`,
  address: addresses.jitjot,
  class: SPAM,
  name: names.jitjot,
  picture: pictures.jitjot,
};

export const mailContactSpam4: EmailData = {
  text: `Olá,\n\nUm canal que você acompanhou recentemente acabou de publicar um novo vídeo e achamos que ele pode ser do seu interesse. O conteúdo está recebendo bastante atenção e já apareceu entre os mais vistos do dia.\n\nPara assistir agora, utilize o link abaixo:\n\nwww.youvideos-video-recs.net/watch\n\nSe não quiser perder atualizações, continue interagindo com os conteúdos recomendados.`,
  address: addresses.youVideos,
  class: SPAM,
  name: names.youVideos,
  picture: pictures.youVideos,
};

export const mailContactSpam5: EmailData = {
  text: `Olá, fulano!\n\nAqui é a ZetFlix, sua plataforma de entretenimento preferida — sempre trazendo o que está bombando nas telas do Brasil!\n\nConfira abaixo o Top 3 Séries Mais Assistidas da Semana:\n\n- .Documentário Amazonas\n- .Heróis do Ontem\n- 4mor em 8 Bit5\n\nAssine e confira já!`,
  address: addresses.youVideos,
  class: SPAM,
  name: names.youVideos,
  picture: pictures.youVideos,
};

export const mailContactSafe1: EmailData = {
  text: `Curta CatMusic Premium por 2 meses com 70% de desconto!\n\nOuça suas playlists com o plano Premium por 2 meses e aproveite.\n\nApós o periodo de teste, será cobrado o valor de R$ 22,99/mês.\n\nAssine já!`,
  address: addresses.catMusic,
  class: SAFE,
  name: names.catMusic,
  picture: pictures.catMusic,
};

export const mailContactSafe2: EmailData = {
  text: `Olá!\n\nEstamos escrevendo para informar que sua solicitação recente passou para a fase final de revisão. O problema reportado realmente estava ligado a uma configuração incorreta nos nossos servidores, e já realizamos os ajustes necessários.\n\nRealize um novo login e verifique se tudo está funcionando corretamente. Se encontrar qualquer irregularidade, responda este e-mail diretamente e nosso time dará continuidade ao atendimento.\n\nAgradecemos sua paciência durante o processo.\nAtenciosamente, Tecnus Suporte`,
  address: addresses.tecnus,
  class: SAFE,
  name: names.tecnus,
  picture: pictures.tecnus,
};

export const mailContactSafe3: EmailData = {
  text: `Olá,\n\nAgradecemos seu interesse na vaga e o envio do seu currículo. Após analisarmos seu perfil, gostaríamos de convidá-lo(a) para participar da próxima etapa do processo seletivo: uma entrevista individual com nossa equipe de recrutamento.\n\nA entrevista terá duração aproximada de 30 a 45 minutos e será realizada de forma remota. Durante a conversa, abordaremos sua experiência profissional, expectativas para a função e detalhes sobre o projeto e o ambiente de trabalho.\n\nPor favor, responda informando sua disponibilidade para os próximos dias, assim poderemos agendar o melhor horário.\n\nAtenciosamente,\nRoberto Ferreira`,
  address: addresses.roberto,
  class: SAFE,
  name: names.roberto,
  picture: pictures.roberto,
};

export const mailContactMal1: EmailData = {
  text: `PARABÉNS!!!\n\nVocê foi selecionado para RECEBER um cupom de até 90% de DESCONTO em nossos produtos incríveis!\nMas é SÓ HOJE! Clique e aproveite:\n\nhttp://superofertaspromocao.biz/premio\n\nNão perca tempo! Essa é sua chance de mudar de vida!\nEquipe Promoções Imperdíveis`,
  address: "promocoes@chappu.com",
  class: MALICIOUS,
  name: "Lojas Choppu",
  picture: pictures.choppu,
  anomalyAddress: true,
  anomalyParagraphs: [1, 3],
};

export const mailContactMal2: EmailData = {
  text: `Olá,\nIdentificamos uma inconsistência grave associada ao seu perfil. Essa falha pode comprometer seus dados pessoais e resultou na desativação automática de algumas funcionalidades.\n\nA única forma de evitar a perda permanente de informações é restaurar seu acesso por meio da ferramenta de recuperação emergencial. Por motivos de segurança, é necessário que você confirme suas credenciais e reinstale a chave de autenticação usando o link abaixo.\n\nhttp://auth.tecnus.com.br/13547\n\nEntendemos que isso pode causar preocupação, mas o processo é rápido e essencial para proteger seus dados.\n\nSe a restauração não for concluída dentro das próximas 2 horas, a conta será desativada automaticamente.\n\nTecnus\nEquipe de Verificação Emergencial`,
  address: "tecnus.suporte@mail.com",
  class: MALICIOUS,
  name: "Tecnus",
  picture: pictures.tecnus,
  anomalyAddress: true,
  anomalyParagraphs: [1, 4],
};

export const mailContactMal3: EmailData = {
  text: `Curta CatMusic Premium por 2 meses com 70% de desconto!\n\nOuça suas playlists com o plano Premium por 2 meses e aproveite.\n\nApós o periodo de teste, será cobrado o valor de R$ 22,99/mês.\n\nAssine já!`,
  address: "catmusic@sales.com",
  class: MALICIOUS,
  name: names.catMusic,
  picture: pictures.catMusic,
  anomalyAddress: true,
};

export const mailContactMal4: EmailData = {
  text: `Prezado(a) cidadão(ã),\n\nATENÇÃO: Constatamos uma irregularidade grave no seu cadastro junto ao Governo Federal. Caso a situação não seja regularizada imediatamente, seu CPF poderá ser suspenso e você perderá acesso a vários serviços públicos.\n\nPara evitar consequências legais, é OBRIGATÓRIO que você faça a validação do seu cadastro pelo link abaixo:\n\nhttps://governo-federal-validacao-urgente.com.br/atualizar-dados\n(Acesse somente pelo computador. O sistema não funciona em celular.)\n\nO não cumprimento desta solicitação resultará em multa automática e possível restrição do CPF ainda nas próximas 24 horas.\n\nEste é um comunicado oficial. Não ignore.\n\nAtenciosamente,\nDepartamento Nacional de Regularização Cadastral\nGoverno Federal`,
  address: "governo@mail.com",
  class: MALICIOUS,
  name: "Email Governo Oficial",
  picture: pictures.gov,
  anomalyAddress: true,
  anomalyParagraphs: [1, 2, 4, 5],
};

// General

export const mailTutorialTest: EmailData = {
  text: `Esta é uma fase para teste.\n\n:D`,
  address: addresses.cibernauta,
  class: SAFE,
  name: names.cibernauta,
  picture: pictures.cibernauta,
};

// MALICIOUS

export const mailGenMal1: EmailData = {
  text: `Oi,\nEstou tentando falar com você desde cedo, mas não estou conseguindo. Estou viajando e tive um problema com meu cartão. Não tenho acesso à conta e preciso fazer um pagamento urgente.\n\nPor favor, você pode me ajudar transferindo o valor temporariamente? Assim que eu resolver tudo, devolvo imediatamente.\n\nAqui estão os dados para transferência:\nhttp://suporte-financeiro-urgente.com/transferir\n\nPor favor, é realmente importante.\nObrigado.`,
  address: "fernando.nandes@mail.com",
  class: MALICIOUS,
  name: "Fernando Fernandes",
  picture: "picture_default_5",
  anomalyParagraphs: [1, 3],
  anomalyAddress: true,
};

// Grandma

export const mailSafeGrandma1: EmailData = {
  text: `Bom dia!\n\nQue esta manhã traga leveza ao seu coração e energia renovada para começar o dia com esperança e tranquilidade. Cada novo amanhecer é uma oportunidade de seguir em frente, ajustar os passos e encontrar motivos para sorrir, mesmo nas pequenas coisas.\n\nDesejo que o seu dia seja repleto de boas notícias, gentilezas inesperadas e momentos agradáveis. Que você consiga lidar com qualquer desafio com calma e sabedoria, lembrando sempre de cuidar de si e valorizar quem está ao seu redor.\n\nQue o dia seja produtivo, sereno e cheio de boas vibrações.\nCom carinho, desejo a você e à sua família um ótimo dia!`,
  address: addresses.grandma,
  class: SAFE,
  name: names.grandma,
  picture: "picture_grandma",
};

export const mailSafeGrandma2: EmailData = {
  text: `Bom dia!\n\nQue seu dia comece com pensamentos positivos e aquela sensação gostosa de que algo bom pode acontecer a qualquer momento. Aproveite esta nova manhã para respirar fundo, organizar a mente e seguir em frente com leveza.\n\nQue cada tarefa seja realizada com tranquilidade e cada encontro traga um pouco de alegria. Que você encontre motivos simples para sorrir e tenha forças para lidar com o que for necessário, sempre com calma e paciência.\n\nDesejo a você e a todos que ama um dia harmonioso, produtivo e cheio de momentos especiais.`,
  address: addresses.grandma,
  class: SAFE,
  name: names.grandma,
  picture: "picture_grandma",
};

export const mailSafeGrandma3: EmailData = {
  text: `Bom dia!\n\nQue esta manhã abra as portas para novas oportunidades e lhe traga motivação para realizar tudo o que precisa. A cada novo dia, renovamos também nossa capacidade de recomeçar, ajustar rotas e descobrir novas formas de ver a vida.\n\nQue hoje você receba boas mensagens, tenha conversas agradáveis e encontre pequenas alegrias no meio da rotina. Que o dia seja leve, cheio de calma e permeado por boas vibrações.\n\nDesejo a você um dia iluminado, inspirador e muito agradável!`,
  address: addresses.grandma,
  class: SAFE,
  name: names.grandma,
  picture: "picture_grandma",
};

export const mailMalGrandma1: EmailData = {
  text: `Bom dia, querido(a)!\n\nPassei para te desejar uma manhã cheia de luz, paz e muitas coisas boas. E olha, dizem que quando a gente começa o dia com o coração aberto e uma energia positiva, tudo flui melhor.\n\nPor isso, resolvi compartilhar algo especial que recebi: um pequeno “ritual de gratidão” que promete atrair bons sentimentos para o resto do dia.\n\nSe você quiser que seu dia seja cheio de gratidão, alegria e boas surpresas, é só entrar neste link aqui:\n\nhttp://energia-positiva.gratidao-matinal.com\n\nÉ rapidinho e, segundo a mensagem que recebi, ajuda a renovar as vibrações da manhã.\n\nDesejo que seu dia seja maravilhoso. Depois me conta se sentiu a diferença!`,
  address: addresses.grandma,
  class: MALICIOUS,
  name: names.grandma,
  picture: "picture_grandma",
  anomalyParagraphs: [4],
};
