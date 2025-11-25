import { appBorder } from "../Elements/AppBorder";
import { ExitButton } from "../Elements/ExitButton";
import TextObject from "../Elements/TextObject";
import type GameState from "../GameState";
import Position from "../Position";
import { Utils } from "../Utils";
import {
  ADDRESS,
  NAME,
  PICTURE,
  type EmailData,
} from "./EmailScene/EmailManager";
import type { Evaluation } from "./EmailScene/EmailScene";
import type { Level } from "./LevelSelectionScene/Level";
import Scene from "./Scene";
import { LEVELSELECTION } from "./SceneReferences";

const classRightPoints = 200;
const classWrongPoints = -100;
const elementRightPoints = 50;
const elementWrongPoints = -25;

export class ScoreScene extends Scene {
  evaluations: { evaluation: Evaluation; emailData: EmailData }[];
  gameState: GameState;
  level: Level;
  classRight: number = 0;
  classWrong: number = 0;
  elementRight: number = 0;
  elementWrong: number = 0;
  totalScore: number = 0;

  constructor(
    evaluations: { evaluation: Evaluation; emailData: EmailData }[],
    level: Level,
    gameState: GameState,
  ) {
    super({ backgroundSpriteName: "bg_score", gameObjects: [] });
    this.evaluations = evaluations;
    this.gameState = gameState;
    this.level = level;
    this.calcPoints();
  }

  calcPoints() {
    this.evaluations.forEach((x) => {
      let e = x.evaluation;
      if (e.class) {
        this.classRight++;
      } else {
        this.classWrong++;
      }
      const keys: (keyof Evaluation)[] = [ADDRESS, PICTURE, NAME];
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

    const classRightText = new TextObject({
      pos: new Position(336, 54 + 28 * 0),
      color: "brown",
      font: "wcp",
      direction: "left",
      text:
        "Classificações Corretas: " +
        Utils.numberFormat(this.classRight, 2) +
        " = +" +
        Utils.numberFormat(this.classRight * classRightPoints, 6) +
        " pts",
    });
    const classWrongText = new TextObject({
      pos: new Position(336, 54 + 28 * 1),
      color: "brown",
      font: "wcp",
      direction: "left",
      text:
        "Classificações Incorretas: " +
        Utils.numberFormat(this.classWrong, 2) +
        " = -" +
        Utils.numberFormat(Math.abs(this.classWrong * classWrongPoints), 6) +
        " pts",
    });
    const elementRightText = new TextObject({
      pos: new Position(336, 54 + 28 * 2),
      color: "brown",
      font: "wcp",
      direction: "left",
      text:
        "Elementos Corretos: " +
        Utils.numberFormat(this.elementRight, 2) +
        " = +" +
        Utils.numberFormat(this.elementRight * elementRightPoints, 6) +
        " pts",
    });
    const elementWrongText = new TextObject({
      pos: new Position(336, 54 + 28 * 3),
      color: "brown",
      font: "wcp",
      direction: "left",
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
    const scoreText = new TextObject({
      pos: new Position(336, 54 + 28 * 4),
      color: "brown",
      font: "wcp",
      direction: "left",
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

    this.gameObjects = [
      classRightText,
      classWrongText,
      elementRightText,
      elementWrongText,
      scoreText,
      goalText,
      appBorder,
      new ExitButton(LEVELSELECTION),
    ];

    if (this.totalScore >= this.level.goal) {
      let levelHs = 0;
      if (
        this.gameState.currentSave.levelProgressRecord[this.level.reference]
          ?.highscore > this.level.goal
      ) {
        levelHs =
          this.gameState.currentSave.levelProgressRecord[this.level.reference]
            .highscore;
      }
      this.gameState.currentSave.levelProgressRecord[this.level.reference] = {
        reference: this.level.reference,
        highscore: Math.max(this.totalScore, levelHs),
        perfect: this.classWrong + this.elementWrong == 0,
      };
      if (this.totalScore >= levelHs) {
        this.gameState.updateHighscore();
      }
    }
  }
}
