// Objeto que conta o tempo interno do jogo
class GameTimeTracker {
  ticsPerSecond: number; // Quantos tics do jogo se passam a cada segundo
  gameStartStamp: number = 0; // Marcação de tempo em que o jogo foi iniciado

  lastPauseTimeStamp: number = 0; // Marcação de tempo em que o jogo foi pausado pela última vez
  gameStampBeforePause: number = 0; // Marcação de tempo do jogo antes de ser pausado pela última vez
  paused: boolean = true; // Indica se o jogo está pausado
  totalPauseLapse: number = 0; // Total de tempo que o jogo ficou pausado

  constructor(args: { ticsPerSecond: number }) {
    this.ticsPerSecond = args.ticsPerSecond;
  }

  /**
   * Contagem em milissegundos dês do início do jogo
   */
  get currentRealTimeStamp() {
    return Date.now() - this.gameStartStamp;
  }

  /**
   * Contagem em milissegundos dês do início do jogo sem o tempo de pause
   */
  get currentGameTimeStamp() {
    if (this.paused) {
      return this.gameStampBeforePause;
    }
    return this.currentRealTimeStamp - this.totalPauseLapse;
  }

  /**
   * Tic atual do jogo
   */
  get currentTic() {
    return Math.floor((this.currentGameTimeStamp / 1000) * this.ticsPerSecond);
  }

  /**
   * Inicia o contador de tempo
   */
  start() {
    this.paused = false;
    this.gameStartStamp = Date.now();
  }

  /**
   * Pausa o contador de tempo
   */
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
