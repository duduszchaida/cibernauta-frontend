import type Cursor from "./Cursor";
import { PAUSEGAME } from "./Elements/PauseBtn";
import { SCENECHANGE } from "./Elements/SceneChanger";
import { SCROLLTO } from "./Elements/ScrollBar";
import type GameState from "./GameState";
import { gameTimeTracker } from "./GameTimeTracker";
import keyboardState, { PRESSED } from "./Input/KeyboardState";
import mouseState from "./Input/MouseState";
import Position from "./Position";
import { DesktopScene, MANUALSAVE } from "./Scenes/DesktopScene";
import EmailPicture, {
  SELECT as SELECTANOMALY,
} from "./Scenes/EmailScene/EmailPicture";
import EmailContent from "./Scenes/EmailScene/EmailContent";
import EmailScene, { CLASSEMAIL } from "./Scenes/EmailScene/EmailScene";
import EmailTextElement from "./Scenes/EmailScene/EmailTextElement";
import { INSPECTMODE } from "./Scenes/EmailScene/ButtonPannel";
import { LevelSelectionScene } from "./Scenes/LevelSelectionScene/LevelSelectionScene";
import SaveScene, { DELETESAVE, SELECTSAVE } from "./Scenes/SavesScene";
import type Scene from "./Scenes/Scene";
import {
  DESKTOPSCENE,
  EMAILSCENE,
  LEVELSELECTION,
  SAVESCENE,
  SCORESCENE,
} from "./Scenes/SceneReferences";
import { ScoreScene } from "./Scenes/ScoreScene";

function inspectModeSwitch(gameState: GameState) {
  if (gameState.currentScene instanceof EmailScene) {
    if (gameState.currentScene.level.canSelect) {
      gameState.inspecting = !gameState.inspecting;
    }
    gameState.currentScene.switchToolBar();
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
      return new SaveScene(gameState.saveSlots, gameState.currentSaveSlotId);
    case LEVELSELECTION:
      return new LevelSelectionScene(gameState);
    case SCORESCENE:
      return new ScoreScene(result.evaluations, result.level, gameState);
    default:
      alert("no sceneReference");
      return new SaveScene(gameState.saveSlots, gameState.currentSaveSlotId);
  }
}

export default function updateGameState(gameState: GameState, cursor: Cursor) {
  if (
    keyboardState["Escape"]?.pressState == PRESSED &&
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
    if (obj.clickFunction instanceof Function) {
      if (
        obj instanceof EmailPicture ||
        obj instanceof EmailTextElement ||
        obj instanceof EmailContent
      ) {
        if (gameState.inspecting) {
          cursor.state = "inspect";
        }
      } else {
        cursor.state = "pointer";
      }
      if (mouseState.click) {
        const result = obj.clickFunction(mouseState.pos);
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
              gameState.currentScene.emailInterface.scrollEmailTo(result.shift);
            }
            break;
          case SELECTANOMALY:
            if (
              gameState.inspecting &&
              gameState.currentScene instanceof EmailScene
            ) {
              if (typeof result.reference == "string") {
                gameState.currentScene.emailInterface.selectAnomaly(
                  result.reference,
                );
              } else {
                gameState.currentScene.emailInterface.selectParagraph(
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
            console.log("saving");
            gameState.saveGame();
            break;
          case SELECTSAVE:
            gameState.selectSave(result.slot);
            gameState.currentScene = createScene(
              { sceneReference: DESKTOPSCENE },
              gameState,
            );
            break;
          case DELETESAVE:
            if (gameState.currentScene instanceof SaveScene) {
              gameState.deleteSave(result.slot);
              gameState.currentScene.update(
                gameState.saveSlots,
                gameState.currentSaveSlotId,
              );
            }
            break;
          case CLASSEMAIL:
            if (gameState.currentScene instanceof EmailScene) {
              gameState.currentScene.evaluateEmail(result.class);
              gameState.inspecting = false;
              if (
                gameState.currentScene.emailDataList.length == 0 ||
                gameState.currentScene.timer.finished
              ) {
                gameState.currentScene = createScene(
                  {
                    sceneReference: SCORESCENE,
                    evaluations: gameState.currentScene.evaluations,
                    level: gameState.currentScene.level,
                  },
                  gameState,
                );
              } else {
                gameState.currentScene.nextEmail();
              }
            }
            break;
        }
      }
    }
    if (
      obj.dragFunction instanceof Function &&
      (mouseState.dragging || mouseState.held) &&
      obj.hitbox.positionInside(mouseState.draggingFrom)
    ) {
      cursor.state = "pointer";
      if (gameState.currentScene instanceof EmailScene) {
        const result = obj.dragFunction(mouseState.pos);
        if (result.type == SCROLLTO) {
          gameState.currentScene.emailInterface.scrollEmailTo(
            Math.round(result.shift),
          );
        }
      }
    }
  }

  if (mouseState.scroll != 0) {
    if (gameState.currentScene instanceof EmailScene) {
      gameState.currentScene.emailInterface.scrollEmail(mouseState.scroll * 3);
    }
  }

  if (
    keyboardState[" "]?.pressState == PRESSED &&
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
