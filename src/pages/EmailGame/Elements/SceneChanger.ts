import type CanvasObject from "../CanvasObject";
import type Position from "../Position";
import GameObject from "./GameObject";
export const SCENECHANGE = "sceneChange";

export default class SceneChanger extends GameObject {
  clickable: boolean = true;
  sceneReference?: string;

  constructor(args: {
    pos: Position;
    spriteName: string;
    sceneReference?: string;
    appName?: string;
    clickFunction?: Function;
    width?: number;
    height?: number;
  }) {
    super({ ...args, width: args.width ?? 32, height: args.height ?? 32 });
    this.sceneReference = args.sceneReference;
    this.click = () => {
      if (args.sceneReference) {
        return { type: SCENECHANGE, sceneReference: this.sceneReference };
      }
      console.log("no reference");
    };
  }

  render(canvasObject: CanvasObject) {
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
  }
}
