import type CanvasObject from "../CanvasObject";
import TextObject from "../Elements/TextObject";
import Position from "../Position";
import { gameTimeTracker } from "../GameTimeTracker";
import { Utils } from "../Utils";

// Timer usado para funções temporizadas
export default class Timer extends TextObject {
  goalSecs: number; // Tempo objetivo do timer em segundos
  goalTics: number; // Tempo objetivo do timer em tics do jogo
  goalFunc: Function; // Função executada após chegar ao tempo objetivo
  loop: boolean; // Indica se o timer reinicia após chegar ao tempo objetivo
  loopCount: number = 0; // Indica quantas vezes o timer reiniciou após chegar ao tempo objetivo
  loopMax: number; // Indica quantas vezes o timer pode ser reiniciado
  interval: any = null; // Guarda o setInterval de verificação do timer
  started: boolean = false; // Indica se o timer já foi iniciado
  finished: boolean = false; // Indica se o timer já foi encerrado
  startTick: number = Infinity; // Tic de quando o timer foi iniciado

  constructor(args: {
    goalSecs: number;
    loop?: boolean;
    loopMax?: number;
    goalFunc?: Function;
    pos?: Position;
    invisible?: boolean;
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
    this.goalFunc = args.goalFunc ?? (() => {});
    this.goalTics = this.goalSecs * gameTimeTracker.ticsPerSecond;
  }

  /**
   * Verifica as condições de máximo de loops para encerrar o interval e
   * se o tempo percorrido dês do tic do inicio do timer até o tic atual for maior que o tempo objetivo em tics
   * executa goalFunc e caso também não for loop, encerra o interval
   * @returns
   */
  check() {
    if (this.loopCount >= this.loopMax) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      return;
    }
    if (gameTimeTracker.currentTic - this.startTick >= this.goalTics) {
      if (this.loop) {
        if (this.loopCount < this.loopMax) {
          this.goalFunc();
          this.startTick = gameTimeTracker.currentTic;
          this.loopCount++;
        }
      } else {
        if (!this.finished) {
          this.goalFunc();
          this.finished = true;
          if (this.interval) {
            clearInterval(this.interval);
          }
        }
      }
    }
  }

  /**
   * Marca startTick como o tic do momento atual e inicia o timer e seu interval para verificar o progresso do timer
   */
  start() {
    this.startTick = gameTimeTracker.currentTic;
    this.started = true;
    this.finished = false;
    this.interval = setInterval(() => {
      this.check();
    }, 10);
  }

  /**
   * Retorna uma string com o tempo restante do timer, formatado em "MM:SS"
   * @returns
   */
  timeRemaining(): string {
    let secsRemaining;
    if (this.started) {
      secsRemaining = Math.ceil(
        (this.goalTics + this.startTick - gameTimeTracker.currentTic) /
          gameTimeTracker.ticsPerSecond,
      );
    } else {
      secsRemaining = this.goalSecs;
    }
    let minutes = Math.max(Math.floor(secsRemaining / 60), 0);
    let seconds = Math.max(secsRemaining % 60, 0);
    return (
      Utils.numberFormat(minutes, 2) + ":" + Utils.numberFormat(seconds, 2)
    );
  }

  /**
   * Se não estiver invisível usa um dado CanvasObject para renderizar timeRemaining()
   * @param canvasObject
   * @returns
   */
  render(canvasObject: CanvasObject): void {
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
