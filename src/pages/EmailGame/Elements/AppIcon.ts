import type CanvasObject from "../CanvasObject";
import Position from "../Position";
import { findSprite } from "../FindSprite";
import SceneChanger from "./SceneChanger";

// Ícones utilizados na DesktopScene, se diferencia de SceneChanger por renderizar o texto de appName abaixo do Sprite
export default class AppIcon extends SceneChanger {
  appName: string; // Texto que será escrito embaixo do ícone

  constructor(args: {
    pos: Position;
    spriteName: string;
    appName?: string;
    clickFunction?: Function;
    width?: number;
    height?: number;
    sceneReference?: string;
  }) {
    super(args);
    this.appName = args.appName ?? "";
  }

  render(canvasObject: CanvasObject) {
    // Desenha o Sprite do ícone
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
    // Escreve o texto abaixo do ícone
    canvasObject.writeText(
      findSprite("minecraftia_bnw"),
      "minecraftia",
      this.appName,
      this.pos.addPos(new Position(18, 32)),
      "center",
    );
  }
}
