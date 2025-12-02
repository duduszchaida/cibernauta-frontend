import Position from "./Position";

// Dimensões de interação um objeto de jogo
export default class Hitbox {
  pos: Position; // Posição do objeto
  width: number; // Largura do objeti
  height: number; // Altura do objeto

  constructor(args: { pos: Position; width: number; height: number }) {
    this.pos = args.pos;
    this.width = args.width;
    this.height = args.height;
  }

  /**
   * Identifica se uma dada posição está dentro das dimensões do objeto
   * @param targetPos
   * @returns boolean
   */
  positionInside(targetPos: Position) {
    const { pos, width, height } = this;
    const { x, y } = targetPos;
    if (x < pos.x || y < pos.y) {
      return false;
    }
    const endX = pos.x + width;
    const endY = pos.y + height;
    if (x >= endX || y >= endY) {
      return false;
    }
    return true;
  }
}
