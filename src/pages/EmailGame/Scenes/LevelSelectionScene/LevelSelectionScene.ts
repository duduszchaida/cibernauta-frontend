import { appBorder } from "../../Elements/AppBorder";
import { ExitButton } from "../../Elements/ExitButton";
import TextObject from "../../Elements/TextObject";
import type { SaveSlot } from "../../GameState";
import Position from "../../Position";
import Scene from "../Scene";
import { DESKTOPSCENE } from "../SceneReferences";
import { LevelBlock, levelScoreFormat } from "./LevelBlock";
import { LevelList, levelOrder } from "./LevelList";

export class LevelSelectionScene extends Scene {
  totalScore: number = 0;

  constructor(saveSlot: SaveSlot) {
    super({
      backgroundSpriteName: "bg_beige",
      gameObjects: [appBorder, new ExitButton(DESKTOPSCENE)],
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
