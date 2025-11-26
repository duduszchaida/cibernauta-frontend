import Position from "../Position";
import SceneChanger from "./SceneChanger";

// Classe de objeto genêrico de botão de sair de um aplicativo
export class ExitButton extends SceneChanger {
  constructor(reference: string) {
    super({
      height: 16,
      width: 16,
      pos: new Position(332, 4),
      spriteName: "exit_btn",
      sceneReference: reference,
    });
  }
}
