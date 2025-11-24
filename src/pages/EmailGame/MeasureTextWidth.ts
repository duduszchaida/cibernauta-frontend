import fontMaps from "./FontMaps";

export default function measureTextWidth(text: string, font: string) {
<<<<<<< HEAD
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
=======
	let letters = text.split("");
	let width = 0;
	for (let i = 0; i < letters.length; i++) {
		const char = letters[i];
		const fontMap = fontMaps[font];
		const charMap = fontMap.letters[char];
		if (charMap == null) {
			console.warn("no ten", char);
			continue;
		}
		width += charMap.width + 1;
	}
	return width;
>>>>>>> teste
}
