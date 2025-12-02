import type CanvasObject from "./CanvasObject";
import type Cursor from "./Cursor";
import type { Popup } from "./Elements/Popup";
import { findSprite } from "./Sprites/FindSprite";
import type GameState from "./GameState";
import Position from "./Position";

/**
 * Com um dado canvasObject, renderiza a função atual de um dado estado de jogo, um dado cursor e um dado popup
 * @param gameState
 * @param canvas
 * @param cursor
 * @param popup
 */
export default function renderCurrentScene(
  gameState: GameState,
  canvas: CanvasObject,
  cursor: Cursor,
  popup: Popup,
) {
  canvas.clear();
  canvas.drawSprite(
    gameState.currentScene.backgroundSprite,
    new Position(),
    352,
    256,
  );
  gameState.currentScene.gameObjects.forEach((x) => {
    x.render(canvas);
  });
  popup.render(canvas);
  cursor.render(canvas);
  if (gameState.currentSave.settings.settingFilter) {
    canvas.drawSprite(findSprite("screen_filter"), new Position(), 352, 256);
  }
}
