import GameObject from "../../Elements/GameObject";
import Position from "../../Position";

export class Notification extends GameObject {
  constructor() {
    super({
      pos: new Position(),
      height: 35,
      width: 131,
      clickFunction: () => {
        this.invisible = true;
        this.ignoreClick = true;
      },
    });
  }
}
