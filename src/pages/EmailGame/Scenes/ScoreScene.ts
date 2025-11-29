import { appBorder } from "../Elements/AppBorder";
import { ExitButton } from "../Elements/ExitButton";
import GameObject from "../Elements/GameObject";
import TextObject from "../Elements/TextObject";
import Timer from "../Elements/Timer";
import type GameState from "../GameState";
import Position from "../Position";
import { Utils } from "../Utils";
import { CONTENT } from "./EmailScene/EmailContent";
import type { EmailData } from "./EmailScene/EmailData";
import { PICTURE } from "./EmailScene/EmailPicture";
import { ADDRESS, NAME } from "./EmailScene/EmailTextElement";
import type { Evaluation } from "./EmailScene/Evaluation";
import type { Level } from "./LevelSelectionScene/Level";
import Scene from "./Scene";
import { LEVELSELECTION } from "./SceneReferences";

const classRightPoints = 200; // Valor em pontos para cada email classificado corretamente
const classWrongPoints = -100; // Valor em pontos para cada email classificado incorretamente
const elementRightPoints = 50; // Valor em pontos para cada elemento selecionado corretamente
const elementWrongPoints = -25; // Valor em pontos para cada elemento selecionado incorretamente

// Cena de cálculo da pontuação das avaliações do jogador
export class ScoreScene extends Scene {
  evaluations: { evaluation: Evaluation; emailData: EmailData }[]; // Lista de avaliações
  gameState: GameState; // Estado do jogo
  level: Level; // Nível atual

  classRight: number = 0; // Contador de classificações corretas
  classWrong: number = 0; // Contador de classificações incorretas
  elementRight: number = 0; // Contador de seleções de elemento corretas
  elementWrong: number = 0; // Contador de seleções de elemento incorretas
  totalScore: number = 0; // Soma dos pontos

  scoreObjects: GameObject[] = []; // Lista de objetos de pontuação
  scoreObjectId: number = 0; // Id do objeto de pontuação atual
  timer: Timer; // Timer para aparecer os objetos de pontação com um espaço de tempo

  constructor(
    evaluations: { evaluation: Evaluation; emailData: EmailData }[],
    level: Level,
    gameState: GameState,
  ) {
    console.log(evaluations);
    super({ backgroundSpriteName: "bg_score", gameObjects: [] });
    this.evaluations = evaluations;
    this.gameState = gameState;
    this.level = level;
    this.calcPoints();
    this.generateObjects();
    this.timer = new Timer({
      goalSecs: 0.75,
      goalFunc: () => {
        if (this.scoreObjects[this.scoreObjectId]) {
          this.scoreObjects[this.scoreObjectId].invisible = false;
        }
        this.scoreObjectId++;
      },
      loop: true,
      loopMax: 6,
    });
    this.timer.start();
    this.gameState.saveGame();
  }

  /**
   * Calcula os pontos, salva um novo recorde de pontos na fase e atualiza o recorde de pontos do salvamento do jogo
   */
  calcPoints() {
    this.evaluations.forEach((x) => {
      let e = x.evaluation;
      if (e.class) {
        this.classRight++;
      } else {
        this.classWrong++;
      }
      const keys: (keyof Evaluation)[] = [ADDRESS, PICTURE, NAME, CONTENT];
      keys.forEach((k) => {
        if (e[k]) {
          this.elementRight++;
        } else if (e[k] === false) {
          this.elementWrong++;
        }
      });
    });

    this.totalScore =
      this.classRight * classRightPoints +
      this.classWrong * classWrongPoints +
      this.elementRight * elementRightPoints +
      this.elementWrong * elementWrongPoints;

    let levelHs =
      this.gameState.currentSave.levelProgressRecord[this.level.reference]
        ?.highscore ?? 0;
    if (this.totalScore >= this.level.goal) {
      this.gameState.currentSave.levelProgressRecord[this.level.reference] = {
        reference: this.level.reference,
        highscore: Math.max(this.totalScore, levelHs),
        perfect:
          this.gameState.currentSave.levelProgressRecord[this.level.reference]
            ?.perfect || this.classWrong + this.elementWrong == 0,
      };
      this.gameState.updateHighscore();
    }
  }

  /**
   * Gera os objetos da cena
   */
  generateObjects() {
    const classRightText = new TextObject({
      pos: new Position(336, 54 + 28 * 0),
      color: this.classRight > 0 ? "lime" : "brown",
      font: "wcp",
      direction: "left",
      invisible: true,
      text:
        "Classificações Corretas: " +
        Utils.numberFormat(this.classRight, 2) +
        " = +" +
        Utils.numberFormat(this.classRight * classRightPoints, 6) +
        " pts",
    });
    const classWrongText = new TextObject({
      pos: new Position(336, 54 + 28 * 1),
      color: this.classWrong > 0 ? "red" : "brown",
      font: "wcp",
      direction: "left",
      invisible: true,
      text:
        "Classificações Incorretas: " +
        Utils.numberFormat(this.classWrong, 2) +
        " = -" +
        Utils.numberFormat(Math.abs(this.classWrong * classWrongPoints), 6) +
        " pts",
    });
    const elementRightText = new TextObject({
      pos: new Position(336, 54 + 28 * 2),
      color: this.elementRight > 0 ? "lime" : "brown",
      font: "wcp",
      direction: "left",
      invisible: true,
      text:
        "Elementos Corretos: " +
        Utils.numberFormat(this.elementRight, 2) +
        " = +" +
        Utils.numberFormat(this.elementRight * elementRightPoints, 6) +
        " pts",
    });
    const elementWrongText = new TextObject({
      pos: new Position(336, 54 + 28 * 3),
      color: this.elementWrong > 0 ? "red" : "brown",
      font: "wcp",
      direction: "left",
      invisible: true,
      text:
        "Elementos Incorretos: " +
        Utils.numberFormat(this.elementWrong, 2) +
        " = -" +
        Utils.numberFormat(
          Math.abs(this.elementWrong * elementWrongPoints),
          6,
        ) +
        " pts",
    });

    let success = this.totalScore >= this.level.goal;

    const scoreText = new TextObject({
      pos: new Position(336, 54 + 28 * 4),
      color: success ? "lime" : "red",
      font: "wcp",
      direction: "left",
      invisible: true,
      text:
        "Pontuação total: " + Utils.numberFormat(this.totalScore, 6) + " pts",
    });
    const goalText = new TextObject({
      pos: new Position(336, 54 + 28 * 5),
      color: "brown",
      font: "wcp",
      direction: "left",
      text: "Objetivo: " + Utils.numberFormat(this.level.goal, 6) + " pts",
    });

    const goalResult = new GameObject({
      pos: new Position(244 + (success ? 15 : 0), 214),
      spriteName: success ? "objective_met" : "objective_failed",
      invisible: true,
      width: success ? 78 : 93,
      height: 32,
    });

    this.scoreObjects = [
      classRightText,
      classWrongText,
      elementRightText,
      elementWrongText,
      scoreText,
      goalResult,
    ];

    this.gameObjects = [
      classRightText,
      classWrongText,
      elementRightText,
      elementWrongText,
      scoreText,
      goalText,
      goalResult,
      appBorder,
      new ExitButton(LEVELSELECTION, true),
    ];
  }
}
