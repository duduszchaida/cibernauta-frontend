import { MALICIOUS, SAFE, SPAM, type EmailData } from "./EmailScene/Email";

export const EmailList: Record<string, EmailData[]> = {
  testing: [
    {
      text: `PARABÉNS!!!\n\nVocê foi selecionado para RECEBER um cupom de até 90% de DESCONTO em nossos produtos incríveis!\nMas é SÓ HOJE! Clique e aproveite:\n\nhttp://superofertaspromocao.biz/premio\n\nNão perca tempo! Essa é sua chance de mudar de vida!\nEquipe Promoções Imperdíveis`,
      address: "promocoes@shop.com",
      class: SPAM,
      name: "Loja de coisas",
      picture: "default_picture_3",
      anomalyParagraphs: [1, 2, 3],
    },
    {
      text: `Prezado usuário,\nDetectamos um problema URGENTE em sua conta e precisamos que você confirme seus dados imediatamente para evitar bloqueio permanente.\n\nClique no link abaixo e faça login para manter sua conta ativa:\n\nhttp://seguranca-verificacao-login.com/auth\n\nAtenção: se você não confirmar nas próximas 2 horas, sua conta será removida.\n\nSuporte Técnico`,
      address: "tecnicus@zap.com",
      class: MALICIOUS,
      name: "Suporte de tecnocidade",
      picture: "default_picture_2",
      anomalyParagraphs: [0, 1, 2, 3],
    },
    {
      text: `Se você ainda faz SEO como era feito em 2014, provavelmente você está, nesse momento, desesperado com a queda de tráfego do seu blog.\n\nA chegada do AI Mode no Google é, sem dúvidas, a maior mudança da SERP desde a atualização Panda.\n\nQuem tem blog "velho" tá aí sofrendo. Aqueles milhares de blog-posts com assuntos longtail super difíceis de dar manutenção e manter relevantes.\n\nFora que a empresa evoluiu, cresceu, as estratégias de marketing também mudaram e, ao mesmo tempo, um monte de banners, ctas, materiais ou estão ultrapassados ou até mesmo com link quebrado espalhados por todos os milhares e milhares de conteúdos.\n\nO custo de manutenção subindo e o orçamento diminuindo, afinal o tráfego está caindo, não apenas pelos desafios que comentei, mas também porque as pessoas estão clicando cada vez menos, com o efeito do que chamamos, desde 2017, de zero-click.\n\nUma soma de fatores está chacoalhando a indústria.\n\nAinda temos o aumento dos muros dos jardins fechados, que também contribui para a diminuição de tráfego nos sites e blogs. Até porque nenhuma rede social quer que o usuário saia para um link externo. Por isso que, quando você cola um link num post, tipo esse, a tendência é que seu alcance seja menor.\n\nHá mais ajustes, mas esses já serão bem recebidos pelas LLMs e a probabilidade de começar a aparecer mais por lá aumenta.\n\nÉ uma longa conversa. De todo modo, esse é um pontapé inicial, pra quem estava se sentindo perdido em meio a tantas mudanças.\n\nMatt\n\nPS: Caso você não queira mais receber emails como esse, basta se descadastrar aqui.`,
      address: "endereçoAnomalia@.mail.zig",
      class: SPAM,
      name: "Ricardo",
      picture: "default_picture_0",
      anomalyAddress: true,
      anomalyParagraphs: [3, 1, 7],
    },
    {
      text: `Olá SeuNome,\nEstamos confirmando sua inscrição no workshop "Boas Práticas de Segurança Digital", que ocorrerá no dia 12/12 às 14h.\nVocê pode acessar todos os materiais e informações no link do nosso site oficial:\n\nhttps://empresa-segura.com.br/workshop\n\nSe tiver qualquer dúvida, responda por este mesmo email.\n\nAtenciosamente,\nEquipe Empresa Segura`,
      address: "empresasegura@mail.zig",
      class: SAFE,
      name: "Emprura",
      picture: "default_picture_1",
    },
  ],
};
