import type CanvasObject from "../CanvasObject";
import Position from "../Position";
import { findSprite } from "../Sprites/FindSprite";
import SceneChanger from "./SceneChanger";

// Ícones utilizados na DesktopScene, se diferencia de SceneChanger por renderizar o texto de appName abaixo do Sprite
export default class AppIcon extends SceneChanger {
  textLines: string[]; // Texto que será escrito embaixo do ícone

  constructor(args: {
    pos: Position;
    spriteName: string;
    hoverSpriteName: string;
    textLines?: string[];
    clickFunction?: Function;
    width?: number;
    height?: number;
    sceneReference?: string;
  }) {
    super(args);
    this.textLines = args.textLines ?? [];
  }

  /**
   * Desenha o sprite do objeto de acordo com seu estado e escreve o texto abaixo do objeto
   * @param canvasObject
   */
  render(canvasObject: CanvasObject) {
    let sprite = this.sprite;
    if (this.heldSprite && this.cursorHeld) {
      sprite = this.heldSprite;
    } else if (this.hoverSprite && this.cursorHovering) {
      sprite = this.hoverSprite;
    }
    // Desenha o Sprite do ícone
    canvasObject.drawSprite(sprite, this.pos, this.width, this.height);
    // Escreve o texto abaixo do ícone
    this.textLines.forEach((line, i) => {
      canvasObject.writeText(
        findSprite("minecraftia_bnw"),
        "minecraftia",
        line,
        this.pos.addPos(new Position(18, 32 + i * 12)),
        "center",
      );
    });
  }
}
