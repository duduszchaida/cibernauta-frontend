import type CanvasObject from "../../CanvasObject";
import GameObject from "../../Elements/GameObject";
import Hitbox from "../../Hitbox";
import Position from "../../Position";

export const INSPECTMODE = "inspectmode";

export default class ButtonPannel extends GameObject {
  open: boolean = false;
  constructor() {
    super({
      pos: new Position(6, 218),
      height: 32,
      width: 192,
      spriteName: "toolbar",
      heldSpriteName: "toolbar_held",
      hitbox: new Hitbox({ pos: new Position(7, 218), height: 32, width: 32 }),
    });
    this.clickFunction = () => {
      return { type: INSPECTMODE };
    };
  }

  render(canvasObject: CanvasObject): void {
    let slicePos = new Position();
    if (this.open) {
      slicePos = new Position(0, 32);
    }
    let sprite = this.sprite;
    if (this.heldSprite && this.cursorHeld) {
      sprite = this.heldSprite;
    }
    canvasObject.drawSprite(
      sprite,
      this.pos,
      this.width,
      this.height,
      slicePos,
    );
  }
}
