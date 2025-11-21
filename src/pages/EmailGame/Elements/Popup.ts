import type CanvasObject from "../CanvasObject";
import { findSprite } from "../FindSprite";
import Position from "../Position";
import Timer from "./Timer";

export class Popup {
  fontSprite = findSprite("minecraftia_brown");
  bgSprite = findSprite("popup");
  show: boolean = false;
  text: string = "";
  timer: Timer | null = null;
  pos = new Position(0, 240);

  render(canvasObject: CanvasObject): void {
    if (this.timer) {
      this.timer.check();
      canvasObject.drawSprite(this.bgSprite, this.pos, 144, 16);
      canvasObject.writeText(
        this.fontSprite,
        "minecraftia",
        this.text,
        this.pos.add(6, 1),
      );
    }
  }

  newPopup(text: string, seconds: number) {
    this.text = text;
    this.timer = new Timer({
      goalSecs: seconds,
      goalFunc: () => {
        this.timer = null;
      },
    });
    this.timer.start();
  }
}
