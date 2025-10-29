import CanvasObject from "./CanvasObject";
import Cursor from "./Cursor";
import renderScene from "./RenderScene";
import { bindMouseEvents } from "./Input/MouseState";
import updateGameStae from "./Input/UpdateGameState";
import { bindKeyboardEvents } from "./Input/KeyboardState";
import GameState from "./GameState";

const gameState = new GameState({ sceneName: "desktop" });

let canvasObject: CanvasObject;

const gameScale = 3;
const cursor = new Cursor();

function renderFrameLoop() {
	updateGameStae(gameState, cursor);
	renderScene(gameState.currentScene, canvasObject, cursor);
	requestAnimationFrame(renderFrameLoop);
}

export function startGame(canvasElement: HTMLCanvasElement) {
	canvasObject = new CanvasObject({
		height: 217 * gameScale,
		width: 300 * gameScale,
		backgroundColor: "#000",
		canvasElement: canvasElement,
		id: "canvasId",
		scale: gameScale,
	});
	bindMouseEvents(canvasObject.element, gameScale);
	bindKeyboardEvents(canvasObject.element);
	renderFrameLoop();
}
