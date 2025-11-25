import { appBorder } from "../../Elements/AppBorder";
import { ExitButton } from "../../Elements/ExitButton";
import TextObject from "../../Elements/TextObject";
import type GameState from "../../GameState";
import Position from "../../Position";
import { Utils } from "../../Utils";
import Scene from "../Scene";
import { DESKTOPSCENE } from "../SceneReferences";
import { LevelBlock } from "./LevelBlock";
import { LevelList, levelOrder } from "./LevelList";

export class LevelSelectionScene extends Scene {
  gameState: GameState;
  constructor(gameState: GameState) {
    super({
      backgroundSpriteName: "bg_beige",
      gameObjects: [appBorder, new ExitButton(DESKTOPSCENE)],
    });
    this.gameState = gameState;
    this.generateLevelBlocks();
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
        text: Utils.numberFormat(this.gameState.currentSaveSlotTotalScore, 6),
        direction: "center",
        ignoreClick: true,
      }),
    );
  }

  generateLevelBlocks() {
    let i = 0;
    for (const key in this.gameState.currentSave.levelProgressRecord) {
      const lp = this.gameState.currentSave.levelProgressRecord[key];
      if (LevelList[lp.reference] == null) {
        return;
      }
      this.gameObjects.push(
        new LevelBlock({
          level: LevelList[lp.reference],
          levelProgress: lp,
          order: i,
        }),
      );
      i++;
    }
    const currentProgressKeys = Object.keys(
      this.gameState.currentSave.levelProgressRecord,
    );

    if (levelOrder.length <= currentProgressKeys.length) {
      return;
    }
    this.gameObjects.push(
      new LevelBlock({
        level: levelOrder[currentProgressKeys.length],
        levelProgress: { reference: "", highscore: 0, perfect: false },
        order: currentProgressKeys.length,
      }),
    );
  }
}
