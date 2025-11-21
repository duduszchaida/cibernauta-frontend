import { appBorder } from "../Elements/AppBorder";
import { exitButton } from "../Elements/ExitBtn";
import TextObject from "../Elements/TextObject";
import type Email from "../EmailScene/Email";
import type { SaveSlot } from "../GameState";
import Position from "../Position";
import Scene from "../Scenes/Scene";
import { LevelBlock, levelScoreFormat } from "./LevelBlock";
import { LevelList, levelOrder } from "./LevelList";

export type Level = {
  name: string;
  goal: number;
  emailReferences: Record<string, Email>;
  reference: string;
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
        pos: new Position(270, 14),
        color: "brown",
        font: "minecraftia",
        text: "Pontuação Total:",
        direction: "center",
        ignoreClick: true,
      }),
    );
    this.gameObjects.push(
      new TextObject({
        pos: new Position(270, 26),
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
          level: LevelList[lp.reference],
          levelProgress: lp,
          order: i,
        }),
      );
      if (lp.highscore > LevelList[lp.reference].goal) {
        this.totalScore += lp.highscore;
      }
    });
    this.gameObjects.push(
      new LevelBlock({
        level: levelOrder[saveSlot.levelProgress.length],
        levelProgress: { reference: "", highscore: 0, perfect: false },
        order: saveSlot.levelProgress.length,
      }),
    );
  }
}
