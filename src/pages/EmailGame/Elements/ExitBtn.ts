import Position from "../Position";
import { DESKTOPSCENE } from "../Scenes/SceneReferences";
import GameObject from "./GameObject";
export const SCENECHANGE = "sceneChange";

export const exitButton = new GameObject({
  height: 16,
  width: 16,
  pos: new Position(332, 4),
  spriteName: "exit_btn",
  clickFunction: () => {
    return { type: SCENECHANGE, sceneName: DESKTOPSCENE };
  },
});

