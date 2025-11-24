import GameObject from "../Elements/GameObject";
import TextObject from "../Elements/TextObject";
import type { Save } from "../GameState";
import Position from "../Position";
import Scene from "./Scene";

export const SELECTSAVE = "selectSave";

function saveTextObjects(save: Save, num: number): TextObject[] {
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
  if (typeof save.lastSaveTime == "string") {
    save.lastSaveTime = new Date(save.lastSaveTime);
  }
  let dateText =
    save.lastSaveTime.getDate() +
    "/" +
    (save.lastSaveTime.getMonth() + 1) +
    "/" +
    save.lastSaveTime.getFullYear();
  let date = new TextObject({
    pos: pos,
    color: "bnw",
    font: "minecraftia",
    text: dateText,
    direction: "center",
  });
  let timeText =
    save.lastSaveTime.getHours() +
    ":" +
    (save.lastSaveTime.getMinutes() < 10 ? "0" : "") +
    save.lastSaveTime.getMinutes();
  let time = new TextObject({
    pos: pos.add(0, 12),
    color: "bnw",
    font: "minecraftia",
    text: timeText,
    direction: "center",
  });

  return [time, date];
}

export default class SaveScene extends Scene {
  textSlot1: any;
  textSlot2: any;
  textSlot3: any;
  constructor(saveSlots: Save[], currentSave: number | null) {
    super({
      backgroundSpriteName: "bg_save_screen",
      gameObjects: [],
    });
    this.update(saveSlots, currentSave);
  }

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

    let slot1Text = saveTextObjects(saveSlots[0], 0);
    let slot2Text = saveTextObjects(saveSlots[1], 1);
    let slot3Text = saveTextObjects(saveSlots[2], 2);

    this.gameObjects = [
      ...this.gameObjects,
      ...slot1Text,
      ...slot2Text,
      ...slot3Text,
      slot1Btn,
      slot2Btn,
      slot3Btn,
    ];
    console.log(currentSaveId);
    if (currentSaveId != null) {
      let selectedSaveText = new TextObject({
        pos: new Position(39 + currentSaveId * 96, 60),
        color: "bnw",
        font: "minecraftia",
        text: "Salvamento Atual",
      });
      this.gameObjects.push(selectedSaveText);
    }
  }
}
