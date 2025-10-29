export const PRESSED = "pressed";
export const HELD = "held";
export const UNPRESSED = "unpressed";

const keyboardState: Record<
	string,
	typeof PRESSED | typeof HELD | typeof UNPRESSED
> = {};

export function bindKeyboardEvents(element: HTMLElement) {
	element.addEventListener("keydown", (e) => {
		if (keyboardState[e.key] == PRESSED) {
			keyboardState[e.key] = HELD;
			return;
		}
		if (keyboardState[e.key] == null || UNPRESSED) {
			keyboardState[e.key] = PRESSED;
			return;
		}
	});

	document.addEventListener("keyup", (e) => {
		keyboardState[e.key] = UNPRESSED;
	});
}

export default keyboardState;
