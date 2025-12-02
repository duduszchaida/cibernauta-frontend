import type CanvasObject from "../CanvasObject";
import { findSprite } from "../Sprites/FindSprite";
import Position from "../Position";
import GameObject from "./GameObject";

export const PAUSEGAME = "pauseGame"; // Referencia de ação de pausar o jogo

// Classe de objeto de pause genérico usado em EmailScene
export class PauseButton extends GameObject {
  paused = false; // Indica o estado de pausado do objeto
  altSprite = findSprite("pause_on_btn"); // Sprite utilizado para renderizar quando no estado pausado
  altHeldSprite = findSprite("pause_on_btn_held"); // Sprite utilizado para renderizar quando no estado pausado

  constructor(paused?: boolean) {
    super({
      height: 16,
      width: 16,
      pos: new Position(273, 4),
      spriteName: "pause_off_btn",
      heldSpriteName: "pause_off_btn_held",
      clickFunction: () => {
        return { type: PAUSEGAME };
      },
    });
    this.paused = paused ?? false;
  }

  /**
   * Com um dado CanvasObject renderiza seu sprite dependendo de seu estado
   * @param canvasObject CanvasObject utilizado para renderizar Sprite do objeto
   * @returns
   */
  render(canvasObject: CanvasObject): void {
    let sprite;
    if (this.paused) {
      if (this.heldSprite && this.cursorHeld) {
        sprite = this.altHeldSprite;
      } else {
        sprite = this.altSprite;
      }
    } else {
      if (this.heldSprite && this.cursorHeld) {
        sprite = this.heldSprite;
      } else {
        sprite = this.sprite;
      }
    }
    canvasObject.drawSprite(sprite, this.pos, this.width, this.height);
  }
}
