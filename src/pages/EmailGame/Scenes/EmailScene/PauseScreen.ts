import GameObject from "../../Elements/GameObject";

export class PauseScreen extends GameObject {
  constructor() {
    super({
      height: 256,
      width: 352,
      ignoreClick: true,
      spriteName: "pause_screen",
    });
  }
}
