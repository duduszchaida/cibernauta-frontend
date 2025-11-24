import AppIcon from "../Elements/AppIcon";
import Position from "../Position";
import Scene from "./Scene";
import { LEVELSELECTION, SAVESCENE } from "./SceneReferences";

export const MANUALSAVE = "manualSave";
export class DesktopScene extends Scene {
  constructor() {
    super({
      backgroundSpriteName: "bg_blue",
      gameObjects: [
        new AppIcon({
          pos: new Position(16, 16),
          spriteName: "email_icon",
          appName: "Treinamento",
          sceneReference: LEVELSELECTION,
        }),
        new AppIcon({
          pos: new Position(16, 80),
          spriteName: "icon_save",
          appName: "Salvar Jogo",
          clickFunction: () => {
            return { type: MANUALSAVE };
          },
        }),
        new AppIcon({
          pos: new Position(16, 144),
          spriteName: "saves_icon",
          appName: "Salvamentos",
          sceneReference: SAVESCENE,
        }),
      ],
    });
  }
}
