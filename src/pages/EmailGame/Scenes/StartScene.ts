import SceneChanger from "../Elements/SceneChanger";
import Position from "../Position";
import Scene from "./Scene";
import { DESKTOPSCENE } from "./SceneReferences";

export class StartScene extends Scene {
  constructor() {
    super({
      backgroundSpriteName: "bg_start",
      gameObjects: [
        new SceneChanger({
          pos: new Position(128, 176),
          height: 48,
          width: 96,
          spriteName: "start_btn",
          sceneReference: DESKTOPSCENE,
        }),
      ],
    });
  }
}
