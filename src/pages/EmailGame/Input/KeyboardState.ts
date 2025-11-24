export const PRESSED = "pressed";
export const HELD = "held";
export const UNPRESSED = "unpressed";

const keyboardState: Record<
<<<<<<< HEAD
  string,
  { keyState: typeof PRESSED | typeof HELD | typeof UNPRESSED; read: boolean }
> = {};

export function bindKeyboardEvents() {
  window.addEventListener("keydown", (e) => {
    // console.log(e.key)
    if (keyboardState[e.key] == null) {
      keyboardState[e.key] = { keyState: UNPRESSED, read: false };
    }
    if (keyboardState[e.key].keyState == PRESSED) {
      keyboardState[e.key].keyState = HELD;
      keyboardState[e.key].read = false;
      return;
    }
    if (
      keyboardState[e.key].keyState == null ||
      keyboardState[e.key].keyState == UNPRESSED
    ) {
      keyboardState[e.key].keyState = PRESSED;
      keyboardState[e.key].read = false;
      return;
    }
  });

  document.addEventListener("keyup", (e) => {
    if (keyboardState[e.key] == null) {
      keyboardState[e.key] = { keyState: UNPRESSED, read: false };
    }
    keyboardState[e.key].keyState = UNPRESSED;
    keyboardState[e.key].read = false;
  });
=======
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
>>>>>>> teste
}

export default keyboardState;
