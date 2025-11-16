import CanvasObject from "./CanvasObject";
import Cursor from "./Cursor";
import renderScene from "./RenderScene";
import { bindMouseEvents } from "./Input/MouseState";
import updateGameState from "./Input/UpdateGameState";
import { bindKeyboardEvents } from "./Input/KeyboardState";
import GameState from "./GameState";
import * as sceneReferences from "./Scenes/SceneReferences";
import { gameTimeTracker } from "./GameTimeTracker";

const gameState = new GameState({ sceneName: sceneReferences.DESKTOPSCENE });

let canvasObject: CanvasObject;

const gameScale = 3;
const cursor = new Cursor();

function renderFrameLoop() {
  updateGameState(gameState, cursor);
  renderScene(gameState.currentScene, canvasObject, cursor);
  requestAnimationFrame(renderFrameLoop);
}

export function startGame(canvasElement: HTMLCanvasElement) {
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
