import type CanvasObject from "./CanvasObject";
import type Cursor from "./Cursor";
import Position from "./Position";
import type Scene from "./Scenes/Scene";

export default function renderScene(
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
}
