import AppIcon, { SCENECHANGE } from "../Elements/AppIcon";
import Position from "../Position";
import Scene from "./Scene";

const sceneList: Record<string, Scene> = {
	desktop: new Scene({
		backgroundSpriteName: "blue_bg",
		gameObjects: [
			new AppIcon({
				pos: new Position(16, 16),
				spriteName: "concepts_icon",
				appName: "Conceitos",
			}),
			new AppIcon({
				pos: new Position(80, 16),
				spriteName: "email_icon",
				appName: "Treinamento",
				clickFunction: () => {
					return { type: SCENECHANGE, sceneName: "email" };
				},
			}),
			new AppIcon({
				pos: new Position(16, 80),
				spriteName: "settings_icon",
				appName: "Ajustes",
			}),
			new AppIcon({
				pos: new Position(80, 80),
				spriteName: "saves_icon",
				appName: "Salvamentos",
			}),
		],
	}),
	email: new Scene({
		backgroundSpriteName: "beige_bg",
		gameObjects: [],
	}),
};

export default sceneList;
