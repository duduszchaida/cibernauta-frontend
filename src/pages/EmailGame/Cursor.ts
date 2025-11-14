import type CanvasObject from "./CanvasObject";
import { findSprite } from "./FindSprite";
import Position from "./Position";
import type { SpriteList } from "./SpriteList";

export default class Cursor {
	pos: Position = new Position(-32, -32);
	state: "arrow" | "pointer" | "inspect" = "arrow";
	inspecting: boolean = false;
	spriteList: SpriteList = {
		arrow: findSprite("cursor_arrow"),
	};
	spriteShift: Position = new Position();
	render(canvas: CanvasObject) {
		if (this.spriteList[this.state] == null) {
			this.spriteList[this.state] = findSprite("cursor_" + this.state);
		}
		canvas.drawSprite(
			this.spriteList[this.state],
			this.pos.add(this.spriteShift),
			new Position(32, 32)
		);
	}
}
