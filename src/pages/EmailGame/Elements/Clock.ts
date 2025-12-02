import type CanvasObject from "../CanvasObject";
import type Position from "../Position";
import { Utils } from "../Utils";
import TextObject from "./TextObject";

// Objeto de relógio
export class Clock extends TextObject {
  constructor(pos: Position) {
    super({
      pos: pos,
      color: "white",
      font: "wcp",
      text: "clock",
      direction: "left",
      ignoreClick: true,
    });
  }

  /**
   * Com um dado canvasObject escreve o horário à esquerda de sua posição
   * @param canvasObject
   */
  render(canvasObject: CanvasObject): void {
    canvasObject.writeText(
      this.fontSprite,
      this.font,
      Utils.numberFormat(new Date().getHours(), 2) +
        ":" +
        Utils.numberFormat(new Date().getMinutes(), 2),
      this.pos,
      this.direction,
    );
  }
}
