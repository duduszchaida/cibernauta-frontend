import type CanvasObject from "../../CanvasObject";
import GameObject from "../../Elements/GameObject";
import Hitbox from "../../Hitbox";
import Position from "../../Position";

export const INSPECTMODE = "inspectmode";

export default class Toolbar extends GameObject {
  open: boolean = false;
  constructor() {
    super({
      pos: new Position(6, 218),
      height: 32,
      width: 192,
      spriteName: "toolbar",
      hitbox: new Hitbox({ pos: new Position(7, 218), height: 32, width: 32 }),
    });
    this.click = () => {
      return { type: INSPECTMODE };
    };
  }

  render(canvasObject: CanvasObject): void {
    let slicePos = new Position();
    if (this.open) {
      slicePos = new Position(0, 32);
    }
    canvasObject.drawSprite(
      this.sprite,
      this.pos,
      this.width,
      this.height,
      slicePos,
    );
  }
}
