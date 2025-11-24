import { desktopScene } from "../DesktopScene/DesktopScene";
import GameObject from "../Elements/GameObject";
import Scene from "./Scene";
import { DESKTOPSCENE, TESTING, TIMERTESTSCENE } from "./SceneReferences";
import { TimerScene } from "./TimerScene";

const sceneList: Record<string, Scene> = {
  [DESKTOPSCENE]: desktopScene,
  [TIMERTESTSCENE]: TimerScene,
  [TESTING]: new Scene({
    backgroundSpriteName: "bg_blue",
    gameObjects: [
      new GameObject({
        height: 256,
        width: 352,
        spriteName: "email_selection_cover",
        ignoreClick: true,
      }),
    ],
  }),
};

export default sceneList;
