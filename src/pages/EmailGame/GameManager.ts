import CanvasObject from "./CanvasObject";
import Cursor from "./Cursor";
import renderScene from "./RenderScene";
import { bindMouseEvents } from "./Input/MouseState";
import { bindKeyboardEvents } from "./Input/KeyboardState";
import GameState from "./GameState";
import { gameTimeTracker } from "./GameTimeTracker";
import updateGameState from "./UpdateGameState";
import { Popup } from "./Elements/Popup";

let canvasObject: CanvasObject;

const gameScale = 2;
const cursor = new Cursor();
const popup = new Popup();
const gameState = new GameState({
  popup: popup,
});

function renderFrameLoop() {
  updateGameState(gameState, cursor);
  renderScene(gameState.currentScene, canvasObject, cursor, popup);
  requestAnimationFrame(renderFrameLoop);
}

export async function startGame(canvasElement: HTMLCanvasElement) {
  await gameState.init();
  canvasObject = new CanvasObject({
    height: 256 * gameScale,
    width: 352 * gameScale,
    backgroundColor: "#000",
    canvasElement: canvasElement,
    id: "canvasId",
    scale: gameScale,
  });
  gameTimeTracker.start();
  bindMouseEvents(canvasObject.element, gameScale);
  bindKeyboardEvents();
  renderFrameLoop();
}
