import type CanvasObject from "../CanvasObject";
import { findSprite } from "../FindSprite";
import Hitbox from "../Hitbox";
import Position from "../Position";
import type Sprite from "./Sprite";

// Objeto que representa elementos no jogo
export default class GameObject {
  pos: Position; // Posição do objeto no elemento de canvas
  sprite: Sprite; // Sprite que será renderizado no elemento de canvas
  height: number; // Altura do objeto
  width: number; // Largura do objeto
  hitbox: Hitbox; // Objeto de hitbox, usado para verificar se o mouse está sobrepondo o objeto
  invisible: boolean; // Indica se o objeto ignora a renderização
  ignoreClick: boolean; // Indica se o objeto é ignorado na função de click do mouse
  cursorHovering: boolean = false;
  hoverSprite?: Sprite;
  cursorHeld: boolean = false;
  heldSprite?: Sprite;

  clickFunction: Function | null; // Função chamada quando o mouse clica o objeto.
  // Possúi retorno genêrico para múltiplas possibilidades de funções
  dragFunction: Function | null; // Função chamada quando o mouse arrasta sobre o objeto
  // Possúi retorno genêrico para múltiplas possibilidades de funções

  constructor(args: {
    pos?: Position;
    spriteName?: string; // String usada para encontrar o objeto de Sprite correspondente
    hoverSpriteName?: string;
    heldSpriteName?: string;
    width: number;
    height: number;
    hitbox?: Hitbox;
    clickFunction?: Function;
    dragFunction?: Function;
    invisible?: boolean;
    ignoreClick?: boolean;
  }) {
    this.pos = args.pos ?? new Position();
    this.sprite = findSprite(args.spriteName ?? "cam");
    if (args.hoverSpriteName) {
      this.hoverSprite = findSprite(args.hoverSpriteName);
    }
    if (args.heldSpriteName) {
      this.heldSprite = findSprite(args.heldSpriteName);
    }
    this.width = args.width;
    this.height = args.height;
    this.hitbox =
      args.hitbox ??
      new Hitbox({
        pos: this.pos,
        width: this.width,
        height: this.height,
      });
    this.clickFunction = args.clickFunction ?? null;
    this.dragFunction = args.dragFunction ?? null;
    this.invisible = args.invisible ?? false;
    this.ignoreClick = args.ignoreClick ?? false;
  }

  /**
   * Chama o dado CanvasObject e caso objeto não seja invisível renderiza sua sprite em sua posição com suas dimensões de largura e altura
   * @param canvasObject CanvasObject utilizado para renderizar Sprite do objeto
   * @returns
   */
  render(canvasObject: CanvasObject) {
    if (this.invisible) {
      return;
    }
    let sprite = this.sprite;
    if (this.heldSprite && this.cursorHeld) {
      sprite = this.heldSprite;
    } else if (this.hoverSprite && this.cursorHovering) {
      sprite = this.hoverSprite;
    }
    canvasObject.drawSprite(sprite, this.pos, this.width, this.height);
  }
}
