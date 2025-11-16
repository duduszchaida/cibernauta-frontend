import type CanvasObject from "../CanvasObject";
import { findSprite } from "../FindSprite";
import Position from "../Position";
import type Sprite from "../Sprite";
import type { ADDRESS, CONTENT, PICTURE } from "./Email";
import GameObject from "./GameObject";

export const INSPECT = "inspect";

export default class EmailComponent extends GameObject {
  reference: typeof ADDRESS | typeof CONTENT | typeof PICTURE;
  anomaly: boolean;
  selected: boolean = false;
  selectedSprite: Sprite;

  constructor(args: {
    pos?: Position;
    spriteName?: string;
    width: number;
    height: number;
    reference: typeof ADDRESS | typeof CONTENT | typeof PICTURE;
    anomaly: boolean;
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
