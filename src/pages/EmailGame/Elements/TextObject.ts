import GameObject from "./GameObject";
import measureTextWidth from "../MeasureTextWidth";
import type Position from "../Position";
import type CanvasObject from "../CanvasObject";
import type Sprite from "../Sprites/Sprite";
import { findSprite } from "../Sprites/FindSprite";
import fontMaps from "../FontMaps";

// Objeto de jogo que é renderizado como texto. Usado para textos com apenas 1 linha
export default class TextObject extends GameObject {
  text: string; // Texto do objeto
  font: string; // Font usada para renderizar
  fontSprite: Sprite; // Sprite da fonte usada para renderizar
  direction: string; // Indica se o texto será escrito centralizado, para a esquerda ou para a direita a partir da posição do objeto

  constructor(args: {
    pos: Position;
    text: string;
    font: string;
    color: string;
    direction?: "left" | "right" | "center";
    ignoreClick?: boolean;
    invisible?: boolean;
  }) {
    let width = measureTextWidth(args.text, args.font);
    super({
      pos: args.pos,
      height: fontMaps[args.font].charHeight, // busca no fontMaps a altura de texto da fonte usada
      width: width,
      ignoreClick: args.ignoreClick,
      invisible: args.invisible,
    });
    this.text = args.text;
    this.font = args.font;
    this.direction = args.direction ?? "right";
    this.fontSprite = findSprite(this.font + "_" + args.color);
  }

  /**
   * Se não estiver invisível, usa um dado CanvasObject para renderizar o texto
   * @param canvasObject CanvasObject usado para renderizar o texto
   * @returns
   */
  render(canvasObject: CanvasObject): void {
    if (this.invisible) {
      return;
    }
    canvasObject.writeText(
      this.fontSprite,
      this.font,
      this.text,
      this.pos,
      this.direction,
    );
  }
}
