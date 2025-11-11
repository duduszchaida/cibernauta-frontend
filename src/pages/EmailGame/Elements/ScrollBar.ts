import type CanvasObject from "../CanvasObject";
import Position from "../Position";
import GameObject from "./GameObject";

export default class ScrollBar extends GameObject {
  length: number;
  shift = 0;
  constructor(lines: number, lineHeight: number, scrollAmmount: number) {
    let textHeight = lines * lineHeight;
    console.log(textHeight / scrollAmmount);
    let height = 6 + 182;
    super({
      pos: new Position(332, 58),
      spriteName: "scroll_bar",
      height: height,
      width: 9,
    });
    this.length = length;
  }

  scroll(num: number) {
    if (this.shift <= 0 && num < 0) {
      return;
    }
    this.shift += num;
    console.log(this.shift);
  }

  render(canvasObject: CanvasObject): void {
    canvasObject.drawSprite(
      this.sprite,
      this.pos.add(new Position(0, this.shift)),
      new Position(8, 3),
    );
    canvasObject.drawSprite(
      this.sprite,
      this.pos.add(new Position(0, 3 + this.shift)),
      new Position(8, 182 - 1 * this.length),
      new Position(0, 3),
      new Position(8, 1),
    );
    canvasObject.drawSprite(
      this.sprite,
      this.pos.add(new Position(0, 3 + this.shift + 182 - 1 * this.length)),
      new Position(8, 3),
      new Position(0, 4),
    );
  }
}
