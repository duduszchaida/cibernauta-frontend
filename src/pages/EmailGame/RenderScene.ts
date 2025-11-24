import type CanvasObject from "./CanvasObject";
import type Cursor from "./Cursor";
<<<<<<< HEAD
import type { Popup } from "./Elements/Popup";
=======
>>>>>>> teste
import Position from "./Position";
import type Scene from "./Scenes/Scene";

export default function renderScene(
<<<<<<< HEAD
  gameScene: Scene,
  canvas: CanvasObject,
  cursor: Cursor,
  popup: Popup,
) {
  canvas.clear();
  canvas.drawSprite(gameScene.backgroundSprite, new Position(), 352, 256);
  gameScene.gameObjects.forEach((x) => {
    x.render(canvas);
  });
  popup.render(canvas);
  cursor.render(canvas);
=======
	gameScene: Scene,
	canvas: CanvasObject,
	cursor: Cursor
) {
	canvas.clear();
	canvas.drawSprite(
		gameScene.backgroundSprite,
		new Position(),
		new Position(352, 256)
	);
	gameScene.gameObjects.forEach((x) => {
		x.render(canvas);
	});
	cursor.render(canvas);
>>>>>>> teste
}
