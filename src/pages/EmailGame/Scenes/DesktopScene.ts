import AppIcon from "../Elements/AppIcon";
import { SCENECHANGE } from "../Elements/ExitBtn";
import Position from "../Position";
import Scene from "./Scene";
import { EMAILSCENE, TIMERTESTSCENE } from "./SceneReferences";

export const desktopScene = new Scene({
  backgroundSpriteName: "bg_blue",
  gameObjects: [
    new AppIcon({
      pos: new Position(16, 16),
      spriteName: "concepts_icon",
      appName: "Conceitos",
    }),
    new AppIcon({
      pos: new Position(80, 16),
      spriteName: "email_icon",
      appName: "Treinamento",
      clickFunction: () => {
        return { type: SCENECHANGE, sceneName: EMAILSCENE };
      },
    }),
    new AppIcon({
      pos: new Position(16, 80),
      spriteName: "settings_icon",
      appName: "Ajustes",
      clickFunction: () => {
        return { type: SCENECHANGE, sceneName: TIMERTESTSCENE };
      },
    }),
    new AppIcon({
      pos: new Position(80, 80),
      spriteName: "saves_icon",
      appName: "Salvamentos",
    }),
  ],
});
