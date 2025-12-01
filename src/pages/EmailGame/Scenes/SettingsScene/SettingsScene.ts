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
  SETTINGSAVEWARNING,
  type Setting,
} from "./SettingsReferences";
import { Toggle } from "./Toggle";

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

  generateSettings() {
    if (!this.gameState.currentSave.settings) {
      this.gameState.currentSave.settings = {
        [SETTINGAUTOSAVE]: true,
        [SETTINGFILTER]: false,
        [SETTINGSAVEWARNING]: true,
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
        SETTINGSAVEWARNING,
        this.gameState.currentSave.settings[SETTINGSAVEWARNING],
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

  toggle(config: Setting) {
    if (!this.gameState.currentSave.settings) {
      return;
    }
    this.gameState.currentSave.settings[config] =
      !this.gameState.currentSave.settings[config];
  }
}
