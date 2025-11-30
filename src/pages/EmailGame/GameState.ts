import { savesService } from "@/services/savesService";
import type { Popup } from "./Elements/Popup";
import Scene from "./Scenes/Scene";
import { DESKTOPSCENE, SAVESCENE } from "./Scenes/SceneReferences";
import { StartScene } from "./Scenes/StartScene";
import {
  SETTINGAUTOSAVE,
  SETTINGFILTER,
  SETTINGPOPUP,
} from "./Scenes/SettingsScene/SettingsReferences";

export type LevelProgress = {
  reference: string;
  highscore: number;
  perfect: boolean;
};

export type Save = {
  lastSaveTime: Date | string | null;
  levelProgressRecord: Record<string, LevelProgress>;
  lastTotalScore: number;
  settings?: {
    [SETTINGAUTOSAVE]: boolean;
    [SETTINGFILTER]: boolean;
    [SETTINGPOPUP]: boolean;
  };
};

export default class GameState {
  inspecting: boolean = false;
  popup: Popup;
  currentSaveSlotId: number | null = null;
  currentScene!: Scene;
  currentSave!: Save;
  saveSlots!: Save[];
  leaderboardUpdate!: () => Promise<void>;

  constructor(args: { popup: Popup }) {
    this.popup = args.popup;
  }

  async init(leaderboardUpdate: () => Promise<void>) {
    this.leaderboardUpdate = leaderboardUpdate;
    let savesData: any = null;
    try {
      savesData = (await savesService.getSave(1)).save_data;
      if (!savesData.settings) {
        savesData.settings = {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGPOPUP]: true,
        };
      }
    } catch {
      console.warn("couldn't get save");
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
          [SETTINGPOPUP]: true,
        },
      },
      {
        lastSaveTime: null,
        levelProgressRecord: {},
        lastTotalScore: 0,
        settings: {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGPOPUP]: true,
        },
      },
      {
        lastSaveTime: null,
        levelProgressRecord: {},
        lastTotalScore: 0,
        settings: {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGPOPUP]: true,
        },
      },
    ];
    if (savesData != null) {
      saves = JSON.parse(savesData);
      newGame = false;
    }
    this.currentScene = new StartScene(newGame ? DESKTOPSCENE : SAVESCENE);
    this.saveSlots = saves;
    if (newGame) {
      this.currentSaveSlotId = 0;
    } else {
      this.currentSaveSlotId = null;
    }
    console.log("setting currentSave empty");
    this.currentSave = {
      lastSaveTime: null,
      levelProgressRecord: {},
      lastTotalScore: 0,
      settings: {
        [SETTINGAUTOSAVE]: true,
        [SETTINGFILTER]: false,
        [SETTINGPOPUP]: true,
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
    this.currentSave = JSON.parse(
      JSON.stringify(this.saveSlots[this.currentSaveSlotId]),
    );
    if (!this.currentSave.settings) {
      this.currentSave.settings = {
        [SETTINGAUTOSAVE]: true,
        [SETTINGFILTER]: false,
        [SETTINGPOPUP]: true,
      };
    }
  }

  deleteSave(index: number) {
    this.saveSlots[index] = {
      lastSaveTime: null,
      levelProgressRecord: {},
      lastTotalScore: 0,
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
      };
      this.currentSaveSlotId = null;
    }
  }

  saveGame(manual: boolean, settings: boolean = false) {
    if (!manual && !this.currentSave.settings?.[SETTINGAUTOSAVE]) {
      return;
    }
    if (this.currentSaveSlotId == null) {
      alert("trying to save game on null slot id");
      return;
    }
    this.currentSave.lastSaveTime = new Date();
    this.saveSlots[this.currentSaveSlotId] = JSON.parse(
      JSON.stringify(this.currentSave),
    );
    console.log(this.currentSave);
    if (this.currentSave.settings?.[SETTINGPOPUP]) {
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
