import type CanvasObject from "./CanvasObject";
import { findSprite } from "./FindSprite";
import Position from "./Position";
import type Sprite from "./Sprite";

export default class Cursor {
  pos: Position = new Position(-32, -32);
  state: "arrow" | "pointer" | "inspect" = "arrow";
  inspecting: boolean = false;
  spriteList: Record<string, Sprite> = {
    arrow: findSprite("cursor_arrow"),
  };
  spriteShift: Position = new Position();
  render(canvas: CanvasObject) {
    if (this.spriteList[this.state] == null) {
      this.spriteList[this.state] = findSprite("cursor_" + this.state);
    }
    canvas.drawSprite(
      this.spriteList[this.state],
      this.pos.addPos(this.spriteShift),
      32,
      32,
    );
  }
}
