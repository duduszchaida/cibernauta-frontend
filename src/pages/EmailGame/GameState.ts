import Scene from "./Scenes/Scene";
import sceneList from "./Scenes/SceneList";

export type SaveSlot = {
  lastSaveTime: Date | null;
};

export type SaveState = {
  slot1: SaveSlot;
  slot2: SaveSlot;
  slot3: SaveSlot;
};

export default class GameState {
  sceneList = sceneList;
  currentScene: Scene;
  inspecting: boolean = false;
  currentSaveSlot = 1;
  saveState: SaveState = {
    slot1: { lastSaveTime: new Date() },
    slot2: { lastSaveTime: null },
    slot3: { lastSaveTime: null },
  };

  constructor(args: { sceneName: string }) {
    this.currentScene = this.sceneList[args.sceneName];
  }
}
