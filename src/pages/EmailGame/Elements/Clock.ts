import type CanvasObject from "../CanvasObject";
import Position from "../Position";
import { gameTimeTracker } from "../Time/GameTimeTracker";
import Timer from "../Time/Timer";
import TextObject from "./TextObject";

let testTimer: any = null;
testTimer = new Timer({goalSecs: 20})
setTimeout(() => {
  testTimer.start();
}, 3000)

export default class Clock extends TextObject {
  constructor() {
    super({
      pos: new Position(128, 128),
      color: "black",
      font: "minecraftia",
      text: "",
    });
  }

  render(canvasObject: CanvasObject): void {
    const timeString = gameTimeTracker.currentTic.toString();
    canvasObject.writeText(this.fontSprite, this.font, timeString, this.pos);
    canvasObject.writeText(
      this.fontSprite,
      this.font,
      gameTimeTracker.paused ? "game is paused" : "game is not paused",
      new Position(64, 32),
    );
    if (testTimer){
      canvasObject.writeText(this.fontSprite, this.font, testTimer.timeRemaining(), this.pos.add(new Position(64, 16)));
    }
  }
}
