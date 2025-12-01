import type CanvasObject from "../CanvasObject";
import { findSprite } from "../FindSprite";
import Hitbox from "../Hitbox";
import Position from "../Position";
import type Sprite from "./Sprite";

// Objeto que representa elementos no jogo
export default class GameObject {
  pos: Position; // Posição do objeto no elemento de canvas
  height: number; // Altura do objeto
  width: number; // Largura do objeto
  hitbox: Hitbox; // Objeto de hitbox, usado para verificar se o mouse está sobrepondo o objeto

  sprite: Sprite; // Sprite que será renderizado no elemento de canvas
  invisible: boolean; // Indica se o objeto ignora a renderização
  cursorHovering: boolean = false; // Indica se o cursor está encima do objeto
  hoverSprite?: Sprite; // Sprite alternativo renderizado quando o cursor está encima do objeto
  cursorHeld: boolean = false; // Indica se o cursor está segurado no objeto
  heldSprite?: Sprite; // Sprite alternativo renderizado quando o cursor está segurado no objeto

  ignoreClick: boolean; // Indica se o objeto é ignorado na função de click do mouse
  clickFunction: Function | null; // Função chamada quando o mouse clica o objeto.
  // Possúi retorno genêrico para múltiplas possibilidades de funções

  dragFunction: Function | null; // Função chamada quando o mouse arrasta sobre o objeto
  // Possúi retorno genêrico para múltiplas possibilidades de funções

  constructor(args: {
    pos?: Position;
    spriteName?: string; // String usada para encontrar o objeto de Sprite correspondente
    hoverSpriteName?: string; // String usada para encontrar o objeto de Sprite correspondente
    heldSpriteName?: string; // String usada para encontrar o objeto de Sprite correspondente
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
   * Chama o dado CanvasObject para renderiza sua sprite com sua posição e dimensões
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
    }
    if (this.hoverSprite && (this.cursorHovering || this.cursorHeld)) {
      sprite = this.hoverSprite;
    }
    canvasObject.drawSprite(sprite, this.pos, this.width, this.height);
  }
}
