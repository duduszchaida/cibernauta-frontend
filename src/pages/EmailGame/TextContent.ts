import fontMaps from "./FontMaps";
import measureTextWidth from "./MeasureTextWidth";

export default class TextContent {
	font: string;
	lines: { words: string[]; width: number }[] = [];
	maxLineWidth: number;
	maxRenderHeight: number;
	textHeight: number;

	hasScroll: boolean = false;
	scrollShift: number = 0;
	scrollAmmount: number = 0;

	constructor(args: {
		font: string;
		maxLineWidth: number;
		maxRenderHeight: number;
		text: string;
	}) {
		this.font = args.font;
		this.maxLineWidth = args.maxLineWidth;
		this.maxRenderHeight = args.maxRenderHeight;
		this.generateLines(args.text, args.maxLineWidth, args.font);
		this.textHeight = this.lines.length * fontMaps[this.font].cellHeight;
	}

	generateLines(text: string, maxLineWidth: number, font: string) {
		let letters = text.split("");
		let currentWordStart = 0;
		let currentWordEnd = 0;
		let currentLine = 0;

		for (let i = 0; i < letters.length; i++) {
			if (this.lines[currentLine] == undefined) {
				this.lines[currentLine] = { words: [], width: 0 };
			}
			let line = this.lines[currentLine];
			const char = letters[i];
			if (char == " " || char == "\n") {
				currentWordEnd = i;
				let word = text.substring(currentWordStart, currentWordEnd);
				let wordWidth = measureTextWidth(word, font);
				if (line.width + wordWidth > maxLineWidth) {
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
					(this.textHeight - this.maxRenderHeight) / this.scrollAmmount
				) *
					this.scrollAmmount
			) {
				return;
			}
		}
		this.scrollShift += this.scrollAmmount * mult;
	}

	scrollTo(num: number) {
		this.scrollShift = this.scrollAmmount * num;
	}
}
