import AppIcon from "../Elements/AppIcon";
import Position from "../Position";
import Scene from "./Scene";

export const SCENECHANGE = "sceneChange";
export const DESKTOPSCENE = "desktop";
export const EMAILSCENE = "emailScene";

const sceneList: Record<string, Scene> = {
  [DESKTOPSCENE]: new Scene({
    backgroundSpriteName: "blue_bg",
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
      }),
      new AppIcon({
        pos: new Position(80, 80),
        spriteName: "saves_icon",
        appName: "Salvamentos",
      }),
    ],
  }),
};

export default sceneList;
