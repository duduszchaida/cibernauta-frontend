import type CanvasObject from "../CanvasObject";
import TextObject from "../Elements/TextObject";
import Position from "../Position";
import { gameTimeTracker } from "../GameTimeTracker";

export default class Timer extends TextObject {
  loop: boolean;
  loopCount: number = 1;
  loopMax: number;
  hasSetInterval: boolean;
  interval: any = null;
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

  constructor(args: {
    goalSecs: number;
    loop?: boolean;
    loopMax?: number;
    goalFunc?: Function;
    pos?: Position;
    invisible?: boolean;
    interval?: boolean;
  }) {
    super({
      color: "red",
      font: "wcp",
      pos: args.pos ?? new Position(),
      text: "",
      invisible: args.invisible,
      ignoreClick: args.invisible,
    });
    this.goalSecs = args.goalSecs;
    this.loop = args.loop ?? false;
    this.loopMax = args.loopMax ?? Infinity;
    this.hasSetInterval = args.interval ?? false;
    this.goalFunc = args.goalFunc ?? (() => {});
    this.goalTics = this.goalSecs * gameTimeTracker.ticsPerSecond;
  }

  start() {
    this.startTick = gameTimeTracker.currentTic;
    this.started = true;
    this.finished = false;
    if (this.hasSetInterval) {
      this.interval = setInterval(() => {
        this.check();
      }, 10);
    }
  }

  pause() {
    if (this.paused) {
      this.totalPauseTics += gameTimeTracker.currentTic - this.lastPauseTic;
    } else {
      this.lastPauseTic = gameTimeTracker.currentTic;
    }
    this.paused != this.paused;
  }

  check() {
    if (this.loopCount > this.loopMax) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      return;
    }
    if (gameTimeTracker.currentTic - this.startTick >= this.goalTics) {
      if (this.loop) {
        if (this.loopCount <= this.loopMax) {
          this.goalFunc();
          this.startTick = gameTimeTracker.currentTic;
          this.loopCount++;
        }
      } else {
        if (!this.finished) {
          this.goalFunc();
          if (this.interval) {
            clearInterval(this.interval);
          }
        }
        this.finished = true;
      }
    }
  }

  elapsedTics(): number {
    return gameTimeTracker.currentTic - (this.startTick + this.totalPauseTics);
  }

  timeRemaining(): string {
    let secsRemaining;
    if (this.started) {
      secsRemaining = Math.ceil(
        (this.goalTics +
          this.totalPauseTics +
          this.startTick -
          gameTimeTracker.currentTic) /
          gameTimeTracker.ticsPerSecond,
      );
    } else {
      secsRemaining = this.goalSecs;
    }
    if (secsRemaining <= 0) {
      return "00:00";
    }
    let minutes = Math.floor(secsRemaining / 60);
    let seconds = secsRemaining % 60;
    let minZero = "";
    let secsZero = "";
    if (minutes < 10) {
      minZero = "0";
    }
    if (seconds < 10) {
      secsZero = "0";
    }
    return minZero + minutes + ":" + secsZero + seconds;
  }

  render(canvasObject: CanvasObject): void {
    this.check();
    if (this.invisible) {
      return;
    }
    canvasObject.writeText(
      this.fontSprite,
      this.font,
      this.timeRemaining(),
      this.pos,
    );
  }
}
