import type CanvasObject from "../CanvasObject";
import { findSprite } from "../FindSprite";
<<<<<<< HEAD
import Hitbox from "../Hitbox";
import Position from "../Position";
import type Sprite from "../Sprite";
=======
import Hitbox from "./Hitbox";
import Position from "../Position";
import type Sprite from "./Sprite";
>>>>>>> teste

export default class GameObject {
  pos: Position;
  sprite: Sprite;
  height: number;
  width: number;
  hitbox: Hitbox;
<<<<<<< HEAD
  click: Function | null;
  drag: Function | null;
  invisible: boolean;
  ignoreClick: boolean;

  constructor(args: {
    pos?: Position;
    spriteName?: string;
    width: number;
    height: number;
    hitbox?: Hitbox;
    clickFunction?: Function;
    dragFunction?: Function;
    invisible?: boolean;
    ignoreClick?: boolean;
  }) {
    this.pos = args.pos ?? new Position();
    this.sprite = findSprite(args.spriteName ?? "cam");
=======
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
>>>>>>> teste
    this.width = args.width;
    this.height = args.height;
    this.hitbox =
      args.hitbox ??
      new Hitbox({
        pos: this.pos,
        width: this.width,
        height: this.height,
      });
<<<<<<< HEAD
    this.click = args.clickFunction ?? null;
    this.drag = args.dragFunction ?? null;
    this.invisible = args.invisible ?? false;
    this.ignoreClick = args.ignoreClick ?? false;
  }

  render(canvasObject: CanvasObject) {
    if (this.invisible) {
      return;
    }
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
=======
  }
  render(canvasObject: CanvasObject) {
    canvasObject.drawSprite(
      this.sprite,
      this.pos,
      new Position(this.width, this.height),
    );
>>>>>>> teste
  }
}
