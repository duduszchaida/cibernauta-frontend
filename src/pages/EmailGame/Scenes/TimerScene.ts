import { appBorder } from "../Elements/AppBorder";
import Clock from "../Elements/Clock";
import { exitButton } from "../Elements/ExitBtn";
import Scene from "./Scene";

export const TimerScene = new Scene({
  backgroundSpriteName: "bg_green",
  gameObjects: [appBorder, exitButton, new Clock()],
});
