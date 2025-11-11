import type Cursor from "../Cursor";
import type GameState from "../GameState";
import Position from "../Position";
import EmailScene from "../Scenes/EmailScene";
import { EMAILSCENE, SCENECHANGE, SCROLLTO } from "../Scenes/SceneList";
import mouseState from "./MouseState";

export default function updateGameStae(gameState: GameState, cursor: Cursor) {
  cursor.state = "arrow";
  cursor.pos = mouseState.pos;
  cursor.spriteShift = new Position(-16, -16);
  if (mouseState.held) {
    cursor.spriteShift.y += 1;
  }

  gameState.currentScene.gameObjects.forEach((x) => {
    if (
      x.click instanceof Function &&
      x.hitbox.positionInside(mouseState.pos)
    ) {
      cursor.state = "pointer";
      if (mouseState.click) {
        const result = x.click(mouseState.pos);
        if (result) {
          if (result.type == SCENECHANGE) {
            if (result.sceneName == EMAILSCENE) {
              gameState.sceneList[result.sceneName] = new EmailScene();
            }
            gameState.currentScene = gameState.sceneList[result.sceneName];
          }
          if (
            result.type == SCROLLTO &&
            gameState.currentScene instanceof EmailScene
          ) {
            gameState.currentScene.scrollEmailTo(result.shift);
          }
        }
      }
    }
    if (
      x.drag instanceof Function &&
      mouseState.dragging &&
      x.hitbox.positionInside(mouseState.draggingFrom)
    ) {
      cursor.state = "pointer";
      if (gameState.currentScene instanceof EmailScene) {
        const result = x.drag(mouseState.pos);
        if (result.type == SCROLLTO) {
          gameState.currentScene.scrollEmailTo(result.shift);
        }
      }
    }
  });

  if (gameState.currentScene instanceof EmailScene) {
    if (mouseState.scroll != 0) {
      gameState.currentScene.scrollEmail(mouseState.scroll);
    }
  }

  mouseState.click = false;
}
