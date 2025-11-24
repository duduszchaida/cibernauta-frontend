import type CanvasObject from "../CanvasObject";
import GameObject from "../Elements/GameObject";
import { SCENECHANGE } from "../Elements/SceneChanger";
import { findSprite } from "../FindSprite";
import type { LevelProgress } from "../GameState";
import Position from "../Position";
import { EMAILSCENE } from "../Scenes/SceneReferences";
import type { Level } from "./Level";

export function levelScoreFormat(
  score: number,
  formatThous: boolean = false,
): string {
  let thousands = Math.floor(score / 1000).toString();
  while (thousands.length < 3 && !formatThous) {
    thousands = "0" + thousands;
  }
  let hundreds = (score % 1000).toString();
  while (hundreds.length < 3) {
    hundreds = "0" + hundreds;
  }
  return thousands + "." + hundreds;
}

export class LevelBlock extends GameObject {
  name: string;
  highscore: number;
  goal: number;
  perfect: boolean;
  fontSprite = findSprite("minecraftia_brown");

  constructor(args: {
    level: Level;
    levelProgress: LevelProgress;
    order: number;
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
    this.name = args.level.name;
    this.goal = args.level.goal;
    this.highscore = args.levelProgress.highscore;
    this.perfect = args.levelProgress.perfect;
  }

  render(canvasObject: CanvasObject): void {
    if (this.pos.y < 23) {
      return;
    }
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
    canvasObject.writeText(
      this.fontSprite,
      "minecraftia",
      this.name,
      this.pos.add(41, 5),
    );
    if (this.highscore < this.goal) {
      canvasObject.writeText(
        this.fontSprite,
        "minecraftia",
        "Objetivo: " + levelScoreFormat(this.goal),
        this.pos.add(308, 5),
        "left",
      );
      return;
    }
    canvasObject.writeText(
      this.fontSprite,
      "minecraftia",
      "Pontuação: " + levelScoreFormat(this.highscore),
      this.pos.add(308, 5),
      "left",
    );
    let badgeSpriteName = "marker_finished";
    if (this.perfect) {
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
