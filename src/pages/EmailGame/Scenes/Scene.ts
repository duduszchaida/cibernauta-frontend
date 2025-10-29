import { findSprite } from "../FindSprite";
import type GameObject from "../Elements/GameObject";
import type Sprite from "../Elements/Sprite";

export default class Scene {
  backgroundSprite: Sprite;
  gameObjects: GameObject[] = [];
  constructor(args: {
    backgroundSpriteName: string;
    gameObjects: GameObject[];
  }) {
    this.gameObjects = args.gameObjects;
    this.backgroundSprite = findSprite(args.backgroundSpriteName);
  }
}
