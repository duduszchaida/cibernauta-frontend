import type { Popup } from "./Elements/Popup";
import Scene from "./Scenes/Scene";
import { DESKTOPSCENE, SAVESCENE } from "./Scenes/SceneReferences";
import { StartScene } from "./Scenes/StartScene";

export type LevelProgress = {
  reference: string;
  highscore: number;
  perfect: boolean;
};

export type Save = {
  lastSaveTime: Date | string | null;
  levelProgressRecord: Record<string, LevelProgress>;
};

export default class GameState {
  currentScene: Scene;
  inspecting: boolean = false;
  popup: Popup;
  currentSaveSlotId: number | null = null;
  currentSave: Save;
  saveSlots: Save[];

  constructor(args: { newGame: boolean; popup: Popup; saveSlots: any }) {
    this.currentScene = new StartScene(args.newGame ? DESKTOPSCENE : SAVESCENE);
    this.popup = args.popup;
    this.saveSlots = args.saveSlots as Save[];
    if (args.newGame) {
      this.currentSaveSlotId = 0;
    } else {
      this.currentSaveSlotId = null;
    }
    this.currentSave = {
      lastSaveTime: null,
      levelProgressRecord: {},
    };
  }

  get currentSaveSlotTotalScore() {
    let result = 0;
    for (const key in this.currentSave?.levelProgressRecord) {
      const lp = this.currentSave.levelProgressRecord[key];
      result += lp.highscore;
    }
    return result;
  }

  selectSave(index: number) {
    this.currentSaveSlotId = index;
    this.currentSave = JSON.parse(
      JSON.stringify(this.saveSlots[this.currentSaveSlotId]),
    );
  }

  saveGame(manual: boolean = false) {
    if (this.currentSaveSlotId == null) {
      alert("error in save slot id, id is null/undefined while trying to save");
      return;
    }
    this.currentSave.lastSaveTime = new Date();
    this.saveSlots[this.currentSaveSlotId] = JSON.parse(
      JSON.stringify(this.currentSave),
    );
    if (manual) {
      this.popup.newPopup("Progresso do jogo salvo.", 2.5);
    }
    localStorage.setItem("mail_save", JSON.stringify(this.saveSlots));
  }
}
