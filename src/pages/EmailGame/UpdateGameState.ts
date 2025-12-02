import type Cursor from "./Cursor";
import { PAUSEGAME } from "./Elements/PauseBtn";
import { SCENECHANGE } from "./Elements/SceneChanger";
import { SCROLLTO } from "./Scenes/EmailScene/ScrollBar";
import type GameState from "./GameState";
import { gameTimeTracker } from "./GameTimeTracker";
import keyboardState, { PRESSED } from "./Input/KeyboardState";
import mouseState from "./Input/MouseState";
import Position from "./Position";
import { DesktopScene, MANUALSAVE, SAVEWARNING } from "./Scenes/DesktopScene";
import EmailPicture, {
  SELECT as SELECTANOMALY,
} from "./Scenes/EmailScene/EmailPicture";
import EmailContent from "./Scenes/EmailScene/EmailContent";
import EmailScene from "./Scenes/EmailScene/EmailScene";
import EmailTextElement from "./Scenes/EmailScene/EmailTextElement";
import { INSPECTMODE } from "./Scenes/EmailScene/ButtonPannel";
import { LevelSelectionScene } from "./Scenes/LevelSelectionScene/LevelSelectionScene";
import SaveScene, { DELETESAVE, SELECTSAVE } from "./Scenes/SavesScene";
import type Scene from "./Scenes/Scene";
import {
  DESKTOPSCENE,
  EMAILSCENE,
  LEVELSELECTION,
  SAVESSCENE,
  SCORESCENE,
  SETTINGSSCENE,
} from "./Scenes/SceneReferences";
import { ScoreScene } from "./Scenes/ScoreScene";
import { Notepad } from "./Scenes/EmailScene/Notepad";
import { CLASSEMAIL, OPENNOTEPAD } from "./Scenes/EmailScene/Buttons";
import type GameObject from "./GameObject";
import { SettingsScene } from "./Scenes/SettingsScene/SettingsScene";
import { TOGGLESETTING } from "./Scenes/SettingsScene/Toggle";
import {
  CURSORARROW,
  CURSORINSPECT,
  CURSORLEFT,
  CURSORPOINTER,
  CURSORRIGHT,
} from "./Cursor";

/**
 * Alterna o estado de inspecionar de um dado estado de jogo
 * @param gameState
 */
function inspectModeSwitch(gameState: GameState) {
  if (gameState.currentScene instanceof EmailScene) {
    if (gameState.currentScene.level.canSelect) {
      gameState.inspecting = !gameState.inspecting;
    }
    gameState.currentScene.togglePannel();
  } else {
    gameState.inspecting = false;
  }
}

/**
 * Pause a cena atual se for uma EmailScene
 * @param gameState
 */
function pauseTraining(gameState: GameState) {
  if (gameState.currentScene instanceof EmailScene) {
    gameState.currentScene.pause();
  }
  gameTimeTracker.pause();
}

/**
 * Retorna uma nova cena de acordo com a referência de cena do dado resultado de ação um dado estado de jogo
 * @param result resultado de ação
 * @param gameState estado de jogo
 * @returns
 */
function createScene(result: any, gameState: GameState): Scene {
  switch (result.sceneReference) {
    case EMAILSCENE:
      return new EmailScene(result.level);
    case DESKTOPSCENE:
      return new DesktopScene(
        gameState.currentSave.settings.settingAutosave ?? true,
      );
    case SAVESSCENE:
      return new SaveScene(gameState.saveSlots, gameState.currentSaveSlotId);
    case LEVELSELECTION:
      return new LevelSelectionScene(gameState);
    case SCORESCENE:
      return new ScoreScene(result.evaluations, result.level, gameState);
    case SETTINGSSCENE:
      return new SettingsScene(gameState);
    default:
      alert("no known sceneReference");
      return new SaveScene(gameState.saveSlots, gameState.currentSaveSlotId);
  }
}

/**
 * A partir de um dado estado de jogo lida com a função de click de um dado objeto de jogo
 * @param gameState
 * @param obj
 * @returns
 */
