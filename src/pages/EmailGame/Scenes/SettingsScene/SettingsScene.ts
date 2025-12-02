import { appBorder } from "../../Elements/AppBorder";
import { ExitButton } from "../../Elements/ExitButton";
import TextObject from "../../Elements/TextObject";
import type GameState from "../../GameState";
import Position from "../../Position";
import Scene from "../Scene";
import { DESKTOPSCENE } from "../SceneReferences";
import {
  SETTINGAUTOSAVE,
  SETTINGFILTER,
  SETTINGSPOPUP,
  type Setting,
} from "./SettingsReferences";
import { Toggle } from "./Toggle";

// Cena de opções
export class SettingsScene extends Scene {
  gameState: GameState;
  constructor(gameState: GameState) {
    super({
      backgroundSpriteName: "bg_settings",
      gameObjects: [appBorder, new ExitButton(DESKTOPSCENE)],
    });
    this.gameState = gameState;
    this.generateSettings();
  }

  /**
   * Gera os botões de opções de acordo com as opções atuais
   */
  generateSettings() {
    if (!this.gameState.currentSave.settings) {
      this.gameState.currentSave.settings = {
        [SETTINGAUTOSAVE]: true,
        [SETTINGFILTER]: false,
        [SETTINGSPOPUP]: true,
      };
    }
    const autoSaveText = new TextObject({
      pos: new Position(200, 58),
      color: "dark_blue",
      font: "wcp",
      text: "Salvamento Automático",
      direction: "left",
    });
    const savePopupText = new TextObject({
      pos: new Position(200, 90),
      color: "dark_blue",
      font: "wcp",
      text: "Mensagem de salvamento",
      direction: "left",
    });
    const filterText = new TextObject({
      pos: new Position(200, 122),
      color: "dark_blue",
      font: "wcp",
      text: "Filtro visual",
      direction: "left",
    });

    this.gameObjects = [
      ...this.gameObjects,
      autoSaveText,
      new Toggle(
        SETTINGAUTOSAVE,
        this.gameState.currentSave.settings[SETTINGAUTOSAVE],
        0,
      ),
      savePopupText,
      new Toggle(
        SETTINGSPOPUP,
        this.gameState.currentSave.settings[SETTINGSPOPUP],
        1,
      ),
      filterText,
      new Toggle(
        SETTINGFILTER,
        this.gameState.currentSave.settings[SETTINGFILTER],
        2,
      ),
    ];
  }

  /**
   * Altera uma das opções
   * @param config
   * @returns
   */
  toggle(config: Setting) {
    this.gameState.currentSave.settings[config] =
      !this.gameState.currentSave.settings[config];
  }
}
