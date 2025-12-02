import AppIcon from "../Elements/AppIcon";
import { Clock } from "../Elements/Clock";
import GameObject from "../Elements/GameObject";
import Position from "../Position";
import Scene from "./Scene";
import { LEVELSELECTION, SAVESSCENE, SETTINGSSCENE } from "./SceneReferences";

export const MANUALSAVE = "manualSave"; // Referência da ação de salvamento manual do jogo
export const SAVEWARNING = "savewarningAccept"; // Referência da ação de aceitar/negar o aviso de progresso não salvo

// Objeto de aviso de progresso não salvo
const saveWarning = new GameObject({
  height: 256,
  width: 352,
  spriteName: "saves_warning",
  invisible: true,
});

// Objeto do botão para aceitar o aviso
const warningAccept = new GameObject({
  pos: new Position(118, 176),
  width: 39,
  height: 23,
  spriteName: "btn_yes",
  heldSpriteName: "btn_yes_held",
  invisible: true,
  clickFunction: () => {
    return { type: SAVEWARNING, decision: true };
  },
});

// Objeto do botão para negar o aviso
const warningDecline = new GameObject({
  pos: new Position(195, 176),
  height: 23,
  width: 39,
  spriteName: "btn_no",
  heldSpriteName: "btn_no_held",
  invisible: true,
  clickFunction: () => {
    return { type: SAVEWARNING, decision: false };
  },
});

// Cena da "área de trabalho"
export class DesktopScene extends Scene {
  saveWarning = saveWarning;
  warningAccept = warningAccept;
  warningDecline = warningDecline;
  constructor(autoSave: boolean) {
    super({
      backgroundSpriteName: "bg_blue",
      gameObjects: [
        new AppIcon({
          pos: new Position(20, 16),
          spriteName: "icon_email",
          hoverSpriteName: "icon_email_hover",
          textLines: ["Treinamento"],
          sceneReference: LEVELSELECTION,
        }),
        new AppIcon({
          pos: new Position(20, 80),
          spriteName: "icon_saves",
          hoverSpriteName: "icon_saves_hover",
          textLines: ["Carregar", "Progresso"],
          sceneReference: SAVESSCENE,
        }),
        new AppIcon({
          pos: new Position(304, 204),
          spriteName: "icon_settings",
          hoverSpriteName: "icon_settings_hover",
          textLines: ["Opções"],
          sceneReference: SETTINGSSCENE,
        }),
        new Clock(new Position(348, 0)),
      ],
    });
    if (!autoSave) {
      this.gameObjects.push(
        new AppIcon({
          pos: new Position(20, 144),
          spriteName: "icon_save",
          hoverSpriteName: "icon_save_hover",
          textLines: ["Salvar Jogo"],
          clickFunction: () => {
            return { type: MANUALSAVE };
          },
        }),
      );
    }
    this.gameObjects.push(saveWarning, warningAccept, warningDecline);
    this.saveWarning.invisible = true;
    this.warningAccept.invisible = true;
    this.warningDecline.invisible = true;
  }

  /**
   * Alterna a visibilidade do aviso e seus botões
   */
  toggleSaveWarning() {
    this.saveWarning.invisible = !this.saveWarning.invisible;
    this.warningAccept.invisible = !this.warningAccept.invisible;
    this.warningDecline.invisible = !this.warningDecline.invisible;
  }
}
