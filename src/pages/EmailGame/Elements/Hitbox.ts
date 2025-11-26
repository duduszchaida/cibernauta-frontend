import Position from "../Position";

// Objeto que representa o volume de um elemento
export default class Hitbox {
  pos: Position; // Posição do elemento
  width: number; // Largura do elemento
  height: number; // Altura do elemento

  constructor(args: { pos: Position; width: number; height: number }) {
    this.pos = args.pos;
    this.width = args.width;
    this.height = args.height;
  }

  // Retorna um indicador se uma dada posição está contida dentro de sua largura e altura
  positionInside(targetPos: Position): boolean {
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
