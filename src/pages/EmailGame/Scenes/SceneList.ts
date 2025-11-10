import AppIcon from "../Elements/AppIcon";
import GameObject from "../Elements/GameObject";
import Position from "../Position";
import Scene from "./Scene";

export const SCENECHANGE = "sceneChange";
export const DESKTOPSCENE = "desktop";
export const EMAILSCENE = "emailScene";

const exitButton = new GameObject({
  height: 24,
  width: 24,
  pos: new Position(324, 4),
  spriteName: "exit_btn",
  clickFunction: () => {
    return { type: SCENECHANGE, sceneName: DESKTOPSCENE };
  },
});

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
  [EMAILSCENE]: new Scene({
    backgroundSpriteName: "beige_bg",
    gameObjects: [
      new GameObject({
        spriteName: "app_border",
        width: 352,
        height: 256,
      }),
      exitButton,
    ],
  }),
};

export default sceneList;
