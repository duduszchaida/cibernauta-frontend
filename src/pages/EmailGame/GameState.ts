import type { Popup } from "./Elements/Popup";
import Scene from "./Scenes/Scene";
import sceneList from "./Scenes/SceneList";

export type LevelProgress = {
  reference: string;
  highscore: number;
  perfect: boolean;
};

export type SaveSlot = {
  lastSaveTime: Date | null;
  levelProgress: LevelProgress[];
};

export default class GameState {
  sceneList = sceneList;
  currentScene: Scene;
  inspecting: boolean = false;
  popup: Popup;
  currentSaveSlot = 0;
  score: number = 0;
  saveSlots: SaveSlot[] = [
    {
      lastSaveTime: null,
      levelProgress: [],
    },
    { lastSaveTime: null, levelProgress: [] },
    { lastSaveTime: null, levelProgress: [] },
  ];

  constructor(args: { sceneReference: string; popup: Popup }) {
    this.currentScene = this.sceneList[args.sceneReference];
    this.popup = args.popup;
  }

  selectSave(index: number) {
    this.currentSaveSlot = index;
  }

  saveGame(manual: boolean = false) {
    this.saveSlots[this.currentSaveSlot].lastSaveTime = new Date();
    if (manual) {
      this.popup.newPopup("Progresso do jogo salvo.", 2.5);
    }
  }
}

// import {
//   TESTLEVEL,
//   TESTLEVEL2,
//   TESTLEVEL3,
//   TESTLEVEL4,
//   TESTLEVEL5,
// } from "./LevelSelectionScene/LevelList";
// {
//   highscore: 5000,
//   reference: TESTLEVEL,
//   perfect: true,
// },
// {
//   highscore: 10000,
//   reference: TESTLEVEL2,
//   perfect: false,
// },
// {
//   highscore: 12350,
//   reference: TESTLEVEL3,
//   perfect: true,
// },
// {
//   highscore: 5,
//   reference: TESTLEVEL4,
//   perfect: false,
// },
// {
//   highscore: 0,
//   reference: TESTLEVEL5,
//   perfect: false,
// },
