import { INSPECT } from "./EmailElement";
import TextObject from "../../Elements/TextObject";
import type Sprite from "../../Sprite";
import Position from "../../Position";
import { findSprite } from "../../FindSprite";
import type CanvasObject from "../../CanvasObject";
import fontMaps from "../../FontMaps";
import { ADDRESS, NAME, PICTURE, CONTENT } from "./EmailElement";

export default class EmailTextComponent extends TextObject {
  text: string;
  font: string;
  fontSprite: Sprite;
  selectionSprite: Sprite;
  selected: boolean = false;
  anomaly: boolean = false;
  reference: string;

  constructor(args: {
    pos: Position;
    reference: typeof ADDRESS | typeof CONTENT | typeof PICTURE | typeof NAME;
    anomaly: boolean;
    text: string;
    font: string;
    color: string;
  }) {
    super(args);
    this.text = args.text;
    this.font = args.font;
    this.fontSprite = findSprite(args.font + "_" + args.color);
    this.selectionSprite = findSprite(this.font + "_selected");
    this.reference = args.reference;
    this.anomaly = args.anomaly;
    this.click = () => {
      return { type: INSPECT, reference: this.reference };
    };
  }

  render(canvasObject: CanvasObject) {
    canvasObject.writeText(this.fontSprite, this.font, this.text, this.pos);
    if (this.selected) {
      canvasObject.drawSprite(
        this.selectionSprite,
        this.pos.addPos(new Position(-3, 0)),
        4,
        fontMaps[this.font].cellHeight + 3,
        new Position(),
        4,
      );
      canvasObject.drawSprite(
        this.selectionSprite,
        this.pos,
        this.width - 2,
        fontMaps[this.font].cellHeight + 3,
        new Position(4, 0),
        1,
      );
      canvasObject.drawSprite(
        this.selectionSprite,
        this.pos.addPos(new Position(this.width - 2, 0)),
        4,
        fontMaps[this.font].cellHeight + 3,
        new Position(5),
        4,
      );
    }
  }
}
