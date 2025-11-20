import GameObject from "../Elements/GameObject";
import TextObject from "../Elements/TextObject";
import type { SaveSlot, SaveState } from "../GameState";
import Position from "../Position";
import Scene from "./Scene";

export const SELECTSAVE = "selectSave";

function slotToTextObject(slot: SaveSlot, num: number): TextObject[] {
  let pos = new Position();
  switch (num) {
    case 1:
      pos = new Position(80, 146);
      break;
    case 2:
      pos = new Position(177, 146);
      break;
    case 3:
      pos = new Position(274, 146);
      break;
  }
  if (!slot.lastSaveTime) {
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
  let dateText =
    slot.lastSaveTime.getDate() +
    "/" +
    (slot.lastSaveTime.getMonth() + 1) +
    "/" +
    slot.lastSaveTime.getFullYear();
  let date = new TextObject({
    pos: pos,
    color: "bnw",
    font: "minecraftia",
    text: dateText,
    direction: "center",
  });
  let timeText =
    slot.lastSaveTime.getHours() +
    ":" +
    (slot.lastSaveTime.getMinutes() < 10 ? "0" : "") +
    slot.lastSaveTime.getMinutes();
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
  constructor(saveState: SaveState) {
    super({
      backgroundSpriteName: "bg_save_screen",
      gameObjects: [],
    });
    this.update(saveState);
  }

  update(saveState: SaveState) {
    this.gameObjects = [];
    let slot1Btn = new GameObject({
      pos: new Position(48, 76),
      spriteName: saveState.slot1.lastSaveTime
        ? "save_avatar_blue"
        : "save_avatar_empty",
      width: 64,
      height: 64,
      clickFunction: () => {
        return { type: SELECTSAVE, slot: 1 };
      },
    });

    let slot2Btn = new GameObject({
      pos: new Position(144, 76),
      spriteName: saveState.slot2.lastSaveTime
        ? "save_avatar_pink"
        : "save_avatar_empty",
      width: 64,
      height: 64,
      clickFunction: () => {
        return { type: SELECTSAVE, slot: 2 };
      },
    });
    let slot3Btn = new GameObject({
      pos: new Position(240, 76),
      spriteName: saveState.slot3.lastSaveTime
        ? "save_avatar_green"
        : "save_avatar_empty",
      width: 64,
      height: 64,
      clickFunction: () => {
        return { type: SELECTSAVE, slot: 3 };
      },
    });

    let slot1Text = slotToTextObject(saveState.slot1, 1);
    let slot2Text = slotToTextObject(saveState.slot2, 2);
    let slot3Text = slotToTextObject(saveState.slot3, 3);

    this.gameObjects = [
      ...this.gameObjects,
      ...slot1Text,
      ...slot2Text,
      ...slot3Text,
      slot1Btn,
      slot2Btn,
      slot3Btn,
    ];
  }
}
