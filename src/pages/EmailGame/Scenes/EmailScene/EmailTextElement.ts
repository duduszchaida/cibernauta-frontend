import { SELECT } from "./EmailPicture";
import TextObject from "../../Elements/TextObject";
import type Sprite from "../../Elements/Sprite";
import Position from "../../Position";
import { findSprite } from "../../FindSprite";
import type CanvasObject from "../../CanvasObject";
import fontMaps from "../../FontMaps";

export const ADDRESS = "address"; // Referência de elemento de endereço do email
export const NAME = "name"; // Referência de elemento de nome do email

// Elemento de email com conteúdo de texto, retorna a ação de SELECT e sua referência como função de click
export default class EmailTextElement extends TextObject {
  anomaly: boolean = false; // Indica se o elemento é uma anomalia
  selected: boolean = false; // Indica se o elemento está selecionado como anomalia
  selectionSprite: Sprite; // Sprite de seleção da fonte usada
  reference: string; // Referência de elemento

  constructor(args: {
    pos: Position;
    reference: typeof ADDRESS | typeof NAME;
    anomaly: boolean;
    text: string;
    font: string;
    color: string;
  }) {
    super(args);
    this.selectionSprite = findSprite(this.font + "_selected");
    this.reference = args.reference;
    this.anomaly = args.anomaly;
    this.clickFunction = () => {
      return { type: SELECT, reference: this.reference };
    };
  }

  /**
   * Com um dado canvasObject renderiza seu texto, e se selecionado, seu sprite de seleção
   * @param canvasObject
   */
  render(canvasObject: CanvasObject) {
    canvasObject.writeText(this.fontSprite, this.font, this.text, this.pos);
    if (this.selected) {
      canvasObject.drawSprite(
        this.selectionSprite,
        this.pos.addPos(new Position(-3, 0)),
        4,
        fontMaps[this.font].charHeight + 3,
        new Position(),
        4,
      );
      canvasObject.drawSprite(
        this.selectionSprite,
        this.pos,
        this.width - 2,
        fontMaps[this.font].charHeight + 3,
        new Position(4, 0),
        1,
      );
      canvasObject.drawSprite(
        this.selectionSprite,
        this.pos.addPos(new Position(this.width - 2, 0)),
        4,
        fontMaps[this.font].charHeight + 3,
        new Position(5),
        4,
      );
    }
  }
}
