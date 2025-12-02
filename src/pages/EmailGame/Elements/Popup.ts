import type CanvasObject from "../CanvasObject";
import { findSprite } from "../Sprites/FindSprite";
import Position from "../Position";
import Timer from "./Timer";

// Classe usada para renderizar um texto por um tempo limitado acima de qualquer cena atual
export class Popup {
  pos = new Position(0, 240); // Posição do objeto
  text: string = ""; // Texto usado no popup
  fontSprite = findSprite("minecraftia_brown"); // Sprite usado para renderizar o texto
  bgSprite = findSprite("popup"); // Sprite usado para renderizar o fundo
  timer: Timer | null = null; // Objeto de Timer usado para encerrar permitir a renderização

  /**
   * Atualiza a propriedade de text, gera um novo timer com o tempo de objeto com o dado segundos
   * e uma função de atualizar a propriedade de timer para null como sua função de objetivo e
   * inicia o timer.
   * @param text
   * @param seconds
   */
  newPopup(text: string, seconds: number) {
    this.text = text;
    this.timer = new Timer({
      goalSecs: seconds,
      goalFunc: () => {
        this.timer = null;
      },
    });
    this.timer.start();
  }

  /**
   * Se a propriedade timer não for null, usa o dado CanvasObject para renderizar seu sprite de fundo e seu texto
   * @param canvasObject
   */
  render(canvasObject: CanvasObject): void {
    if (this.timer) {
      canvasObject.drawSprite(this.bgSprite, this.pos, 144, 16);
      canvasObject.writeText(
        this.fontSprite,
        "minecraftia",
        this.text,
        this.pos.add(6, 1),
      );
    }
  }
}
