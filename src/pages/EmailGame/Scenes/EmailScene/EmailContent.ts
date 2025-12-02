import type CanvasObject from "../../CanvasObject";
import GameObject from "../../GameObject";
import { findSprite } from "../../Sprites/FindSprite";
import fontMaps from "../../FontMaps";
import measureTextWidth from "../../MeasureTextWidth";
import Position from "../../Position";
import type Sprite from "../../Sprites/Sprite";
import { SELECT } from "./EmailPicture";

export const CONTENT = "content"; // Referência de elemento de conteúdo do email

// Representa uma linha de texto no conteúdo do email
export type Line = {
  words: string[]; // Palavras na linha
  width: number; // Comprimento da linha em pixels
};

// Representa uma série de linhas como um parágrafo
export type Paragraph = Line[];

// Objeto do conteúdo de um email
export default class EmailContent extends GameObject {
  paragraphs: Paragraph[] = []; // Lista de parágrafos do objeto
  font = "minecraftia"; // Font do objeto
  fontSprite: Sprite; // Sprite da fonte do objeto
  textHeight = 0; // Altura total do texto

  scrollShift = 0; // Distância de scroll a partir do início do texto em pixels
  scrollShiftAmmount = 2; // Quantidade somada/subtraida à distancia de scroll quando escrolado o texto
  needsScroll: boolean = false; // Indica se o texto tem tamanho suficiente para usar uma barra de scroll

  selectedSprite: Sprite = findSprite("paragraph_selected"); // Sprite de contorno de seleção de parágrafo
  selectedParagraph: number | null = null; // Indica o índice do parágrafo selecionado atualmente

  constructor(
    text: string, // Texto para gerar os parágrafos do conteudo
  ) {
    super({
      pos: new Position(16, 64),
      width: 304,
      height: 152,
      // Largura e altura determinam a partir daonde e até aonde o texto pode ser renderizado
    });
    this.fontSprite = findSprite(this.font + "_black");
    this.generateParagraphs(text);
    if (this.textHeight > this.height) {
      this.needsScroll = true;
    }
    this.scrollShift = 0;
  }

  /**
   * Gera os parágrafos do conteúdo a partir de um dado texto
   * @param text Texto para geração
   */
  generateParagraphs(text: string) {
    let paragraphsStrings = text.split("\n\n"); // Texto separado à cada 2 quebras de linha
    let charHeight = fontMaps[this.font].charHeight; // Altura dos caracteres da fonte
    this.textHeight = 0;
    paragraphsStrings.forEach((p, i) => {
      this.paragraphs[i] = [];
      let letters = p.split(""); // Separa cada linha do texto do parágrafo
      let currentWordStart = 0; // Index do início da palavra atual
      let currentWordEnd = 0; // Index do fim da palavra atual
      let currentLine = 0; // Index da linha atual
      for (let j = 0; j < letters.length; j++) {
        // Gera uma linha no index da linha atual caso não haja uma ainda
        if (this.paragraphs[i][currentLine] == undefined) {
          this.paragraphs[i][currentLine] = { words: [], width: 0 };
        }
        let line = this.paragraphs[i][currentLine]; // Referência da linha atual
        const char = letters[j]; // Caractere atual
        // Caso o caracter seja espaço, uma quebra de linha ou o último caractere (o final de uma palavra)
        if (char == " " || char == "\n" || j == letters.length - 1) {
          if (j == letters.length - 1) {
            // Soma o indice para fazer o substring se for o último caractere do parágrafo
            j++;
          }
          currentWordEnd = j;
          let word = p.substring(currentWordStart, currentWordEnd); // Palavra atual
          let wordWidth = measureTextWidth(word, this.font); // Largura da palavra atual

          // Se a largura atual da linha mais a largura da palavra atual for maior do que a largura máxima do texto
          // aumenta o índice da linha atual e uma nova linha é criada
          if (line.width + wordWidth > this.width) {
            currentLine++;
            this.textHeight += charHeight;
            this.paragraphs[i][currentLine] = { words: [], width: 0 };
            line = this.paragraphs[i][currentLine];
          }

          // Soma a largura da palavra à largura da linha atual, adiciona a palavra atual à linha atual e reseta o índice de início da palavra atual para o próximo caractere
          line.width += wordWidth;
          line.words.push(word);
          currentWordStart = j + 1;

          // Soma a altura de caractere à altura do texto e atualiza o contador de linhas se for uma quebra de linha,
          // se não for adiciona a largura de um espaço
          if (char == "\n") {
            this.textHeight += charHeight;
            currentLine++;
          } else {
            line.width += 3;
          }
        }
      }
      // Soma a altura de 2 linhas à altura do texto
      this.textHeight += 2 * charHeight;
    });
  }

  /**
   * Calcula a partir da dada posição do cursor e do shift do texto atual, qual parágrafo foi selecionado
   * e retorna o tipo SELECT com o parágrafo selecionado
   * @param cursorPos posição do cursor
   * @returns
   */
  clickFunction = (cursorPos: Position) => {
    const difPos = cursorPos.subtractPos(this.pos);
    let paragraphId = -1;
    let paragraphHeight = 0;
    let found = false;
    // Procura o parágrafo que estiver com seu início acima do cursor e seu fim abaixo dele
    do {
      paragraphId++;
      paragraphHeight +=
        (this.paragraphs[paragraphId].length + 1) *
        fontMaps[this.font].charHeight;
      if (
        paragraphHeight -
          this.scrollShift -
          fontMaps[this.font].charHeight / 2 >=
        difPos.y
      ) {
        found = true;
      }
    } while (paragraphId < this.paragraphs.length - 1 && !found);

    return { type: SELECT, reference: found ? paragraphId : null };
  };

  /**
   * Se estiver dentro dos limites, soma scrollShiftAmmount multiplicado pelo dado valor ao scrollShift,
   * subindo ou descendo o texto na renderização
   * @param mult pode ser positivo ou negativo
   * @returns
   */
  scroll(mult = 1) {
    if (mult < 0) {
      if (this.scrollShift <= 0) {
        return;
      }
    } else {
      if (
        this.scrollShift >=
        Math.floor((this.textHeight - this.height) / this.scrollShiftAmmount) *
          this.scrollShiftAmmount
      ) {
        return;
      }
    }
    this.scrollShift += this.scrollShiftAmmount * mult;
  }

  /**
   * Substitui o scrollShift pelo um dado valor que esteja dentro do limite
   * @param height Altura a ser escrolada
   */
  scrollTo(height: number) {
    height = Math.max(Math.ceil(height), 0);
    this.scrollShift = Math.min(
      this.textHeight - this.height,
      this.scrollShiftAmmount * height,
    );
  }

  /**
   * Usa um dado CanvasObject para renderizar o conteúdo
   * @param canvasObject
   * @returns
   */
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
