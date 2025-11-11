import Email from "./Email";
import Scene from "./Scenes/Scene";
import sceneList from "./Scenes/SceneList";

export default class GameState {
  sceneList = sceneList;
  currentScene: Scene;
  email?: Email;
  constructor(args: { sceneName: string }) {
    this.currentScene = this.sceneList[args.sceneName];
  }
}
