import { savesService } from "@/services/savesService";
import type { Popup } from "./Elements/Popup";
import Scene from "./Scenes/Scene";
import { DESKTOPSCENE, SAVESSCENE } from "./Scenes/SceneReferences";
import { StartScene } from "./Scenes/StartScene";
import {
  SETTINGAUTOSAVE,
  SETTINGFILTER,
  SETTINGSPOPUP,
} from "./Scenes/SettingsScene/SettingsReferences";

// TO-DO: comentar

export type LevelProgress = {
  reference: string;
  highscore: number;
  perfect: boolean;
};

export type Save = {
  lastSaveTime: Date | string | null;
  levelProgressRecord: Record<string, LevelProgress>;
  lastTotalScore: number;
  settings: {
    [SETTINGAUTOSAVE]: boolean;
    [SETTINGFILTER]: boolean;
    [SETTINGSPOPUP]: boolean;
  };
};

export default class GameState {
  inspecting: boolean = false;
  popup: Popup;
  currentSaveSlotId: number | null = null;
  currentScene!: Scene;
  currentSave!: Save;
  saveSlots!: Save[];
  lastSaveState: string = JSON.stringify({
    lastSaveTime: null,
    levelProgressRecord: {},
    lastTotalScore: 0,
    settings: {
      [SETTINGAUTOSAVE]: true,
      [SETTINGFILTER]: false,
      [SETTINGSPOPUP]: true,
    },
  });
  leaderboardUpdate!: () => Promise<void>;

  constructor(args: { popup: Popup }) {
    this.popup = args.popup;
  }

  async init(leaderboardUpdate: () => Promise<void>) {
    this.leaderboardUpdate = leaderboardUpdate;
    let savesData: any = null;
    try {
      savesData = (await savesService.getSave(1)).save_data;
    } catch (error) {
      console.warn("couldn't get save", error);
    }
    let newGame = true;
    let saves: Save[] = [
      {
        lastSaveTime: null,
        levelProgressRecord: {},
        lastTotalScore: 0,
        settings: {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGSPOPUP]: true,
        },
      },
      {
        lastSaveTime: null,
        levelProgressRecord: {},
        lastTotalScore: 0,
        settings: {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGSPOPUP]: true,
        },
      },
      {
        lastSaveTime: null,
        levelProgressRecord: {},
        lastTotalScore: 0,
        settings: {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGSPOPUP]: true,
        },
      },
    ];
    if (savesData != null) {
      saves = JSON.parse(savesData);
      saves.forEach((s) => {
        if (!s.settings) {
          s.settings = {
            [SETTINGAUTOSAVE]: true,
            [SETTINGFILTER]: false,
            [SETTINGSPOPUP]: true,
          };
        }
      });
      newGame = false;
    }
    this.currentScene = new StartScene(newGame ? DESKTOPSCENE : SAVESSCENE);
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
      settings: {
        [SETTINGAUTOSAVE]: true,
        [SETTINGFILTER]: false,
        [SETTINGSPOPUP]: true,
      },
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

  get progressSaved() {
    return this.lastSaveState == JSON.stringify(this.currentSave);
  }

  updateHighscore() {
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
    this.lastSaveState = JSON.stringify(this.saveSlots[this.currentSaveSlotId]);
    this.currentSave = JSON.parse(this.lastSaveState);
    if (!this.currentSave.settings) {
      this.currentSave.settings = {
        [SETTINGAUTOSAVE]: true,
        [SETTINGFILTER]: false,
        [SETTINGSPOPUP]: true,
      };
    }
  }

  deleteSave(index: number) {
    this.saveSlots[index] = {
      lastSaveTime: null,
      levelProgressRecord: {},
      lastTotalScore: 0,
      settings: {
        [SETTINGAUTOSAVE]: true,
        [SETTINGFILTER]: false,
        [SETTINGSPOPUP]: true,
      },
    };
    savesService.saveGame({
      game_id: 1,
      save_data: JSON.stringify(this.saveSlots),
    });
    if (this.currentSaveSlotId == index) {
      this.currentSave = {
        lastSaveTime: null,
        levelProgressRecord: {},
        lastTotalScore: 0,
        settings: {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGSPOPUP]: true,
        },
      };
      this.currentSaveSlotId = null;
    }
  }

  saveGame(manual: boolean, settings: boolean = false) {
    if (!manual && !this.currentSave.settings[SETTINGAUTOSAVE]) {
      return;
    }
    if (this.currentSaveSlotId == null) {
      alert("trying to save game on null slot id");
      return;
    }
    this.currentSave.lastSaveTime = new Date();
    this.lastSaveState = JSON.stringify(this.currentSave);
    this.saveSlots[this.currentSaveSlotId] = JSON.parse(this.lastSaveState);
    if (this.currentSave.settings[SETTINGSPOPUP]) {
      if (settings) {
        this.popup.newPopup("Configurações salvas.", 2.5);
      } else {
        this.popup.newPopup("Progresso do jogo salvo.", 2.5);
      }
    }
    savesService.saveGame({
      game_id: 1,
      save_data: JSON.stringify(this.saveSlots),
    });
    setTimeout(() => {
      this.leaderboardUpdate();
    }, 1500);
  }
}
