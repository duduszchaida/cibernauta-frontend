import { appBorder } from "../Elements/AppBorder";
import { exitButton } from "../Elements/ExitBtn";
import GameObject from "../Elements/GameObject";
import ScrollBar from "../Elements/ScrollBar";
import TextObject from "../Elements/TextObject";
import Timer from "../Elements/Timer";
import Email, { PICTURE, type AnomalyList } from "../Elements/Email";
import fontMaps from "../FontMaps";2
import Position from "../Position";
import Scene from "./Scene";
import EmailComponent from "../Elements/EmailComponent";

export default class EmailScene extends Scene {
  scrollBar: ScrollBar;
  email: Email;
  selectedAnomalies: AnomalyList = {};
  timer = new Timer({goalSecs: 300, pos: new Position(292, 5)});

  constructor(email?: Email) {
    super({
      backgroundSpriteName: "bg_beige",
      gameObjects: [appBorder, exitButton],
    });
    this.gameObjects.push(this.timer)
    if (!email) {
      this.email = new Email({
        text: `Se você ainda faz SEO como era feito em 2014, provavelmente você está, nesse momento, desesperado com a queda de tráfego do seu blog.\n\nA chegada do AI Mode no Google é, sem dúvidas, a maior mudança da SERP desde a atualização Panda.\n\nQuem tem blog "velho" tá aí sofrendo. Aqueles milhares de blog-posts com assuntos longtail super difíceis de dar manutenção e manter relevantes.\n\nFora que a empresa evoluiu, cresceu, as estratégias de marketing também mudaram e, ao mesmo tempo, um monte de banners, ctas, materiais ou estão ultrapassados ou até mesmo com link quebrado espalhados por todos os milhares e milhares de conteúdos.\n\nO custo de manutenção subindo e o orçamento diminuindo, afinal o tráfego está caindo, não apenas pelos desafios que comentei, mas também porque as pessoas estão clicando cada vez menos, com o efeito do que chamamos, desde 2017, de zero-click.\n\nUma soma de fatores está chacoalhando a indústria.\n\nAinda temos o aumento dos muros dos jardins fechados, que também contribui para a diminuição de tráfego nos sites e blogs. Até porque nenhuma rede social quer que o usuário saia para um link externo. Por isso que, quando você cola um link num post, tipo esse, a tendência é que seu alcance seja menor.\n\nAutoridade de domínio também já não é mais tão importante quanto antes. O que vale mesmo são recomendações, boas, de especialistas ao seu negócio. Vale mais um especialista que um blog sem cara, sem face, sem assinatura de um... humano (mesmo que o conteúdo não seja lá tão humano assim).\n\nO SEO ainda funciona. Até porque as LLMs usam, e muito, o bom e velho SEO para estruturar suas respostas.\n\nO difícil desafio está, dentre outras coisas, fazer esse básico aqui:\n\n-- Se livrar de conteúdos velhos e que não tem nada a ver com a marca/estratégia atual;\n\n-- Atualizar muito bem, artesanalmente os conteúdos principais e que se relacionam diretamente com o núcleo duro do negócio;\n\n-- Marcar presença nos "jardins fechados", demonstrando conhecimento e reconhecimento como especialista no assunto central tratado no blog;\n\n-- Cultivar uma boa lista de emails para levar visitantes para o blog e mantendo a relevância estratégica de alguns conteúdos;\n\n-- Corrigir links quebrados, de parceiros que nem existem mais, de materiais que você também não usa fazem séculos;\n\n-- Buscar, mais que backlinks, citações de qualidade por especialistas e parceiros da sua indústria nos chamados "jardins fechados" como Reddit, Instagram, X, LinkedIn e assim por diante.\n\nVocê também precisa atualizar seus conteúdos com algumas coisas básicas, como:\n\n-- Resumo do conteúdo logo no início;\n\n-- Bulletpoints com os principais assuntos do artigo;\n\n-- Um pequeno FAQ ao final, complementando o tema.\n\nHá mais ajustes, mas esses já serão bem recebidos pelas LLMs e a probabilidade de começar a aparecer mais por lá aumenta.\n\nÉ uma longa conversa. De todo modo, esse é um pontapé inicial, pra quem estava se sentindo perdido em meio a tantas mudanças.\n\nMatt\n\nPS: Caso você não queira mais receber emails como esse, basta se descadastrar aqui.`,
        address: "someaddress@.mail.zig",
        name: "Ricardo",
        picture: "default_picture_0",
        anomalies: {}
      });
      this.timer.start();
    } else {
      this.email = email;
    }

    const emailContent = this.email.emailContent;
    const picture = new EmailComponent({
      pos: new Position(8, 8),
      spriteName: this.email.picture,
      height: 32,
      width: 32,
      anomaly: true,
      reference: PICTURE
    });

    const senderName = new TextObject({
      pos: new Position(42, 10),
      font: "wcp",
      color: "brown",
      text: this.email.senderName,
    });
    const address = new TextObject({
      pos: new Position(44 + senderName.width, 13),
      font: "minecraftia",
      color: "light_brown",
      text: "<" + this.email.senderAddress + ">",
    });

    const recepient = new TextObject({
      pos: new Position(42, 28),
      font: "minecraftia",
      color: "black",
      text: "Para: Você",
    });

    const scrollSlot = new GameObject({
      width: 352,
      height: 256,
      spriteName: "scroll_slot",
    });

    this.scrollBar = new ScrollBar(
      emailContent.lines.length,
      fontMaps.minecraftia.cellHeight,
      emailContent.scrollShiftAmmount,
    );

    this.gameObjects.push(emailContent);
    this.gameObjects.push(picture);
    this.gameObjects.push(senderName);
    this.gameObjects.push(address);
    this.gameObjects.push(recepient);
    this.gameObjects.push(scrollSlot);
    this.gameObjects.push(this.scrollBar);
  }

  scrollEmail(scroll: number) {
    this.email.emailContent.scroll(scroll);
    this.scrollBar.scroll(scroll);
  }

  scrollEmailTo(scroll: number) {
    this.email.emailContent.scrollTo(scroll);
    this.scrollBar.scrollTo(scroll);
  }
  
  newEmail(email: Email){
    this.email = email;
    this.selectedAnomalies = {};
  }

  selectAnomaly(reference: string){
    this.selectedAnomalies[reference] = !this.selectedAnomalies[reference];
    console.log(reference + " marked as " + (this.selectedAnomalies[reference] ? "" : "not ") + "an anomaly")
  }

  compareAnomalies(): AnomalyList{
    if (!this.email){
      alert('No email');
      return {};
    }
    const result: AnomalyList = {}
    for(const a in this.selectedAnomalies){
      result[a] = this.selectedAnomalies[a] == this.email.anomalies[a];
    }
    return result;
  }

}
