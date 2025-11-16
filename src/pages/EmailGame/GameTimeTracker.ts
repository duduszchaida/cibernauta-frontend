class GameTimeTracker {
  ticsPerSecond: number;
  gameStartStamp: number = 0;
  paused: boolean = true;
  lastPauseTimeStamp: number = 0;
  gameStampBeforePause: number = 0;

  totalPauseLapse: number = 0;
  constructor(args: { ticsPerSecond: number }) {
    this.ticsPerSecond = args.ticsPerSecond;
  }

  get currentRealTimeStamp() {
    return Date.now() - this.gameStartStamp;
  }

  get currentGameTimeStamp() {
    if (this.paused) {
      return this.gameStampBeforePause;
    }
    return this.currentRealTimeStamp - this.totalPauseLapse;
  }

  get currentTic() {
    return Math.floor((this.currentGameTimeStamp / 1000) * this.ticsPerSecond);
  }

  start() {
    this.paused = false;
    this.gameStartStamp = Date.now();
  }

  ticsToSeconds(tics: number) {
    return Math.floor(tics / this.ticsPerSecond);
  }

  pause() {
    if (!this.paused) {
      this.gameStampBeforePause = this.currentGameTimeStamp;
      this.lastPauseTimeStamp = this.currentRealTimeStamp;
    } else {
      this.totalPauseLapse +=
        this.currentRealTimeStamp - this.lastPauseTimeStamp;
    }
    this.paused = !this.paused;
  }
}

export const gameTimeTracker = new GameTimeTracker({ ticsPerSecond: 10 });
