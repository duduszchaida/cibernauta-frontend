import SceneChanger from "../Elements/AppIcon";
import { SCENECHANGE } from "../Elements/ExitBtn";
import Position from "../Position";
import Scene from "../Scenes/Scene";
import {
  LEVELSELECTION,
  SAVESCENE,
  TIMERTESTSCENE,
} from "../Scenes/SceneReferences";

export const MANUALSAVE = "manualSave";

export const desktopScene = new Scene({
  backgroundSpriteName: "bg_blue",
  gameObjects: [
    // new SceneChanger({
    //   pos: new Position(80, 16),
    //   spriteName: "concepts_icon",
    //   appName: "Revisão",
    // }),
    new SceneChanger({
      pos: new Position(16, 16),
      spriteName: "email_icon",
      appName: "Treinamento",
      clickFunction: () => {
        return { type: SCENECHANGE, sceneName: LEVELSELECTION };
      },
    }),
    new SceneChanger({
      pos: new Position(304, 208),
      spriteName: "settings_icon",
      appName: "Opções",
      clickFunction: () => {
        return { type: SCENECHANGE, sceneName: TIMERTESTSCENE };
      },
    }),
    new SceneChanger({
      pos: new Position(16, 144),
      spriteName: "saves_icon",
      appName: "Salvamentos",
      clickFunction: () => {
        return { type: SCENECHANGE, sceneName: SAVESCENE };
      },
    }),
    new SceneChanger({
      pos: new Position(16, 80),
      spriteName: "icon_save",
      appName: "Salvar Jogo",
      clickFunction: () => {
        return { type: MANUALSAVE };
      },
    }),
  ],
});
