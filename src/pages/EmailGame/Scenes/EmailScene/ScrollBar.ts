import type CanvasObject from "../../CanvasObject";
import Position from "../../Position";
import GameObject from "../../Elements/GameObject";

// TO-DO: comentar

export const SCROLLTO = "scrollto"; // Referência da ação de escrolar para algum lugar específico

const fullBarLength = 182; // Cumprimento máximo da barra de scroll

// Objeto de barra de scroll utilizado para escrollar EmailContent
export default class ScrollBar extends GameObject {
  barLength: number; // Cumprimento da barra em px
  scrollableLength: number; // Cumprimento do espaço para escrolar em px
  shift = 0; // Quantidade de pixels da barra atualmente escrolados
  scrollSlot = new GameObject({
    width: 12,
    height: 192,
    spriteName: "scroll_slot",
    pos: new Position(330, 56),
  }); // Objeto do fundo da barra

  constructor(
    contentTextHeight: number, // Altura em px do conteúdo
    scrollAmmount: number, // Quantidade de pixels escrolado do conteúdo por pixel da barra
  ) {
    super({
      pos: new Position(330, 58),
      spriteName: "scroll_bar",
      height: 188,
      width: 12,
    });
    let textHeight = contentTextHeight - 156; // Comprimento de conteúdo escrolavel em px
    this.scrollableLength = Math.ceil(textHeight / scrollAmmount);
    this.barLength = fullBarLength - this.scrollableLength;
    this.clickFunction = (mousePos: Position) => {
      return {
        type: SCROLLTO,
        shift: mousePos.y - this.pos.y - (this.barLength / 4 + 3),
      };
    };
    this.dragFunction = (mousePos: Position) => {
      return {
        type: SCROLLTO,
        shift: mousePos.y - this.pos.y - (this.barLength / 4 + 3),
      };
    };
  }

  /**
   * Escrola para cima ou para baixo dependendo do número dado
   * @param num
   * @returns
   */
  scroll(num: number) {
    if (this.shift <= 0 && num < 0) {
      return;
    }
    if (this.shift >= this.scrollableLength && num > 0) {
      return;
    }
    this.shift += num;
  }

  /**
   * Escrola à uma dada posição específica
   * @param num
   */
  scrollTo(num: number) {
    if (num > 0) {
      this.shift = Math.min(this.scrollableLength, num);
    }
    if (num < this.scrollableLength) {
      this.shift = Math.max(0, num);
    }
  }

  /**
   * Com um dado canvasObject renderiza o espaço da barra, o comprimento da barra, seu topo e sua base
   * @param canvasObject
   */
  render(canvasObject: CanvasObject): void {
    this.scrollSlot.render(canvasObject);
    canvasObject.drawSprite(
      this.sprite,
      this.pos.addPos(new Position(2, this.shift)),
      8,
      3,
    );
    canvasObject.drawSprite(
      this.sprite,
      this.pos.addPos(new Position(2, 3 + this.shift)),
      8,
      this.barLength,
      new Position(0, 3),
      8,
      1,
    );
    canvasObject.drawSprite(
      this.sprite,
      this.pos.addPos(new Position(2, 3 + this.shift + this.barLength)),
      8,
      3,
      new Position(0, 4),
    );
  }
}
