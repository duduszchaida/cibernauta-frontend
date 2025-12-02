import type CanvasObject from "./CanvasObject";
import { findSprite } from "./Sprites/FindSprite";
import Position from "./Position";
import type Sprite from "./Sprites/Sprite";

export const CURSORARROW = "arrow";
export const CURSORPOINTER = "pointer";
export const CURSORINSPECT = "inspect";
export const CURSORLEFT = "left";
export const CURSORRIGHT = "right";

type cursorStates =
  | typeof CURSORARROW
  | typeof CURSORPOINTER
  | typeof CURSORINSPECT
  | typeof CURSORLEFT
  | typeof CURSORRIGHT;

// Objeto que representa o cursor do jogador
export default class Cursor {
  pos: Position = new Position(-32, -32); // Posição do cursor no jogo
  state: cursorStates = CURSORARROW; // Estado do cursor
  spriteList: Record<string, Sprite> = {
    [CURSORARROW]: findSprite("cursor_arrow"),
    [CURSORPOINTER]: findSprite("cursor_pointer"),
    [CURSORINSPECT]: findSprite("cursor_inspect"),
    [CURSORLEFT]: findSprite("cursor_left"),
    [CURSORRIGHT]: findSprite("cursor_right"),
  }; // Dicionário de sprites para estados
  spriteShift: Position = new Position(); // Coordenadas para alterar a renderização do cursor em relação à sua posição

  /**
   * Com um dado canvas object renderiza seu sprite de acordo com seu estado e shift
   * @param canvas
   */
  render(canvas: CanvasObject) {
    if (this.spriteList[this.state] == null) {
      this.spriteList[this.state] = findSprite("cursor_" + this.state);
    }
    canvas.drawSprite(
      this.spriteList[this.state],
      this.pos.addPos(this.spriteShift),
      32,
      32,
    );
  }
}
