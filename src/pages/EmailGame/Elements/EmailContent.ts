import type CanvasObject from "../CanvasObject";
import { findSprite } from "../FindSprite";
import fontMaps from "../FontMaps";
import measureTextWidth from "../MeasureTextWidth";
import Position from "../Position";
import type Sprite from "../Sprite";
import GameObject from "./GameObject";

export type Line = {
  words: string[];
  width: number;
};

export default class EmailContent extends GameObject {
  text: string;
  lines: Line[] = [];
  font = "minecraftia";
  fontSprite: Sprite;
  textHeight: number;
  scrollShift = 0;
  scrollShiftAmmount: number;
  hasScroll: boolean = false;

  constructor(args: { text: string }) {
    super({
      pos: new Position(16, 64),
      width: 304,
      height: 176,
    });
    this.text = args.text;
    this.fontSprite = findSprite(this.font + "_black");
    this.generateLines();
    this.textHeight = this.lines.length * fontMaps[this.font].cellHeight;
    if (this.textHeight > this.height) {
      this.hasScroll = true;
    }
    this.scrollShift = 0;
    this.scrollShiftAmmount = 6;
  }

  generateLines() {
    let letters = this.text.split("");
    let currentWordStart = 0;
    let currentWordEnd = 0;
    let currentLine = 0;

    for (let i = 0; i < letters.length; i++) {
      if (this.lines[currentLine] == undefined) {
        this.lines[currentLine] = { words: [], width: 0 };
      }
      let line = this.lines[currentLine];
      const char = letters[i];
      if (char == " " || char == "\n" || i == letters.length) {
        if (i == letters.length) {
          i++;
        }
        currentWordEnd = i;
        let word = this.text.substring(currentWordStart, currentWordEnd);
        let wordWidth = measureTextWidth(word, this.font);
        if (line.width + wordWidth > this.width) {
          currentLine++;
          this.lines[currentLine] = { words: [], width: 0 };
          line = this.lines[currentLine];
        }
        line.width += wordWidth;
        line.words.push(word);
        currentWordStart = i + 1;
        if (char == "\n") {
          currentLine++;
        } else {
          line.width += 3;
        }
      }
    }
  }

  scroll(mult = 1) {
    if (mult < 0) {
      if (this.scrollShift <= 0) {
        return;
      }
    } else {
      if (
        this.scrollShift >=
        Math.ceil(
          (this.textHeight - this.height + 36) / this.scrollShiftAmmount,
        ) *
          this.scrollShiftAmmount
      ) {
        return;
      }
    }
    this.scrollShift += this.scrollShiftAmmount * mult;
  }

  scrollTo(num: number) {
    num = Math.max(Math.ceil(num), 0);
    this.scrollShift = Math.min(
      this.lines.length * 12 - this.height + 36,
      this.scrollShiftAmmount * num,
    );
  }

  render(canvasObject: CanvasObject): void {
    canvasObject.writeEmailContent(
      this.lines,
      this.font,
      this.fontSprite,
      this.pos,
      this.scrollShift,
      this.height,
      this.width,
    );
  }
}
