import { savesService } from "@/services/savesService";
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
  lastTotalScore: number;
};

let savesData: any = null;
try {
  savesData = (await savesService.getSave(1)).save_data;
} catch {
  console.warn("couldn't get save");
}
let newGame = true;
let saves: Save[] = [
  { lastSaveTime: null, levelProgressRecord: {}, lastTotalScore: 0 },
  { lastSaveTime: null, levelProgressRecord: {}, lastTotalScore: 0 },
  { lastSaveTime: null, levelProgressRecord: {}, lastTotalScore: 0 },
];
if (savesData != null) {
  saves = JSON.parse(savesData);
  newGame = false;
}

export default class GameState {
  currentScene: Scene;
  inspecting: boolean = false;
  popup: Popup;
  currentSaveSlotId: number | null = null;
  currentSave: Save;
  saveSlots: Save[];

  constructor(args: { popup: Popup }) {
    this.currentScene = new StartScene(newGame ? DESKTOPSCENE : SAVESCENE);
    this.popup = args.popup;
    this.saveSlots = saves;
    if (newGame) {
      this.currentSaveSlotId = 0;
    } else {
      this.currentSaveSlotId = null;
    }
    this.currentSave = {
      lastSaveTime: null,
      levelProgressRecord: {},
      lastTotalScore: 0,
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

  updateHighscore() {
    console.log(this.currentSave.lastTotalScore);
    if (this.currentSaveSlotTotalScore > this.currentSave.lastTotalScore) {
      this.currentSave.lastTotalScore = this.currentSaveSlotTotalScore;
      savesService.updateHighscore({
        game_id: 1,
        score: this.currentSaveSlotTotalScore,
      });
    }
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
    savesService.saveGame({
      game_id: 1,
      save_data: JSON.stringify([this.saveSlots]),
    });
  }
}
