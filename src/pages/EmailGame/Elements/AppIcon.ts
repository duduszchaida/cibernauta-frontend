import type CanvasObject from "../CanvasObject";
import GameObject from "./GameObject";
import Position from "../Position";
import { findSprite } from "../FindSprite";

export default class AppIcon extends GameObject {
  appName: string;
  clickable: boolean = true;

  constructor(args: {
    pos: Position;
    spriteName: string;
    appName: string;
    clickFunction?: Function;
  }) {
    super({ ...args, width: 32, height: 32 });
    this.appName = args.appName;
    this.click =
      args.clickFunction ??
      (() => {
        console.log(this.appName);
      });
  }

  render(canvasObject: CanvasObject) {
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
    canvasObject.writeText(
      findSprite("minecraftia_bnw"),
      "minecraftia",
      this.appName,
      this.pos.addPos(new Position(18, 32)),
      "center",
    );
  }
}
