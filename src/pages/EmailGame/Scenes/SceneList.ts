import { desktopScene } from "./DesktopScene";
import Scene from "./Scene";
import { DESKTOPSCENE, TIMERTESTSCENE } from "./SceneReferences";
import { TimerScene } from "./TimerScene";

const sceneList: Record<string, Scene> = {
  [DESKTOPSCENE]: desktopScene,
  [TIMERTESTSCENE]: TimerScene,
};

export default sceneList;
