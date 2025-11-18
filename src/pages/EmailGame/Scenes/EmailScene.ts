import { exitButton } from "../Elements/ExitBtn";
import GameObject from "../Elements/GameObject";
import ScrollBar from "../Elements/ScrollBar";
import Timer from "../Elements/Timer";
import Email, {
  ADDRESS,
  NAME,
  PICTURE,
  type AnomalyList,
} from "../Elements/Email";
import Position from "../Position";
import Scene from "./Scene";
import EmailComponent from "../Elements/EmailComponent";
import Toolbar from "../Elements/Toolbar";
import EmailTextComponent from "../Elements/EmailTextComponent";
import TextObject from "../Elements/TextObject";

const emailBorder = new GameObject({
  spriteName: "email_border",
  width: 352,
  height: 256,
});

export const EMAILCLASSIFICATION = "emailclassification";
export const SAFE = "safe";

const safeBtn = new GameObject({
  height: 24,
  width: 24,
  invisible: true,
  spriteName: "btn_safe",
  clickFunction: () => {
    return { type: EMAILCLASSIFICATION, class: SAFE };
  },
});

const maliciousBtn = new GameObject({
  height: 24,
  width: 24,
  invisible: true,
  spriteName: "btn_malicious",
  clickFunction: () => {
    return { type: EMAILCLASSIFICATION, class: SAFE };
  },
});

const spamBtn = new GameObject({
  height: 24,
  width: 24,
  invisible: true,
  spriteName: "btn_spam",
  clickFunction: () => {
    return { type: EMAILCLASSIFICATION, class: SAFE };
  },
});

export default class EmailScene extends Scene {
  email: Email | null = null;
  scrollBar: ScrollBar | null = null;
  toolBar: Toolbar | null = null;
  timer = new Timer({ goalSecs: 300, pos: new Position(293, 4) });
  toolButtons: GameObject[] = [safeBtn];
  selectedAnomalies: AnomalyList = {};
  [PICTURE]: EmailComponent = new EmailComponent({
    pos: new Position(8, 8),
    height: 32,
    width: 32,
    anomaly: true,
    reference: PICTURE,
  });
  [ADDRESS] = new EmailTextComponent({
    pos: new Position(4, 13),
    font: "minecraftia",
    color: "light_brown",
    text: "<>",
    reference: ADDRESS,
    anomaly: false,
  });
  [NAME] = new EmailTextComponent({
    pos: new Position(42, 10),
    font: "wcp",
    color: "brown",
    text: "name",
    reference: "address",
    anomaly: false,
  });

  constructor(email?: Email, buttonNames?: string[]) {
    super({
      backgroundSpriteName: "bg_beige",
      gameObjects: [emailBorder, exitButton],
    });
    buttonNames = buttonNames ?? ["malicious", "spam"];
    this.generateToolButtons(buttonNames);
    this.gameObjects.push(this.timer);
    this.generateEmail(email);
  }

