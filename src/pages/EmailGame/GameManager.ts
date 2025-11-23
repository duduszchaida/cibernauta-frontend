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

/**
 * Inicia o jogo no canvas especificado
 *
 * @param canvasElement - Elemento canvas onde o jogo será renderizado
 * @returns GameState - Objeto com o estado do jogo (incluindo pontuação)
 *
 * IMPORTANTE: Retorna o gameState para que o componente React possa
 * acessar a pontuação atual (gameState.score)
 */
export function startGame(canvasElement: HTMLCanvasElement): GameState {
	canvasObject = new CanvasObject({
		height: 213 * gameScale,
		width: 296 * gameScale,
		backgroundColor: "#000",
		canvasElement: canvasElement,
		id: "canvasId",
		scale: gameScale,
	});
	bindMouseEvents(canvasObject.element, gameScale);
	bindKeyboardEvents(canvasObject.element);
	renderFrameLoop();

	// Retorna o gameState para acesso externo (pontuação, etc)
	return gameState;
}

/**
 * Obtém o estado atual do jogo
 *
 * @returns GameState - Estado do jogo com pontuação atual
 *
 * USE ISTO para acessar a pontuação:
 *   const state = getGameState();
 *   console.log(state.score); // Pontuação atual
 */
export function getGameState(): GameState {
	return gameState;
}
