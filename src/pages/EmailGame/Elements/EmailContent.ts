import type CanvasObject from "../CanvasObject";
import { findSprite } from "../FindSprite";
import fontMaps from "../FontMaps";
import measureTextWidth from "../MeasureTextWidth";
import Position from "../Position";
import type Sprite from "../Sprite";
import { INSPECT } from "./EmailComponent";
import GameObject from "./GameObject";

export type Line = {
  words: string[];
  width: number;
};

export default class EmailContent extends GameObject {
  text: string;
  paragraphs: Line[][] = [];
  font = "minecraftia";
  fontSprite: Sprite;
  selectedSprite: Sprite = findSprite("paragraph_selected");
  textHeight = 0;
  scrollShift = 0;
  scrollShiftAmmount: number;
  hasScroll: boolean = false;
  extraHeight = 24;
  selectedParagraph: number | null = null;

  constructor(args: { text: string }) {
    super({
      pos: new Position(16, 64),
      width: 304,
      height: 176,
    });
    this.text = args.text;
    this.fontSprite = findSprite(this.font + "_black");
    this.generateParagraphs();
    if (this.textHeight > this.height) {
      this.hasScroll = true;
    }
    this.scrollShift = 0;
    this.scrollShiftAmmount = 6;
    this.click = (cursorPos: Position) => {
      const difPos = cursorPos.subtractPos(this.pos);
      let paragraphId = -1;
      let paragraphHeight = 0;
      let found = false;
      do {
        paragraphId++;
        paragraphHeight +=
          (this.paragraphs[paragraphId].length + 1) *
          fontMaps[this.font].cellHeight;
        if (paragraphHeight - this.scrollShift >= difPos.y) {
          found = true;
        }
      } while (!found);
      return { type: INSPECT, reference: paragraphId };
    };
  }

  generateParagraphs() {
    let paragraphs = this.text.split("\n\n");
    let cellHeight = fontMaps[this.font].cellHeight;
    this.textHeight = 0;

    paragraphs.forEach((p, i) => {
      this.paragraphs[i] = [];
      let letters = p.split("");
      let currentWordStart = 0;
      let currentWordEnd = 0;
      let currentLine = 0;
      for (let j = 0; j < letters.length; j++) {
        // Generates current line in case there isn't any yet
        if (this.paragraphs[i][currentLine] == undefined) {
          this.paragraphs[i][currentLine] = { words: [], width: 0 };
        }
        let line = this.paragraphs[i][currentLine];
        const char = letters[j];
        if (char == " " || char == "\n" || j == letters.length - 1) {
          if (j == letters.length - 1) {
            j++;
          }
          currentWordEnd = j;
          let word = p.substring(currentWordStart, currentWordEnd);
          let wordWidth = measureTextWidth(word, this.font);
          if (line.width + wordWidth > this.width) {
            currentLine++;
            this.textHeight += cellHeight;
            this.paragraphs[i][currentLine] = { words: [], width: 0 };
            line = this.paragraphs[i][currentLine];
          }
          line.width += wordWidth;
          line.words.push(word);
          currentWordStart = j + 1;
          if (char == "\n") {
            currentLine++;
          } else {
            line.width += 3;
          }
        }
      }
      this.textHeight += 2 * cellHeight;
    });
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
          (this.textHeight - this.height + this.extraHeight) /
            this.scrollShiftAmmount,
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
      this.textHeight - this.height + this.extraHeight,
      this.scrollShiftAmmount * num,
    );
  }

  render(canvasObject: CanvasObject): void {
    canvasObject.renderEmailContent(
      this.paragraphs,
      this.font,
      this.fontSprite,
      this.pos,
      this.scrollShift,
      this.height,
      this.selectedParagraph,
      this.selectedSprite,
    );
    if (this.selectedParagraph == null) {
      return;
    }
  }
}
