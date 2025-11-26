import type CanvasObject from "../../CanvasObject";
import GameObject from "../../Elements/GameObject";
import { SCENECHANGE } from "../../Elements/SceneChanger";
import { findSprite } from "../../FindSprite";
import type { LevelProgress } from "../../GameState";
import Position from "../../Position";
import { Utils } from "../../Utils";
import { EMAILSCENE } from "../SceneReferences";
import type { Level } from "./Level";

// Bloco de nível para a cena de seleção de níveis
// retorna o tipo SCENECHANGE com a referência EMAILSCENE e level como seu nível em sua função de click
export class LevelBlock extends GameObject {
  level: Level; // Nível que o bloco representa
  levelProgress: LevelProgress; // Progresso do jogador no nível
  fontSprite = findSprite("minecraftia_brown"); // Sprite de fonte para renderização de texto

  constructor(args: {
    level: Level;
    levelProgress: LevelProgress;
    order: number; // Posição do nível na lista de níveis
  }) {
    super({
      pos: new Position(6, 47 + 24 * args.order),
      height: 24,
      width: 324,
      spriteName: "level_block",
      clickFunction: () => {
        return {
          type: SCENECHANGE,
          sceneReference: EMAILSCENE,
          level: args.level,
        };
      },
    });
    this.level = args.level;
    this.levelProgress = args.levelProgress;
  }

  /**
   * Com um dado CanvasObject renderiza os sprites e textos nescessários
   * @param canvasObject
   * @returns
   */
  render(canvasObject: CanvasObject): void {
    if (this.pos.y < 23) {
      return;
    }
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
    canvasObject.writeText(
      this.fontSprite,
      "minecraftia",
      this.level.name,
      this.pos.add(41, 5),
    );
    if (this.levelProgress.highscore < this.level.goal) {
      canvasObject.writeText(
        this.fontSprite,
        "minecraftia",
        "Objetivo: " + Utils.numberFormat(this.level.goal, 6),
        this.pos.add(308, 5),
        "left",
      );
      return;
    }
    canvasObject.writeText(
      this.fontSprite,
      "minecraftia",
      "Pontuação: " + Utils.numberFormat(this.levelProgress.highscore, 6),
      this.pos.add(308, 5),
      "left",
    );
    let badgeSpriteName = "marker_finished";
    if (this.levelProgress.perfect) {
      badgeSpriteName = "marker_perfect";
    }
    let badge = new GameObject({
      height: 16,
      width: 16,
      pos: this.pos.add(12, 4),
      spriteName: badgeSpriteName,
    });
    canvasObject.drawSprite(badge.sprite, badge.pos, this.width, this.height);
  }
}
