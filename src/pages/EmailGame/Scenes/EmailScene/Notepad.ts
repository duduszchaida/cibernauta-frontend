import GameObject from "../../Elements/GameObject";
import Position from "../../Position";

export const NOTEPAD = "notepad"; // Referência do objeto de caderno

export class Notepad extends GameObject {
  currentPage = 0;

  constructor() {
    super({
      pos: new Position(187, 127),
      height: 123,
      width: 135,
      spriteName: "notepad",
      invisible: true,
    });
    this.clickFunction = (pos: Position) => {
      if (pos.subtractPos(this.pos).x > this.width / 2) {
        this.currentPage++;
      } else {
        if (this.currentPage > 0) {
          this.currentPage--;
        }
      }
      console.log(this.currentPage);
    };
  }
}
