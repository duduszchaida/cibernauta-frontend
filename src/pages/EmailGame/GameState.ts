import type { Popup } from "./Elements/Popup";
import Scene from "./Scenes/Scene";
import { StartScene } from "./Scenes/StartScene";

export type LevelProgress = {
  reference: string;
  highscore: number;
  perfect: boolean;
};

export type SaveSlot = {
  lastSaveTime: Date | null;
  levelProgressRecord: Record<string, LevelProgress>;
};

export default class GameState {
  currentScene: Scene;
  inspecting: boolean = false;
  popup: Popup;
  currentSaveSlotId = 0;
  saveSlots: SaveSlot[] = [
    {
      lastSaveTime: null,
      levelProgressRecord: {},
    },
    { lastSaveTime: null, levelProgressRecord: {} },
    { lastSaveTime: null, levelProgressRecord: {} },
  ];

  constructor(args: { sceneReference: string; popup: Popup }) {
    this.currentScene = new StartScene();
    this.popup = args.popup;
  }

  get currentSaveSlot() {
    return this.saveSlots[this.currentSaveSlotId];
  }

  get currentSaveSlotTotalScore() {
    let result = 0;
    for (const key in this.currentSaveSlot.levelProgressRecord) {
      const lp = this.currentSaveSlot.levelProgressRecord[key];
      result += lp.highscore;
    }
    return result;
  }

  selectSave(index: number) {
    this.currentSaveSlotId = index;
  }

  saveGame(manual: boolean = false) {
    this.saveSlots[this.currentSaveSlotId].lastSaveTime = new Date();
    if (manual) {
      this.popup.newPopup("Progresso do jogo salvo.", 2.5);
    }
  }
}
