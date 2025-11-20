import { appBorder } from "../Elements/AppBorder";
import { exitButton } from "../Elements/ExitBtn";
import TextObject from "../Elements/TextObject";
import type { SaveSlot } from "../GameState";
import Position from "../Position";
import Scene from "../Scenes/Scene";
import { LevelBlock, levelScoreFormat } from "./LevelBlock";

export const TESTLEVEL = "testLevel";
export const TESTLEVEL2 = "testLevel2";
export const TESTLEVEL3 = "testLevel3";
export const TESTLEVEL4 = "testLevel4";
export const TESTLEVEL5 = "testLevel5";

export type Level = {
  name: string;
  goal: number;
};

const Levels: Record<string, Level> = {
  [TESTLEVEL]: {
    name: "Testing level",
    goal: 1000,
  },
  [TESTLEVEL2]: {
    name: "Fase muito massa woow",
    goal: 1000,
  },
  [TESTLEVEL3]: {
    name: "Propagandas",
    goal: 1000,
  },
  [TESTLEVEL4]: {
    name: "Alguém pediu um código?",
    goal: 500,
  },
  [TESTLEVEL5]: {
    name: "Testing level",
    goal: 1000,
  },
};

export class LevelSelectionScene extends Scene {
  totalScore: number = 0;

  constructor(saveSlot: SaveSlot) {
    super({
      backgroundSpriteName: "bg_beige",
      gameObjects: [appBorder, exitButton],
    });
    this.generateLevelBlocks(saveSlot);
    this.gameObjects.push(
      new TextObject({
        pos: new Position(270, 9),
        color: "brown",
        font: "minecraftia",
        text: "Pontuação Total:",
        direction: "center",
        ignoreClick: true,
      }),
    );
    this.gameObjects.push(
      new TextObject({
        pos: new Position(270, 21),
        color: "brown",
        font: "minecraftia",
        text: levelScoreFormat(this.totalScore),
        direction: "center",
        ignoreClick: true,
      }),
    );
  }

  generateLevelBlocks(saveSlot: SaveSlot) {
    saveSlot.levelProgress.forEach((lp, i) => {
      this.gameObjects.push(
        new LevelBlock({
          level: Levels[lp.reference],
          levelProgress: lp,
          order: i,
        }),
      );
      if (lp.highscore > Levels[lp.reference].goal) {
        this.totalScore += lp.highscore;
      }
    });
  }
}
