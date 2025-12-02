import fontMaps from "./FontMaps";

/**
 * Mede a largura de um dado texto a partir do mapeamento de uma dada fonte
 * @param text
 * @param font
 * @returns
 */
export default function measureTextWidth(text: string, font: string) {
  let letters = text.split("");
  let width = 0;
  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    const fontMap = fontMaps[font];
    const charMap = fontMap.letters[char];
    if (charMap == null) {
      console.warn(font, "no ten", char);
      continue;
    }
    width += charMap.width + 1;
  }
  return width;
}
