import type CanvasObject from "../CanvasObject";
import TextObject from "../Elements/TextObject";
import { gameTimeTracker } from "./GameTimeTracker";

export default class Timer extends TextObject {
    loop: boolean;
    goalSecs: number;
    goalTics: number;
    goalFunc: Function;

    started: boolean = false;
    finished: boolean = false;
    startTick: number = Infinity;
    paused: boolean = false;
    lastPauseTic = 0;
    ticAtLastPause = 0;
    totalPauseTics = 0;

    constructor(args: {goalSecs: number, loop?: boolean, goalFunc?: Function}){
        super({color: "black", font: "minecraftia", pos: args.pos, text: ""})
        this.goalSecs = args.goalSecs;
        this.loop = args.loop ?? false;
        this.goalFunc = args.goalFunc ?? (() => {console.log("it's done!")});
        this.goalTics = this.goalSecs * gameTimeTracker.ticsPerSecond;
    }

    start(){
        this.startTick = gameTimeTracker.currentTic;
        this.started = true;
        this.finished = false;
    }

    pause(){
        if (this.paused){
            this.totalPauseTics += gameTimeTracker.currentTic - this.lastPauseTic
        } else {
            this.lastPauseTic = gameTimeTracker.currentTic;
        }
        this.paused != this.paused
    }

    check(){
        if (gameTimeTracker.currentTic - this.startTick >= this.goalTics){
            return true;
        }
        return false;
    }

    elapsedTics(): number{
        return gameTimeTracker.currentTic - (this.startTick + this.totalPauseTics)
    }

    timeRemaining(): string {
        let secsRemaining;
        if (this.started){
            secsRemaining = Math.ceil(
                (this.goalTics + this.totalPauseTics + this.startTick - gameTimeTracker.currentTic) /gameTimeTracker.ticsPerSecond);
        } else {
            secsRemaining = this.goalSecs;
        }
        if (secsRemaining <= 0) {
            return "00:00"
        }
        let minutes = Math.floor(secsRemaining/60)
        let seconds = secsRemaining%60
        let minZero = ""
        let secsZero = ""
        if (minutes < 10) {
            minZero = "0"
        }
        if (seconds < 10) {
            secsZero = "0"
        }
        return minZero + minutes + ":" + secsZero + seconds;
    }

    render(canvasObject: CanvasObject): void {
        canvasObject.writeText(this.fontSprite, this.font, this.text, this.pos);
    }
}