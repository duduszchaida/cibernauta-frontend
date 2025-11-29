export const PRESSED = "pressed"; // Representa o estado "pressionado" de uma tecla
export const HELD = "held"; // Representa o estado "segurado" de uma tecla
export const UNPRESSED = "unpressed"; // Representa o estado "não pressionado" de uma tecla

// Representa o estado atual de uma tecla
type KeyState = {
  pressState: typeof PRESSED | typeof HELD | typeof UNPRESSED; // Estado de pressionado
  read: boolean; // Indica se a tecla já foi lida
};

// Dicionário que para cada tecla guarda seu estado de tecla
const keyboardState: Record<string, KeyState> = {};

/**
 * Vincula eventListeners de "keydown" e "keyup" na janela, que para cada tecla
 * atualiza seu estado de pressionado dependendo de seu estado atual
 * e marca a tecla como não lida
 */
export function bindKeyboardEvents(element: HTMLElement) {
  element.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key == " ") {
      e.preventDefault();
    }
    // Verifica se ela já foi gravada no dicionário, criando um novo KeyState se não foi
    if (keyboardState[e.key] == null) {
      keyboardState[e.key] = { pressState: UNPRESSED, read: false };
    }
    if (keyboardState[e.key].pressState == PRESSED) {
      keyboardState[e.key].pressState = HELD;
      keyboardState[e.key].read = false;
      return;
    }
    if (
      keyboardState[e.key].pressState == null ||
      keyboardState[e.key].pressState == UNPRESSED
    ) {
      keyboardState[e.key].pressState = PRESSED;
      keyboardState[e.key].read = false;
      return;
    }
  });

  element.addEventListener("keyup", (e) => {
    if (keyboardState[e.key] == null) {
      keyboardState[e.key] = { pressState: UNPRESSED, read: false };
    }
    keyboardState[e.key].pressState = UNPRESSED;
    keyboardState[e.key].read = false;
  });
}

export default keyboardState;
