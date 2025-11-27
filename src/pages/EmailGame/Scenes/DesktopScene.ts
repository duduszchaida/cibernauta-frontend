import AppIcon from "../Elements/AppIcon";
import Position from "../Position";
import Scene from "./Scene";
import { LEVELSELECTION, SAVESCENE } from "./SceneReferences";

export const MANUALSAVE = "manualSave"; // Referência da função de salvamento manual do jogo

// Cena da "área de trabalho"
export class DesktopScene extends Scene {
  constructor() {
    super({
      backgroundSpriteName: "bg_blue",
      gameObjects: [
        new AppIcon({
          pos: new Position(16, 16),
          spriteName: "icon_email",
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
          spriteName: "icon_saves",
          appName: "Salvamentos",
          sceneReference: SAVESCENE,
        }),
      ],
    });
  }
}
