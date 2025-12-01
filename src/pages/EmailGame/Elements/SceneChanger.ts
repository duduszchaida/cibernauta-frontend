import type Position from "../Position";
import GameObject from "./GameObject";

export const SCENECHANGE = "sceneChange"; // Referência de ação de alterar cena atual

// Objeto que tem como retorno de clickfunction padrão um objeto com type como SCENECHANGE e sceneReference uma dada string
// Ele serve para sinalizar uma mudança do objeto de cena atual junto com a referência da cena para qual deve mudar
export default class SceneChanger extends GameObject {
  constructor(args: {
    pos: Position;
    spriteName: string;
    heldSpriteName?: string;
    hoverSpriteName?: string;
    clickFunction?: Function;
    width?: number;
    height?: number;
    sceneReference?: string; // Referência usada no retorno de clickFunction que indica para qual cena a cena atual deve ser alterada
  }) {
    super({
      ...args,
      width: args.width ?? 32,
      height: args.height ?? 32,
    });
    this.clickFunction =
      args.clickFunction ??
      (() => {
        if (args.sceneReference) {
          return { type: SCENECHANGE, sceneReference: args.sceneReference };
        }
      });
  }
}
