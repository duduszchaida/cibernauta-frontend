import type CanvasObject from "../CanvasObject";
import { findSprite } from "../FindSprite";
import Hitbox from "./Hitbox";
import Position from "../Position";
import type Sprite from "./Sprite";

export default class GameObject {
  pos: Position;
  sprite: Sprite;
  height: number;
  width: number;
  hitbox: Hitbox;
  click: boolean | Function = false;

  constructor(args: {
    pos: Position;
    spriteName: string;
    width: number;
    height: number;
    hitbox?: Hitbox;
  }) {
    this.pos = args.pos;
    this.sprite = findSprite(args.spriteName);
    this.width = args.width;
    this.height = args.height;
    this.hitbox =
      args.hitbox ??
      new Hitbox({
        pos: this.pos,
        width: this.width,
        height: this.height,
      });
  }
  render(canvasObject: CanvasObject) {
    canvasObject.drawSprite(
      this.sprite,
      this.pos,
      new Position(this.width, this.height),
    );
  }
}
