// Objeto usado para guardar uma imagem
export default class Sprite {
  src: string; // caminho fonte da imagem
  img: HTMLImageElement; // Objeto html de imagem
  constructor(src: string) {
    this.src = src;
    this.img = new Image();
  }

  // retorna uma Promise do carregamento o objeto da imagem, retornando erro se a imagem não conseguir ser carregada
  load() {
    const { src, img } = this;
    return new Promise((done, fail) => {
      img.onload = () => done(img);
      img.onerror = fail;
      img.src = src;
    });
  }
}
