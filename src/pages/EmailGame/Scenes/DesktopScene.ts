import AppIcon from "../Elements/AppIcon";
import Position from "../Position";
import Scene from "./Scene";
import { LEVELSELECTION, SAVESCENE, SETTINGSSCENE } from "./SceneReferences";

export const MANUALSAVE = "manualSave"; // Referência da função de salvamento manual do jogo

// Cena da "área de trabalho"
export class DesktopScene extends Scene {
  constructor(autoSave: boolean) {
    super({
      backgroundSpriteName: "bg_blue",
      gameObjects: [
        new AppIcon({
          pos: new Position(20, 16),
          spriteName: "icon_email",
          hoverSpriteName: "icon_email_hover",
          appName: "Treinamento",
          sceneReference: LEVELSELECTION,
        }),
        new AppIcon({
          pos: new Position(20, 80),
          spriteName: "icon_saves",
          hoverSpriteName: "icon_saves_hover",
          appName: "Salvamentos",
          sceneReference: SAVESCENE,
        }),
        new AppIcon({
          pos: new Position(304, 204),
          spriteName: "icon_settings",
          hoverSpriteName: "icon_settings_hover",
          appName: "Opções",
          sceneReference: SETTINGSSCENE,
        }),
      ],
    });
    if (!autoSave) {
      this.gameObjects.push(
        new AppIcon({
          pos: new Position(20, 144),
          spriteName: "icon_save",
          hoverSpriteName: "icon_save_hover",
          appName: "Salvar Jogo",
          clickFunction: () => {
            return { type: MANUALSAVE };
          },
        }),
      );
    }
  }
}
