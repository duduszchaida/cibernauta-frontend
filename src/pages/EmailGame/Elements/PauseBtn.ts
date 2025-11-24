import type CanvasObject from "../CanvasObject";
import { findSprite } from "../FindSprite";
import Position from "../Position";
import GameObject from "./GameObject";
export const PAUSEGAME = "pauseGame";

export class PauseButton extends GameObject {
  paused = false;
  altSprite = findSprite("pause_on_btn");

  constructor(paused?: boolean) {
    super({
      height: 16,
      width: 16,
      pos: new Position(273, 4),
      spriteName: "pause_off_btn",
      clickFunction: () => {
        return { type: PAUSEGAME };
      },
    });
    this.paused = paused ?? false;
  }

  render(canvasObject: CanvasObject): void {
    let sprite;
    if (this.paused) {
      sprite = this.altSprite;
    } else {
      sprite = this.sprite;
    }
    canvasObject.drawSprite(sprite, this.pos, this.width, this.height);
  }
}
