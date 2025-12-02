import type CanvasObject from "../../CanvasObject";
import GameObject from "../../Elements/GameObject";
import Position from "../../Position";
import type { Setting } from "./SettingsReferences";

export const TOGGLESETTING = "toggleConfig"; // Referência da ação de alterar uma opção

// Botão de ativar/desativar uma opção
export class Toggle extends GameObject {
  on: boolean; // Indica se está ativo
  constructor(config: Setting, on: boolean, order: number) {
    super({
      height: 26,
      width: 66,
      clickFunction: () => {
        this.on = !this.on;
        return { type: TOGGLESETTING, config: config };
      },
      pos: new Position(210, 54 + order * 32),
      spriteName: "yes_no_switch",
    });
    this.on = on;
  }

  /**
   * Com um dado canvasObject renderiza seu sprite de acordo com seu estado
   * @param canvasObject
   */
  render(canvasObject: CanvasObject): void {
    canvasObject.drawSprite(
      this.sprite,
      this.pos,
      this.width,
      this.height,
      new Position(0, this.on ? 0 : 26),
    );
  }
}
