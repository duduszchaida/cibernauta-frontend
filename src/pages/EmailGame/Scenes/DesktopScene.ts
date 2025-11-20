import SceneChanger from "../Elements/AppIcon";
import { SCENECHANGE } from "../Elements/ExitBtn";
import Position from "../Position";
import Scene from "./Scene";
import { EMAILSCENE, SAVESCENE, TIMERTESTSCENE } from "./SceneReferences";

export const desktopScene = new Scene({
  backgroundSpriteName: "bg_blue",
  gameObjects: [
    new SceneChanger({
      pos: new Position(16, 16),
      spriteName: "concepts_icon",
      appName: "Conceitos",
    }),
    new SceneChanger({
      pos: new Position(80, 16),
      spriteName: "email_icon",
      appName: "Treinamento",
      clickFunction: () => {
        return { type: SCENECHANGE, sceneName: EMAILSCENE };
      },
    }),
    new SceneChanger({
      pos: new Position(16, 80),
      spriteName: "settings_icon",
      appName: "Ajustes",
      clickFunction: () => {
        return { type: SCENECHANGE, sceneName: TIMERTESTSCENE };
      },
    }),
    new SceneChanger({
      pos: new Position(80, 80),
      spriteName: "saves_icon",
      appName: "Salvamentos",
      clickFunction: () => {
        return { type: SCENECHANGE, sceneName: SAVESCENE };
      },
    }),
  ],
});
