import AppIcon from "../Elements/AppIcon";
import Position from "../Position";
import Scene from "./Scene";
import { LEVELSELECTION, SAVESCENE, SETTINGSSCENE } from "./SceneReferences";

export const MANUALSAVE = "manualSave"; // Referência da função de salvamento manual do jogo

// Cena da "área de trabalho"
export class DesktopScene extends Scene {
  constructor() {
    super({
      backgroundSpriteName: "bg_blue",
      gameObjects: [
        new AppIcon({
          pos: new Position(20, 16),
          spriteName: "icon_email",
          appName: "Treinamento",
          sceneReference: LEVELSELECTION,
        }),
        new AppIcon({
          pos: new Position(20, 80),
          spriteName: "icon_save",
          appName: "Salvar Jogo",
          clickFunction: () => {
            return { type: MANUALSAVE };
          },
        }),
        new AppIcon({
          pos: new Position(20, 144),
          spriteName: "icon_saves",
          appName: "Salvamentos",
          sceneReference: SAVESCENE,
        }),
        new AppIcon({
          pos: new Position(304, 204),
          spriteName: "icon_settings",
          appName: "Opções",
          sceneReference: SETTINGSSCENE,
        }),
      ],
    });
  }
}
