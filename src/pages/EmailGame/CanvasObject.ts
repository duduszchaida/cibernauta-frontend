import fontMaps from "./FontMaps";
import Position from "./Position";
import type Sprite from "./Sprite";
import measureTextWidth from "./MeasureTextWidth";
import type { Line } from "./Scenes/EmailScene/EmailContent";

export default class CanvasObject {
  width: number = 800;
  height: number = 200;
  id: string;
  scale: number;
  backgroundColor: string;
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(args: {
    width: number;
    height: number;
    id: string;
    scale: number;
    backgroundColor: string;
    canvasElement: HTMLCanvasElement;
  }) {
    this.width = args.width; // Largura do objeto em px
    this.height = args.height; // Altura do objeto em px
    this.id = args.id; // Id do componente do canvas
    this.scale = args.scale; // Valor para multiplicar a escala das imagens
    this.backgroundColor = args.backgroundColor; // Valor para pintar o fundo
    this.element = args.canvasElement; //

    this.element.style.imageRendering = "pixelated";
    this.element.width = this.width;
    this.element.height = this.height;
    this.ctx = this.element.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   *
   * @param sprite Sprite object to be drawn
   * @param pos Position where the sprite object will be drawn
   * @param length
   * @param slicePos
   * @param sliceLength
   */
  drawSprite(
    sprite: Sprite,
    pos: Position,
    width: number,
    height: number,
    slicePos: Position = new Position(),
    sliceWidth: number | null = null,
    sliceHeight: number | null = null,
  ) {
    if (!sliceWidth) {
      sliceWidth = width;
    }
    if (!sliceHeight) {
      sliceHeight = height;
    }
    const img = sprite.img;
    this.ctx?.drawImage(
      img,
      slicePos.x,
      slicePos.y,
      sliceWidth,
      sliceHeight,
      Math.floor(pos.x) * this.scale,
      Math.floor(pos.y) * this.scale,
      Math.floor(width) * this.scale,
      Math.floor(height) * this.scale,
    );
  }

  writeCharacter(
    fontSprite: Sprite,
    font: string,
    char: string,
    pos: Position,
    slicePosY: number = 0,
    sliceHeight: number = 0,
  ) {
    const fontMap = fontMaps[font];
    const charMap = fontMap.letters[char];
    if (sliceHeight == 0) {
      sliceHeight = fontMaps[font].cellHeight;
    }
    this.ctx.drawImage(
      fontSprite.img,
      charMap.x * fontMap.cellWidth,
      charMap.y * fontMap.cellHeight + slicePosY,
      charMap.width,
      sliceHeight,
      pos.x * this.scale,
      (pos.y + slicePosY) * this.scale,
      charMap.width * this.scale,
      sliceHeight * this.scale,
    );
  }

  writeText(
    fontSprite: Sprite,
    font: string,
    text: string,
    pos: Position,
    direction = "right",
    limitWidth = Infinity,
    slicePosY = 0,
    sliceHeight = 0,
  ) {
    let chars = text.split("");
    let totalWidth = 0;
    let currentWidth = 0;
    let currentHeight = 0;
    let startX = 0;
    const fontMap = fontMaps[font];
    chars.forEach((l) => {
      if (fontMap.letters[l] == undefined) {
        console.warn(`character "${l}" missing`);
      }
      totalWidth += fontMap.letters[l].width + 1;
    });
    if (direction == "center") {
      startX = Math.floor(-totalWidth / 2);
    }
    if (direction == "left") {
      for (let i = chars.length - 1; i > -1; i--) {
        const char = chars[i];
        const charMap = fontMap.letters[char];
        currentWidth += charMap.width;
        // if (currentWidth + charMap.width > limitWidth || char == "\n") {
        //   currentWidth = 0;
        //   currentHeight += fontMap.cellHeight;
        // }
        this.writeCharacter(
          fontSprite,
          font,
          char,
          new Position(pos.x - currentWidth, pos.y + currentHeight),
          slicePosY,
          sliceHeight,
        );
        currentWidth += 1;
      }
    } else {
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const charMap = fontMap.letters[char];
        if (currentWidth + charMap.width > limitWidth || char == "\n") {
          currentWidth = 0;
          currentHeight += fontMap.cellHeight;
        }
        this.writeCharacter(
          fontSprite,
          font,
          char,
          new Position(pos.x + startX + currentWidth, pos.y + currentHeight),
          slicePosY,
          sliceHeight,
        );
        currentWidth += charMap.width + 1;
      }
    }
  }

