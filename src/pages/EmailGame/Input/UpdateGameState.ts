import type Cursor from "../Cursor";
import type GameState from "../GameState";
import { SCENECHANGE } from "../Elements/ExitBtn";
import { SCROLLTO } from "../Elements/ScrollBar";
import { INSPECTMODE } from "../Elements/Toolbar";
import { EMAILSCENE } from "../Scenes/SceneReferences";
import { gameTimeTracker } from "../GameTimeTracker";
import EmailComponent, { INSPECT } from "../Elements/EmailComponent";
import Position from "../Position";
import EmailScene from "../Scenes/EmailScene";
import keyboardState, { PRESSED } from "./KeyboardState";
import mouseState from "./MouseState";
import EmailTextComponent from "../Elements/EmailTextComponent";
import EmailContent from "../Elements/EmailContent";

function inspectModeSwitch(gameState: GameState) {
  if (gameState.currentScene instanceof EmailScene) {
    gameState.inspecting = !gameState.inspecting;
    gameState.currentScene.inspectModeSwitch();
  }
}

export default function updateGameState(gameState: GameState, cursor: Cursor) {
  if (
    keyboardState["Escape"]?.keyState == PRESSED &&
    !keyboardState["Escape"]?.read
  ) {
    gameTimeTracker.pause();
  }

  cursor.state = "arrow";
  cursor.pos = mouseState.pos;
  cursor.spriteShift = new Position(-16, -16);
  if (mouseState.held) {
    cursor.spriteShift.y += 1;
  }

  gameState.currentScene.gameObjects.forEach((obj) => {
    if (obj.invisible) {
      return;
    }
    if (
      obj.click instanceof Function &&
      obj.hitbox.positionInside(mouseState.pos)
    ) {
      if (
        obj instanceof EmailComponent ||
        obj instanceof EmailTextComponent ||
        obj instanceof EmailContent
      ) {
        if (gameState.inspecting) {
          cursor.state = "inspect";
        }
      } else {
        cursor.state = "pointer";
      }
      if (mouseState.click) {
        const result = obj.click(mouseState.pos);
        switch (result?.type) {
          case SCENECHANGE:
            if (result.sceneName == EMAILSCENE) {
              gameState.sceneList[result.sceneName] = new EmailScene();
            } else {
              cursor.state = "arrow";
              gameState.inspecting = false;
            }
            gameState.currentScene = gameState.sceneList[result.sceneName];
            break;
          case SCROLLTO:
            if (gameState.currentScene instanceof EmailScene) {
              gameState.currentScene.scrollEmailTo(result.shift);
            }
            break;
          case INSPECT:
            if (
              gameState.inspecting &&
              gameState.currentScene instanceof EmailScene
            ) {
              if (typeof result.reference == "string") {
                gameState.currentScene.selectAnomaly(result.reference);
              } else {
                gameState.currentScene.selectParagraph(result.reference);
              }
            }
            break;
          case INSPECTMODE:
            inspectModeSwitch(gameState);
        }
      }
    }
    if (
      obj.drag instanceof Function &&
      (mouseState.dragging || mouseState.held) &&
      obj.hitbox.positionInside(mouseState.draggingFrom)
    ) {
      cursor.state = "pointer";
      if (gameState.currentScene instanceof EmailScene) {
        const result = obj.drag(mouseState.pos);
        if (result.type == SCROLLTO) {
          gameState.currentScene.scrollEmailTo(Math.round(result.shift));
        }
      }
    }
  });

  if (mouseState.scroll != 0) {
    if (gameState.currentScene instanceof EmailScene) {
      gameState.currentScene.scrollEmail(mouseState.scroll);
    }
  }

  if (
    keyboardState[" "]?.keyState == PRESSED &&
    !keyboardState[" "]?.read &&
    gameState.currentScene instanceof EmailScene
  ) {
    inspectModeSwitch(gameState);
  }

  mouseState.click = false;
  for (let key in keyboardState) {
    keyboardState[key].read = true;
  }
}
