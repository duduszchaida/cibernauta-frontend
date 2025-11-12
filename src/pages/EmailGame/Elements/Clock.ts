import type CanvasObject from "../CanvasObject";
import Position from "../Position";
import TextObject from "./TextObject";
import { gameTimeTracker } from "../GameTimeTracker.ts";

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
    const timeString = gameTimeTracker.currentGameTimeStamp.toString();
    canvasObject.writeText(this.fontSprite, this.font, timeString, this.pos);
    canvasObject.writeText(
      this.fontSprite,
      this.font,
      gameTimeTracker.paused ? "game is paused" : "game is not paused",
      new Position(64, 32),
    );
  }
}
