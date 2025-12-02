import type CanvasObject from "../../CanvasObject";
import GameObject from "../../GameObject";
import Timer from "../../Elements/Timer";
import { findSprite } from "../../Sprites/FindSprite";
import Position from "../../Position";

// Objeto de notificação quando o usuário classifica um email com elementos ou classificação incorreta
export class Notifier extends GameObject {
  spriteClass = findSprite("notif_class"); // Sprite para classificação incorreta
  spriteElement = findSprite("notif_element"); // Sprite para elemento incorreto
  currentType: "class" | "element" = "class"; // Tipo da notificação atual
  timer: Timer = new Timer({
    goalSecs: 3,
    goalFunc: () => {
      this.invisible = true;
    },
  }); // Timer para tornar a notificação invisível

  constructor() {
    super({
      pos: new Position(101, 215),
      height: 35,
      width: 131,
      invisible: true,
      clickFunction: () => {
        this.invisible = true;
        this.ignoreClick = true;
      },
    });
  }

  /**
   * Torna a notificação visível e inicia o timer
   * @param type
   */
  notify(type: "class" | "element") {
    this.currentType = type;
    this.invisible = false;
    this.timer.start();
  }

  /**
   * Se estiver visível, renderiza o sprite de acordo com o tipo atual
   * @param canvasObject
   * @returns
   */
  render(canvasObject: CanvasObject): void {
    if (this.invisible) {
      return;
    }
    let sprite;
    if (this.currentType == "class") {
      sprite = this.spriteClass;
    } else {
      sprite = this.spriteElement;
    }
    canvasObject.drawSprite(sprite, this.pos, this.width, this.height);
  }
}
