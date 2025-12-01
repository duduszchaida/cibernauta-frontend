import GameObject from "../../Elements/GameObject";
import Position from "../../Position";
import { MALICIOUS, SAFE, SPAM } from "./EmailData";
import { NOTEPAD } from "./Notepad";

export const CLASSEMAIL = "classEmail"; // Referência de ação de classificar um email
export const OPENNOTEPAD = "openNotepad"; // Referência de ação de abrir o caderno

export type ButtonReference =
  | typeof SAFE
  | typeof MALICIOUS
  | typeof SPAM
  | typeof NOTEPAD;

// Função para gerar os botões do painel de botões
export function makeButton(btn: ButtonReference) {
  switch (btn) {
    case SAFE:
      return new GameObject({
        pos: new Position(42, 222),
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_safe",
        heldSpriteName: "btn_safe_held",
        clickFunction: () => {
          return { type: CLASSEMAIL, class: SAFE };
        },
      });
    case MALICIOUS:
      return new GameObject({
        pos: new Position(74, 222),
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_malicious",
        heldSpriteName: "btn_malicious_held",
        clickFunction: () => {
          return { type: CLASSEMAIL, class: MALICIOUS };
        },
      });
    case SPAM:
      return new GameObject({
        pos: new Position(106, 222),
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_spam",
        heldSpriteName: "btn_spam_held",
        clickFunction: () => {
          return { type: CLASSEMAIL, class: SPAM };
        },
      });
    case NOTEPAD:
      return new GameObject({
        pos: new Position(138, 222),
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_notepad",
        heldSpriteName: "btn_notepad_held",
        clickFunction: () => {
          return { type: OPENNOTEPAD };
        },
      });
  }
}
