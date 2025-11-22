import Position from "../Position";
import SceneChanger from "./SceneChanger";
export const SCENECHANGE = "sceneChange";

export const EXITBTN = "exitBtn";
export const PAUSEBTN = "pauseBtn";

export class ExitButton extends SceneChanger {
  constructor(reference: string) {
    super({
      height: 16,
      width: 16,
      pos: new Position(332, 4),
      spriteName: "exit_btn",
      sceneReference: reference,
    });
  }
}
