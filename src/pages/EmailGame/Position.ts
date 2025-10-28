export default class Position {
	x: number = 0;
	y: number = 0;

	constructor(x?: number, y?: number) {
		this.x = x ?? 0;
		this.y = y ?? 0;
	}

	add(pos: Position) {
		return new Position(this.x + pos.x, this.y + pos.y);
	}
}
