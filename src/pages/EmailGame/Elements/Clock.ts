import type CanvasObject from "../CanvasObject";
import type Position from "../Position";
import { Utils } from "../Utils";
import TextObject from "./TextObject";

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
