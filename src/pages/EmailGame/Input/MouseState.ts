import Position from "../Position";

const mouseState: {
	held: boolean;
	click: boolean;
	pos: Position;
	dragging: boolean;
	draggingFrom: Position;
} = {
	held: false,
	pos: new Position(),
	dragging: false,
	click: false,
	draggingFrom: new Position(),
};

export function bindMouseEvents(element: HTMLElement, gameScale: number) {
	element.addEventListener("mousedown", () => {
		mouseState.held = true;
	});
	element.addEventListener("mouseup", () => {
		if (mouseState.held) {
			mouseState.click = true;
		}
		mouseState.held = false;
	});
	element.addEventListener("mousemove", (e) => {
		if (mouseState.held && !mouseState.dragging) {
			mouseState.dragging = true;
			mouseState.draggingFrom = new Position(
				e.offsetX / gameScale,
				e.offsetY / gameScale
			);
		}
		mouseState.pos = new Position(e.offsetX / gameScale, e.offsetY / gameScale);
	});
}

export default mouseState;
