import type { Evaluation } from "../EmailScene/EmailScene";
import Scene from "../Scene";

export class ScoreScene extends Scene {
  constructor(evaluation: Evaluation) {
    super({ backgroundSpriteName: "bg_score", gameObjects: [] });
  }
}
