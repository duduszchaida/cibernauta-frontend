import type CanvasObject from "../../CanvasObject";
import GameObject from "../../Elements/GameObject";
import Sprite from "../../Elements/Sprite";
import { findSprite } from "../../FindSprite";
import Position from "../../Position";

export const NOTEPAD = "notepad"; // Referência do objeto de caderno

export class Notepad extends GameObject {
  currentPage = 0;
  pages: (string | Sprite)[];
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
      "123",
      "456",
      findSprite("page_test"),
      "84324654",
    ];
  }

  get firstPage(): boolean {
    return this.currentPage == 0;
  }

  get lastPage(): boolean {
    return this.currentPage == this.pages.length - 1;
  }

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
      new Position(197, 142),
      "right",
      115,
    );
  }
}
