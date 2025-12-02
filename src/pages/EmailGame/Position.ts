// Posição de um objeto no jogo
export default class Position {
  x: number = 0; // Posição horizontal em pixels
  y: number = 0; // Posição vertical em pixels

  constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  /**
   * Adiciona os valores de uma dada posição à esta
   * @param pos
   * @returns
   */
  addPos(pos: Position) {
    return new Position(this.x + pos.x, this.y + pos.y);
  }

  /**
   * Subtrai os valores de uma dada posição à esta
   * @param pos
   * @returns
   */
  subtractPos(pos: Position) {
    return new Position(this.x - pos.x, this.y - pos.y);
  }

  /**
   * Adiciona os dados valores à esta posição
   * @param x
   * @param y
   * @returns
   */
  add(x: number, y: number) {
    return new Position(this.x + x, this.y + y);
  }

  /**
   * Subtrai os dados valores posição à esta
   * @param x
   * @param y
   * @returns
   */
  subtract(x: number, y: number) {
    return new Position(this.x - x, this.y - y);
  }
}
