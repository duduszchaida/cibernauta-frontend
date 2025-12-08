import type CanvasObject from "../../CanvasObject";
import GameObject from "../../GameObject";
import { findSprite } from "../../Sprites/FindSprite";
import type Position from "../../Position";
import type Sprite from "../../Sprites/Sprite";

export const PICTURE = "picture"; // Referência de elemento de foto de perfil do e-mail

export const SELECT = "select"; // Referência da ação de selecionar anomalia

// Elemento de imagem de perfil do e-mail, retorna a ação de SELECT e sua referência como função de click
export default class EmailPicture extends GameObject {
  reference = PICTURE; // Referência do elemento
  anomaly: boolean; // Indica se é uma anomalia
  selected: boolean = false; // Indica se está selecionado
  selectedSprite: Sprite; // Sprite de selecionado

  constructor(args: {
    pos?: Position;
    width: number;
    height: number;
    anomaly: boolean;
    spriteName?: string;
  }) {
    super(args);
    this.anomaly = args.anomaly;
    this.clickFunction = () => {
      return { type: SELECT, reference: this.reference };
    };
    this.selectedSprite = findSprite(this.reference + "_selected");
  }

  /**
   * Com um dado CanvasObject renderiza seu sprite e se estiver selecionado renderiza seu selectedSprite por cima
   * @param canvasObject
   * @returns
   */
  render(canvasObject: CanvasObject) {
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
    if (!this.selected) {
      return;
    }
    canvasObject.drawSprite(
      this.selectedSprite,
      this.pos,
      this.width,
      this.height,
    );
  }
}
