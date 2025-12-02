import GameObject from "../GameObject";
import SceneChanger from "../Elements/SceneChanger";
import TextObject from "../Elements/TextObject";
import type { Save } from "../GameState";
import Position from "../Position";
import { Utils } from "../Utils";
import { levelOrder } from "./LevelSelectionScene/LevelList";
import Scene from "./Scene";
import { DESKTOPSCENE } from "./SceneReferences";

export const SELECTSAVE = "selectSave"; // Referência da ação de selecionar um salvamento
export const DELETESAVE = "deleteSave"; // Referência da ação de deletar um salvamento

/**
 * Dado um objeto de salvamento e seu número na ordem
 * retorna os objetos de texto com as informações para aparecerem na tela
 * @param save
 * @param num
 * @returns
 */
function generateSaveTextObjects(save: Save, num: number): TextObject[] {
  let pos = new Position();
  switch (num) {
    case 0:
      pos = new Position(80, 146);
      break;
    case 1:
      pos = new Position(177, 146);
      break;
    case 2:
      pos = new Position(274, 146);
      break;
  }
  if (!save.lastSaveTime) {
    return [
      new TextObject({
        pos: pos,
        color: "bnw",
        font: "minecraftia",
        text: "Espaço Vazio",
        direction: "center",
      }),
    ];
  }
  const progressText =
    "Progresso: " +
    (Object.keys(save.levelProgressRecord).length / levelOrder.length) * 100 +
    "%";
  const progress = new TextObject({
    pos: pos,
    color: "bnw",
    font: "minecraftia",
    text: progressText,
    direction: "center",
  });
  if (typeof save.lastSaveTime == "string") {
    save.lastSaveTime = new Date(save.lastSaveTime);
  }
  const dateText =
    save.lastSaveTime.getDate() +
    "/" +
    (save.lastSaveTime.getMonth() + 1) +
    "/" +
    save.lastSaveTime.getFullYear();
  const date = new TextObject({
    pos: pos.add(0, 12),
    color: "bnw",
    font: "minecraftia",
    text: dateText,
    direction: "center",
  });
  const timeText =
    Utils.numberFormat(save.lastSaveTime.getHours(), 2) +
    ":" +
    Utils.numberFormat(save.lastSaveTime.getMinutes(), 2);
  const time = new TextObject({
    pos: pos.add(0, 24),
    color: "bnw",
    font: "minecraftia",
    text: timeText,
    direction: "center",
  });

  return [progress, time, date];
}

// Cena de salvamentos
export default class SaveScene extends Scene {
  constructor(saveSlots: Save[], currentSave: number | null) {
    super({
      backgroundSpriteName: "bg_save_screen",
      gameObjects: [],
    });
    this.update(saveSlots, currentSave);
  }

  /**
   * Atualiza os objetos da cena com uma dada lista de dados de salvamentos
   * @param saveSlots
   * @param currentSaveId
   */
  update(saveSlots: Save[], currentSaveId: number | null) {
    this.gameObjects = [];
    let slot1Btn = new GameObject({
      pos: new Position(48, 76),
      spriteName: saveSlots[0].lastSaveTime
        ? "save_avatar_blue"
        : "save_avatar_empty",
      width: 64,
      height: 64,
      clickFunction: () => {
        return { type: SELECTSAVE, slot: 0 };
      },
    });

    let slot2Btn = new GameObject({
      pos: new Position(144, 76),
      spriteName: saveSlots[1].lastSaveTime
        ? "save_avatar_pink"
        : "save_avatar_empty",
      width: 64,
      height: 64,
      clickFunction: () => {
        return { type: SELECTSAVE, slot: 1 };
      },
    });

    let slot3Btn = new GameObject({
      pos: new Position(240, 76),
      spriteName: saveSlots[2].lastSaveTime
        ? "save_avatar_green"
        : "save_avatar_empty",
      width: 64,
      height: 64,
      clickFunction: () => {
        return { type: SELECTSAVE, slot: 2 };
      },
    });

    let slot1Text = generateSaveTextObjects(saveSlots[0], 0);
    let slot2Text = generateSaveTextObjects(saveSlots[1], 1);
    let slot3Text = generateSaveTextObjects(saveSlots[2], 2);

    this.gameObjects = [
      ...this.gameObjects,
      ...slot1Text,
      ...slot2Text,
      ...slot3Text,
      slot1Btn,
      slot2Btn,
      slot3Btn,
    ];
    [0, 1, 2].forEach((i) => {
      if (saveSlots[i].lastSaveTime) {
        this.gameObjects.push(
          new GameObject({
            pos: new Position(69 + i * 96, 184),
            spriteName: "btn_trash",
            heldSpriteName: "btn_trash_held",
            height: 20,
            width: 20,
            clickFunction: () => {
              return { type: DELETESAVE, slot: i };
            },
          }),
        );
      }
    });
    if (currentSaveId != null) {
      let selectedSaveText = new TextObject({
        pos: new Position(39 + currentSaveId * 96, 60),
        color: "bnw",
        font: "minecraftia",
        text: "Progresso Atual",
      });

      let cancelBtn = new SceneChanger({
        pos: new Position(137, 227),
        spriteName: "btn_cancel",
        hoverSpriteName: "btn_cancel_held",
        width: 78,
        height: 20,
        sceneReference: DESKTOPSCENE,
      });
      this.gameObjects.push(selectedSaveText, cancelBtn);
    }
  }
}
