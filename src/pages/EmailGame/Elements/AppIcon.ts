import type CanvasObject from "../CanvasObject";
<<<<<<< HEAD
import Position from "../Position";
import { findSprite } from "../FindSprite";
import SceneChanger from "./SceneChanger";

export default class AppIcon extends SceneChanger {
  appName: string;
  clickable: boolean = true;

  constructor(args: {
    pos: Position;
    spriteName: string;
    appName?: string;
    clickFunction?: Function;
    width?: number;
    height?: number;
    sceneReference?: string;
  }) {
    super({
      ...args,
      width: args.width ?? 32,
      height: args.height ?? 32,
      sceneReference: args.sceneReference,
    });
    this.appName = args.appName ?? "";
    if (args.clickFunction) {
      this.click = args.clickFunction;
    }
  }

  render(canvasObject: CanvasObject) {
    canvasObject.drawSprite(this.sprite, this.pos, this.width, this.height);
    if (this.appName == "") {
      return;
    }
    canvasObject.writeText(
      findSprite("minecraftia_bnw"),
      "minecraftia",
      this.appName,
      this.pos.addPos(new Position(18, 32)),
      "center",
    );
  }
=======
import GameObject from "./GameObject";
import Position from "../Position";
import { findSprite } from "../FindSprite";

export const SCENECHANGE = "sceneChange";

export default class AppIcon extends GameObject {
	appName: string;
	clickable: boolean = true;

	constructor(args: {
		pos: Position;
		spriteName: string;
		appName: string;
		clickFunction?: Function;
	}) {
		super({ ...args, width: 32, height: 32 });
		this.appName = args.appName;
		this.click =
			args.clickFunction ??
			(() => {
				console.log(this.appName);
			});
	}

	render(canvasObject: CanvasObject) {
		canvasObject.drawSprite(
			this.sprite,
			this.pos,
			new Position(this.width, this.height)
		);
		canvasObject.writeText(
			findSprite("minecraftia_bnw"),
			"minecraftia",
			this.appName,
			this.pos.add(new Position(18, 32)),
			"center"
		);
	}
>>>>>>> teste
}
