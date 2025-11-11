import type Cursor from "../Cursor";
import type GameState from "../GameState";
import Position from "../Position";
import EmailScene from "../Scenes/EmailScene";
import { EMAILSCENE, SCENECHANGE } from "../Scenes/SceneList";
import mouseState from "./MouseState";

export default function updateGameStae(gameState: GameState, cursor: Cursor) {
  cursor.state = "arrow";
  cursor.pos = mouseState.pos;
  cursor.spriteShift = new Position(-16, -16);
  if (mouseState.held) {
    cursor.spriteShift.y += 1;
  }

  gameState.currentScene.gameObjects.forEach((x) => {
    if (x.click instanceof Function && x.hitbox.positionInside(cursor.pos)) {
      cursor.state = "pointer";
      if (mouseState.click) {
        const result = x.click();
        if (result?.type == SCENECHANGE) {
          if (result.sceneName == EMAILSCENE) {
            gameState.sceneList[result.sceneName] = new EmailScene();
          }
          gameState.currentScene = gameState.sceneList[result.sceneName];
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