  writeLine(
    line: Line,
    pos: Position,
    fontSprite: Sprite,
    font: string,
    sliceY: number,
    sliceHeight: number,
  ) {
    let currentX = 0;
    line.words.forEach((x) => {
      this.writeText(
        fontSprite,
        font,
        x,
        pos.add(currentX, 0),
        "right",
        999,
        sliceY,
        sliceHeight,
      );
      currentX += measureTextWidth(x, font) + 3;
    });
  }

  writeParagraph(
    paragraph: Line[],
    pos: Position,
    fontSprite: Sprite,
    font: string,
    scrollShift: number,
    paragraphHeight: number,
    cellHeight: number,
    maxRenderHeight: number,
    selected: boolean,
    selectedSprite: Sprite,
  ) {
    let currentY = 0; // Distance in pixels of the current rendering line
    paragraph.forEach((l) => {
      let sliceY = 0;
      let sliceHeight = 0;
      if (
        scrollShift < paragraphHeight + currentY + cellHeight &&
        scrollShift + maxRenderHeight > paragraphHeight + currentY
      ) {
        if (scrollShift > paragraphHeight + currentY) {
          sliceY = scrollShift - (paragraphHeight + currentY);
          sliceHeight = cellHeight - sliceY;
        } else if (
          scrollShift + maxRenderHeight <
          paragraphHeight + currentY + cellHeight
        ) {
          sliceHeight =
            scrollShift + maxRenderHeight - (paragraphHeight + currentY);
        }
        this.writeLine(
          l,
          pos.add(0, currentY - scrollShift),
          fontSprite,
          font,
          sliceY,
          sliceHeight,
        );
      }
      currentY += fontMaps[font].cellHeight;
    });
    if (selected) {
      this.drawSprite(
        selectedSprite,
        pos.subtract(0, scrollShift + 1),
        305,
        1,
        new Position(4, 0),
        1,
        1,
      );
      this.drawSprite(
        selectedSprite,
        pos.subtract(0, scrollShift - currentY - 2),
        305,
        1,
        new Position(4, 0),
        1,
        1,
      );
      this.drawSprite(
        selectedSprite,
        pos.subtract(4, scrollShift - 3),
        1,
        currentY - 4,
        new Position(3, 0),
        1,
        1,
      );
      this.drawSprite(
        selectedSprite,
        pos.subtract(-305 - 3, scrollShift - 3),
        1,
        currentY - 4,
        new Position(3, 0),
        1,
        1,
      );
      //
      this.drawSprite(
        selectedSprite,
        pos.subtract(4, scrollShift + 1),
        4,
        4,
        new Position(),
        4,
        4,
      );
      this.drawSprite(
        selectedSprite,
        pos.subtract(-305, scrollShift + 1),
        4,
        4,
        new Position(5, 0),
        4,
        4,
      );
      this.drawSprite(
        selectedSprite,
        pos.subtract(4, scrollShift - currentY + 1),
        4,
        4,
        new Position(0, 5),
        4,
        4,
      );
      this.drawSprite(
        selectedSprite,
        pos.subtract(-305, scrollShift - currentY + 1),
        4,
        4,
        new Position(5, 5),
        4,
        4,
      );
    }
  }

  renderEmailContent(
    paragraphs: Line[][],
    font: string,
    fontSprite: Sprite,
    pos: Position,
    scrollShift: number, // Distance in pixels of vertical shift from top of the content
    maxRenderHeight: number,
    selectedParagraph: number | null,
    selectedSprite: Sprite,
  ) {
    const fontMap = fontMaps[font];
    let currentParagraphHeight = 0; // Distance in pixels of the current rendering paragraph
    paragraphs.forEach((p, i) => {
      this.writeParagraph(
        p,
        pos.add(0, currentParagraphHeight),
        fontSprite,
        font,
        scrollShift,
        currentParagraphHeight,
        fontMap.cellHeight,
        maxRenderHeight,
        i == selectedParagraph,
        selectedSprite,
      );
      currentParagraphHeight += (p.length + 1) * fontMap.cellHeight;
    });
  }
}
