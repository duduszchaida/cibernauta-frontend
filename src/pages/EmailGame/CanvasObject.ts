import fontMaps from "./FontMaps";
import Position from "./Position";
import type Sprite from "./Elements/Sprite";
import measureTextWidth from "./MeasureTextWidth";
import type { Line } from "./Scenes/EmailScene/EmailContent";

// Objeto para renderizar Sprites em um elmento HTML canvas
export default class CanvasObject {
  width: number; // Largura do elemento canvas HTML
  height: number; // Altura do elemento canvas HTML
  scale: number; // Escala em pixels para renderizar os Sprites
  backgroundColor: string; // Cor de fundo
  element: HTMLCanvasElement; // Elemento HTML canvas
  ctx: CanvasRenderingContext2D; // Contexto 2d do elemento de canvas

  constructor(args: {
    width: number;
    height: number;
    scale: number;
    backgroundColor: string;
    canvasElement: HTMLCanvasElement;
  }) {
    this.width = args.width;
    this.height = args.height;
    this.scale = args.scale;
    this.backgroundColor = args.backgroundColor;
    this.element = args.canvasElement;

    this.element.style.imageRendering = "pixelated";
    this.element.width = this.width;
    this.element.height = this.height;
    this.ctx = this.element.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
  }

  /**
   * Limpa a tela do canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Renderiza um dado sprite em sua posição e com suas dimensões
   * Se dado dados de recorte será renderizado apenas uma seção recortada do sprite
   * Caso contrário a seção recortada é equivalente ao sprite todo
   * @param sprite Sprite que será renderizado
   * @param pos Posição no jogo onde será renderizado
   * @param width Largura que será renderizado o sprite
   * @param height Altura que será renderizado o sprite
   * @param slicePos Posição no sprite onde será recortado
   * @param sliceWidth Largura do recorte no sprite
   * @param sliceHeight Altura do recorte no sprite
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

  /**
   * Renderiza um caractere em sua posição a partir do sprite de sua fonte e dados da fonte no fontMaps
   * Se dado dados de recorte será renderizado apenas uma seção do caractere (usado para renderizar textos cortados em altura)
   * Caso contrário a seção recortada é equivalente ao caractere todo
   * @param fontSprite Sprite da fonte a ser renderizado
   * @param font fonte do sprite
   * @param char caractere a ser renderizado
   * @param pos posição no jogo onde será renderizado
   * @param slicePosY posição vertical do recorte
   * @param sliceHeight altura do recorte
   */
  writeCharacter(
    fontSprite: Sprite,
    font: string,
    char: string,
    pos: Position,
    slicePosY: number = 0,
    sliceHeight: number = 0,
  ) {
    const fontMap = fontMaps[font]; // Mapa da fonte escolhida
    const charMap = fontMap.letters[char]; // Mapa do caractere escolihdo
    if (sliceHeight == 0) {
      sliceHeight = fontMaps[font].charHeight;
    }
    this.ctx.drawImage(
      fontSprite.img,
      charMap.x * fontMap.cellWidth,
      charMap.y * fontMap.charHeight + slicePosY,
      charMap.width,
      sliceHeight,
      pos.x * this.scale,
      (pos.y + slicePosY) * this.scale,
      charMap.width * this.scale,
      sliceHeight * this.scale,
    );
  }

  /**
   * Para cada caractere de um texto, renderiza o caractere com as informações de posição direção e recorte.
   * @param fontSprite Sprite da fonte utilizada
   * @param font Font utilizada
   * @param text Texto a ser renderizado
   * @param pos Posição do jogo onde será renderizado
   * @param direction Indica se o texto será renderizado "centralizado", "à esquerda" ou "à dreita" da posição oferecida
   * @param limitWidth Limite de largura para quebra linha
   * @param slicePosY posição vertical do recorte
   * @param sliceHeight altura do recorte
   * */
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
    let words = text.split(" ");
    let currentWidth = 0;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      currentWidth += measureTextWidth(word, font) + 3;
      if (currentWidth > limitWidth) {
        words[i] = "\n" + word;
        currentWidth = 0;
      } else {
        currentWidth += 3;
      }
    }
    currentWidth = 0;

    let chars = words.join(" ").split("");
    let totalWidth = 0;
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
          currentHeight += fontMap.charHeight;
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

  /**
   * Renderiza cada palavra de uma dada linha
   * @param line Linha a ser renderizada
   * @param pos Posição do jogo onde será renderizado
   * @param fontSprite Sprite da fonte utilizada
   * @param font Font utilizada
   * @param sliceY posição vertical do recorte
   * @param sliceHeight altura do recorte
   */
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
        Infinity,
        sliceY,
        sliceHeight,
      );
      currentX += measureTextWidth(x, font) + 3;
    });
  }

  /**
   * Renderiza um dado parágrafo na sua posição no jogo com deslocamento de scroll, e renderiza a borda de seleção se estiver selecionado
   * @param paragraph Parágrafo a ser renderizado
   * @param pos Posição do jogo onde será renderizado
   * @param fontSprite Sprite da fonte utilizada
   * @param font Fonte utilizada
   * @param scrollShift Deslocamento em pixels do scroll a partir da altura do texto
   * @param paragraphHeight Altura do parágrafo no texto
   * @param charHeight Altura do caracter da fonte
   * @param maxRenderHeight Altura máxima a ser renderizada
   * @param selected Indica se o parágrafo está selecionado
   * @param selectedSprite Sprite de seleção do parágrafo
   */
  writeParagraph(
    paragraph: Line[],
    pos: Position,
    fontSprite: Sprite,
    font: string,
    scrollShift: number,
    paragraphHeight: number,
    charHeight: number,
    maxRenderHeight: number,
    selected: boolean,
    selectedSprite: Sprite,
  ) {
    let currentY = 0; // Distance in pixels of the current rendering line
    paragraph.forEach((l) => {
      let sliceY = 0;
      let sliceHeight = 0;
      if (
        scrollShift < paragraphHeight + currentY + charHeight &&
        scrollShift + maxRenderHeight > paragraphHeight + currentY
      ) {
        if (scrollShift > paragraphHeight + currentY) {
          sliceY = scrollShift - (paragraphHeight + currentY);
          sliceHeight = charHeight - sliceY;
        } else if (
          scrollShift + maxRenderHeight <
          paragraphHeight + currentY + charHeight
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
      currentY += fontMaps[font].charHeight;
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

  /**
   * Renderiza todos os parágrafos de um dado conteúdo de email
   * @param paragraphs Lista de parágrafos a serem renderizados
   * @param font Fonte utilizada
   * @param fontSprite Sprite da fonte utilizada
   * @param pos Posição do jogo onde será renderizado
   * @param scrollShift Deslocamento em pixels do scroll a partir da altura do texto
   * @param maxRenderHeight Altura máxima a ser renderizada
   * @param selectedParagraph Índice do parágrafo selecionado
   * @param selectedSprite Sprite de seleção do parágrafo
   */
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
        fontMap.charHeight,
        maxRenderHeight,
        i == selectedParagraph,
        selectedSprite,
      );
      currentParagraphHeight += (p.length + 1) * fontMap.charHeight;
    });
  }
}
