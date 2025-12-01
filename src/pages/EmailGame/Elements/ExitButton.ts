import Position from "../Position";
import SceneChanger from "./SceneChanger";

// Classe de objeto genêrico de botão de sair de um aplicativo
export class ExitButton extends SceneChanger {
  constructor(reference: string, alt?: boolean) {
    super({
      height: 16,
      width: 16,
      pos: new Position(332, 4),
      spriteName: alt ? "btn_return" : "btn_exit",
      heldSpriteName: alt ? "btn_return_held" : "btn_exit_held",
      sceneReference: reference,
    });
  }
}
