import type Cursor from "./Cursor";
import { PAUSEGAME } from "./Elements/PauseBtn";
import { SCENECHANGE } from "./Elements/SceneChanger";
import { SCROLLTO } from "./Elements/ScrollBar";
import type GameState from "./GameState";
import { gameTimeTracker } from "./GameTimeTracker";
import keyboardState, { PRESSED } from "./Input/KeyboardState";
import mouseState from "./Input/MouseState";
import Position from "./Position";
import { DesktopScene, MANUALSAVE } from "./Scenes/DesktopScene/DesktopScene";
import EmailComponent, { INSPECT } from "./Scenes/EmailScene/EmailComponent";
import EmailContent from "./Scenes/EmailScene/EmailContent";
import EmailScene, { JUDGEEMAIL } from "./Scenes/EmailScene/EmailScene";
import EmailTextComponent from "./Scenes/EmailScene/EmailTextComponent";
import { INSPECTMODE } from "./Scenes/EmailScene/Toolbar";
import { LevelSelectionScene } from "./Scenes/LevelSelectionScene/LevelSelectionScene";
import SaveScene, { SELECTSAVE } from "./Scenes/SavesScene";
import type Scene from "./Scenes/Scene";
import {
  DESKTOPSCENE,
  EMAILSCENE,
  LEVELSELECTION,
  SAVESCENE,
} from "./Scenes/SceneReferences";

function inspectModeSwitch(gameState: GameState) {
  if (gameState.currentScene instanceof EmailScene) {
    gameState.inspecting = !gameState.inspecting;
    gameState.currentScene.inspectModeSwitch();
  }
}

function pauseTraining(gameState: GameState) {
  if (gameState.currentScene instanceof EmailScene) {
    gameState.currentScene.pause();
  }
  gameTimeTracker.pause();
}

function createScene(result: any, gameState: GameState): Scene {
  switch (result.sceneReference) {
    case EMAILSCENE:
      return new EmailScene(result.level);
    case DESKTOPSCENE:
      return new DesktopScene();
    case SAVESCENE:
      return new SaveScene(gameState.saveSlots, gameState.currentSaveSlot);
    case LEVELSELECTION:
      return new LevelSelectionScene(
        gameState.saveSlots[gameState.currentSaveSlot],
      );
    default:
      alert("no sceneReference");
      return new SaveScene(gameState.saveSlots, gameState.currentSaveSlot);
  }
}

export default function updateGameState(gameState: GameState, cursor: Cursor) {
  if (
    keyboardState["Escape"]?.keyState == PRESSED &&
    !keyboardState["Escape"]?.read
  ) {
    pauseTraining(gameState);
  }

  cursor.state = "arrow";
  cursor.pos = mouseState.pos;
  cursor.spriteShift = new Position(-16, -16);
  if (mouseState.held) {
    cursor.spriteShift.y += 1;
  }

  let firstContact = false; // Indicates if the loop has found any objects that the cursor can interact with
  const gameObjects = gameState.currentScene.gameObjects;
  for (let i = gameObjects.length - 1; i > -1 && !firstContact; i--) {
    const obj = gameObjects[i];
    if (
      obj.invisible ||
      obj.ignoreClick ||
      !obj.hitbox.positionInside(mouseState.pos)
    ) {
      continue;
    }
    firstContact = true;
    if (obj.click instanceof Function) {
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
            gameState.currentScene = createScene(result, gameState);
            if (gameState.inspecting) {
              inspectModeSwitch(gameState);
            }
            if (gameTimeTracker.paused) {
              gameTimeTracker.pause();
            }
            break;
          case SCROLLTO:
            if (gameState.currentScene instanceof EmailScene) {
              gameState.currentScene.emailManager.scrollEmailTo(result.shift);
            }
            break;
          case INSPECT:
            if (
              gameState.inspecting &&
              gameState.currentScene instanceof EmailScene
            ) {
              if (typeof result.reference == "string") {
                gameState.currentScene.emailManager.selectAnomaly(
                  result.reference,
                );
              } else {
                gameState.currentScene.emailManager.selectParagraph(
                  result.reference,
                );
              }
            }
            break;
          case INSPECTMODE:
            inspectModeSwitch(gameState);
            break;
          case PAUSEGAME:
            pauseTraining(gameState);
            break;
          case MANUALSAVE:
            gameState.saveGame(true);
            break;
          case SELECTSAVE:
            gameState.selectSave(result.slot);
            gameState.currentScene = createScene(
              { sceneReference: DESKTOPSCENE },
              gameState,
            );
            break;
          case JUDGEEMAIL:
            if (
              gameState.inspecting &&
              gameState.currentScene instanceof EmailScene
            ) {
              gameState.currentScene.evaluateEmail(result.class);
              gameState.currentScene.nextEmail();
              gameState.inspecting = false;
            }
            break;
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
          gameState.currentScene.emailManager.scrollEmailTo(
            Math.round(result.shift),
          );
        }
      }
    }
  }

  if (mouseState.scroll != 0) {
    if (gameState.currentScene instanceof EmailScene) {
      gameState.currentScene.emailManager.scrollEmail(mouseState.scroll * 3);
    }
  }

  if (
    keyboardState[" "]?.keyState == PRESSED &&
    !keyboardState[" "]?.read &&
    gameState.currentScene instanceof EmailScene
  ) {
    inspectModeSwitch(gameState);
  }

  if (
    keyboardState["p"]?.keyState == PRESSED &&
    !keyboardState["p"]?.read &&
    gameState.currentScene instanceof EmailScene
  ) {
    gameState.currentScene.endEmails();
  }

  mouseState.click = false;
  for (let key in keyboardState) {
    keyboardState[key].read = true;
  }
}
