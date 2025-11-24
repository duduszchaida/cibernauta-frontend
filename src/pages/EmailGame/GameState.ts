import type { Popup } from "./Elements/Popup";
import Scene from "./Scenes/Scene";
import sceneList from "./Scenes/SceneList";
import { savesService } from "../../services/api";

export type LevelProgress = {
  reference: string;
  highscore: number;
  perfect: boolean;
};

export type SaveData = {
  lastSaveTime: Date | null;
  levelProgress: LevelProgress[];
  currentScene: string;
  score: number;
};

export default class GameState {
  sceneList = sceneList;
  currentScene: Scene;
  inspecting: boolean = false;
  popup: Popup;
  score: number = 0;
  levelProgress: LevelProgress[] = [];
  lastSaveTime: Date | null = null;

  constructor(args: { sceneReference: string; popup: Popup }) {
    this.currentScene = this.sceneList[args.sceneReference];
    this.popup = args.popup;
    this.loadGame();
  }

  async loadGame() {
    try {
      const save = await savesService.getSave();
      if (save && save.save_data) {
        const saveData: SaveData = JSON.parse(save.save_data);
        this.levelProgress = saveData.levelProgress || [];
        this.score = saveData.score || 0;
        this.lastSaveTime = saveData.lastSaveTime ? new Date(saveData.lastSaveTime) : null;
        if (saveData.currentScene && this.sceneList[saveData.currentScene]) {
          this.currentScene = this.sceneList[saveData.currentScene];
        }
      }
    } catch (error) {
      console.error("Erro ao carregar save:", error);
    }
  }

  async saveGame(manual: boolean = false) {
    try {
      const saveData: SaveData = {
        lastSaveTime: new Date(),
        levelProgress: this.levelProgress,
        currentScene: Object.keys(this.sceneList).find(
          key => this.sceneList[key] === this.currentScene
        ) || '',
        score: this.score,
      };

      await savesService.saveGame({
        save_data: JSON.stringify(saveData),
      });

      this.lastSaveTime = new Date();

      if (manual) {
        this.popup.newPopup("Progresso do jogo salvo.", 2.5);
      }
    } catch (error) {
      console.error("Erro ao salvar jogo:", error);
      if (manual) {
        this.popup.newPopup("Erro ao salvar progresso.", 2.5);
      }
    }
  }

  resetGame() {
    this.levelProgress = [];
    this.score = 0;
    this.saveGame(false);
  }
}

