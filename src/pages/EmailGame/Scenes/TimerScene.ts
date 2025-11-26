import { appBorder } from "../Elements/AppBorder";
import Clock from "../Elements/Clock";
import { ExitButton } from "../Elements/ExitButton";
import Scene from "./Scene";
import { DESKTOPSCENE } from "./SceneReferences";

// TO-DO: remover

export const TimerScene = new Scene({
  backgroundSpriteName: "bg_green",
  gameObjects: [appBorder, new ExitButton(DESKTOPSCENE), new Clock()],
});