function mouseClickHandler(gameState: GameState, obj: GameObject) {
  if (!obj.clickFunction) {
    return;
  }
  const result = obj.clickFunction(mouseState.pos);
  switch (result?.type) {
    case SCENECHANGE:
      if (result.sceneReference != SAVESSCENE || gameState.progressSaved) {
        gameState.currentScene = createScene(result, gameState);
      } else {
        if (
          gameState.currentScene instanceof DesktopScene &&
          !gameState.progressSaved
        ) {
          gameState.currentScene.toggleSaveWarning();
        }
      }
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
          gameState.currentScene.emailInterface.selectAnomaly(result.reference);
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
    case OPENNOTEPAD:
      if (gameState.currentScene instanceof EmailScene) {
        gameState.currentScene.toggleNotepad();
      }
      break;
    case TOGGLESETTING:
      if (gameState.currentScene instanceof SettingsScene) {
        gameState.currentScene.toggle(result.config);
      }
      gameState.saveGame(false, true);
      break;
    case PAUSEGAME:
      pauseTraining(gameState);
      break;
    case MANUALSAVE:
      gameState.saveGame(true);
      break;
    case SAVEWARNING:
      if (result.decision) {
        gameState.currentScene = createScene(
          { sceneReference: SAVESSCENE },
          gameState,
        );
      } else {
        if (gameState.currentScene instanceof DesktopScene) {
          gameState.currentScene.toggleSaveWarning();
        }
      }
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

/**
 * A partir de um dado estado de jogo lida com a sobreposição do dado cursor em um dado objeto de jogo
 * @param gameState
 * @param cursor
 * @param obj
 */
function mouseHoverHandler(
  gameState: GameState,
  cursor: Cursor,
  obj: GameObject,
) {
  if (mouseState.held) {
    obj.cursorHeld = true;
  } else {
    obj.cursorHovering = true;
  }
  if (obj.clickFunction instanceof Function) {
    if (
      obj instanceof EmailPicture ||
      obj instanceof EmailTextElement ||
      obj instanceof EmailContent
    ) {
      if (gameState.inspecting) {
        cursor.state = CURSORINSPECT;
      }
    } else if (obj instanceof Notepad) {
      if (cursor.pos.subtractPos(obj.pos).x > obj.width / 2) {
        if (!obj.lastPage) {
          cursor.state = CURSORRIGHT;
        } else {
          cursor.state = CURSORARROW;
        }
      } else {
        if (!obj.firstPage) {
          cursor.state = CURSORLEFT;
        } else {
          cursor.state = CURSORARROW;
        }
      }
    } else {
      cursor.state = CURSORPOINTER;
    }
    if (mouseState.click) {
      mouseClickHandler(gameState, obj);
    }
  }
  if (
    obj.dragFunction instanceof Function &&
    (mouseState.dragging || mouseState.held) &&
    obj.hitbox.positionInside(mouseState.draggingFrom)
  ) {
    cursor.state = CURSORPOINTER;
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

/**
 * Atualiza um dado estado de jogo e um dado cursor de acordo com o estado do input de teclado e o estado do input do mouse
 * @param gameState
 * @param cursor
 */
export default function updateGameState(gameState: GameState, cursor: Cursor) {
  if (
    keyboardState["Escape"]?.pressState == PRESSED &&
    !keyboardState["Escape"]?.read
  ) {
    pauseTraining(gameState);
  }

  cursor.state = CURSORARROW;
  cursor.pos = mouseState.pos;
  cursor.spriteShift = new Position(-16, -16);
  if (mouseState.held) {
    cursor.spriteShift.y += 1;
  }

  let firstContact = false; // Indicates if the loop has found any objects that the cursor can interact with
  const gameObjects = gameState.currentScene.gameObjects;
  for (let i = gameObjects.length - 1; i > -1; i--) {
    const obj = gameObjects[i];
    obj.cursorHeld = false;
    obj.cursorHovering = false;
    if (
      obj.invisible ||
      obj.ignoreClick ||
      !obj.hitbox.positionInside(mouseState.pos) ||
      firstContact
    ) {
      continue;
    }
    firstContact = true;
    mouseHoverHandler(gameState, cursor, obj);
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
