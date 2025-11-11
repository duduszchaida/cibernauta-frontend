import type { Line } from "./Elements/EmailContent";
import fontMaps from "./FontMaps";
import Position from "./Position";
import type Sprite from "./Sprite";
import measureTextWidth from "./MeasureTextWidth";

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

  drawSprite(
    sprite: Sprite,
    pos: Position,
    length: Position,
    slicePos: Position = new Position(),
    sliceLength: Position | null = null,
  ) {
    if (!sliceLength) {
      sliceLength = length;
    }
    const img = sprite.img;
    this.ctx?.drawImage(
      img,
      slicePos.x,
      slicePos.y,
      sliceLength.x,
      sliceLength.y,
      pos.x * this.scale,
      pos.y * this.scale,
      length.x * this.scale,
      length.y * this.scale,
    );
  }

  writeCharacter(
    fontSprite: Sprite,
    font: string,
    char: string,
    pos: Position,
    topShift = 0,
    botShift = 0,
  ) {
    const fontMap = fontMaps[font];
    const charMap = fontMap.letters[char];
    this.ctx.drawImage(
      fontSprite.img,
      charMap.x * fontMap.cellWidth,
      charMap.y * fontMap.cellHeight + topShift,
      charMap.width,
      fontMaps[font].cellHeight - (topShift + botShift),
      pos.x * this.scale,
      (pos.y + topShift) * this.scale,
      charMap.width * this.scale,
      (fontMaps[font].cellHeight - (topShift + botShift)) * this.scale,
    );
  }

  writeText(
    fontSprite: Sprite,
    font: string,
    text: string,
    pos: Position,
    direction = "left",
    limitWidth = 999,
    topShift = 0,
    botShift = 0,
  ) {
    let chars = text.split("");
    let totalWidth = 0;
    let currentWidth = 0;
    let currentHeight = 0;
    let startX = 0;
    chars.forEach((l) => {
      if (fontMaps[font].letters[l] == undefined) {
        console.warn(`character "${l}" missing`);
      }
      totalWidth += fontMaps[font].letters[l].width + 1;
    });
    if (direction == "center") {
      startX = Math.floor(-totalWidth / 2);
    }
    const fontMap = fontMaps[font];
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
        topShift,
        botShift,
      );
      currentWidth += charMap.width + 1;
    }
  }

  writeEmailContent(
    lines: Line[],
    font: string,
    fontSprite: Sprite,
    pos: Position,
    scrollShift: number,
    maxRenderHeight: number,
    maxLineWidth: number,
    direction = "left",
  ) {
    const fontMap = fontMaps[font];
    let currentHeight = 0;
    lines.forEach((line, i) => {
      let topShift = 0;
      let topDiff = scrollShift - currentHeight;
      if (topDiff > 0) {
        if (topDiff > fontMap.cellHeight) {
          currentHeight += fontMap.cellHeight;
          return;
        }
        topShift = topDiff;
      }
      let botDiff =
        currentHeight - scrollShift + fontMap.cellHeight - maxRenderHeight;
      let botShift = 0;
      if (botDiff > 0) {
        if (botDiff > fontMap.cellHeight) {
          return;
        }
        botShift = botDiff;
      }
      let startX = 0;
      if (direction == "center") {
        startX = Math.floor(maxLineWidth / 2) - Math.floor(line.width / 2);
      }
      let currentWidth = 0;
      line.words.forEach((word) => {
        this.writeText(
          fontSprite,
          font,
          word,
          new Position(
            pos.x + startX + currentWidth,
            pos.y + i * fontMap.cellHeight - scrollShift,
          ),
          "left",
          this.width,
          topShift,
          botShift,
        );
        currentWidth += measureTextWidth(word, font) + 3;
      });
      currentHeight += fontMap.cellHeight;
    });
  }
}
