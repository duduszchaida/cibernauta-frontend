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

// Cena de listagem de níveis
export class LevelSelectionScene extends Scene {
  gameState: GameState; // Estado atual do jogo

  constructor(gameState: GameState) {
    super({
      backgroundSpriteName: "bg_levels",
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

  /**
   * Gera os blocos de nível para cada nível na lista de progresso do salvamento atual do estado do jogo
   * e o próximo na ordem da lista de níveis, se houver
   * @returns
   */
  generateLevelBlocks() {
    const currentProgressKeys = Object.keys(
      this.gameState.currentSave.levelProgressRecord,
    );

    let i = 0;
    if (levelOrder.length > currentProgressKeys.length) {
      this.gameObjects.push(
        new LevelBlock({
          level: levelOrder[currentProgressKeys.length],
          levelProgress: { reference: "", highscore: 0, perfect: false },
          order: i,
        }),
      );
      i++;
    }

    const levelKeys = Object.keys(LevelList);
    for (let j = levelKeys.length - 1; j > -1; j--) {
      const key = levelKeys[j];
      const lp = this.gameState.currentSave.levelProgressRecord[key];
      if (!currentProgressKeys.includes(key)) {
        continue;
      }
      this.gameObjects.push(
        new LevelBlock({
          level: LevelList[key],
          levelProgress: lp,
          order: i,
        }),
      );
      i++;
    }
  }
}