  generateEmail(email?: Email) {
    if (!email) {
      this.email = new Email({
        text: `Se você ainda faz SEO como era feito em 2014, provavelmente você está, nesse momento, desesperado com a queda de tráfego do seu blog.\n\nA chegada do AI Mode no Google é, sem dúvidas, a maior mudança da SERP desde a atualização Panda.\n\nQuem tem blog "velho" tá aí sofrendo. Aqueles milhares de blog-posts com assuntos longtail super difíceis de dar manutenção e manter relevantes.\n\nFora que a empresa evoluiu, cresceu, as estratégias de marketing também mudaram e, ao mesmo tempo, um monte de banners, ctas, materiais ou estão ultrapassados ou até mesmo com link quebrado espalhados por todos os milhares e milhares de conteúdos.\n\nO custo de manutenção subindo e o orçamento diminuindo, afinal o tráfego está caindo, não apenas pelos desafios que comentei, mas também porque as pessoas estão clicando cada vez menos, com o efeito do que chamamos, desde 2017, de zero-click.\n\nUma soma de fatores está chacoalhando a indústria.\n\nAinda temos o aumento dos muros dos jardins fechados, que também contribui para a diminuição de tráfego nos sites e blogs. Até porque nenhuma rede social quer que o usuário saia para um link externo. Por isso que, quando você cola um link num post, tipo esse, a tendência é que seu alcance seja menor.\n\nHá mais ajustes, mas esses já serão bem recebidos pelas LLMs e a probabilidade de começar a aparecer mais por lá aumenta.\n\nÉ uma longa conversa. De todo modo, esse é um pontapé inicial, pra quem estava se sentindo perdido em meio a tantas mudanças.\n\nMatt\n\nPS: Caso você não queira mais receber emails como esse, basta se descadastrar aqui.`,
        address: "someaddress@.mail.zig",
        name: "Ricardo",
        picture: "default_picture_0",
        anomalies: {},
      });
      this.timer.start();
    } else {
      this.email = email;
    }
    const emailContent = this.email.emailContent;
    this[PICTURE] = new EmailComponent({
      pos: new Position(8, 8),
      spriteName: this.email.picture,
      height: 32,
      width: 32,
      anomaly: true,
      reference: PICTURE,
    });
    this[NAME] = new EmailTextComponent({
      pos: new Position(44, 10),
      font: "wcp",
      color: "brown",
      text: this.email.senderName,
      reference: NAME,
      anomaly: false,
    });
    this[ADDRESS] = new EmailTextComponent({
      pos: new Position(51 + this[NAME].width, 13),
      font: "minecraftia",
      color: "light_brown",
      text: this.email.senderAddress,
      reference: ADDRESS,
      anomaly: false,
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
      emailContent.textHeight,
      emailContent.scrollShiftAmmount,
    );
    this.toolBar = new Toolbar();
    this.gameObjects.push(emailContent);
    this.gameObjects.push(this[PICTURE]);
    this.gameObjects.push(this[NAME]);
    this.gameObjects.push(this[ADDRESS]);
    this.gameObjects.push(recepient);
    this.gameObjects.push(scrollSlot);
    this.gameObjects.push(this.scrollBar);
    this.gameObjects.push(this.toolBar);
    this.toolButtons.forEach((b) => {
      this.gameObjects.push(b);
    });
  }

  scrollEmail(scroll: number) {
    this.email?.emailContent.scroll(scroll);
    this.scrollBar?.scroll(scroll);
  }

  scrollEmailTo(scroll: number) {
    this.email?.emailContent.scrollTo(scroll);
    this.scrollBar?.scrollTo(scroll);
  }

  newEmail(email: Email) {
    this.email = email;
    this.selectedAnomalies = {};
  }

  selectAnomaly(reference: string) {
    if (this[PICTURE].reference == reference) {
      this[PICTURE].selected = !this[PICTURE].selected;
    }
    if (this[ADDRESS].reference == reference) {
      this[ADDRESS].selected = !this[ADDRESS].selected;
    }
    if (this[NAME].reference == reference) {
      this[NAME].selected = !this[NAME].selected;
    }
    this.selectedAnomalies[reference] = !this.selectedAnomalies[reference];
  }

  inspectModeSwitch() {
    if (this.toolBar) {
      this.toolBar.open = !this.toolBar.open;
      this.toolButtons.forEach((b) => {
        b.invisible = !this.toolBar?.open;
      });
    }
  }

  compareAnomalies(): AnomalyList {
    if (!this.email) {
      alert("No email");
      return {};
    }
    const result: AnomalyList = {};
    for (const a in this.selectedAnomalies) {
      result[a] = this.selectedAnomalies[a] == this.email.anomalies[a];
    }
    return result;
  }

  generateToolButtons(buttonNames: string[] | null) {
    if (buttonNames == null) {
      return;
    }
    buttonNames.forEach((n) => {
      switch (n) {
        case "malicious":
          this.toolButtons.push(maliciousBtn);
          break;
        case "spam":
          this.toolButtons.push(spamBtn);
          break;
      }
    });
    this.toolButtons.forEach((b, i) => {
      b.pos.y = 222;
      b.pos.x = 42 + 32 * i;
    });
  }
}
