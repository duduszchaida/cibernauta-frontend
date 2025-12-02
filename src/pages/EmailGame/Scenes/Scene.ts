import { findSprite } from "../Sprites/FindSprite";
import type GameObject from "../Elements/GameObject";
import type Sprite from "../Sprites/Sprite";

// Classe que representa uma lista de objetos de jogo da tela atual do jogador
export default class Scene {
  backgroundSprite: Sprite; // Sprite do fundo da cena
  gameObjects: GameObject[] = []; // Lista de objetos de jogo da cena
  constructor(args: {
    backgroundSpriteName: string;
    gameObjects: GameObject[];
  }) {
    this.gameObjects = args.gameObjects;
    this.backgroundSprite = findSprite(args.backgroundSpriteName);
  }
}
