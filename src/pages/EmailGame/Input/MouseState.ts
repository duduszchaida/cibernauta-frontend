import Position from "../Position";

const mouseState: {
  held: boolean;
  click: boolean;
  pos: Position;
  dragging: boolean;
  draggingFrom: Position;
  scroll: number;
} = {
  held: false,
  pos: new Position(),
  dragging: false,
  click: false,
  draggingFrom: new Position(),
  scroll: 0,
};

let scrollTimeout: NodeJS.Timeout;

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
