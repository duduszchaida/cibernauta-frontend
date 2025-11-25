import GameObject from "./GameObject";
import measureTextWidth from "../MeasureTextWidth";
import type Position from "../Position";
import type CanvasObject from "../CanvasObject";
import type Sprite from "../Sprite";
import { findSprite } from "../FindSprite";
import fontMaps from "../FontMaps";

export default class TextObject extends GameObject {
  text: string;
  font: string;
  color: string;
  fontSprite: Sprite;
  direction: string;

  constructor(args: {
    pos: Position;
    text: string;
    font: string;
    color: string;
    direction?: string;
    ignoreClick?: boolean;
    invisible?: boolean;
  }) {
    let width = measureTextWidth(args.text, args.font);
    super({
      pos: args.pos,
      height: fontMaps[args.font].cellHeight,
      width: width,
      ignoreClick: args.ignoreClick,
      invisible: args.invisible,
    });
    this.text = args.text;
    this.font = args.font;
    this.color = args.color;
    this.direction = args.direction ?? "right";
    this.fontSprite = findSprite(this.font + "_" + this.color);
  }

  render(canvasObject: CanvasObject): void {
    if (this.invisible) {
      return;
    }
    canvasObject.writeText(
      this.fontSprite,
      this.font,
      this.text,
      this.pos,
      this.direction,
    );
  }
}
