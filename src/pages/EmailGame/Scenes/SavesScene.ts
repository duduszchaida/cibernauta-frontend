import SceneChanger from "../Elements/AppIcon";
import { SCENECHANGE } from "../Elements/ExitBtn";
import Position from "../Position";
import Scene from "./Scene";
import { DESKTOPSCENE } from "./SceneReferences";

export default class SaveScene extends Scene{
    textSlot1: any;
    textSlot2: any;
    textSlot3: any;
    constructor(){
        super({
            backgroundSpriteName: "bg_save_screen",
            gameObjects: []
        })
        this.update()
    }

    update(){
        this.gameObjects = []
        let slot1Btn = new SceneChanger({
            pos: new Position(),
            spriteName: "save_avatar_empty",
            appName: "",
            clickFunction: () => {
                console.log(1)
                return {type: SCENECHANGE, sceneName: DESKTOPSCENE}
            }
        })
        this.gameObjects.push(slot1Btn);
    }
}