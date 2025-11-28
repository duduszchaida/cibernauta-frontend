import type CanvasObject from "../CanvasObject";
import Position from "../Position";
import GameObject from "./GameObject";

// TO-DO: comentar

export const SCROLLTO = "scrollto";
export default class ScrollBar extends GameObject {
  length: number;
  barLength: number;
  shift = 0;
  scrollSlot = new GameObject({
    width: 12,
    height: 192,
    spriteName: "scroll_slot",
    pos: new Position(330, 56),
  });
  constructor(contentTextHeight: number, scrollAmmount: number) {
    let textHeight = contentTextHeight - 156;
    let length = Math.ceil(textHeight / scrollAmmount);
    let height = 188;
    super({
      pos: new Position(330, 58),
      spriteName: "scroll_bar",
      height: height,
      width: 12,
    });
    this.length = length;
    this.barLength = 182 - 1 * this.length;
    this.clickFunction = (mousePos: Position) => {
      return {
        type: SCROLLTO,
        shift: mousePos.y - this.pos.y - (this.barLength / 4 + 3),
      };
    };
    this.dragFunction = (mousePos: Position) => {
      return {
        type: SCROLLTO,
        shift: mousePos.y - this.pos.y - (this.barLength / 4 + 3),
      };
    };
  }

  scroll(num: number) {
    if (this.shift <= 0 && num < 0) {
      return;
    }
    if (this.shift >= this.length && num > 0) {
      return;
    }
    this.shift += num;
  }

  scrollTo(num: number) {
    if (num > 0) {
      this.shift = Math.min(this.length, num);
    }
    if (num < this.length) {
      this.shift = Math.max(0, num);
    }
  }

  render(canvasObject: CanvasObject): void {
    this.scrollSlot.render(canvasObject);
    canvasObject.drawSprite(
      this.sprite,
      this.pos.addPos(new Position(2, this.shift)),
      8,
      3,
    );
    canvasObject.drawSprite(
      this.sprite,
      this.pos.addPos(new Position(2, 3 + this.shift)),
      8,
      this.barLength,
      new Position(0, 3),
      8,
      1,
    );
    canvasObject.drawSprite(
      this.sprite,
      this.pos.addPos(new Position(2, 3 + this.shift + this.barLength)),
      8,
      3,
      new Position(0, 4),
    );
  }
}
