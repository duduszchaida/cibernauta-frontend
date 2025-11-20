import {
  TESTLEVEL,
  TESTLEVEL2,
  TESTLEVEL3,
  TESTLEVEL4,
  TESTLEVEL5,
} from "./LevelSelectionScene/LevelSelectionScene";
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
  currentSaveSlot = 0;
  saveState: SaveSlot[] = [
    {
      lastSaveTime: new Date(),
      levelProgress: [
        {
          highscore: 5000,
          reference: TESTLEVEL,
          perfect: true,
        },
        {
          highscore: 10000,
          reference: TESTLEVEL2,
          perfect: false,
        },
        {
          highscore: 12350,
          reference: TESTLEVEL3,
          perfect: true,
        },
        {
          highscore: 5,
          reference: TESTLEVEL4,
          perfect: false,
        },
        {
          highscore: 0,
          reference: TESTLEVEL5,
          perfect: false,
        },
      ],
    },
    { lastSaveTime: null, levelProgress: [] },
    { lastSaveTime: null, levelProgress: [] },
  ];

  constructor(args: { sceneName: string }) {
    this.currentScene = this.sceneList[args.sceneName];
  }
}
