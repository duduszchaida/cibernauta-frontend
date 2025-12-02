import type CanvasObject from "../../CanvasObject";
import GameObject from "../../GameObject";
import Sprite from "../../Sprites/Sprite";
import { findSprite } from "../../Sprites/FindSprite";
import Position from "../../Position";

export const NOTEPAD = "notepad"; // Referência do objeto de caderno

// Objeto de caderno usado em EmailScene
export class Notepad extends GameObject {
  currentPage = 0; // Id da página atual
  pages: (string | Sprite)[]; // Lista de sprites / Textos do caderno
  fontSprite = findSprite("minecraftia_brown");
  constructor(pages?: (Sprite | string)[]) {
    super({
      pos: new Position(187, 127),
      height: 123,
      width: 135,
      spriteName: "notepad",
      invisible: true,
    });
    this.clickFunction = (pos: Position) => {
      if (pos.subtractPos(this.pos).x > this.width / 2) {
        if (this.currentPage < this.pages.length - 1) {
          this.currentPage++;
        }
      } else {
        if (this.currentPage > 0) {
          this.currentPage--;
        }
      }
    };
    this.pages = pages ?? [
      findSprite("page_test"),
      "123\n456",
      findSprite("page_test"),
      "84324654 843246541 8432465454 843246540,154",
    ];
  }

  get firstPage(): boolean {
    return this.currentPage == 0;
  }

  get lastPage(): boolean {
    return this.currentPage == this.pages.length - 1;
  }

  /**
   * Com um dado canvas object, renderiza sua imagem de fundo e a página atual
   * @param canvasObject
   * @returns
   */
  render(canvasObject: CanvasObject): void {
    if (this.invisible) {
      return;
    }
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
    const page = this.pages[this.currentPage];
    if (page instanceof Sprite) {
      canvasObject.drawSprite(page, this.pos, this.width, this.height);
      return;
    }

    canvasObject.writeText(
      this.fontSprite,
      "minecraftia",
      page,
      new Position(197, 141),
      "right",
      115,
      4,
    );
  }
}
