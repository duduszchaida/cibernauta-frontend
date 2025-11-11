import Position from "../Position";
import { DESKTOPSCENE, SCENECHANGE } from "../Scenes/SceneList";
import GameObject from "./GameObject";

export const exitButton = new GameObject({
  height: 24,
  width: 24,
  pos: new Position(324, 4),
  spriteName: "exit_btn",
  clickFunction: () => {
    return { type: SCENECHANGE, sceneName: DESKTOPSCENE };
  },
});
