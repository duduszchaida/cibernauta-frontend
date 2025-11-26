import Position from "../Position";

// Objeto que guarda o estado atual do mouse
const mouseState: {
  pos: Position; // Posição atual do mouse no elemento canvas
  held: boolean; // Identifica se o mouse está sendo segurado
  click: boolean; // Identifica se o mouse foi clicado
  dragging: boolean; // Identifica se o mouse está arrastando
  draggingFrom: Position; // Identifica de que posição no canvas o mouse está arrastando
  scroll: number; // Valor atual de scroll da roda do mouse
} = {
  held: false,
  pos: new Position(),
  dragging: false,
  click: false,
  draggingFrom: new Position(),
  scroll: 0,
};

let scrollTimeout: NodeJS.Timeout; // Timeout para poder zerar o valor de scroll do mouseState (não há como identificar se o scroll do mouse não está sendo usado)

/**
 * Vincula um dado elemento HTML os eventListeners de mouse, que atualizam os dados de mouseState
 * @param element
 * @param gameScale
 */
export function bindMouseEvents(element: HTMLElement, gameScale: number) {
  element.addEventListener("mousedown", () => {
    mouseState.held = true;
    clearTimeout(scrollTimeout);
  });
  element.addEventListener("mouseup", () => {
    if (mouseState.held) {
      mouseState.click = true;
    }
    mouseState.held = false;
    mouseState.dragging = false;
  });
  element.addEventListener("mousemove", (e) => {
    if (mouseState.held) {
      if (!mouseState.dragging) {
        mouseState.dragging = true;
        mouseState.draggingFrom = new Position(
          e.offsetX / gameScale,
          e.offsetY / gameScale,
        );
      }
    } else {
      mouseState.dragging = false;
      mouseState.draggingFrom = new Position(-Infinity, -Infinity);
    }
    mouseState.pos = new Position(e.offsetX / gameScale, e.offsetY / gameScale);
  });
  element.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      mouseState.scroll = 1;
    } else if (e.deltaY < 0) {
      mouseState.scroll = -1;
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      mouseState.scroll = 0;
    }, 15);
  });
}

export default mouseState;
