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

// Objeto de progresso de nível
export type LevelProgress = {
  reference: string; // Referência do objeto de nível
  highscore: number; // Pontuação recorde no nível
  perfect: boolean; // Identifica se o nível já foi completo sem erros
};

// Objeto de salvamento de progresso
export type Save = {
  lastSaveTime: Date | string | null; // Data do ultimo salvamento
  levelProgressRecord: Record<string, LevelProgress>; // Dicionário de progresso de níveis
  totalScore: number; // Pontuação total
  settings: {
    [SETTINGAUTOSAVE]: boolean;
    [SETTINGFILTER]: boolean;
    [SETTINGSPOPUP]: boolean;
  }; // Objeto de opções; true = ativo; false = inativo
};

// Objeto de estado do jogo
export default class GameState {
  popup: Popup; // Objeto de popup para mensagem de salvamento
  inspecting: boolean = false; // Indica se o jogador está no estado de inspecionar
  currentSaveSlotId: number | null = null; // Id do salvamento atual selecionado
  currentScene!: Scene; // Cena atual
  currentSave!: Save; // Salvamento atual
  saveSlots!: Save[]; // Lista de salvamentos
  lastSaveState!: string; // Último estado salvo durante o jogo
  leaderboardUpdate!: () => Promise<void>; // Função de atualizar o placar

  constructor(args: { popup: Popup }) {
    this.popup = args.popup;
  }

  /**
   * Inicializa o objeto
   * @param leaderboardUpdate
   */
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
        totalScore: 0,
        settings: {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGSPOPUP]: true,
        },
      },
      {
        lastSaveTime: null,
        levelProgressRecord: {},
        totalScore: 0,
        settings: {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGSPOPUP]: true,
        },
      },
      {
        lastSaveTime: null,
        levelProgressRecord: {},
        totalScore: 0,
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
      totalScore: 0,
      settings: {
        [SETTINGAUTOSAVE]: true,
        [SETTINGFILTER]: false,
        [SETTINGSPOPUP]: true,
      },
    };
    this.lastSaveState = JSON.stringify(this.currentSave);
  }

  /**
   * Pontuação total do salvamento atualmente selecionado
   */
  get currentSaveSlotTotalScore() {
    let result = 0;
    for (const key in this.currentSave?.levelProgressRecord) {
      const lp = this.currentSave.levelProgressRecord[key];
      result += lp.highscore;
    }
    return result;
  }

  /**
   * Indica se o estado de salvamento atual é o mesmo que o último salvo
   */
  get progressSaved() {
    return this.lastSaveState == JSON.stringify(this.currentSave);
  }

  /**
   * Atualiza a pontuação do jogador com a pontuação total atual
   */
  updateHighscore() {
    if (this.currentSaveSlotTotalScore > this.currentSave.totalScore) {
      this.currentSave.totalScore = this.currentSaveSlotTotalScore;
      savesService.updateHighscore({
        game_id: 1,
        score: this.currentSaveSlotTotalScore,
      });
    }
  }

  /**
   * Altera o salvamento atual selecionado de acordo com o dado Id
   * @param index
   */
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

  /**
   * Reseta o save indicado pelo dado Id
   * @param index
   */
  deleteSave(index: number) {
    this.saveSlots[index] = {
      lastSaveTime: null,
      levelProgressRecord: {},
      totalScore: 0,
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
        totalScore: 0,
        settings: {
          [SETTINGAUTOSAVE]: true,
          [SETTINGFILTER]: false,
          [SETTINGSPOPUP]: true,
        },
      };
      this.currentSaveSlotId = null;
    }
  }

  /**
   * Salva o estado atual do jogo no salvamento com o Id selecionado atual
   * @param manual Indica se é manual e não automático
   * @param settings Indica se é um salvamento a partir das opções
   * @returns
   */
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
