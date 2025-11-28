import type CanvasObject from "../../CanvasObject";
import GameObject from "../../Elements/GameObject";
import Timer from "../../Elements/Timer";
import { findSprite } from "../../FindSprite";
import Position from "../../Position";

export class Notifier extends GameObject {
  spriteClass = findSprite("notif_class");
  spriteElement = findSprite("notif_element");
  currentType: "class" | "element" = "class";
  timer: Timer = new Timer({
    goalSecs: 3,
    goalFunc: () => {
      this.invisible = true;
    },
  });

  constructor() {
    super({
      pos: new Position(101, 215),
      height: 35,
      width: 131,
      invisible: true,
      clickFunction: () => {
        this.invisible = true;
        this.ignoreClick = true;
      },
    });
  }

  notify(type: "class" | "element") {
    this.currentType = type;
    this.invisible = false;
    this.timer.start();
  }

  render(canvasObject: CanvasObject): void {
    if (this.invisible) {
      return;
    }
    let sprite;
    if (this.currentType == "class") {
      sprite = this.spriteClass;
    } else {
      sprite = this.spriteElement;
    }
    canvasObject.drawSprite(sprite, this.pos, this.width, this.height);
  }
}
