import type CanvasObject from "../../CanvasObject";
import GameObject from "../../Elements/GameObject";
import { findSprite } from "../../FindSprite";
import type Position from "../../Position";
import type Sprite from "../../Sprite";

export const CONTENT = "content";
export const ADDRESS = "address";
export const NAME = "name";
export const PICTURE = "picture";

export const INSPECT = "inspect";

export default class EmailElement extends GameObject {
  reference: typeof ADDRESS | typeof CONTENT | typeof PICTURE | typeof NAME;
  anomaly: boolean;
  selected: boolean = false;
  selectedSprite: Sprite;

  constructor(args: {
    pos?: Position;
    width: number;
    height: number;
    anomaly: boolean;
    spriteName?: string;
    reference: typeof ADDRESS | typeof CONTENT | typeof PICTURE;
  }) {
    super(args);
    this.reference = args.reference;
    this.anomaly = args.anomaly;
    this.click = () => {
      return { type: INSPECT, reference: this.reference };
    };
    this.selectedSprite = findSprite(this.reference + "_selected");
  }

  render(canvasObject: CanvasObject) {
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
    if (!this.selected) {
      return;
    }
    canvasObject.drawSprite(
      this.selectedSprite,
      this.pos,
      this.width,
      this.height,
    );
  }
}
