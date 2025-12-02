import CanvasObject from "./CanvasObject";
import Cursor from "./Cursor";
import renderCurrentScene from "./RenderScene";
import { bindMouseEvents } from "./Input/MouseState";
import { bindKeyboardEvents } from "./Input/KeyboardState";
import GameState from "./GameState";
import { gameTimeTracker } from "./GameTimeTracker";
import updateGameState from "./UpdateGameState";
import { Popup } from "./Elements/Popup";

// Objeto de canvas usado para renderizar o jogo
let canvasObject: CanvasObject;

// Objeto de popup do jogo
const popup = new Popup();

// Estado do jogo
export const gameState = new GameState({
  popup: popup,
});

// Cursor do jogo
const cursor = new Cursor();

// Loop de atualizar estado de jogo e renderização do jogo
function gameLoop() {
  updateGameState(gameState, cursor);
  renderCurrentScene(gameState, canvasObject, cursor, popup);
  requestAnimationFrame(gameLoop);
}

// Função para iniciar o jogo
export async function startGame(
  canvasElement: HTMLCanvasElement, // Elemento de canvas usado para o jogo
  gameScale: number, // Escala de renderização do jogo
  leaderboardUpdate: () => Promise<void>, // Função para atualizar o placar do jogo
) {
  await gameState.init(leaderboardUpdate);
  canvasObject = new CanvasObject({
    height: 256 * gameScale,
    width: 352 * gameScale,
    backgroundColor: "#000",
    canvasElement: canvasElement,
    scale: gameScale,
  });
  gameTimeTracker.start();
  bindMouseEvents(canvasObject.element, gameScale);
  bindKeyboardEvents(canvasObject.element);
  gameLoop();
}
