export default class Position {
  x: number = 0;
  y: number = 0;

  constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  addPos(pos: Position) {
    return new Position(this.x + pos.x, this.y + pos.y);
  }

  subtractPos(pos: Position) {
    return new Position(this.x - pos.x, this.y - pos.y);
  }

  add(x: number, y: number) {
    return new Position(this.x + x, this.y + y);
  }

  subtract(x: number, y: number) {
    return new Position(this.x - x, this.y - y);
  }
}
