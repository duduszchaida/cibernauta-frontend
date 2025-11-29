import { appBorder } from "../Elements/AppBorder";
import { ExitButton } from "../Elements/ExitButton";
import Scene from "./Scene";
import { DESKTOPSCENE } from "./SceneReferences";

export class SettingsScene extends Scene {
  constructor() {
    super({
      backgroundSpriteName: "bg_settings",
      gameObjects: [appBorder, new ExitButton(DESKTOPSCENE)],
    });
  }
}
