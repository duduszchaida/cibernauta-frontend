import type { Level } from "../LevelSelectionScene/Level";
import GameObject from "../../Elements/GameObject";
import Scene from "../Scene";
import ButtonPannel from "./ButtonPannel";
import Timer from "../../Elements/Timer";
import { PauseButton } from "../../Elements/PauseBtn";
import Position from "../../Position";
import { LEVELSELECTION } from "../SceneReferences";
import { ExitButton } from "../../Elements/ExitButton";
import { Utils } from "../../Utils";
import { mailTutorialControls } from "./EmailList";
import { MALICIOUS, SAFE, SPAM, type EmailData } from "./EmailData";
import { PICTURE } from "./EmailPicture";
import { ADDRESS, NAME } from "./EmailTextElement";
import EmailInterface from "./EmailInterface";
import type { Evaluation } from "./Evaluation";
import { NOTEPAD } from "./Notepad";

export const CLASSEMAIL = "classEmail"; // Referência de ação de classificar um email
export const OPENNOTEPAD = "openNotepad"; // Referência de ação de abrir o caderno

// Borda genêrica da cena de emails
const emailBorder = new GameObject({
  spriteName: "email_border",
  width: 352,
  height: 256,
  ignoreClick: true,
});

// Imagem usada para cobrir o sprite de seleção de parágrafo
const selectCover = new GameObject({
  height: 256,
  width: 352,
  spriteName: "email_selection_cover",
  ignoreClick: true,
});

// Elemento da tela de pause da cena de emails
class PauseScreen extends GameObject {
  constructor() {
    super({
      height: 256,
      width: 352,
      ignoreClick: true,
      spriteName: "pause_screen",
    });
  }
}

// Função para gerar os botões do painel de botões
function makeButton(
  btn: typeof SAFE | typeof MALICIOUS | typeof SPAM | typeof NOTEPAD,
) {
  switch (btn) {
    case SAFE:
      return new GameObject({
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_safe",
        clickFunction: () => {
          return { type: CLASSEMAIL, class: SAFE };
        },
      });
    case MALICIOUS:
      return new GameObject({
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_malicious",
        clickFunction: () => {
          return { type: CLASSEMAIL, class: MALICIOUS };
        },
      });
    case SPAM:
      return new GameObject({
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_spam",
        clickFunction: () => {
          return { type: CLASSEMAIL, class: SPAM };
        },
      });
    case NOTEPAD:
      return new GameObject({
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_notepad",
        clickFunction: () => {
          return { type: OPENNOTEPAD };
        },
      });
  }
}

// Cena de classificar emails
export default class EmailScene extends Scene {
  emailInterface: EmailInterface = new EmailInterface(mailTutorialControls); // Interface de emails
  emailDataList: EmailData[] = []; // Lista de dados dos emails
  buttonPannel!: ButtonPannel; // Painel de botões
  toolButtons: GameObject[] = []; // Lista dos objetos dos botões usados no painel de botões
  timer: Timer; // Timer do limíte de tempo para classificar emails

  paused: boolean = false; // Indica se o jogo está pausado
  pausedObjectList: GameObject[]; // Lista de objetos para substituir quando estiver pausado
  unpausedObjectList: GameObject[]; // Lista para guardar os objetos para retornar do pause
  pauseButton = new PauseButton(); // Objeto de botão de pause da cena

  level: Level; // Nível atual
  evaluations: { evaluation: Evaluation; emailData: EmailData }[] = []; // Lisa de avaliações dos emails do nível

  constructor(level: Level) {
    super({
      backgroundSpriteName: "bg_beige",
      gameObjects: [],
    });
    this.level = level;
    this.emailDataList = [...level.emailDataList];
    this.timer = new Timer({
      goalSecs: level.secondsTimer,
      pos: new Position(293, 4),
      goalFunc: () => {},
    });
    this.unpausedObjectList = [];
    this.pausedObjectList = [
      new PauseScreen(),
      emailBorder,
      new ExitButton(LEVELSELECTION),
      this.pauseButton,
      this.timer,
    ];
    this.buttonPannel = new ButtonPannel();
    this.generateToolButtons();
    this.nextEmail(true);
  }

  /**
   * Para cada referência de botão na lista de botões do nível,
   * o botão correspondente é gerado e adicionado à lista de botões usados no painel
   */
  generateToolButtons() {
    this.level.buttons.forEach((btn) => {
      switch (btn) {
        case SAFE:
          this.toolButtons.push(makeButton(SAFE));
          break;
        case MALICIOUS:
          this.toolButtons.push(makeButton(MALICIOUS));
          break;
        case SPAM:
          this.toolButtons.push(makeButton(SPAM));
          break;
      }
    });
    this.toolButtons.forEach((b, i) => {
      b.pos.y = 222;
      b.pos.x = 42 + 32 * i;
    });
  }

  /**
   * Atualiza a interface de emails comum dado EmailData, ou um aleatório da emailDataList
   * e atualiza a lista de objetos da cena
   * @param emailData
   */
  generateEmail(emailData?: EmailData) {
    this.gameObjects = [];
    if (!emailData) {
      let randId = Utils.randomArrayId(this.emailDataList);
      emailData = this.emailDataList[randId];
      this.emailDataList.splice(randId, 1);
    }
    this.emailInterface.newData(emailData);

    this.switchToolBar();
    this.gameObjects = [
      ...this.gameObjects,
      this.emailInterface.emailContent,
      selectCover,
      this.emailInterface[PICTURE],
      this.emailInterface[NAME],
      this.emailInterface[ADDRESS],
    ];
    if (this.emailInterface.scrollBar) {
      this.gameObjects.push(this.emailInterface.scrollBar);
    }
    this.gameObjects = [
      ...this.gameObjects,
      this.buttonPannel,
      ...this.toolButtons,
      emailBorder,
      new ExitButton(LEVELSELECTION),
      this.pauseButton,
      this.timer,
    ];
  }

  /**
   * Gera um email, usando o email inicial do nível se for o primeiro email gerado,
   * e inicia o timer se não for o primeiro email
   * @param first
   */
  nextEmail(first: boolean = false) {
    this.generateEmail(first ? this.level.starterEmail : undefined);
    if (!this.timer.started && !first) {
      this.timer.start();
    }
  }

  /**
   * Abre/fecha o painel de botões e ajusta a invisibilidade dos botões
   */
  switchToolBar() {
    this.buttonPannel.open = !this.buttonPannel.open;
    this.toolButtons.forEach((b) => {
      b.invisible = !this.buttonPannel?.open;
    });
  }

  /**
   * Adiciona à lista de avaliações a avaliação do email e os dados do email atual
   * @param classification
   */
  evaluateEmail(classification: typeof SAFE | typeof MALICIOUS | typeof SPAM) {
    this.evaluations.push({
      evaluation: this.emailInterface.evaluate(classification),
      emailData: this.emailInterface.emailData,
    });
  }

  /**
   * Altera o estado de pause da cena e do botão de pause,
   * e faz as substituções dos objetos da cena com os objetos para o estado de pause
   */
  pause() {
    this.paused = !this.paused;
    this.pauseButton.paused = !this.pauseButton.paused;
    if (this.paused) {
      this.unpausedObjectList = [...this.gameObjects];
      this.gameObjects = [...this.pausedObjectList];
    } else {
      this.gameObjects = [...this.unpausedObjectList];
    }
  }
}
